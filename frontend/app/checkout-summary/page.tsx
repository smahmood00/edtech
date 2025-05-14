'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Banknote, Loader2 } from "lucide-react";
import { LoginFlow } from "@/components/auth/LoginFlow";
import { loadStripe } from '@stripe/stripe-js';
import { toast } from "@/components/ui/use-toast";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
//const API_BASE_URL = 'https://edtech-1-ll96.onrender.com';
const API_BASE_URL =  process.env.NEXT_PUBLIC_API_BASE_URL; 
console.log('In chackeout-summary page: API BASE URL IS: ',API_BASE_URL)

interface CheckoutSummaryProps {
  courseName: string;
  price: number;
}

function CheckoutSummaryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<'credit' | 'fps' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    
    if (token) {
      setIsLoggedIn(true);
      if (email) {
        setUserEmail(email);
        console.log('User email loaded from localStorage:', email);
      } else {
        console.warn('User is logged in but email is missing from localStorage');
      }
    }
  }, []); // Remove userEmail from dependency array to prevent loops

  const courseName = searchParams.get('courseName') || 'Course Name';
  const price = Number(searchParams.get('price')) || 0;

  const handlePaymentSelect = (method: 'credit' | 'fps') => {
    setSelectedPayment(method);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Your Order</h1>
      
      {/* Order Summary Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Name of Course:</span>
            <span className="font-semibold">{courseName}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span className="text-gray-600">To be scheduled after payment</span>
          </div>
          <div className="flex justify-between">
            <span>Timeslot:</span>
            <span className="text-gray-600">To be scheduled after payment</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">HKD {price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-bold">Total</span>
              <span className="font-bold">HKD {price.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Authentication Section */}
      {!isLoggedIn ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Sign In or Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginFlow 
              showBackButton={false}
              showGoogleSignIn={false}
              onLoginSuccess={() => setIsLoggedIn(true)}
              // Remove redirectPath prop to prevent navigation
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Signed in as: {userEmail}</p>
          </CardContent>
        </Card>
      )}

      {/* Payment Section */}
      {isLoggedIn && (
        <Card>
          <CardHeader>
            <CardTitle>Last Step...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant={selectedPayment === 'credit' ? 'default' : 'outline'}
              className="w-full flex items-center justify-center"
              onClick={() => handlePaymentSelect('credit')}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Pay with Credit Card
            </Button>
            <Button
              variant={selectedPayment === 'fps' ? 'default' : 'outline'}
              className="w-full flex items-center justify-center"
              onClick={() => handlePaymentSelect('fps')}
            >
              <Banknote className="mr-2 h-4 w-4" />
              FPS Transfer
            </Button>
            
            {selectedPayment && (
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isProcessing}
                onClick={async () => {
                  setIsProcessing(true);
                  setError('');
                  try {
                    // Check if email is available
                    if (!userEmail || userEmail.trim() === '') {
                      throw new Error('User email is missing. Please try logging in again.');
                    }

                    const stripe = await stripePromise;
                    if (!stripe) throw new Error('Stripe failed to initialize');

                    console.log('Sending checkout request with email:', userEmail);

                    const response = await fetch(`${API_BASE_URL}/api/payment/create-checkout-session`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                      },
                      body: JSON.stringify({
                        courseName,
                        price,
                        userEmail,
                        paymentMethod: selectedPayment,
                        successUrl: `${window.location.origin}/payment/success`,
                        cancelUrl: `${window.location.origin}/payment/failure`
                      }),
                    });

                    if (!response.ok) {
                      throw new Error('Failed to create checkout session');
                    }

                    const session = await response.json();
                    const result = await stripe.redirectToCheckout({
                      sessionId: session.id,
                    });

                    if (result.error) {
                      throw new Error(result.error.message);
                    }
                  } catch (error: any) {
                    setError(error.message || 'An error occurred during checkout');
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description: error.message || 'An error occurred during checkout',
                    });
                  } finally {
                    setIsProcessing(false);
                  }
                }}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Pay Now'
                )}
              </Button>
            )}
            {error && (
              <p className="text-sm text-red-600 mt-2">{error}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <CheckoutSummaryContent />
    </Suspense>
  );
}
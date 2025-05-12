'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Banknote } from "lucide-react";
import { LoginFlow } from "@/components/auth/LoginFlow";

interface CheckoutSummaryProps {
  courseName: string;
  price: number;
}

export default function CheckoutSummaryPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <CheckoutSummaryContent />
    </Suspense>
  );
}

function CheckoutSummaryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<'credit' | 'fps' | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail'); // Add this line to get email from localStorage
    
    if (token) {
      setIsLoggedIn(true);
      if (email) {
        setUserEmail(email);
      }
    }
  }, [userEmail]);

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
                onClick={() => {
                  // Handle payment processing here
                  console.log('Processing payment...');
                }}
              >
                Pay Now
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
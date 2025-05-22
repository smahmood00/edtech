'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Banknote, Loader2 } from "lucide-react";
import { LoginFlow } from "@/components/auth/LoginFlow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadStripe } from '@stripe/stripe-js';
import { toast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
//const API_BASE_URL = 'https://edtech-1-ll96.onrender.com';
const API_BASE_URL =  process.env.NEXT_PUBLIC_API_BASE_URL; 
console.log('In chackeout-summary page: API BASE URL IS: ',API_BASE_URL)

interface Child {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  parent: string;
}

interface CheckoutSummaryProps {
  courseName: string;
  price: number;
}

function CheckoutSummaryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, userEmail, isLoading } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [enrollmentType, setEnrollmentType] = useState<'myself' | 'child'>('myself');
  const [age, setAge] = useState('');
  const [childFirstName, setChildFirstName] = useState('');
  const [childLastName, setChildLastName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [showChildForm, setShowChildForm] = useState(false);
  const [userChildren, setUserChildren] = useState<Child[]>([]);

  const courseName = searchParams.get('courseName') || 'Course Name';
  const price = Number(searchParams.get('price')) || 0;

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('authToken');
      fetch(`${API_BASE_URL}/api/auth/user/children`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(children => {
        console.log('Fetched children:', children);
        setUserChildren(children);
      })
      .catch(error => {
        console.error('Error fetching children:', error);
      });
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const handlePayment = async (paymentMethod: 'credit' | 'fps') => {
    try {
      setIsProcessing(true);
      setError('');

      // Check if email is available
      if (!userEmail || userEmail.trim() === '') {
        throw new Error('User email is missing. Please try logging in again.');
      }


      const enrollmentData = enrollmentType === 'myself' 
        ? { type: 'myself', age }
        : {
            type: 'child',
            firstName: childFirstName,
            lastName: childLastName,
            age: childAge
          };

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
          paymentMethod,
          enrollmentData,
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
      setError(error.message || 'An error occurred during payment');
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'An error occurred during checkout',
      });
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
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
      {!isAuthenticated && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Sign In or Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginFlow 
              showBackButton={false}
              onLoginSuccess={() => {
                console.log('Login successful');
              }}
            />
          </CardContent>
        </Card>
      )}

      {isAuthenticated && (
        <>
          {/* Account Info Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Signed in as: {userEmail}</p>
            </CardContent>
          </Card>

          {/* Enrollment Type Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Buy this course for</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  variant={enrollmentType === 'myself' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => setEnrollmentType('myself')}
                >
                  Myself
                </Button>
                <Button 
                  variant={enrollmentType === 'child' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => setEnrollmentType('child')}
                >
                  My Child
                </Button>
              </div>

              {enrollmentType === 'myself' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Your Age</Label>
                    <Input 
                      id="age" 
                      type="number" 
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter your age"
                    />
                  </div>
                </div>
              )}

              {enrollmentType === 'child' && (
                <div className="space-y-4">
                  {userChildren.length > 0 && (
                    <div className="space-y-2">
                      <Label>Select Child</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {userChildren.map((child) => (
                          <Button
                            key={child._id}
                            variant={childFirstName === child.firstName && childLastName === child.lastName ? 'default' : 'outline'}
                            className="w-full text-left"
                            onClick={() => {
                              setChildFirstName(child.firstName);
                              setChildLastName(child.lastName);
                              setChildAge(child.age.toString());
                              setShowChildForm(false);
                            }}
                          >
                            {child.firstName} {child.lastName}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setShowChildForm(true);
                      setChildFirstName('');
                      setChildLastName('');
                      setChildAge('');
                    }}
                  >
                    Add Child Profile
                  </Button>

                  {showChildForm && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="childFirstName">Child's First Name</Label>
                        <Input 
                          id="childFirstName" 
                          type="text" 
                          value={childFirstName}
                          onChange={(e) => setChildFirstName(e.target.value)}
                          placeholder="First name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="childLastName">Child's Last Name</Label>
                        <Input 
                          id="childLastName" 
                          type="text" 
                          value={childLastName}
                          onChange={(e) => setChildLastName(e.target.value)}
                          placeholder="Last name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="childAge">Child's Age</Label>
                        <Input 
                          id="childAge" 
                          type="number" 
                          value={childAge}
                          onChange={(e) => setChildAge(e.target.value)}
                          placeholder="Age"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Section */}
          <Card>
            <CardHeader>
              <CardTitle>Last Step...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="default"
                className="w-full flex items-center justify-center"
                onClick={() => handlePayment('credit')}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay with Credit Card
                  </>
                )}
              </Button>
              {error && (
                <p className="text-sm text-red-600 mt-2">{error}</p>
              )}
            </CardContent>
          </Card>
        </>
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
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [verificationDetails, setVerificationDetails] = useState<any>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get session ID from URL params
        const sessionId = searchParams.get('session_id');
        if (!sessionId) {
          throw new Error('No session ID found in URL');
        }

        console.log('Verifying payment with session ID:', sessionId);

        // Verify payment
        const verifyResponse = await fetch(`${API_BASE_URL}/api/payment/verify?session_id=${sessionId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        const responseText = await verifyResponse.text();
        console.log('Verification response:', responseText);

        let verifyData;
        try {
          verifyData = JSON.parse(responseText);
        } catch (e) {
          console.error('Error parsing verification response:', e);
          throw new Error(`Invalid response from server: ${responseText}`);
        }

        if (!verifyResponse.ok) {
          console.error('Payment verification failed:', {
            status: verifyResponse.status,
            statusText: verifyResponse.statusText,
            data: verifyData
          });
          throw new Error(verifyData.message || `Payment verification failed: ${verifyResponse.statusText}`);
        }

        if (!verifyData.success) {
          throw new Error(verifyData.message || 'Payment verification failed');
        }

        setVerificationDetails(verifyData);
        setIsProcessing(false);
      } catch (error) {
        console.error('Error in payment success flow:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        setIsProcessing(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (isProcessing) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardContent className="space-y-4 text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="text-gray-600">Processing your enrollment...</p>
            <p className="text-sm text-gray-500">This may take a few moments...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-center text-2xl">Enrollment Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-red-600">{error}</p>
            <p className="text-gray-600">
              Please contact support if this issue persists.
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => window.location.reload()}
                className="mt-4 w-full bg-purple-600 hover:bg-purple-700"
              >
                Try Again
              </Button>
              <Button 
                onClick={() => router.push('/parent-dashboard')}
                className="w-full"
                variant="outline"
              >
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-center text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-600">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>
          {verificationDetails?.payment?.courseId?.courseName && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">Course Enrolled:</p>
              <p className="text-gray-700">{verificationDetails.payment.courseId.courseName}</p>
            </div>
          )}
          <p className="text-gray-600">
            You will receive a confirmation email shortly with further details about your course.
          </p>
          <Button 
            onClick={() => router.push('/parent-dashboard')}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700"
          >
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

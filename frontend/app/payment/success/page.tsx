'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="mb-8">
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
          <p className="text-gray-600">
            You will receive a confirmation email shortly with further details about scheduling your course.
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
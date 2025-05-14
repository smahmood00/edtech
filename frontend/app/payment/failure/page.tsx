'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentFailurePage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-center text-2xl">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-600">
            We're sorry, but your payment could not be processed at this time.
          </p>
          <p className="text-gray-600">
            Please try again or contact our support team if you continue to experience issues.
          </p>
          <div className="space-y-2">
            <Button 
              onClick={() => router.back()}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Try Again
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push('/')}
              className="w-full"
            >
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
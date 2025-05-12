"use client";

import Link from "next/link";
import { ArrowLeft, Mail, User, LogOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const API_BASE_URL = 'https://edtech-1-ll96.onrender.com/api/auth';
console.log("API base url is", API_BASE_URL);
const OTP_RESEND_TIMEOUT = 35;

interface LoginFlowProps {
  onLoginSuccess?: () => void;
  redirectPath?: string;
  showBackButton?: boolean;
  showGoogleSignIn?: boolean;
}

export function LoginFlow({ 
  onLoginSuccess, 
  redirectPath = '/parent-dashboard',
  showBackButton = true,
  showGoogleSignIn = true
}: LoginFlowProps) {
  const [step, setStep] = useState('initialOptions');
  const [email, setEmail] = useState('');
  const [otpInputs, setOtpInputs] = useState<string[]>(Array(6).fill(''));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(OTP_RESEND_TIMEOUT);
  const [isResendActive, setIsResendActive] = useState(false);
  const router = useRouter();
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        router.push(redirectPath);
      }
    }
  }, [router, redirectPath, onLoginSuccess]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isResendActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setIsResendActive(false);
      setCountdown(OTP_RESEND_TIMEOUT);
    }
    return () => clearTimeout(timer);
  }, [isResendActive, countdown]);

  const startResendTimer = () => {
    setCountdown(OTP_RESEND_TIMEOUT);
    setIsResendActive(true);
  };

  const handleInitiateOtp = async (currentEmail: string) => {
    if (!currentEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError('Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await axios.post(`${API_BASE_URL}/initiate`, { email: currentEmail });
      setStep('otpVerification');
      startResendTimer();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error sending OTP. Please try again.');
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async () => {
    const currentOtp = otpInputs.join('');
    if (currentOtp.length !== 6 || !/^\d{6}$/.test(currentOtp)) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-otp`, { email, otp: currentOtp });
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userEmail', email); // Add this line
      setToken(response.data.token);
      if (response.data.isExistingUser) {
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          router.push(redirectPath);
        }
      } else {
        setStep('profileCompletion');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error verifying OTP. Please try again.');
    }
    setIsLoading(false);
  };

  const handleCompleteProfile = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/complete-profile`, { email, firstName, lastName });
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userEmail', email); // Add this line
      setToken(response.data.token);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        router.push(redirectPath);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error completing profile. Please try again.');
    }
    setIsLoading(false);
  };

  const handleResendOtp = () => {
    if (!isResendActive) {
      handleInitiateOtp(email);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail'); // Add this line
    setToken(null);
    setEmail('');
    setOtpInputs(Array(6).fill(''));
    setFirstName('');
    setLastName('');
    setStep('initialOptions');
    setError('');
    router.push('/');
  };

  const handleOtpInputChange = (index: number, value: string) => {
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value.replace(/\D/g, '').slice(0, 1);
    setOtpInputs(newOtpInputs);

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !otpInputs[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6 rounded-lg bg-white p-6 shadow-lg sm:p-8">
      {showBackButton && (
        <Link href="/" className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      )}

      <div className="flex flex-col space-y-2 text-center">
        <User className="mx-auto h-10 w-10 text-purple-600" />
        <h1 className="text-2xl font-semibold tracking-tight">
          {step === 'profileCompletion' ? 'Complete Your Profile' : 
           step === 'otpVerification' ? 'Verify Your Email' :
           step === 'emailEntry' ? 'Enter Your Email' :
           'Parent Access'}
        </h1>
        {step === 'initialOptions' && (
          <p className="text-sm text-muted-foreground">Monitor your child's progress and manage their account</p>
        )}
      </div>

      {error && <p className="text-sm text-red-600 mb-4 text-center">{error}</p>}

      {step === 'initialOptions' && (
        <div className="space-y-4">
          <Button onClick={() => setStep('emailEntry')} className="w-full bg-purple-600 hover:bg-purple-700">
            <Mail className="mr-2 h-4 w-4" /> Email Sign Up / Log In
          </Button>
          {showGoogleSignIn && (
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => {/* Implement Google Sign In */}}
            >
              <span className="mr-2">🇬</span>
              Sign in with Google
            </Button>
          )}
        </div>
      )}

      {step === 'emailEntry' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-input">Email Address</Label>
            <Input 
              id="email-input" 
              type="email" 
              placeholder="parent@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button onClick={() => handleInitiateOtp(email)} className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
            {isLoading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
          <Button variant="ghost" onClick={() => { setError(''); setStep('initialOptions');}} className="w-full text-purple-600">
            Back
          </Button>
        </div>
      )}

      {step === 'otpVerification' && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Enter the 6-digit OTP sent to <span className="font-medium text-foreground">{email}</span>
          </p>
          <div className="space-y-2">
            <Label htmlFor="otp-input-0">OTP</Label>
            <div className="flex justify-between space-x-2">
              {otpInputs.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-input-${index}`}
                  ref={(el) => (otpInputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-10 h-10 text-center text-lg border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 sm:w-12 sm:h-12"
                  disabled={isLoading}
                />
              ))}
            </div>
          </div>
          <Button onClick={handleVerifyOtp} className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading || otpInputs.join('').length !== 6}>
            {isLoading ? 'Verifying...' : 'Next'}
          </Button>
          <div className="flex justify-between items-center text-xs">
            <Button variant="link" onClick={() => { setError(''); setOtpInputs(Array(6).fill('')); setStep('emailEntry');}} className="p-0 h-auto text-purple-600">
              Back
            </Button>
            <Button 
              variant="link" 
              onClick={handleResendOtp} 
              disabled={isResendActive || isLoading}
              className="p-0 h-auto text-purple-600 disabled:opacity-50"
            >
              <RotateCcw className={`mr-1 h-3 w-3 ${isResendActive ? 'animate-spin' : ''}`} />
              Resend OTP {isResendActive ? `(${countdown}s)` : ''}
            </Button>
          </div>
        </div>
      )}

      {step === 'profileCompletion' && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Nice to meet you! Please complete your profile.
          </p>
          <div className="space-y-2">
            <Label htmlFor="firstName">Parent First Name *</Label>
            <Input 
              id="firstName" 
              type="text" 
              placeholder="Tai Man" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Parent Last Name *</Label>
            <Input 
              id="lastName" 
              type="text" 
              placeholder="Chan" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button onClick={handleCompleteProfile} className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Continue'}
          </Button>
        </div>
      )}
    </div>
  );
}
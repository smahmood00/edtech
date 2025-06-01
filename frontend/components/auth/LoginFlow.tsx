"use client";

import Link from "next/link";
import { ArrowLeft, Mail, User, LogOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

//const API_BASE_URL = 'https://edtech-1-ll96.onrender.com/api/auth';
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth`; // Add this line to get the API base URL from the environment variabl
console.log("In LoginFlow, API BASE URL is", API_BASE_URL);
const OTP_RESEND_TIMEOUT = 35;

interface LoginFlowProps {
  onLoginSuccess?: () => void;
  redirectPath?: string;
  showBackButton?: boolean;
}

export function LoginFlow({ 
  onLoginSuccess, 
  redirectPath = '/parent-dashboard',
  showBackButton = true,
}: LoginFlowProps) {
  const { login } = useAuth();
  const [step, setStep] = useState('initialOptions');
  const [email, setEmail] = useState('');
  const [otpInputs, setOtpInputs] = useState<string[]>(Array(4).fill(''));
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
    if (currentOtp.length !== 4 || !/^\d{4}$/.test(currentOtp)) {
      setError('Please enter a valid 4-digit OTP.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-otp`, { email, otp: currentOtp });
      login(email, response.data.token);
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
      login(email, response.data.token);
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
    localStorage.removeItem('userEmail');
    setToken(null);
    setEmail('');
    setOtpInputs(Array(4).fill(''));
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

    if (value && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !otpInputs[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col justify-center space-y-6 rounded-lg bg-[#1a1a1a] bg-opacity-80 p-6 shadow-[0_0_15px_rgba(0,255,255,0.1)] backdrop-blur-lg border border-[#333333] sm:p-8">
      {showBackButton && (
        <Link href="/" className="flex items-center text-sm font-medium text-[#00ffff] hover:text-[#00cccc] transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Base
        </Link>
      )}

      <div className="flex flex-col space-y-2 text-center">
        <User className="mx-auto h-10 w-10 text-[#00ffff]" />
        <h1 className="text-2xl font-semibold tracking-wider text-white">
          {step === 'profileCompletion' ? 'Identity Verification' : 
           step === 'otpVerification' ? 'Neural Link Verification' :
           step === 'emailEntry' ? 'Access Protocol' :
           'Secure Gateway'}
        </h1>
        {step === 'initialOptions' && (
          <p className="text-sm text-[#8a8a8a]">Initialize neural link to monitor subject progress</p>
        )}
      </div>

      {error && <p className="text-sm text-[#ff0066] mb-4 text-center">{error}</p>}

      {step === 'initialOptions' && (
        <div className="space-y-4">
          <Button 
            onClick={() => setStep('emailEntry')} 
            className="w-full bg-[#1a1a1a] border border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]"
          >
            <Mail className="mr-2 h-4 w-4" /> Initialize Connection
          </Button>
        </div>
      )}

      {step === 'emailEntry' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-input" className="text-[#8a8a8a]">Neural Link ID</Label>
            <Input 
              id="email-input" 
              type="email" 
              placeholder="operator@network.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-[#2a2a2a] border-[#333333] text-white placeholder-[#4a4a4a] focus:border-[#00ffff] focus:ring-[#00ffff] focus:ring-opacity-50"
            />
          </div>
          <Button 
            onClick={() => handleInitiateOtp(email)} 
            className="w-full bg-[#1a1a1a] border border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]" 
            disabled={isLoading}
          >
            {isLoading ? 'Establishing Link...' : 'Establish Neural Link'}
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => { setError(''); setStep('initialOptions');}} 
            className="w-full text-[#00ffff] hover:text-[#00cccc] hover:bg-transparent"
          >
            Abort
          </Button>
        </div>
      )}

      {step === 'otpVerification' && (
        <div className="space-y-4">
          <p className="text-sm text-[#8a8a8a] text-center">
            Enter the neural key sent to <span className="font-medium text-[#00ffff]">{email}</span>
          </p>
          <div className="space-y-2">
            <Label htmlFor="otp-input-0" className="text-[#8a8a8a]">Neural Key</Label>
            <div className="flex justify-between space-x-2">
              {otpInputs.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-input-${index}`}
                  ref={(el) => {
                    otpInputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg bg-[#2a2a2a] border-[#333333] text-[#00ffff] focus:border-[#00ffff] focus:ring-[#00ffff] focus:ring-opacity-50"
                  disabled={isLoading}
                />
              ))}
            </div>
          </div>
          <Button 
            onClick={handleVerifyOtp} 
            className="w-full bg-[#1a1a1a] border border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]" 
            disabled={isLoading || otpInputs.join('').length !== 4}
          >
            {isLoading ? 'Verifying...' : 'Authenticate'}
          </Button>
          <div className="flex justify-between items-center text-xs">
            <Button 
              variant="link" 
              onClick={() => { setError(''); setOtpInputs(Array(4).fill('')); setStep('emailEntry');}} 
              className="p-0 h-auto text-[#00ffff] hover:text-[#00cccc]"
            >
              Abort
            </Button>
            <Button 
              variant="link" 
              onClick={handleResendOtp} 
              disabled={isResendActive || isLoading}
              className="p-0 h-auto text-[#00ffff] hover:text-[#00cccc] disabled:opacity-50 flex items-center"
            >
              <RotateCcw className={`mr-1 h-3 w-3 ${isResendActive ? 'animate-spin' : ''}`} />
              Resync {isResendActive ? `(${countdown}s)` : ''}
            </Button>
          </div>
        </div>
      )}

      {step === 'profileCompletion' && (
        <div className="space-y-4">
          <p className="text-sm text-[#8a8a8a] text-center">
            Initialize operator profile configuration
          </p>
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-[#8a8a8a]">Operator First Designation *</Label>
            <Input 
              id="firstName" 
              type="text" 
              placeholder="Neo" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
              className="bg-[#2a2a2a] border-[#333333] text-white placeholder-[#4a4a4a] focus:border-[#00ffff] focus:ring-[#00ffff] focus:ring-opacity-50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-[#8a8a8a]">Operator Last Designation *</Label>
            <Input 
              id="lastName" 
              type="text" 
              placeholder="Anderson" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
              className="bg-[#2a2a2a] border-[#333333] text-white placeholder-[#4a4a4a] focus:border-[#00ffff] focus:ring-[#00ffff] focus:ring-opacity-50"
            />
          </div>
          <Button 
            onClick={handleCompleteProfile} 
            className="w-full bg-[#1a1a1a] border border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]" 
            disabled={isLoading}
          >
            {isLoading ? 'Initializing...' : 'Initialize Profile'}
          </Button>
        </div>
      )}
    </div>
  );
}
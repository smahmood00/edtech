"use client"; // This is a client component

import Link from "next/link";
import { ArrowLeft, Mail, KeyRound, User, LogOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect, useCallback, useRef } from 'react'; // Added useRef
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

const API_BASE_URL = 'http://localhost:5000/api/auth';
const OTP_RESEND_TIMEOUT = 35; // seconds

export default function ParentLoginPage() {
  const [step, setStep] = useState('initialOptions'); // 'initialOptions', 'emailEntry', 'otpVerification', 'profileCompletion', 'loggedIn'
  const [email, setEmail] = useState('');
  // const [otp, setOtp] = useState(''); // Replaced by otpInputs
  const [otpInputs, setOtpInputs] = useState<string[]>(Array(6).fill('')); // For 6 input boxes
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(OTP_RESEND_TIMEOUT);
  const [isResendActive, setIsResendActive] = useState(false);
  const router = useRouter(); 
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]); // Refs for OTP input boxes

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      // setStep('loggedIn'); // Keep this to show loggedIn UI briefly or remove if direct redirect is preferred
      router.push('/parent-dashboard'); // Redirect if token exists
    }
  }, [router]); // Added router to dependency array

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
    const currentOtp = otpInputs.join(''); // Combine OTP inputs
    if (currentOtp.length !== 6 || !/^\d{6}$/.test(currentOtp)) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-otp`, { email, otp: currentOtp }); // Use combined OTP
      localStorage.setItem('authToken', response.data.token);
      setToken(response.data.token);
      if (response.data.isExistingUser) {
        // setStep('loggedIn'); // Can be removed if redirecting immediately
        router.push('/parent-dashboard'); // Redirect existing user to dashboard
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
      setToken(response.data.token);
      // setStep('loggedIn'); // Can be removed if redirecting immediately
      router.push('/parent-dashboard'); // Redirect new user to dashboard after profile completion
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
    setToken(null);
    setEmail('');
    // setOtp(''); // Replaced by otpInputs
    setOtpInputs(Array(6).fill(''));
    setFirstName('');
    setLastName('');
    setStep('initialOptions');
    setError('');
    router.push('/'); // Redirect to home on logout
  };

  // Moved inside the ParentLoginPage component
  const handleOtpInputChange = (index: number, value: string) => {
    const newOtpInputs = [...otpInputs];
    // Allow only one digit per box
    newOtpInputs[index] = value.replace(/\D/g, '').slice(0, 1);
    setOtpInputs(newOtpInputs);

    // If a digit is entered and it's not the last box, focus next
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Moved inside the ParentLoginPage component
  const handleOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !otpInputs[index] && index > 0) {
      // If backspace is pressed on an empty current box (and not the first box), focus previous
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const renderContent = () => {
    if (status === "loading") {
      return <p className="text-center">Loading session...</p>;
    }

    // The 'loggedIn' step might not be reached if redirection happens immediately.
    // if (step === 'loggedIn' && token) { ... } // This logic might change with NextAuth
    // If you want to show a "Welcome" message before redirecting,
    // you can add a small delay or keep the setStep('loggedIn') calls.
    // For this implementation, we assume immediate redirection.
    // If router.push is called, this component might unmount before 'loggedIn' step UI is rendered.
    // If you still want a loggedIn view on this page (e.g. if dashboard redirect fails or for testing)
    // you can keep the 'loggedIn' step logic.
    if (step === 'loggedIn' && token) { // Check token as well, as step might be 'loggedIn' briefly before redirect
      // This part will likely only show if the dashboard redirect is commented out or fails
      return (
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold">Welcome!</h2>
          <p className="text-muted-foreground">Redirecting to dashboard...</p>
          {/* Or show logout if user somehow lands here with a token but without immediate redirect */}
           <Button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      );
    }

    return (
      <>
        {error && <p className="text-sm text-red-600 mb-4 text-center">{error}</p>}

        {step === 'initialOptions' && (
          <div className="space-y-4">
            <Button onClick={() => setStep('emailEntry')} className="w-full bg-purple-600 hover:bg-purple-700">
              <Mail className="mr-2 h-4 w-4" /> Email Sign Up / Log In
            </Button>
            {/* Updated Google Sign In Button */}
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => signIn('google', { callbackUrl: '/parent-dashboard' })}
              disabled={status === 'loading'}
            >
              <span className="mr-2">🇬</span> {/* Replace with a proper Google icon component if you have one */}
              {status === 'loading' ? 'Loading...' : 'Sign in with Google'}
            </Button>
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
              <Label htmlFor="otp-input-0">OTP</Label> {/* Changed htmlFor for accessibility */}
              <div className="flex justify-between space-x-2">
                {otpInputs.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-input-${index}`}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="text" // Changed to text to handle single char and allow easier control
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-10 h-10 text-center text-lg border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 sm:w-12 sm:h-12" // Basic styling for individual boxes
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
      </>
    );
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center bg-gray-50 p-4">
      <Link href="/" className="absolute left-4 top-4 flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 md:left-8 md:top-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6 rounded-lg bg-white p-6 shadow-lg sm:p-8">
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
        
        {renderContent()}

        {/* <p className="mt-6 px-8 text-center text-xs text-muted-foreground">
          By proceeding, you agree to our{' '}
          <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
            Terms & Conditions
          </Link>{' '}
          and confirm you have read our{' '}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p> */}
      </div>
    </div>
  );
}


  // REMOVE these functions from here as they are now inside the component
  // const handleOtpInputChange = (index: number, value: string) => { ... };
  // const handleOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => { ... };

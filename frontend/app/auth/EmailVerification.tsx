"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState, useEffect } from "react"

export function EmailVerification() {
  const [timer, setTimer] = useState(35)
  const [otp, setOtp] = useState(["", "", "", ""])

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-center">
            Continue with Email
          </h2>
          
          <div className="flex justify-center gap-4">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                className="w-16 h-16 text-2xl text-center"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
              />
            ))}
          </div>

          <Button className="w-full mt-4">Next</Button>

          <div className="text-center mt-4">
            <button
              className="text-sm text-muted-foreground hover:underline"
              disabled={timer > 0}
              onClick={() => setTimer(35)}
            >
              Resend OTP {timer > 0 ? `(${timer}s)` : ""}
            </button>
          </div>

          <div className="text-center mt-4">
            <Link
              href="/auth"
              className="text-sm text-primary hover:underline"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
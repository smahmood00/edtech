import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { NextAuthProvider } from "@/components/AuthProvider"
import { AuthProvider } from "@/contexts/AuthContext"
import { Header } from "@/components/header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}

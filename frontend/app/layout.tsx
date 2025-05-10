import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { NextAuthProvider } from "@/components/AuthProvider"; // Adjust path if needed
import { Header } from "@/components/header"; // Assuming your header is here

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Header /> {/* Your header component */}
          <main>{children}</main>
          {/* Footer or other global components */}
        </NextAuthProvider>
      </body>
    </html>
  )
}

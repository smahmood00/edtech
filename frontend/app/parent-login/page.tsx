"use client";

import { LoginFlow } from "@/components/auth/LoginFlow";

export default function ParentLoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center bg-gray-50 p-4">
      <LoginFlow />
    </div>
  );
}
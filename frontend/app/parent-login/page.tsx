"use client";

import { LoginFlow } from "@/components/auth/LoginFlow";

export default function ParentLoginPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('/cyberpunk-grid.svg')] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      
      {/* Neon accents */}
      <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-[#00ffff] opacity-20 blur-[100px]" />
      <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-[#ff00ff] opacity-20 blur-[100px]" />
      
      {/* Content container */}
      <div className="container relative flex min-h-screen w-screen flex-col items-center justify-center p-4">
        <div className="mb-8 text-center">
          <h1 className="font-cyber mb-2 text-4xl font-bold tracking-wider text-white">
            EV<span className="text-[#00ffff]">EAGLE</span>
          </h1>
          <p className="text-sm text-[#8a8a8a]">ACCESS PORTAL</p>
        </div>
        <LoginFlow />
      </div>
    </div>
  );
}
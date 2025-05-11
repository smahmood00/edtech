"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X, LogOut as LogOutIcon } from "lucide-react" // Renamed LogOut to LogOutIcon to avoid conflict
import { useRouter, usePathname } from "next/navigation" // Ensure usePathname is imported
import { useSession, signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile" // Ensure this path resolves correctly

export function Header() {
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const router = useRouter()
  const pathname = usePathname(); // Make sure this line is active

  const { data: session, status: nextAuthStatus } = useSession();
  const [hasLocalAuthToken, setHasLocalAuthToken] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
      setIsScrolled(currentScrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    // This effect runs on the client-side to check localStorage for "authToken"
    const checkLocalAuthToken = () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
      setHasLocalAuthToken(!!token);
    };

    checkLocalAuthToken(); // Initial check

    // Listen for storage events to react to changes in localStorage (e.g., login/logout in another tab)
    // This is good for cross-tab sync.
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "authToken") {
        checkLocalAuthToken();
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorageChange);
      }
    };
  }, [pathname]); // Add pathname as a dependency

  const isNextAuthLoggedIn = nextAuthStatus === "authenticated";
  // User is considered logged in if either NextAuth session exists OR a local auth token is present
  const isLoggedIn = isNextAuthLoggedIn || hasLocalAuthToken;

  const handleLogout = async () => {
    // If logged in via NextAuth, sign out
    if (isNextAuthLoggedIn) {
      await signOut({ redirect: false }); // Perform NextAuth sign out without immediate redirection
    }

    // If logged in via local token, remove it
    if (hasLocalAuthToken) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
      }
      setHasLocalAuthToken(false); // Update state to reflect logout
    }

    if (isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    router.push('/'); // Redirect to homepage after all logout operations
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-pink bg-white transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "shadow-md" : ""}`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#4A6FA5] to-[#FF8A5B] bg-clip-text text-transparent">
              TechKids
            </span>
          </Link>
        </div>

        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" aria-label="Toggle Menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6 text-[#4A6FA5]" /> : <Menu className="h-6 w-6 text-[#4A6FA5]" />}
            </Button>

            {isMenuOpen && (
              <div className="absolute inset-x-0 top-16 z-50 bg-white border-b border-[#4A6FA5]/20">
                <nav className="container flex flex-col py-4 space-y-2">
                  <div className="relative">
                    <button
                      className="flex items-center justify-between w-full px-4 py-2 hover:bg-[#F5F7FA] rounded-md text-[#4A6FA5] transition-colors duration-200"
                      onClick={(e) => {
                        e.preventDefault()
                        const submenu = document.getElementById("mobile-courses-submenu")
                        if (submenu) {
                          submenu.classList.toggle("hidden")
                        }
                      }}
                    >
                      Courses
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </button>
                    <div id="mobile-courses-submenu" className="hidden pl-4 mt-1 space-y-1">
                      <Link href="/courses/coding-basics" className="block px-4 py-2 hover:bg-[#F5F7FA] rounded-md text-[#172A3A]" onClick={() => setIsMenuOpen(false)}>Coding Basics</Link>
                      <Link href="/courses/ai-for-kids" className="block px-4 py-2 hover:bg-[#F5F7FA] rounded-md text-[#172A3A]" onClick={() => setIsMenuOpen(false)}>AI for Kids</Link>
                      <Link href="/courses/game-development" className="block px-4 py-2 hover:bg-[#F5F7FA] rounded-md text-[#172A3A]" onClick={() => setIsMenuOpen(false)}>Game Development</Link>
                      <Link href="/courses/robotics" className="block px-4 py-2 hover:bg-[#F5F7FA] rounded-md text-[#172A3A]" onClick={() => setIsMenuOpen(false)}>Robotics</Link>
                      <Link href="/courses/web-design" className="block px-4 py-2 hover:bg-[#F5F7FA] rounded-md text-[#172A3A]" onClick={() => setIsMenuOpen(false)}>Web Design</Link>
                    </div>
                  </div>
                  <Link href="/about" className="px-4 py-2 hover:bg-[#F5F7FA] rounded-md text-[#4A6FA5] transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                  <Link href="/blog" className="px-4 py-2 hover:bg-[#F5F7FA] rounded-md text-[#4A6FA5] transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                  
                  <div className="pt-2 border-t border-[#4A6FA5]/20">
                    {isLoggedIn ? (
                      <Button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white">
                        <LogOutIcon className="mr-2 h-4 w-4" /> Logout
                      </Button>
                    ) : (
                      <Button asChild className="w-full bg-[#4A6FA5] hover:bg-[#FF8A5B] text-white">
                        <Link href="/parent-login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                      </Button>
                    )}
                  </div>
                </nav>
              </div>
            )}
          </>
        ) : (
          <>
            <nav className="flex items-center gap-6 text-sm">
              <div className="relative group">
                <button className="flex items-center font-medium text-[#4A6FA5] transition-colors hover:text-[#FF8A5B] relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#FF8A5B] after:transition-all group-hover:after:w-full">
                  Courses
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                <div className="absolute left-0 top-full mt-2 w-48 rounded-md bg-white border border-[#4A6FA5]/20 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    <Link href="/courses/coding-basics" className="block px-4 py-2 text-[#172A3A] hover:bg-[#F5F7FA] hover:text-[#4A6FA5]">Coding Basics</Link>
                    <Link href="/courses/ai-for-kids" className="block px-4 py-2 text-[#172A3A] hover:bg-[#F5F7FA] hover:text-[#4A6FA5]">AI for Kids</Link>
                    <Link href="/courses/game-development" className="block px-4 py-2 text-[#172A3A] hover:bg-[#F5F7FA] hover:text-[#4A6FA5]">Game Development</Link>
                    <Link href="/courses/robotics" className="block px-4 py-2 text-[#172A3A] hover:bg-[#F5F7FA] hover:text-[#4A6FA5]">Robotics</Link>
                    <Link href="/courses/web-design" className="block px-4 py-2 text-[#172A3A] hover:bg-[#F5F7FA] hover:text-[#4A6FA5]">Web Design</Link>
                  </div>
                </div>
              </div>
              <Link href="/summer-courses" className="font-medium text-[#FF0000] transition-colors hover:text-[#FF8A5B] relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#FF8A5B] after:transition-all hover:after:w-full">Summer Courses!</Link>
              <Link href="/about" className="font-medium text-[#4A6FA5] transition-colors hover:text-[#FF8A5B] relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#FF8A5B] after:transition-all hover:after:w-full">About Us</Link>
              <Link href="/blog" className="font-medium text-[#4A6FA5] transition-colors hover:text-[#FF8A5B] relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#FF8A5B] after:transition-all hover:after:w-full">Blog</Link>
              
            </nav>
            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <Button onClick={handleLogout} variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-100">
                  <LogOutIcon className="mr-2 h-4 w-4" /> Logout
                </Button>
              ) : (
                <Button variant="ghost" asChild className="text-[#4A6FA5] hover:text-[#FF8A5B] hover:bg-[#F5F7FA]">
                  <Link href="/parent-login">Login</Link>
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  )
}

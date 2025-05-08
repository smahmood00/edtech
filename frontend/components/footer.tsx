import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-[#4A6FA5]/20 bg-[#172A3A]">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">TechKids</h3>
            <p className="text-sm text-[#F5F7FA]">
              Empowering the next generation with technology skills for the future.
            </p>
            <div className="mt-4 flex space-x-3">
              <Link href="#" className="text-[#FF8A5B] hover:text-[#4A6FA5]">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-[#FF8A5B] hover:text-[#4A6FA5]">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-[#FF8A5B] hover:text-[#4A6FA5]">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-[#FF8A5B] hover:text-[#4A6FA5]">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Courses</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-[#F5F7FA] hover:text-[#FF8A5B]">
                  Coding Basics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#F5F7FA] hover:text-[#FF8A5B]">
                  AI for Kids
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#F5F7FA] hover:text-[#FF8A5B]">
                  Game Development
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#F5F7FA] hover:text-[#FF8A5B]">
                  Robotics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#F5F7FA] hover:text-[#FF8A5B]">
                  Web Design
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-[#F5F7FA] hover:text-[#FF8A5B]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#F5F7FA] hover:text-[#FF8A5B]">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#F5F7FA] hover:text-[#FF8A5B]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#F5F7FA] hover:text-[#FF8A5B]">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#F5F7FA] hover:text-[#FF8A5B]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-[#F5F7FA] hover:text-[#FF8A5B]">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#F5F7FA] hover:text-[#FF8A5B]">
                  Parent Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#F5F7FA] hover:text-[#FF8A5B]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#F5F7FA] hover:text-[#FF8A5B]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#F5F7FA] hover:text-[#FF8A5B]">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-[#4A6FA5]/20 pt-6 text-center text-sm text-[#F5F7FA]">
          <p>© {new Date().getFullYear()} TechKids. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, PhoneCall, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const Footer = () => {
  return (
    <footer className="bg-[#0A1128] border-t border-[#1F2937] relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-20 w-80 h-80 rounded-full bg-[#4A6FA5] opacity-5 blur-[100px]" />
        <div className="absolute bottom-0 left-40 w-60 h-60 rounded-full bg-[#FF8A5B] opacity-5 blur-[80px]" />
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <div className="relative h-8 w-8 mr-2">
            
              </div>
              <span className="text-2xl font-bold text-white">Eveagle</span>
              <span className="text-2xl font-medium ml-1 bg-clip-text text-transparent bg-gradient-to-r from-[#4A6FA5] to-[#FF8A5B]">Academy</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Empowering the next generation with technology skills for the future through engaging coding and AI education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-[#FF8A5B] transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#FF8A5B] transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#FF8A5B] transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#FF8A5B] transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-gray-800 pb-2">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/courses" className="text-gray-400 hover:text-[#FF8A5B] transition-colors">
                Our Courses
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-[#FF8A5B] transition-colors">
                About Us
              </Link>
              <Link href="/blog" className="text-gray-400 hover:text-[#FF8A5B] transition-colors">
                Blog
              </Link>
              <Link href="/faq" className="text-gray-400 hover:text-[#FF8A5B] transition-colors">
                FAQ
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-[#FF8A5B] transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Summer Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-gray-800 pb-2">Summer Courses 2025</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/courses/coding-basics" className="group">
                <span className="text-gray-400 hover:text-[#FF8A5B] transition-colors">Coding Basics</span>
                <span className="block text-sm text-gray-600 group-hover:text-[#4A6FA5] transition-colors">Ages 7-12</span>
              </Link>
              <Link href="/courses/ai-kids" className="group">
                <span className="text-gray-400 hover:text-[#FF8A5B] transition-colors">AI for Kids</span>
                <span className="block text-sm text-gray-600 group-hover:text-[#4A6FA5] transition-colors">Ages 10-17</span>
              </Link>
              <Link href="/courses/game-dev" className="group">
                <span className="text-gray-400 hover:text-[#FF8A5B] transition-colors">Game Development</span>
                <span className="block text-sm text-gray-600 group-hover:text-[#4A6FA5] transition-colors">Ages 12-17</span>
              </Link>
              <Link href="/courses/robotics" className="group">
                <span className="text-gray-400 hover:text-[#FF8A5B] transition-colors">Robotics</span>
                <span className="block text-sm text-gray-600 group-hover:text-[#4A6FA5] transition-colors">Ages 9-15</span>
              </Link>
              <Link href="/courses/web-design" className="group">
                <span className="text-gray-400 hover:text-[#FF8A5B] transition-colors">Web Design</span>
                <span className="block text-sm text-gray-600 group-hover:text-[#4A6FA5] transition-colors">Ages 13-17</span>
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-gray-800 pb-2">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 text-[#FF8A5B]" />
                <span className="text-gray-400">eveagleacademy@gmail.com</span>
              </div>
              <div className="flex items-start">
                <PhoneCall className="h-5 w-5 mr-3 mt-0.5 text-[#FF8A5B]" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
             
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-500 text-center">
          <p>&copy; {new Date().getFullYear()} . All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/privacy" className="hover:text-[#FF8A5B] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#FF8A5B] transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-[#FF8A5B] transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

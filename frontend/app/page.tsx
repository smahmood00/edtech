"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Code, Brain, Zap, Users, BarChart, Shield, CheckCircle, Star, Bot, Gamepad2, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import CourseCard from "@/components/CourseCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import styles from './styles.module.css'
import Testimonials from "@/components/Testimonials"
import Footer from "@/components/footer"

// Course type definition from CourseCard component
interface Course {
  _id: string;
  slug: string;
  courseId: string;
  price: number;
  courseName: string;
  coverImage?: string;
  ageGroup: string;
  title: string;
  totalClasses: number;
  totalHours: number;
  toolUsed: string;
  keyLearningOutcomes: string[];
}

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${API_BASE_URL}/api/courses`);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-end sm:items-center pb-20 sm:pb-0 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/hero-section-kid.jpg"
            alt="Kids learning technology"
            fill
            className="object-cover brightness-[0.85]"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#172A3A]/90 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="max-w-3xl">
            <div className="animate-fadeIn space-y-6 md:space-y-8">
              <Badge 
                className="w-fit bg-white/10 backdrop-blur-sm text-white border-none hover:bg-white/20 px-4 py-1 text-sm
                animate-slideInFromLeft"
                style={{ animationDelay: "0.2s" }}
              >
                Learning for the future
              </Badge>
              
              <div className="space-y-4">
                <h1 className="animate-slideInFromBottom" style={{ animationDelay: "0.4s" }}>
                  <span className="block text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    Where Young Minds
                  </span>
                  <span className="block text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#4A6FA5] to-[#FF8A5B] bg-clip-text text-transparent mt-2">
                    Meet Technology
                  </span>
                </h1>
                
                <p className="max-w-[600px] text-white/80 text-lg md:text-xl animate-slideInFromBottom" 
                  style={{ animationDelay: "0.6s" }}>
                  Empower your child with the skills of tomorrow. Interactive AI and coding courses designed
                  specifically for kids and teens.
                </p>
              </div>

              <div className="mt-12 sm:mt-0 space-y-8 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 animate-slideInFromBottom" 
                  style={{ animationDelay: "0.8s" }}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-[#FF8A5B] hover:bg-[#4A6FA5] text-white border-0 
                      transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md backdrop-blur-sm"
                  >
                    Explore Courses
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white  hover:bg-white hover:text-[#172A3A] 
                      transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                  >
                    Chat with us
                  </Button>
                </div>

            
              </div>
            </div>
          </div>
        </div>

        {/* Animated Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#172A3A]/50 to-transparent"></div>
      </section>

      <style jsx global>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideInFromLeft {
          animation: slideInFromLeft 1s ease-out forwards;
        }

        .animate-slideInFromBottom {
          animation: slideInFromBottom 1s ease-out forwards;
        }
      `}</style>

      {/* Features Section 
      <section className="py-20 bg-[#172A3A]">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center animate-fadeIn" style={{ animationDuration: "1s", animationDelay: "0.2s" }}>
            <Badge className="mb-4 bg-[#4A6FA5] text-white hover:bg-[#FF8A5B] px-4 py-1">Our Approach</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Learning Made Fun and Effective
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-[#4A6FA5] md:text-xl">
              Our platform combines engaging content with cutting-edge technology to make learning an adventure.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            <div
              className="group relative overflow-hidden rounded-2xl border border-[#4A6FA5]/20 bg-white p-8 shadow-sm transition-all hover:shadow-md animate-fadeIn hover:translate-y-[-8px]"
              style={{ animationDuration: "1s", animationDelay: "0.3s", transitionDuration: "0.5s" }}
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#4A6FA5]/10 transition-all group-hover:bg-[#FF8A5B]/10"></div>
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#4A6FA5] text-white transition-all group-hover:bg-[#FF8A5B]">
                  <Code className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#172A3A]">Coding Adventures</h3>
                <p className="mb-4 text-[#4A6FA5]">
                  Interactive coding lessons that teach real programming skills through games and challenges.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-[#4A6FA5]" />
                    <span className="text-[#172A3A]">Project-based learning</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-[#4A6FA5]" />
                    <span className="text-[#172A3A]">Real-world applications</span>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="group relative overflow-hidden rounded-2xl border border-[#4A6FA5]/20 bg-white p-8 shadow-sm transition-all hover:shadow-md animate-fadeIn hover:translate-y-[-8px]"
              style={{ animationDuration: "1s", animationDelay: "0.5s", transitionDuration: "0.5s" }}
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#4A6FA5]/10 transition-all group-hover:bg-[#FF8A5B]/10"></div>
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#4A6FA5] text-white transition-all group-hover:bg-[#FF8A5B]">
                  <Bot className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#172A3A]">AI Exploration</h3>
                <p className="mb-4 text-[#4A6FA5]">
                  Kid-friendly introduction to artificial intelligence concepts and applications.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-[#4A6FA5]" />
                    <span className="text-[#172A3A]">Hands-on AI experiments</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-[#4A6FA5]" />
                    <span className="text-[#172A3A]">Ethical AI discussions</span>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="group relative overflow-hidden rounded-2xl border border-[#4A6FA5]/20 bg-white p-8 shadow-sm transition-all hover:shadow-md animate-fadeIn hover:translate-y-[-8px]"
              style={{ animationDuration: "1s", animationDelay: "0.7s", transitionDuration: "0.5s" }}
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#4A6FA5]/10 transition-all group-hover:bg-[#FF8A5B]/10"></div>
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#4A6FA5] text-white transition-all group-hover:bg-[#FF8A5B]">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#172A3A]">Tech Projects</h3>
                <p className="mb-4 text-[#4A6FA5]">
                  Hands-on projects that bring technology concepts to life and build portfolio-worthy creations.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-[#4A6FA5]" />
                    <span className="text-[#172A3A]">Portfolio development</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-[#4A6FA5]" />
                    <span className="text-[#172A3A]">Collaborative challenges</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Summer Courses Section */}
      <section className="py-20 bg-[#172A3A] overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-[#FF8A5B] text-white hover:bg-[#4A6FA5] px-4 py-1">
              Summer 2025
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Epic Summer Tech Adventures
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-[#4A6FA5] md:text-xl">
              Join our action-packed summer courses and transform into a tech superhero! 🚀
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF8A5B]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-white bg-red-500/10 rounded-lg p-4">
              {error}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7 }}
            >
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-3 sm:-ml-4">
                  {courses.map((course, index) => (
                    <CarouselItem key={course._id} className="pl-3 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                      <motion.div
                        custom={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="h-full"
                      >
                        <CourseCard course={course} />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-10 gap-3">
                  <CarouselPrevious className="static transform text-white bg-[#172A3A] hover:bg-[#FF8A5B] hover:text-white border-2 border-[#FF8A5B]/50 hover:border-[#FF8A5B] transition-all duration-300 rounded-lg w-10 h-10 sm:w-12 sm:h-12 disabled:opacity-50 disabled:hover:bg-[#172A3A] disabled:hover:text-white" />
                  <CarouselNext className="static transform text-white bg-[#172A3A] hover:bg-[#FF8A5B] hover:text-white border-2 border-[#FF8A5B]/50 hover:border-[#FF8A5B] transition-all duration-300 rounded-lg w-10 h-10 sm:w-12 sm:h-12 disabled:opacity-50 disabled:hover:bg-[#172A3A] disabled:hover:text-white" />
                </div>
              </Carousel>
            </motion.div>
          )}

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20}}
            whileInView={{ opacity: 1, y: 0}}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button 
              size="lg" 
              asChild
              className="bg-gradient-to-r from-[#FF8A5B] to-[#4A6FA5] hover:from-[#4A6FA5] hover:to-[#FF8A5B] text-white border-none shadow-[0_0_15px_rgba(255,138,91,0.5)] hover:shadow-[0_0_25px_rgba(255,138,91,0.7)] transition-all duration-300 text-base h-14 px-10 rounded-xl font-semibold tracking-wide"
            >
              <Link href="/courses">View All Courses</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Replace the old testimonials section with the new component */}
      <Testimonials />

      {/* Replace Parent Dashboard Preview with new CTA section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#172A3A] via-[#1B263B] to-[#172A3A] relative overflow-hidden">
        {/* Background decorative elements (subtle) */}
        <div className="absolute inset-0 z-0 opacity-30">
          <motion.div 
            className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#4A6FA5] blur-[100px] opacity-40"
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse"}}
          />
          <motion.div 
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#FF8A5B] blur-[120px] opacity-30"
            animate={{ 
              scale: [1, 1.05, 1],
              y: [0, -20, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", delay: 2}}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center bg-[#172A3A]/60 backdrop-blur-lg p-8 sm:p-12 md:p-16 rounded-xl shadow-2xl border border-[#4A6FA5]/30"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div 
              className="mb-6 flex justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="p-3 rounded-full bg-gradient-to-br from-[#4A6FA5] to-[#FF8A5B] shadow-lg">
                <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Shape Your Child's <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4A6FA5] via-[#FF8A5B] to-[#4A6FA5]">Digital Future</span> Today
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-10 text-gray-300 max-w-xl mx-auto">
              Give your child the gift of technological literacy and creative problem-solving skills. Our engaging courses are designed to spark curiosity and build a strong foundation for tomorrow's world.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(255, 138, 91, 0.6)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#FF8A5B] to-[#4A6FA5] hover:from-[#4A6FA5] hover:to-[#FF8A5B] text-white border-none shadow-[0_0_15px_rgba(255,138,91,0.4)] transition-all duration-300 text-base md:text-lg h-14 px-8 sm:px-10 rounded-xl font-semibold tracking-wide"
                  asChild
                >
                  <Link href="/register">Enroll Now</Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(74, 111, 165, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-[#4A6FA5] text-[#4A6FA5] hover:bg-[#4A6FA5]/10 hover:text-white hover:border-white transition-all duration-300 text-base md:text-lg h-14 px-8 sm:px-10 rounded-xl font-semibold tracking-wide"
                  asChild
                >
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </motion.div>
            </div>
            <p className="mt-10 text-sm text-gray-400">
              Classes are filling up fast! Reserve your spot today and unlock a world of possibilities.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </div>
  )
}

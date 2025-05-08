import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Code, Brain, Zap, Users, BarChart, Shield, CheckCircle, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section with white background as requested */}
      <section className="relative overflow-hidden bg-white py-20 md:py-32 pt-32">
        {/* Decorative elements with animation */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#4A6FA5]/10 blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#FF8A5B]/10 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/4 right-1/3 h-32 w-32 rounded-full bg-[#4A6FA5]/10 blur-xl animate-bounce"
          style={{ animationDuration: "6s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/4 h-24 w-24 rounded-full bg-[#FF8A5B]/10 blur-xl animate-bounce"
          style={{ animationDuration: "8s", animationDelay: "1s" }}
        ></div>

        <div className="container relative px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col justify-center space-y-8 animate-fadeIn" style={{ animationDuration: "1s" }}>
              <Badge className="w-fit bg-[#4A6FA5] text-white hover:bg-[#FF8A5B] px-4 py-1 text-sm">
                Learning for the future
              </Badge>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  <span
                    className="bg-gradient-to-r from-[#4A6FA5] to-[#FF8A5B] bg-clip-text text-transparent animate-gradient"
                    style={{ animationDuration: "3s" }}
                  >
                    TechKids
                  </span>
                  <span className="block mt-2 text-[#172A3A]">Where Young Minds Meet Technology</span>
                </h1>
                <p className="max-w-[600px] text-[#4A6FA5] md:text-xl">
                  Empower your child with the skills of tomorrow. Interactive AI and coding courses designed
                  specifically for kids and teens.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-[#4A6FA5] hover:bg-[#FF8A5B] text-white border-0 transition-transform hover:scale-105 duration-300"
                >
                  Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center">
                  <Shield className="mr-1 h-4 w-4 text-[#4A6FA5]" />
                  <span className="text-[#172A3A]">Kid-Safe Content</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4 text-[#4A6FA5]" />
                  <span className="text-[#172A3A]">Expert Instructors</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-1 h-4 w-4 text-[#4A6FA5]" />
                  <span className="text-[#172A3A]">Interactive Learning</span>
                </div>
              </div>
            </div>
            <div
              className="relative flex items-center justify-center animate-float"
              style={{ animationDuration: "6s" }}
            >
              <div className="absolute -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-[#4A6FA5]/20 to-[#FF8A5B]/20 blur-3xl"></div>
              <div className="relative h-[450px] w-[450px] drop-shadow-xl">
                <div
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-xl bg-[#4A6FA5] p-2 shadow-lg animate-float"
                  style={{ animationDuration: "4s", animationDelay: "0.5s" }}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
                    <Code className="h-10 w-10 text-[#4A6FA5]" />
                  </div>
                </div>
                <div
                  className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl bg-[#FF8A5B] p-2 shadow-lg animate-float"
                  style={{ animationDuration: "5s", animationDelay: "1s" }}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
                    <Brain className="h-10 w-10 text-[#FF8A5B]" />
                  </div>
                </div>
                <Image
                  src="/placeholder.svg?height=450&width=450"
                  alt="Kids learning technology"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with light background */}
      <section className="py-20 bg-[#F5F7FA]">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center animate-fadeIn" style={{ animationDuration: "1s", animationDelay: "0.2s" }}>
            <Badge className="mb-4 bg-[#4A6FA5] text-white hover:bg-[#FF8A5B] px-4 py-1">Our Approach</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#172A3A]">
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
                  <Brain className="h-7 w-7" />
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
      </section>

      {/* Age Groups Section with navy background */}
      <section className="py-20 bg-[#172A3A]">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center animate-fadeIn" style={{ animationDuration: "1s", animationDelay: "0.2s" }}>
            <Badge className="mb-4 bg-[#FF8A5B] text-white hover:bg-[#4A6FA5] px-4 py-1">For Every Age</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Courses for Every Age
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-[#F5F7FA] md:text-xl">
              Age-appropriate content designed for different learning stages.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div
              className="group relative overflow-hidden rounded-2xl animate-fadeIn hover:scale-[1.02] transition-transform duration-500"
              style={{ animationDuration: "1s", animationDelay: "0.3s" }}
            >
              <div className="absolute inset-0 bg-[#172A3A]/60"></div>
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Kids 7-9"
                width={500}
                height={400}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className="mb-2 inline-block rounded-full bg-[#FF8A5B]/20 px-3 py-1 text-xs backdrop-blur-sm">
                  Ages 7-9
                </div>
                <h3 className="text-2xl font-bold">Kids</h3>
                <p className="mb-4 max-w-[90%] text-[#F5F7FA]">
                  Playful introduction to coding basics through games and interactive stories
                </p>
                <Button className="bg-[#FF8A5B] text-white hover:bg-[#4A6FA5] transition-transform hover:scale-105 duration-300">
                  Explore Courses
                </Button>
              </div>
            </div>
            <div
              className="group relative overflow-hidden rounded-2xl animate-fadeIn hover:scale-[1.02] transition-transform duration-500"
              style={{ animationDuration: "1s", animationDelay: "0.5s" }}
            >
              <div className="absolute inset-0 bg-[#172A3A]/60"></div>
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Tweens 10-12"
                width={500}
                height={400}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className="mb-2 inline-block rounded-full bg-[#FF8A5B]/20 px-3 py-1 text-xs backdrop-blur-sm">
                  Ages 10-12
                </div>
                <h3 className="text-2xl font-bold">Tweens</h3>
                <p className="mb-4 max-w-[90%] text-[#F5F7FA]">
                  Project-based learning and game development with real programming languages
                </p>
                <Button className="bg-[#FF8A5B] text-white hover:bg-[#4A6FA5] transition-transform hover:scale-105 duration-300">
                  Explore Courses
                </Button>
              </div>
            </div>
            <div
              className="group relative overflow-hidden rounded-2xl animate-fadeIn hover:scale-[1.02] transition-transform duration-500"
              style={{ animationDuration: "1s", animationDelay: "0.7s" }}
            >
              <div className="absolute inset-0 bg-[#172A3A]/60"></div>
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Teens 13-17"
                width={500}
                height={400}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className="mb-2 inline-block rounded-full bg-[#FF8A5B]/20 px-3 py-1 text-xs backdrop-blur-sm">
                  Ages 13-17
                </div>
                <h3 className="text-2xl font-bold">Teens</h3>
                <p className="mb-4 max-w-[90%] text-[#F5F7FA]">
                  Advanced coding, AI, and real-world applications with industry-standard tools
                </p>
                <Button className="bg-[#FF8A5B] text-white hover:bg-[#4A6FA5] transition-transform hover:scale-105 duration-300">
                  Explore Courses
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with light background */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center animate-fadeIn" style={{ animationDuration: "1s", animationDelay: "0.2s" }}>
            <Badge className="mb-4 bg-[#4A6FA5] text-white hover:bg-[#FF8A5B] px-4 py-1">Success Stories</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#172A3A]">
              What Parents & Kids Say
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-[#4A6FA5] md:text-xl">
              Hear from families who have experienced the TechKids difference.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div
              className="rounded-2xl bg-white border border-[#4A6FA5]/20 p-8 shadow-sm animate-fadeIn hover:shadow-md transition-all hover:translate-y-[-8px]"
              style={{ animationDuration: "1s", animationDelay: "0.3s", transitionDuration: "0.5s" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-[#4A6FA5]">
                  <Image src="/placeholder.svg?height=50&width=50" alt="Parent" width={50} height={50} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#172A3A]">Sarah Johnson</h4>
                  <p className="text-sm text-[#4A6FA5]">Parent of Alex, 12</p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-[#FF8A5B]" />
                ))}
              </div>
              <p className="text-[#4A6FA5]">
                "TechKids has transformed my son's screen time into productive learning. He's building games and talking
                about AI concepts I barely understand!"
              </p>
            </div>
            <div
              className="rounded-2xl bg-white border border-[#4A6FA5]/20 p-8 shadow-sm animate-fadeIn hover:shadow-md transition-all hover:translate-y-[-8px]"
              style={{ animationDuration: "1s", animationDelay: "0.5s", transitionDuration: "0.5s" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-[#4A6FA5]">
                  <Image src="/placeholder.svg?height=50&width=50" alt="Parent" width={50} height={50} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#172A3A]">Michael Rodriguez</h4>
                  <p className="text-sm text-[#4A6FA5]">Parent of Sophia, 9</p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-[#FF8A5B]" />
                ))}
              </div>
              <p className="text-[#4A6FA5]">
                "My daughter was hesitant about coding, but the game-based approach got her hooked. Now she's creating
                her own animations and showing them to everyone!"
              </p>
            </div>
            <div
              className="rounded-2xl bg-white border border-[#4A6FA5]/20 p-8 shadow-sm animate-fadeIn hover:shadow-md transition-all hover:translate-y-[-8px]"
              style={{ animationDuration: "1s", animationDelay: "0.7s", transitionDuration: "0.5s" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-[#4A6FA5]">
                  <Image src="/placeholder.svg?height=50&width=50" alt="Student" width={50} height={50} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#172A3A]">Ethan Williams</h4>
                  <p className="text-sm text-[#4A6FA5]">Student, 15</p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-[#FF8A5B]" />
                ))}
              </div>
              <p className="text-[#4A6FA5]">
                "The AI course helped me create a project that won first place at my school's science fair. The
                instructors are amazing and really know how to explain complex topics."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Dashboard Preview with navy background */}
      <section className="py-20 bg-[#172A3A]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div
              className="flex flex-col justify-center space-y-6 animate-fadeIn"
              style={{ animationDuration: "1s", animationDelay: "0.2s" }}
            >
              <Badge className="w-fit bg-[#FF8A5B] text-white hover:bg-[#4A6FA5] px-4 py-1">For Parents</Badge>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Parents Stay Connected
                </h2>
                <p className="max-w-[600px] text-[#F5F7FA] md:text-xl">
                  Monitor your child's progress, manage subscriptions, and get insights into their learning journey with
                  our comprehensive parent dashboard.
                </p>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF8A5B]">
                    <BarChart className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[#F5F7FA]">Track progress and achievements in real-time</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF8A5B]">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[#F5F7FA]">Control content access and screen time limits</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF8A5B]">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[#F5F7FA]">Direct communication with expert instructors</span>
                </li>
              </ul>
              <div>
                <Button
                  asChild
                  className="bg-[#FF8A5B] hover:bg-[#4A6FA5] text-white border-0 transition-transform hover:scale-105 duration-300"
                >
                  <Link href="/parent-login">Parent Login</Link>
                </Button>
              </div>
            </div>
            <div
              className="flex items-center justify-center animate-fadeIn"
              style={{ animationDuration: "1s", animationDelay: "0.4s" }}
            >
              <div className="relative">
                <div
                  className="absolute -left-6 -top-6 h-full w-full rounded-2xl bg-[#FF8A5B]/30 animate-pulse"
                  style={{ animationDuration: "4s" }}
                ></div>
                <div
                  className="absolute -right-6 -bottom-6 h-full w-full rounded-2xl bg-[#4A6FA5]/30 animate-pulse"
                  style={{ animationDuration: "4s", animationDelay: "2s" }}
                ></div>
                <div className="relative h-[450px] w-full overflow-hidden rounded-2xl border border-[#4A6FA5]/20 shadow-xl">
                  <Image
                    src="/placeholder.svg?height=450&width=600"
                    alt="Parent Dashboard Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with light background */}
      <section className="relative overflow-hidden py-20 bg-[#F5F7FA]">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#4A6FA5] animate-float"
            style={{ animationDuration: "8s" }}
          ></div>
          <div
            className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#FF8A5B] animate-float"
            style={{ animationDuration: "10s", animationDelay: "1s" }}
          ></div>
          <div
            className="absolute left-1/3 top-1/4 h-36 w-36 rounded-full bg-[#4A6FA5] animate-float"
            style={{ animationDuration: "7s", animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute right-1/4 bottom-1/3 h-24 w-24 rounded-full bg-[#FF8A5B] animate-float"
            style={{ animationDuration: "9s", animationDelay: "1.5s" }}
          ></div>
        </div>
        <div className="container relative px-4 md:px-6">
          <div
            className="mx-auto max-w-[800px] text-center animate-fadeIn"
            style={{ animationDuration: "1s", animationDelay: "0.2s" }}
          >
            <Badge className="mb-6 bg-[#4A6FA5] text-white hover:bg-[#FF8A5B] px-4 py-1">Limited Time Offer</Badge>
            <h2 className="text-3xl font-bold tracking-tighter text-[#172A3A] sm:text-4xl md:text-5xl">
              Ready to Start Their Tech Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-[600px] text-[#4A6FA5] md:text-xl">
              Join thousands of families preparing their children for the future with engaging tech education. Get 20%
              off your first month with code <span className="font-bold">TECHKIDS20</span>.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-[#4A6FA5] text-white hover:bg-[#FF8A5B] transition-transform hover:scale-105 duration-300 animate-bounce"
                style={{ animationDuration: "4s", animationIterationCount: "3" }}
              >
                Sign Up Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

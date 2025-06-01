"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Rocket, Star, Brain, Clock, Users, Award, Zap, Heart, ChevronDown, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const courseData = {
  courseId: "S03",
  price: 199,
  ageGroup: "12+ years",
  courseName: "Build Your Own AI Chatbot",
  toolUsed: "Python & Azure OpenAI",
  totalClasses: 5,
  totalHours: 7.5,
  title: "Create Your Own Intelligent Chatbot!",
  overviewDescription: "Dive into the exciting world of AI and create your very own intelligent chatbot! Learn how to harness the power of advanced AI technologies like ChatGPT and Azure OpenAI to build interactive, smart conversational agents. Perfect for young innovators who want to explore the cutting edge of artificial intelligence!",
  lessons: [
    {
      lessonNumber: 1,
      title: "Introduction to AI Chatbots",
      description: "Discover the fascinating world of AI chatbots and learn how they work!",
      hours: 1.5,
      outcomes: [
        "Explore ChatGPT and DeepSeek technologies",
        "Learn about Azure OpenAI API",
        "Set up your development environment",
        "Create your first chatbot conversation"
      ]
    },
    {
      lessonNumber: 2,
      title: "Building the Knowledge Base",
      description: "Learn how to collect and organize data to make your chatbot smarter!",
      hours: 1.5,
      outcomes: [
        "Gather relevant conversation data",
        "Create structured databases",
        "Organize dialogue efficiently",
        "Build knowledge foundations"
      ]
    },
    {
      lessonNumber: 3,
      title: "Advanced AI Techniques",
      description: "Master prompt engineering and enhance your chatbot's intelligence!",
      hours: 1.5,
      outcomes: [
        "Learn prompt engineering techniques",
        "Improve response accuracy",
        "Create API endpoints",
        "Enable cross-app communication"
      ]
    },
    {
      lessonNumber: 4,
      title: "Web App Development",
      description: "Design and build the perfect interface for your chatbot!",
      hours: 1.5,
      outcomes: [
        "Design user interfaces",
        "Build interactive web apps",
        "Connect APIs to frontend",
        "Create seamless chat experiences"
      ]
    },
    {
      lessonNumber: 5,
      title: "Final Project & Deployment",
      description: "Put it all together and launch your chatbot to the world!",
      hours: 1.5,
      outcomes: [
        "Deploy your chatbot",
        "Test and optimize performance",
        "Add advanced features",
        "Share your creation"
      ]
    }
  ],
  keyLearningOutcomes: [
    "Master the fundamentals of AI chatbot development",
    "Learn to work with advanced AI APIs and technologies",
    "Develop skills in data collection and organization",
    "Create professional web applications",
    "Build a complete, working AI chatbot from scratch"
  ]
};

export default function AIChatbotCoursePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden lg:h-[80vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/courses/ai-background.jpg"
              alt="AI Technology background"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="container relative h-full">
          <div className="flex h-full flex-col items-center justify-center text-center text-white">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="space-y-4"
            >
              <Badge className="bg-white/20 text-white">
                {courseData.ageGroup} • {courseData.totalClasses} Days • {courseData.totalHours} Hours
              </Badge>
              <h1 className="text-4xl font-bold md:text-6xl lg:text-7xl">
                {courseData.courseName}
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-white/90 md:text-xl">
                {courseData.title}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90">
                  Enroll Now - ${courseData.price}
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Download Syllabus
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ChevronDown className="h-8 w-8 animate-bounce text-white/80" />
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="container py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge className="mb-4">Course Overview</Badge>
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">About This Course</h2>
          <p className="text-lg text-muted-foreground">{courseData.overviewDescription}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-purple-100 p-3">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">{courseData.totalHours} Hours</h3>
                <p className="text-sm text-muted-foreground">Total Duration</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-green-100 p-3">
                <Rocket className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">{courseData.toolUsed}</h3>
                <p className="text-sm text-muted-foreground">Main Tools</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-yellow-100 p-3">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold">Certificate</h3>
                <p className="text-sm text-muted-foreground">Upon Completion</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Video Preview Section */}
      <section className="bg-gradient-to-r from-purple-900 to-blue-900 py-24">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl text-center text-white"
          >
            <Badge className="mb-4 bg-white/10">Course Preview</Badge>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Watch What You'll Create</h2>
            <p className="mb-12 text-lg text-white/80">
              See the amazing AI chatbot that you'll build in this course!
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex justify-center"
          >
            <div className="group relative overflow-hidden rounded-xl bg-black/50 backdrop-blur-sm">
              <video
                className="max-h-[80vh] w-auto"
                controls
                playsInline
                preload="metadata"
              >
                <source src="/videos/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="bg-white py-16">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge className="mb-4">Learning Outcomes</Badge>
            <h2 className="mb-12 text-3xl font-bold md:text-4xl">What You'll Learn</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {courseData.keyLearningOutcomes.map((outcome, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <h3 className="font-semibold">Outcome {index + 1}</h3>
                  </div>
                  <p className="text-muted-foreground">{outcome}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Daily Lessons */}
      <section className="container py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge className="mb-4">Course Schedule</Badge>
          <h2 className="mb-12 text-3xl font-bold md:text-4xl">Daily Lesson Plan</h2>
        </motion.div>

        <div className="space-y-6">
          {courseData.lessons.map((lesson) => (
            <motion.div
              key={lesson.lessonNumber}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <Badge className="mb-2">Day {lesson.lessonNumber}</Badge>
                      <h3 className="text-xl font-semibold">{lesson.title}</h3>
                      <p className="mt-2 text-muted-foreground">{lesson.description}</p>
                    </div>
                    <div className="flex items-center gap-2 lg:flex-shrink-0">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{lesson.hours} Hours</span>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {lesson.outcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="mt-1 rounded-full bg-purple-100 p-1">
                          <div className="h-2 w-2 rounded-full bg-purple-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                <div className="relative hidden lg:block">
                  <Image
                    src="/courses/cta-background.jpg"
                    alt="AI chatbot preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white md:p-12">
                  <h2 className="mb-4 text-3xl font-bold">Ready to Build Your AI Chatbot?</h2>
                  <p className="mb-6 text-lg text-white/90">
                    Join us on this exciting journey into the world of artificial intelligence and chatbot development.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      <span>Small class size for personalized attention</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      <span>Hands-on project-based learning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      <span>Build a complete AI chatbot application</span>
                    </div>
                  </div>
                  <Button size="lg" className="mt-8 bg-white text-purple-600 hover:bg-white/90">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}

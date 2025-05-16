'use client';

import { useEffect, useState, useRef } from 'react';
// import Image from 'next/image'; // No longer directly used here
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // No longer directly used here
// import { Badge } from "@/components/ui/badge"; // No longer directly used here
// import { Button } from "@/components/ui/button"; // No longer directly used here
// import Link from 'next/link'; // No longer directly used here
import CourseCard from '@/components/CourseCard'; // Import the new client component
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Course {
  _id: string;
  slug: string;
  courseId: string;
  courseName: string;
  price: number;
  coverImage?: string;
  ageGroup: string;
  title: string;
  totalClasses: number;
  totalHours: number;
  toolUsed: string;
  keyLearningOutcomes: string[];
}

//const API_BASE_URL = 'https://edtech-1-ll96.onrender.com';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("In summer courses, API BASE URL is", API_BASE_URL);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function SummerCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/courses`, {
          cache: 'no-store'
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch courses');
        }
        
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);
  
  const scrollTo = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#172A3A] to-[#4A6FA5]/10 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#172A3A] to-[#4A6FA5]/10 flex items-center justify-center">
        <div className="text-white bg-red-500/10 rounded-lg p-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#172A3A] to-[#4A6FA5]/10">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Summer Courses
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Explore our exciting range of summer courses designed to inspire and educate young minds
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-12 w-12 rounded-full bg-white/80 hover:bg-white border-[#4A6FA5]/20 hidden md:flex items-center justify-center"
            onClick={() => scrollTo('left')}
          >
            <ChevronLeft className="h-6 w-6 text-[#172A3A]" />
          </Button>
          
          <Button
            variant="outline"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-12 w-12 rounded-full bg-white/80 hover:bg-white border-[#4A6FA5]/20 hidden md:flex items-center justify-center"
            onClick={() => scrollTo('right')}
          >
            <ChevronRight className="h-6 w-6 text-[#172A3A]" />
          </Button>

          {/* Courses Container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto pb-8 -mx-2 hide-scrollbar"
          >
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-nowrap gap-4 px-2"
            >
              {courses.map((course) => (
                <motion.div key={course._id} variants={item} className="flex-none">
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

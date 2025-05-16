"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Clock, BookOpen, Wrench, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Course {
  _id: string;
  slug: string;
  courseId: string;
  price: number;
  courseName: string;
  coverImage?: string;
  ageGroup: string;
  totalClasses: number;
  totalHours: number;
  toolUsed: string;
  keyLearningOutcomes: string[];
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const [showAllLearnings, setShowAllLearnings] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const MAX_VISIBLE_LEARNINGS = 2;

  const tools = course.toolUsed.split(',').map(tool => tool.trim());

  return (
    <motion.div
      className="px-2 w-full sm:w-auto"
    >
      <Card 
        className="w-full sm:w-[320px] min-h-[480px] relative group overflow-hidden bg-white flex flex-col rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="p-0 flex-shrink-0">
          <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
          <Image
              src={imageError ? "/placeholder.svg" : (course.coverImage || "/placeholder.svg")}
            alt={course.courseName}
            fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
            className="object-cover"
              onError={() => setImageError(true)}
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-[#172A3A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <Badge 
              variant="outline" 
              className="absolute top-4 right-4 bg-white/90 text-[#172A3A] text-xs font-medium backdrop-blur-sm rounded-full px-3 py-1 border-[#4A6FA5]/20"
            >
              {course.ageGroup}
            </Badge>
        </div>
      </CardHeader>

        <CardContent className="p-6 flex-grow">
          <Link href={`/courses/${course.slug}`} className="group/title block">
            <motion.h3 
              className="text-xl font-semibold mb-3 text-[#172A3A] line-clamp-2 group-hover/title:text-[#4A6FA5]"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {course.courseName}
            </motion.h3>
          </Link>
          
          <div className="grid grid-cols-3 gap-3 my-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-2 bg-[#4A6FA5]/10 rounded-lg"
            >
              <Clock className="h-5 w-5 mb-1 text-[#4A6FA5]" />
              <span className="text-sm font-medium text-[#172A3A]">{course.totalHours}h</span>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-2 bg-[#4A6FA5]/10 rounded-lg"
            >
              <BookOpen className="h-5 w-5 mb-1 text-[#4A6FA5]" />
              <span className="text-sm font-medium text-[#172A3A]">{course.totalClasses}</span>
            </motion.div>

          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-[#172A3A] mb-2">Tools Used:</h4>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="bg-[#FF8A5B]/10 text-[#FF8A5B] border-[#FF8A5B]/20"
                >
                  {tool}
                </Badge>
              ))}
          </div>
        </div>

        {course.keyLearningOutcomes && course.keyLearningOutcomes.length > 0 && (
            <div>
              <motion.div 
                className="flex justify-between items-center cursor-pointer mb-2 group/button"
              onClick={() => setShowAllLearnings(!showAllLearnings)}
                whileTap={{ scale: 0.98 }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowAllLearnings(!showAllLearnings); }}
            >
                <h4 className="text-sm font-semibold text-[#172A3A]">
                  Key Learnings
                </h4>
              {course.keyLearningOutcomes.length > MAX_VISIBLE_LEARNINGS && (
                  showAllLearnings ? 
                    <ChevronUp className="h-4 w-4 text-[#4A6FA5]" /> : 
                    <ChevronDown className="h-4 w-4 text-[#4A6FA5]" />
              )}
              </motion.div>
              <motion.ul 
                className="space-y-2 mb-4"
                animate={{ height: showAllLearnings ? "auto" : "4.5rem" }}
                transition={{ duration: 0.3 }}
              >
                {(showAllLearnings ? course.keyLearningOutcomes : course.keyLearningOutcomes.slice(0, MAX_VISIBLE_LEARNINGS))
                  .map((outcome, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start text-sm text-[#4A6FA5]"
                  >
                    <span className="text-[#FF8A5B] mr-2 mt-0.5 shrink-0">•</span>
                  <span className="line-clamp-2">{outcome}</span>
                  </motion.li>
              ))}
              </motion.ul>
          </div>
        )}
      </CardContent>

        <CardFooter className="p-6 mt-auto">
          <Link href={`/courses/${course.slug}`} className="w-full block">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                className="w-full bg-[#4A6FA5] hover:bg-[#FF8A5B] text-white group/btn flex items-center justify-center gap-2 py-2.5 rounded-xl shadow-lg 
                  hover:shadow-[#FF8A5B]/25 transition-all duration-300"
              >
                <span className="font-medium">View Course</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </motion.div>
        </Link>
      </CardFooter>
    </Card>
    </motion.div>
  );
}
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Course {
  _id: string;
  slug: string; // Added
  courseId: string; // Added
  price: number; // Added
  courseName: string;
  coverImage?: string;
  ageGroup: string;
  title: string;
  // overviewDescription: string; // Removed as per request
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
  const MAX_VISIBLE_LEARNINGS = 2;

  return (
    <Card key={course._id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={course.coverImage || "/placeholder.svg?height=200&width=400"}
            alt={course.courseName}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-semibold leading-tight">{course.courseName}</CardTitle>
          <Badge variant="outline" className="text-xs whitespace-nowrap">{course.ageGroup}</Badge>
        </div>
        <CardDescription className="text-sm text-gray-600 mb-3">{course.title}</CardDescription>
        
        {/* overviewDescription removed here */}
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3 text-xs border-t border-b py-2">
          <div>
            <p className="text-gray-500">Classes</p>
            <p className="font-semibold text-gray-700">{course.totalClasses}</p>
          </div>
          <div>
            <p className="text-gray-500">Hours</p>
            <p className="font-semibold text-gray-700">{course.totalHours}</p>
          </div>
          <div className="col-span-2 mt-1">
            <p className="text-gray-500">Tools Used</p>
            <p className="font-medium text-gray-700 truncate" title={course.toolUsed}>{course.toolUsed}</p>
          </div>
        </div>

        {course.keyLearningOutcomes && course.keyLearningOutcomes.length > 0 && (
          <div className="mt-auto">
            <div 
              className="flex justify-between items-center cursor-pointer mb-1"
              onClick={() => setShowAllLearnings(!showAllLearnings)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowAllLearnings(!showAllLearnings); }}
              aria-expanded={showAllLearnings}
              aria-controls={`learnings-${course._id}`}
            >
              <h4 className="text-xs font-semibold uppercase text-gray-500">Key Learnings:</h4>
              {course.keyLearningOutcomes.length > MAX_VISIBLE_LEARNINGS && (
                showAllLearnings ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </div>
            <ul id={`learnings-${course._id}`} className="space-y-0.5">
              {(showAllLearnings ? course.keyLearningOutcomes : course.keyLearningOutcomes.slice(0, MAX_VISIBLE_LEARNINGS)).map((outcome: string, index: number) => (
                <li key={index} className="flex items-start text-xs text-gray-600">
                  <span className="text-blue-500 mr-1.5 mt-0.5 shrink-0">•</span>
                  <span className="line-clamp-2">{outcome}</span>
                </li>
              ))}
              {/* The "...and X more" text block has been removed from here */}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 mt-auto border-t">
        <Link href={`/courses/${course.slug}`} passHref className="w-full"> {/* Updated href to use course.slug */}
          <Button className="w-full">View Course</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
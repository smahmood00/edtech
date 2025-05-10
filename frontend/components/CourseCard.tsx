"use client";
import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CourseCardProps {
  course: {
    courseName: string;
    title: string;
    ageGroup: string;
    totalClasses: number;
    totalHours: number;
    coverImage: string;
    overviewDescription: string;
    toolUsed: string;
    keyLearningOutcomes: string[];
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={course.coverImage || '/placeholder-course.jpg'}
          alt={course.courseName}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.courseName}</h3>
            <p className="text-gray-600 mb-2">{course.title}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
            {course.ageGroup}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Classes</p>
            <p className="text-lg font-semibold">{course.totalClasses}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Hours</p>
            <p className="text-lg font-semibold">{course.totalHours}</p>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{course.overviewDescription}</p>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500">Tools Used</p>
          <p className="font-medium">{course.toolUsed}</p>
        </div>

        <div className="border-t pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left text-blue-600 hover:text-blue-800"
          >
            <span className="font-medium">Learning Outcomes</span>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {isExpanded && (
            <ul className="mt-2 space-y-2">
              {course.keyLearningOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-600">{outcome}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 
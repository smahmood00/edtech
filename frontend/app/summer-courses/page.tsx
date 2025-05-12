import { Suspense } from 'react';
// import Image from 'next/image'; // No longer directly used here
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // No longer directly used here
// import { Badge } from "@/components/ui/badge"; // No longer directly used here
// import { Button } from "@/components/ui/button"; // No longer directly used here
// import Link from 'next/link'; // No longer directly used here
import CourseCard from '@/components/CourseCard'; // Import the new client component


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("API base url is", API_BASE_URL);
async function getCourses() {
  const res = await fetch(`${API_BASE_URL}/api/courses`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }
  
  return res.json();
}

export default async function SummerCoursesPage() {
  const courses = await getCourses();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Summer Courses</h1>
      
      <Suspense fallback={<div className="text-center text-lg">Loading courses...</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: any) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}

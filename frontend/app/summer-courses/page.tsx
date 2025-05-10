import { Suspense } from 'react';
import CourseCard from '@/components/CourseCard';


const API_BASE_URL = 'http://localhost:5000';
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
      
      <Suspense fallback={<div>Loading courses...</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: any) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}

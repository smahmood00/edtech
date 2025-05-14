
import { Suspense } from 'react';
import Image from 'next/image';
import { CheckCircle, BookOpen, Users, Clock, PlayCircle, Target, Award, Star, Zap, DollarSign } from 'lucide-react';
import { EnrollButton } from './EnrollButton';

const API_BASE_URL =  process.env.NEXT_PUBLIC_API_BASE_URL; 
console.log('In courses, API_BASE_URL is: ',API_BASE_URL)

interface CourseLessonResource {
  name: string;
  url: string;
}

interface CourseLesson {
  _id: string;
  title: string;
  description: string;
  videoUrl?: string;
  resources?: CourseLessonResource[];
  hours?: number; // Added for potential future use or if data model changes
  outcomes?: string[]; // Added for potential future use or if data model changes
}

interface CourseType {
  _id: string;
  courseId: string;
  courseName: string;
  title: string;
  ageGroup: string;
  totalClasses: number;
  totalHours: number;
  coverImage?: string;
  overviewDescription: string;
  toolUsed: string;
  keyLearningOutcomes: string[];
  price: number; // Price is not displayed in the 8-12/page.tsx example, but we keep it in the type
  lessons?: CourseLesson[];
  endProductShowcaseMedia?: string[]; // This is an array, 8-12/page.tsx has a string placeholder
  slug: string;
  // Added fields from 8-12/page.tsx for consistency if needed, though data might not be present
  imageVideoPlaceholder?: string;
  endProductShowcase?: string;
}

async function getCourse(slug: string): Promise<CourseType | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/courses/${slug}`, {
      cache: 'no-store', // Or configure revalidation as needed
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch course: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error; // Rethrow to be caught by Next.js error handling or Suspense boundary
  }
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params; // Remove await as it's not needed
  const course = await getCourse(slug);

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-700">Course Not Found</h1>
        <p className="text-gray-500 mt-4">Sorry, we couldn't find the course you're looking for.</p>
      </div>
    );
  }

  // Fallback for placeholders if specific data isn't in 'course' object
  const coverImageUrl = course.coverImage || 'https://via.placeholder.com/1920x1080/0A192F/FFFFFF?text=Course+Background';
  const overviewImageVideoPlaceholder = course.imageVideoPlaceholder || "[Placeholder: Video or Image of Course Overview]";
  const endProductShowcasePlaceholder = course.endProductShowcase || (course.endProductShowcaseMedia && course.endProductShowcaseMedia.length > 0 
    ? `[Showcase: ${course.endProductShowcaseMedia[0]}]` 
    : "[Placeholder: Student's Final Creation]");


  return (
    <Suspense fallback={<div className="bg-gradient-to-b from-slate-900 to-sky-800 text-white min-h-screen flex justify-center items-center text-xl">Loading course details...</div>}>
      <div className="bg-gradient-to-b from-slate-900 to-sky-800 text-white min-h-screen">
        {/* Cover Photo Section */}
        <section
          className="h-[70vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center relative"
          style={{ backgroundImage: `url('${coverImageUrl}')` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="text-center z-10 p-4 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {course.courseName}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8">
              {course.title}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <EnrollButton 
                courseName={course.courseName}
                price={course.price}
              />
              <button className="bg-transparent border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-900 font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                Chat with Us
              </button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          {/* Quick Info Bar */}
          <section className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12 bg-slate-800/70 p-6 rounded-xl shadow-2xl"> {/* Adjusted grid-cols for 5 items */}
            <div className="flex flex-col items-center text-center">
              <Users className="h-10 w-10 mb-2 text-cyan-400" />
              <h3 className="font-semibold text-lg">Age Group</h3>
              <p className="text-gray-300">{course.ageGroup}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Zap className="h-10 w-10 mb-2 text-yellow-400" />
              <h3 className="font-semibold text-lg">Tool Used</h3>
              <p className="text-gray-300">{course.toolUsed}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <BookOpen className="h-10 w-10 mb-2 text-green-400" />
              <h3 className="font-semibold text-lg">Total Classes</h3>
              <p className="text-gray-300">{course.totalClasses} classes</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="h-10 w-10 mb-2 text-pink-400" />
              <h3 className="font-semibold text-lg">Total Hours</h3>
              <p className="text-gray-300">{course.totalHours} hours</p>
            </div>
            <div className="flex flex-col items-center text-center"> {/* Added Price section */}
              <DollarSign className="h-10 w-10 mb-2 text-teal-400" />
              <h3 className="font-semibold text-lg">Price</h3>
              <p className="text-gray-300">HKD {course.price.toFixed(2)}</p>
            </div>
          </section>

          {/* Overview Section */}
          <section className="mb-16 p-8 bg-slate-800 rounded-xl shadow-xl">
            <h2 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
              Course Overview
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6 whitespace-pre-line">
              {course.overviewDescription}
            </p>
            <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center shadow-lg">
              {course.coverImage ? (
                 <Image src={course.coverImage} alt="Course Overview" layout="fill" objectFit="cover" className="rounded-lg" />
              ) : (
                <>
                  <PlayCircle className="h-20 w-20 text-gray-500" />
                  <p className="ml-4 text-gray-500">{overviewImageVideoPlaceholder}</p>
                </>
              )}
            </div>
          </section>

          {/* Lessons Section */}
          {course.lessons && course.lessons.length > 0 && (
            <section className="mb-16">
              <h2 className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-600">
                What You'll Learn: Lesson by Lesson
              </h2>
              <div className="space-y-8">
                {course.lessons.map((lesson, index) => (
                  <article key={lesson._id || index} className="bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-cyan-500/30 transition-shadow duration-300">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                      <h3 className="text-2xl font-semibold text-sky-300 mb-2 sm:mb-0">
                        Lesson {index + 1}: {lesson.title}
                      </h3>
                      {lesson.hours && (
                        <span className="text-sm text-gray-400 bg-slate-700 px-3 py-1 rounded-full">
                          <Clock className="inline h-4 w-4 mr-1" /> {lesson.hours} hours
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 mb-3 leading-relaxed whitespace-pre-line">{lesson.description}</p>
                    {lesson.outcomes && lesson.outcomes.length > 0 && (
                      <div className="space-y-2">
                        <p className="font-semibold text-green-400">Outcomes:</p>
                        {lesson.outcomes.map((outcome, idx) => (
                          <div key={idx} className="flex items-start text-green-400">
                            <CheckCircle className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                            <p>{outcome}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Key Learning Outcomes Section */}
          {course.keyLearningOutcomes && course.keyLearningOutcomes.length > 0 && (
            <section className="mb-16 p-8 bg-slate-800 rounded-xl shadow-xl">
              <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
                Key Learning Outcomes
              </h2>
              <ul className="space-y-4">
                {course.keyLearningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start text-lg text-gray-300">
                    <Target className="h-6 w-6 mr-3 mt-1 text-yellow-500 flex-shrink-0" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* End Product Showcase Section */}
          <section className="mb-12 p-8 bg-slate-800 rounded-xl shadow-xl">
            <h2 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              Your Final Creation!
            </h2>
            <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center shadow-lg">
              {course.endProductShowcaseMedia && course.endProductShowcaseMedia.length > 0 && course.endProductShowcaseMedia[0] ? (
                <Image src={course.endProductShowcaseMedia[0]} alt="End Product Showcase" layout="fill" objectFit="contain" className="rounded-lg" />
              ) : (
                <>
                  <Award className="h-20 w-20 text-gray-500" />
                  <p className="ml-4 text-gray-500">{endProductShowcasePlaceholder}</p>
                </>
              )}
            </div>
            <p className="text-center mt-6 text-lg text-gray-300">
              By the end of this course, you'll have an amazing project to show off!
            </p>
          </section>

          {/* Call to Action (Optional) */}
          <section className="text-center py-10">
            <EnrollButton 
              courseName={course.courseName}
              price={course.price}
              className="font-bold py-4 px-10 text-xl shadow-lg hover:shadow-2xl"
            />
          </section>
        </main>
      </div>
    </Suspense>
  );
}

// Optional: Generate static paths if you have a fixed number of courses and want to pre-render them
// export async function generateStaticParams() {
//   const res = await fetch(`${API_BASE_URL}/api/courses?fields=slug`); // Assuming an endpoint to get all slugs
//   if (!res.ok) return [];
//   const courses: { slug: string }[] = await res.json();
//   return courses.map((course) => ({
//     slug: course.slug,
//   }));
// }
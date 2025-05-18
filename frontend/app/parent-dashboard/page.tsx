'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Calendar, Clock, User, Users, Code, Brain, Zap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { format } from 'date-fns';
import { API_BASE_URL } from '@/lib/constants';

interface Course {
  _id: string;
  name: string;
  description: string;
  totalClasses: number;
  totalHours: number;
  toolUsed: string;
  price: number;
}

interface Enrollment {
  _id: string;
  course: Course;
  enrollmentDate: string;
  status: string;
  progress: number;
}

interface Child {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
}

interface ChildEnrollment {
  child: Child;
  enrollments: Enrollment[];
}

interface DashboardData {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  userEnrollments: Enrollment[];
  childrenEnrollments: ChildEnrollment[];
}

export default function ParentDashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log('Starting dashboard data fetch');
        
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found');
        }
        console.log('Auth token found, making API request');
        console.log('API URL:', `${API_BASE_URL}/dashboard/parent`);
        
        const response = await fetch(`${API_BASE_URL}/dashboard/parent`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response error text:', errorText);
          setDebugInfo(`Status: ${response.status}, Error: ${errorText}`);
          throw new Error(`Failed to fetch dashboard data: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log('Response data:', responseData);
        
        if (!responseData.success || !responseData.data) {
          throw new Error('Invalid response format');
        }

        setDashboardData(responseData.data);
      } catch (error) {
        console.error('Dashboard Error:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const EnrollmentCard = ({ enrollment }: { enrollment: Enrollment }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl">{enrollment.course.name}</CardTitle>
          <span className={`px-3 py-1 rounded-full text-sm ${
            enrollment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
          </span>
        </div>
        <CardDescription>{enrollment.course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{enrollment.course.totalHours} Hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{enrollment.course.totalClasses} Classes</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{enrollment.progress}%</span>
            </div>
            <Progress value={enrollment.progress} className="h-2" />
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">
              Enrolled on {format(new Date(enrollment.enrollmentDate), 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Code className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Tool: {enrollment.course.toolUsed}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-purple-600 border-purple-200 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-red-600">Error</CardTitle>
              <CardDescription>{error}</CardDescription>
              {debugInfo && (
                <div className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                  <p className="font-mono">Debug Info: {debugInfo}</p>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.location.reload()} className="w-full">
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome, {dashboardData?.user.firstName}!
            </h1>
            <p className="text-gray-600">
              Manage your courses and track your learning journey
            </p>
          </div>

          <Tabs defaultValue="my-courses" className="space-y-6">
            <TabsList className="bg-white border">
              <TabsTrigger value="my-courses" className="data-[state=active]:bg-gray-100">
                <User className="h-4 w-4 mr-2" />
                My Courses
              </TabsTrigger>
              <TabsTrigger value="children-courses" className="data-[state=active]:bg-gray-100">
                <Users className="h-4 w-4 mr-2" />
                Children's Courses
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-courses" className="space-y-6">
              {!dashboardData?.userEnrollments.length ? (
                <Card>
                  <CardHeader>
                    <CardTitle>No Courses Yet</CardTitle>
                    <CardDescription>
                      You haven't enrolled in any courses yet. Start your learning journey today!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => router.push('/courses')}>
                      Browse Courses <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {dashboardData?.userEnrollments.map((enrollment) => (
                    <EnrollmentCard key={enrollment._id} enrollment={enrollment} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="children-courses" className="space-y-8">
              {!dashboardData?.childrenEnrollments.length ? (
                <Card>
                  <CardHeader>
                    <CardTitle>No Children Enrolled</CardTitle>
                    <CardDescription>
                      You haven't enrolled any children in courses yet.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => router.push('/courses')}>
                      Explore Children's Courses <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                dashboardData?.childrenEnrollments.map((childData) => (
                  <div key={childData.child._id} className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-6 w-6 text-gray-500" />
                      <h2 className="text-2xl font-semibold">
                        {childData.child.firstName} {childData.child.lastName}
                      </h2>
                      <span className="text-sm text-gray-500">
                        {childData.child.age} years old
                      </span>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {childData.enrollments.map((enrollment) => (
                        <EnrollmentCard key={enrollment._id} enrollment={enrollment} />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}

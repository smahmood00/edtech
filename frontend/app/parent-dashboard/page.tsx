'use client';

import { BookOpen, Calendar, Clock, CreditCard, Settings, Star, User, Users, Code, Brain, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"

export default function ParentDashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Parent Dashboard</h2>

          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="children">Children</TabsTrigger>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              {/* <TabsTrigger value="billing">Billing</TabsTrigger> */}
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Learning Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24.5 hours</div>
                    <p className="text-xs text-muted-foreground">+2.5 hours from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4</div>
                    <p className="text-xs text-muted-foreground">1 course added this month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">3 new badges earned</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Next Session</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Tomorrow</div>
                    <p className="text-xs text-muted-foreground">AI for Kids - 4:00 PM</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Weekly Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                      Activity Chart Placeholder
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                    <CardDescription>Your child's latest accomplishments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-purple-100 p-2">
                          <Star className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Code Master</p>
                          <p className="text-sm text-muted-foreground">Completed first Python project</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-blue-100 p-2">
                          <Star className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">AI Explorer</p>
                          <p className="text-sm text-muted-foreground">Completed AI basics module</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-green-100 p-2">
                          <Star className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Perfect Attendance</p>
                          <p className="text-sm text-muted-foreground">Attended 10 consecutive sessions</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="children" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Children Profiles</CardTitle>
                  <CardDescription>Manage your children's accounts and monitor their progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Alex Johnson</p>
                          <p className="text-xs text-muted-foreground">Age: 12</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Course Progress</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center text-xs">
                      <div className="rounded-lg bg-muted p-2">
                        <p className="font-medium">3</p>
                        <p className="text-muted-foreground">Active Courses</p>
                      </div>
                      <div className="rounded-lg bg-muted p-2">
                        <p className="font-medium">18.5h</p>
                        <p className="text-muted-foreground">Learning Time</p>
                      </div>
                      <div className="rounded-lg bg-muted p-2">
                        <p className="font-medium">8</p>
                        <p className="text-muted-foreground">Achievements</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Emma Johnson</p>
                          <p className="text-xs text-muted-foreground">Age: 9</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Course Progress</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center text-xs">
                      <div className="rounded-lg bg-muted p-2">
                        <p className="font-medium">2</p>
                        <p className="text-muted-foreground">Active Courses</p>
                      </div>
                      <div className="rounded-lg bg-muted p-2">
                        <p className="font-medium">6h</p>
                        <p className="text-muted-foreground">Learning Time</p>
                      </div>
                      <div className="rounded-lg bg-muted p-2">
                        <p className="font-medium">4</p>
                        <p className="text-muted-foreground">Achievements</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Users className="mr-2 h-4 w-4" />
                    Add Child Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Enrolled Courses</CardTitle>
                  <CardDescription>Courses your children are currently taking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-md bg-purple-100 flex items-center justify-center">
                            <Code className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium">Python for Kids</p>
                            <p className="text-xs text-muted-foreground">Enrolled: Alex Johnson • Progress: 75%</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center">
                            <Brain className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">AI for Kids</p>
                            <p className="text-xs text-muted-foreground">Enrolled: Alex Johnson • Progress: 50%</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-md bg-pink-100 flex items-center justify-center">
                            <Code className="h-6 w-6 text-pink-600" />
                          </div>
                          <div>
                            <p className="font-medium">Scratch Programming</p>
                            <p className="text-xs text-muted-foreground">Enrolled: Emma Johnson • Progress: 45%</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-md bg-green-100 flex items-center justify-center">
                            <Zap className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Game Design Basics</p>
                            <p className="text-xs text-muted-foreground">Enrolled: Alex Johnson • Progress: 30%</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}

import Image from "next/image"
import { Brain, Code, Filter, Search, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container py-10">
        <div className="mb-10 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Courses</h1>
          <p className="text-muted-foreground">
            Explore our interactive courses designed for different age groups and skill levels
          </p>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-64 lg:w-72">
            <div className="sticky top-20 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Search</h3>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search courses..." className="pl-8" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Age Group</h3>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    Kids (7-9)
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Tweens (10-12)
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Teens (13-17)
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Category</h3>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    Coding
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    AI & Machine Learning
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Game Development
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Web Design
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Robotics
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Skill Level</h3>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    Beginner
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Intermediate
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Advanced
                  </Button>
                </div>
              </div>

              <Button className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <Tabs defaultValue="all" className="mb-8">
              <TabsList>
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Python for Kids"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute right-2 top-2">
                      <Badge className="bg-purple-600">Popular</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">Ages 10-12</Badge>
                    <Badge variant="outline">Beginner</Badge>
                  </div>
                  <CardTitle className="mb-2">Python for Kids</CardTitle>
                  <CardDescription className="mb-4">
                    A fun introduction to Python programming with games and interactive projects.
                  </CardDescription>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Code className="mr-1 h-4 w-4" />
                    <span>8 modules • 24 lessons</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-6 pt-0">
                  <div className="text-lg font-bold">$49.99</div>
                  <Button>View Course</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="AI for Kids"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute right-2 top-2">
                      <Badge className="bg-blue-600">New</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">Ages 10-12</Badge>
                    <Badge variant="outline">Intermediate</Badge>
                  </div>
                  <CardTitle className="mb-2">AI for Kids</CardTitle>
                  <CardDescription className="mb-4">
                    Explore the fascinating world of artificial intelligence through hands-on projects.
                  </CardDescription>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Brain className="mr-1 h-4 w-4" />
                    <span>6 modules • 18 lessons</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-6 pt-0">
                  <div className="text-lg font-bold">$59.99</div>
                  <Button>View Course</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Scratch Programming"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">Ages 7-9</Badge>
                    <Badge variant="outline">Beginner</Badge>
                  </div>
                  <CardTitle className="mb-2">Scratch Programming</CardTitle>
                  <CardDescription className="mb-4">
                    Learn the basics of programming with Scratch's visual block-based coding environment.
                  </CardDescription>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Code className="mr-1 h-4 w-4" />
                    <span>5 modules • 15 lessons</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-6 pt-0">
                  <div className="text-lg font-bold">$39.99</div>
                  <Button>View Course</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Game Design Basics"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">Ages 10-12</Badge>
                    <Badge variant="outline">Beginner</Badge>
                  </div>
                  <CardTitle className="mb-2">Game Design Basics</CardTitle>
                  <CardDescription className="mb-4">
                    Create your own games while learning fundamental game design principles.
                  </CardDescription>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Zap className="mr-1 h-4 w-4" />
                    <span>7 modules • 21 lessons</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-6 pt-0">
                  <div className="text-lg font-bold">$49.99</div>
                  <Button>View Course</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Web Design for Teens"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">Ages 13-17</Badge>
                    <Badge variant="outline">Intermediate</Badge>
                  </div>
                  <CardTitle className="mb-2">Web Design for Teens</CardTitle>
                  <CardDescription className="mb-4">
                    Learn HTML, CSS, and JavaScript to build your own responsive websites.
                  </CardDescription>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Code className="mr-1 h-4 w-4" />
                    <span>10 modules • 30 lessons</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-6 pt-0">
                  <div className="text-lg font-bold">$69.99</div>
                  <Button>View Course</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Robotics 101"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute right-2 top-2">
                      <Badge className="bg-green-600">Recommended</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">Ages 13-17</Badge>
                    <Badge variant="outline">Advanced</Badge>
                  </div>
                  <CardTitle className="mb-2">Robotics 101</CardTitle>
                  <CardDescription className="mb-4">
                    Build and program robots while learning about sensors, motors, and automation.
                  </CardDescription>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Zap className="mr-1 h-4 w-4" />
                    <span>8 modules • 24 lessons</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-6 pt-0">
                  <div className="text-lg font-bold">$79.99</div>
                  <Button>View Course</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="outline" className="mx-2">
                Previous
              </Button>
              <Button variant="outline" className="mx-2">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

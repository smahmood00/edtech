import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-blue-50">
      {/* Hero Section Skeleton */}
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-50" />
        <div className="container relative h-full">
          <div className="flex h-full flex-col justify-center">
            <div className="space-y-4">
              <Skeleton className="h-8 w-48 bg-white/20" />
              <Skeleton className="h-16 w-96 bg-white/20" />
              <Skeleton className="h-8 w-[600px] bg-white/20" />
            </div>
            <div className="mt-8 flex gap-4">
              <Skeleton className="h-12 w-32 bg-white/20" />
              <Skeleton className="h-12 w-32 bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="bg-white">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Daily Plan</TabsTrigger>
                <TabsTrigger value="learning">Learning Outcomes</TabsTrigger>
              </TabsList>

              <div className="space-y-8">
                <Card>
                  <CardContent className="pt-6">
                    <Skeleton className="mb-4 h-8 w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="mt-2 h-4 w-3/4" />
                    <Skeleton className="mt-2 h-4 w-5/6" />
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  {[1, 2].map((i) => (
                    <Card key={i}>
                      <CardContent className="pt-6">
                        <div className="mb-4 flex items-center gap-2">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <Skeleton className="h-6 w-32" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                          <Skeleton className="h-4 w-4/6" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-4 w-64" />
                          </div>
                          <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 text-center">
                  <Skeleton className="mx-auto h-10 w-24" />
                  <Skeleton className="mx-auto mt-2 h-4 w-32" />
                </div>
                <Skeleton className="mb-4 h-12 w-full" />
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Skeleton className="mb-4 h-6 w-32" />
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 
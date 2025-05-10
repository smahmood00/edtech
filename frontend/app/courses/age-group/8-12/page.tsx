// app/courses/space-coders-game-development/page.tsx
import { PlayCircle, CheckCircle, Users, Clock, Zap, Target, BookOpen, Award, Star } from 'lucide-react';

const courseData = {
  ageGroup: "8-12 years",
  courseName: "Space Coders: Game Development Basics",
  toolUsed: "Scratch (block-based programming)",
  totalClasses: 8,
  totalHours: 12,
  title: "Create Your Own Space Adventure Game",
  overviewDescription: "This interactive online course introduces kids to coding through Scratch, where they’ll design and build their own space-themed adventure game. Each lesson guides students through coding concepts like loops, conditionals, and variables while fostering creativity and problem-solving. By the end, students will have a fully functional game to share with friends and family.",
  imageVideoPlaceholder: "[Placeholder: Video showcasing a student’s completed space game with animated spaceships and asteroids]",
  lessons: [
    {
      id: 1,
      hours: 1.5,
      title: "Introduction to Scratch and Game Design",
      description: "Learn the Scratch interface, create a project, and design a space-themed background. Start with basic sprite movement.",
      outcome: "Students can navigate Scratch and control a spaceship sprite using keyboard inputs."
    },
    {
      id: 2,
      hours: 1.5,
      title: "Adding Obstacles with Loops",
      description: "Introduce loops to spawn asteroids or enemies that move across the screen. Students learn how to make repetitive actions in code.",
      outcome: "Students can use loops to create moving obstacles in their game."
    },
    {
      id: 3,
      hours: 1.5,
      title: "Collision Detection and Conditionals",
      description: "Use conditionals to detect collisions between the spaceship and asteroids. Add a scoring system for avoiding obstacles.",
      outcome: "Students can implement collision detection and track scores."
    },
    {
      id: 4,
      hours: 1.5,
      title: "Power-Ups and Variables",
      description: "Create power-ups (e.g., shields or speed boosts) using variables to modify game behavior. Students learn how variables store and update data.",
      outcome: "Students can use variables to add dynamic power-ups to their game."
    },
    {
      id: 5,
      hours: 1.5,
      title: "Adding Sound and Visual Effects",
      description: "Enhance the game with sound effects (e.g., laser sounds) and visual effects (e.g., explosions). Explore Scratch’s multimedia features.",
      outcome: "Students can integrate audio and visual effects to make their game more engaging."
    },
    {
      id: 6,
      hours: 1.5,
      title: "Creating a Game Story",
      description: "Develop a storyline for the game, such as a mission to save a planet. Use Scratch’s broadcast feature to sequence events.",
      outcome: "Students can structure a narrative using code to trigger game events."
    },
    {
      id: 7,
      hours: 1.5,
      title: "Testing and Debugging",
      description: "Test the game for bugs and learn debugging techniques. Students refine their code to improve gameplay.",
      outcome: "Students can identify and fix errors in their game."
    },
    {
      id: 8,
      hours: 1.5,
      title: "Final Touches and Sharing",
      description: "Polish the game with custom sprites and animations. Learn how to share the project on the Scratch community platform.",
      outcome: "Students complete and share a fully functional space adventure game."
    }
  ],
  keyLearningOutcomes: [
    "Understand core coding concepts: loops, conditionals, variables, and events.",
    "Develop problem-solving and logical thinking skills through game design.",
    "Gain confidence in creating and sharing digital projects.",
    "Learn to collaborate and provide constructive feedback on peers’ games."
  ],
  endProductShowcase: "[Placeholder: Video of a completed student game featuring a spaceship dodging asteroids, collecting power-ups, and completing a mission with sound effects and a scoreboard]"
};

export default function SpaceCodersPage() {
  return (
    <div className="bg-gradient-to-b from-slate-900 to-sky-800 text-white min-h-screen">
      {/* Cover Photo Section */}
      <section
        className="h-[70vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center relative" // Adjusted height for more space
        style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080/0A192F/FFFFFF?text=Space+Adventure+Background')" }} // Replace with actual image URL
      >
        <div className="absolute inset-0 bg-black/60"></div> {/* Slightly darker overlay for better text contrast */}
        <div className="text-center z-10 p-4 max-w-3xl"> {/* Added max-width */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            {courseData.courseName}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8"> {/* Added margin-bottom */}
            {courseData.title}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
              <Star className="inline h-5 w-5 mr-2" /> Enroll Now
            </button>
            <button className="bg-transparent border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-900 font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
              {/* You can use a chat icon here if you have one e.g. <MessageCircle className="inline h-5 w-5 mr-2" /> */}
              Chat with Us
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Quick Info Bar */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 bg-slate-800/70 p-6 rounded-xl shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <Users className="h-10 w-10 mb-2 text-cyan-400" />
            <h3 className="font-semibold text-lg">Age Group</h3>
            <p className="text-gray-300">{courseData.ageGroup}</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Zap className="h-10 w-10 mb-2 text-yellow-400" />
            <h3 className="font-semibold text-lg">Tool Used</h3>
            <p className="text-gray-300">{courseData.toolUsed}</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <BookOpen className="h-10 w-10 mb-2 text-green-400" />
            <h3 className="font-semibold text-lg">Total Classes</h3>
            <p className="text-gray-300">{courseData.totalClasses} classes</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Clock className="h-10 w-10 mb-2 text-pink-400" />
            <h3 className="font-semibold text-lg">Total Hours</h3>
            <p className="text-gray-300">{courseData.totalHours} hours</p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="mb-16 p-8 bg-slate-800 rounded-xl shadow-xl">
          <h2 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
            Course Overview
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            {courseData.overviewDescription}
          </p>
          <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center shadow-lg">
            <PlayCircle className="h-20 w-20 text-gray-500" />
            <p className="ml-4 text-gray-500">{courseData.imageVideoPlaceholder}</p>
          </div>
        </section>

        {/* Lessons Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-600">
            What You'll Learn: Lesson by Lesson
          </h2>
          <div className="space-y-8">
            {courseData.lessons.map((lesson) => (
              <article key={lesson.id} className="bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-cyan-500/30 transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                  <h3 className="text-2xl font-semibold text-sky-300 mb-2 sm:mb-0">
                    Lesson {lesson.id}: {lesson.title}
                  </h3>
                  <span className="text-sm text-gray-400 bg-slate-700 px-3 py-1 rounded-full">
                    <Clock className="inline h-4 w-4 mr-1" /> {lesson.hours} hours
                  </span>
                </div>
                <p className="text-gray-300 mb-3 leading-relaxed">{lesson.description}</p>
                <div className="flex items-start text-green-400">
                  <CheckCircle className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  <p><span className="font-semibold">Outcome:</span> {lesson.outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Key Learning Outcomes Section */}
        <section className="mb-16 p-8 bg-slate-800 rounded-xl shadow-xl">
          <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
            Key Learning Outcomes
          </h2>
          <ul className="space-y-4">
            {courseData.keyLearningOutcomes.map((outcome, index) => (
              <li key={index} className="flex items-start text-lg text-gray-300">
                <Target className="h-6 w-6 mr-3 mt-1 text-yellow-500 flex-shrink-0" />
                {outcome}
              </li>
            ))}
          </ul>
        </section>

        {/* End Product Showcase Section */}
        <section className="mb-12 p-8 bg-slate-800 rounded-xl shadow-xl">
          <h2 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            Your Final Creation!
          </h2>
          <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center shadow-lg">
            <Award className="h-20 w-20 text-gray-500" />
            <p className="ml-4 text-gray-500">{courseData.endProductShowcase}</p>
          </div>
          <p className="text-center mt-6 text-lg text-gray-300">
            By the end of this course, you'll have an amazing game to show off!
          </p>
        </section>

        {/* Call to Action (Optional) */}
        <section className="text-center py-10">
          <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-lg text-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <Star className="inline h-6 w-6 mr-2" /> Enroll Now!
          </button>
        </section>
      </main>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    id: 1,
    content:
      "TechKids has transformed my son's screen time into productive learning. He's building games and talking about AI concepts I barely understand!",
    name: "Sarah Johnson",
    role: "Parent of Alex, 12",
    avatar: "/placeholder.svg",
    accentColor: "#FF8A5B",
  },
  {
    id: 2,
    content:
      "My daughter was hesitant about coding, but the game-based approach got her hooked. Now she's creating her own animations and showing them to everyone!",
    name: "Michael Rodriguez",
    role: "Parent of Sophia, 9",
    avatar: "/placeholder.svg",
    accentColor: "#4A6FA5",
  },
  {
    id: 3,
    content:
      "The AI course helped me create a project that won first place at my school's science fair. The instructors are amazing and really know how to explain complex topics.",
    name: "Ethan Williams",
    role: "Student, 15",
    avatar: "/placeholder.svg",
    accentColor: "#FF8A5B",
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      next();
    }, 7000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] }
    })
  };

  const handleNext = () => {
    setDirection(1);
    next();
  };

  const handlePrev = () => {
    setDirection(-1);
    prev();
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section className="py-20 bg-[#172A3A]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-[#4A6FA5] text-white hover:bg-[#FF8A5B] px-4 py-1">Success Stories</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            What Parents & Kids Say
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-[#4A6FA5] md:text-xl">
            Hear from families who have experienced the TechKids difference.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[380px] sm:min-h-[320px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full"
                style={{ '--accent-color': currentTestimonial.accentColor } as React.CSSProperties}
              >
                <Card className="bg-white border-2 border-[var(--accent-color)]/50 shadow-xl rounded-xl overflow-hidden">
                  <CardContent className="p-8 md:p-10 relative">
                    <div 
                      className="absolute -top-5 -left-5 w-16 h-16 rounded-full flex items-center justify-center bg-[var(--accent-color)] shadow-lg transform rotate-[-15deg]"
                    >
                      <QuoteIcon className="h-8 w-8 text-white opacity-80" />
                    </div>
                    <p className="text-lg md:text-xl mb-6 text-[#172A3A] italic leading-relaxed min-h-[120px] sm:min-h-[100px]">
                      "{currentTestimonial.content}"
                    </p>
                    <div className="flex items-center mt-8">
                      <div className="w-14 h-14 rounded-full bg-[#4A6FA5]/10 border-2 border-[var(--accent-color)]/70 flex items-center justify-center overflow-hidden shadow-md">
                        <span className="text-xl font-bold text-[#172A3A]">{currentTestimonial.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-[#172A3A] text-lg">{currentTestimonial.name}</p>
                        <p className="text-sm text-[#4A6FA5]">{currentTestimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center mt-10 gap-4">
            <motion.button
              onClick={handlePrev}
              className="p-2.5 sm:p-3 rounded-lg bg-white hover:bg-[var(--accent-color)] text-[var(--accent-color)] hover:text-white border-2 border-[var(--accent-color)]/50 hover:border-[var(--accent-color)] transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-[var(--accent-color)]/30"
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ '--accent-color': testimonials[(activeIndex - 1 + testimonials.length) % testimonials.length].accentColor } as React.CSSProperties}
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            <div className="flex items-center gap-2 sm:gap-2.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-125 ${
                    activeIndex === index ? "bg-[var(--accent-color)] scale-125 shadow-md" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  style={{ '--accent-color': testimonials[index].accentColor } as React.CSSProperties}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              className="p-2.5 sm:p-3 rounded-lg bg-white hover:bg-[var(--accent-color)] text-[var(--accent-color)] hover:text-white border-2 border-[var(--accent-color)]/50 hover:border-[var(--accent-color)] transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-[var(--accent-color)]/30"
              aria-label="Next testimonial"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ '--accent-color': testimonials[(activeIndex + 1) % testimonials.length].accentColor } as React.CSSProperties}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 
'use client';

import { Star } from 'lucide-react';
import Link from 'next/link';

interface EnrollButtonProps {
  courseName: string;
  price: number;
  className?: string;
}

export function EnrollButton({ courseName, price, className }: EnrollButtonProps) {
  return (
    <Link 
      href={`/checkout-summary?courseName=${encodeURIComponent(courseName)}&price=${price}`}
      className={`bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto inline-flex items-center justify-center ${className || ''}`}
    >
      <Star className="inline h-5 w-5 mr-2" /> Enroll Now
    </Link>
  );
}
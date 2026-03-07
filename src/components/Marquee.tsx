
"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const Marquee = () => {
  const text = "Trusted by the best • LOUVRE ABU DHABI • GALLERIES LAFAYETTE • FORD • YAS BAY • ";
  
  return (
    <div className="w-full bg-white border-y border-black/5 py-10 overflow-hidden select-none">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex whitespace-nowrap"
      >
        <span className="text-4xl md:text-7xl font-headline text-[#4A4A4A] opacity-20 px-4">
          {text.repeat(10)}
        </span>
      </motion.div>
    </div>
  );
};

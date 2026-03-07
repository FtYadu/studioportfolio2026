
"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const Marquee = () => {
  const text = "LOUVRE MUSEUM • GALLERIES LAFAYETTE • FORD • YAS BAY • SFC GROUP • TEN11 • ROYAL SWISS AUTO • JOUD COFFEE • CAFÉ DEL MAR • SIDDHARTHA • ALOFT • ";
  
  return (
    <div className="w-full bg-white border-y border-black/5 py-12 overflow-hidden select-none">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4A4A4A] opacity-40">Notable Collaborations</span>
        </div>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex whitespace-nowrap"
        >
          <span className="text-5xl md:text-8xl font-headline text-[#4A4A4A] opacity-20 px-4 font-black">
            {text.repeat(10)}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

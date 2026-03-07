
"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between w-full max-w-4xl px-6 py-3 bg-white/70 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl"
      >
        <div className="flex items-center gap-2">
          <span className="font-headline text-sm md:text-base text-[#4A4A4A] tracking-widest uppercase">
            YADU KRISHNAN K S
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#4A4A4A]">
          <a href="#creative" className="hover:text-primary transition-colors">Creative</a>
          <a href="#tech" className="hover:text-primary transition-colors">Tech</a>
          <a href="#work" className="hover:text-primary transition-colors">Work</a>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] shadow-[0_0_10px_#CCFF00] animate-pulse-lime" />
            <span className="hidden sm:inline text-xs font-bold uppercase tracking-tighter">Available</span>
          </div>
          <button className="px-5 py-2 bg-black text-white rounded-full text-xs font-bold hover:scale-105 transition-transform active:scale-95">
            Contact
          </button>
        </div>
      </motion.nav>
    </div>
  );
};

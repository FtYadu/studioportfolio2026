
"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MousePointer2, Sparkles, ChevronDown, MapPin, Cpu } from 'lucide-react';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 100]);
  
  const cards = PlaceHolderImages.slice(0, 4);
  const rotations = [-12, -4, 4, 12];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-[#F5F5F7]">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.03] font-headline text-[25vw] font-black leading-none">
        YADU
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center z-20 relative"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-black/5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            <Sparkles size={12} className="text-[#FF5E00]" />
            Technical + Creative Hybrid
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-40">
            <MapPin size={12} />
            Based in Abu Dhabi, UAE
          </div>
        </motion.div>
        
        <h1 className="font-headline text-6xl md:text-[9.5rem] mb-8 text-[#1D1D1F] tracking-tighter leading-[0.85] font-black">
          Shoot, Edit, <br />
          <span className="text-primary italic">Automate.</span>
        </h1>
        
        <p className="text-[#4A4A4A] text-lg md:text-2xl font-medium max-w-3xl mx-auto opacity-70 mb-16 leading-relaxed">
          Multimedia Specialist blending <span className="text-black font-bold italic">Sony Cine production</span> with <span className="text-black font-bold italic">GenAI workflows</span>. 
          B.Tech Engineer by training, Visual Storyteller by nature.
        </p>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-4 opacity-30"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Discover The Portfolio</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      <div className="relative mt-24 w-full max-w-5xl h-[500px] flex items-center justify-center z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full h-full p-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ y: 100, opacity: 0, rotate: rotations[i] }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.6 + (i * 0.1), 
                type: 'spring', 
                stiffness: 80, 
                damping: 20 
              }}
              whileHover={{ 
                y: -20, 
                scale: 1.05, 
                rotate: 0,
                zIndex: 50,
                transition: { duration: 0.4 }
              }}
              className="relative aspect-[3/4] w-full rounded-[2.5rem] bg-white shadow-2xl overflow-hidden border-8 border-white group cursor-pointer"
            >
              <Image
                src={card.imageUrl}
                alt={card.description}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                data-ai-hint={card.imageHint}
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Floating AI Pills */}
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-12 -left-12 px-6 py-3 bg-[#FF5E00] text-white rounded-full text-xs font-bold shadow-2xl rotate-[-8deg] border border-white/20 flex items-center gap-2"
        >
          <Cpu size={14} />
          B.Tech & Technical AI
        </motion.div>
        
        <motion.div
          style={{ y: y2 }}
          className="absolute top-40 -right-8 px-6 py-3 bg-[#CCFF00] text-black rounded-full text-xs font-bold shadow-2xl rotate-[12deg] border border-black/10 flex items-center gap-2"
        >
          <Sparkles size={14} />
          Sony Cine & Remotion
        </motion.div>
      </div>

      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
    </section>
  );
};

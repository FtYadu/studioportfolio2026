
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const Hero = () => {
  const cards = PlaceHolderImages.slice(0, 4);
  const rotations = [-15, -5, 5, 15];

  return (
    <section className="relative pt-44 pb-20 px-6 flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <h1 className="font-headline text-5xl md:text-8xl mb-6 text-[#4A4A4A] max-w-5xl leading-[0.9]">
          Showcase, Shoot, <br />
          <span className="text-primary">& Automate.</span>
        </h1>
        <p className="text-[#4A4A4A] text-lg md:text-xl font-medium max-w-xl mx-auto opacity-80 mb-12">
          Merging high-end visual storytelling with cutting-edge AI workflows. 
        </p>
      </motion.div>

      <div className="relative mt-16 w-full max-w-md h-[400px] flex items-center justify-center">
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ rotate: 0, x: 0, opacity: 0 }}
            animate={{ 
              rotate: rotations[i], 
              x: (i - 1.5) * 60,
              opacity: 1 
            }}
            transition={{ 
              delay: 0.5 + (i * 0.1), 
              type: 'spring', 
              stiffness: 100, 
              damping: 15 
            }}
            className="absolute w-64 h-80 rounded-[2rem] bg-white shadow-2xl overflow-hidden border-4 border-white cursor-pointer hover:z-50 hover:scale-110 transition-transform"
          >
            <Image
              src={card.imageUrl}
              alt={card.description}
              fill
              className="object-cover"
              data-ai-hint={card.imageHint}
            />
          </motion.div>
        ))}

        {/* Floating Pills */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -left-20 px-4 py-2 bg-[#FF5E00] text-white rounded-full text-xs font-bold shadow-xl rotate-[-12deg]"
        >
          @Cinematic
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-20 -right-20 px-4 py-2 bg-[#CCFF00] text-black rounded-full text-xs font-bold shadow-xl rotate-[15deg]"
        >
          @AIWorkflows
        </motion.div>
      </div>
    </section>
  );
};

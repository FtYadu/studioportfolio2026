
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Zap, ArrowRight, MousePointer2 } from 'lucide-react';

export const BentoSkills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="px-6 py-24 max-w-7xl mx-auto" id="creative">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]"
      >
        {/* Visual Storytelling */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 md:row-span-2 bg-white rounded-[2rem] p-10 flex flex-col justify-between shadow-xl group hover:shadow-2xl transition-all"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Camera size={32} />
          </div>
          <div>
            <h3 className="text-4xl font-headline text-[#4A4A4A] mb-4">Visual <br />Storytelling</h3>
            <p className="text-muted-foreground font-medium">Crafting immersive cinematic experiences that resonate on a global scale.</p>
          </div>
        </motion.div>

        {/* AI & Workflows */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 bg-[#FF5E00] rounded-[2rem] p-10 flex flex-col justify-between shadow-xl text-white hover:scale-[1.02] transition-transform"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-3xl font-headline">AI & Workflows</h3>
            <Zap className="text-white opacity-50" size={32} />
          </div>
          <p className="text-white/80 font-medium">Automating the mundane to focus on pure creative genius.</p>
        </motion.div>

        {/* Rapid Execution */}
        <motion.div 
          variants={itemVariants}
          className="bg-[#CCFF00] rounded-[2rem] p-8 flex flex-col items-center justify-center shadow-xl group cursor-pointer"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="mb-4 text-black"
          >
            <ArrowRight size={48} />
          </motion.div>
          <h3 className="text-xl font-headline text-black text-center uppercase">Rapid <br />Execution</h3>
        </motion.div>

        {/* Tech Stack */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-[2rem] p-8 flex flex-col justify-center shadow-xl border border-black/5"
        >
          <div className="flex gap-2 mb-4 flex-wrap">
            {['Next.js', 'Py', 'GenAI'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-background rounded-full text-[10px] font-bold uppercase tracking-tighter">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-headline text-[#4A4A4A]">Modern Stack</h3>
        </motion.div>

      </motion.div>
    </section>
  );
};

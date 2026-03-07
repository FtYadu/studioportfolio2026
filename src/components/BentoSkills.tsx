
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Zap, ArrowRight, Video, Binary, Code, Workflow, Layers } from 'lucide-react';

export const BentoSkills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80 } }
  };

  return (
    <section className="px-6 py-24 max-w-7xl mx-auto" id="creative">
      <div className="mb-16">
        <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Engineered Creativity</span>
        <h2 className="text-5xl md:text-7xl font-headline tracking-tighter text-[#4A4A4A]">Core <span className="italic text-primary">Stack</span></h2>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]"
      >
        {/* Cinema Specialist */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 md:row-span-2 bg-white rounded-[3rem] p-12 flex flex-col justify-between shadow-xl group hover:shadow-2xl transition-all border border-black/5"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
            <Camera size={32} />
          </div>
          <div>
            <h3 className="text-4xl font-headline text-[#4A4A4A] mb-4">Cinema & <br />Visual Mastery</h3>
            <p className="text-muted-foreground font-medium mb-6">Expert in Sony Cine setups, cine-lens lighting design, and high-impact brand storytelling.</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-primary/5 text-primary rounded-full text-[10px] font-bold uppercase">Sony Cine</span>
              <span className="px-3 py-1 bg-primary/5 text-primary rounded-full text-[10px] font-bold uppercase">DaVinci Resolve</span>
            </div>
          </div>
        </motion.div>

        {/* AI Workflows */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 bg-[#FF5E00] rounded-[3rem] p-12 flex flex-col justify-between shadow-xl text-white hover:scale-[1.02] transition-transform relative overflow-hidden"
        >
          <div className="flex justify-between items-start relative z-10">
            <h3 className="text-3xl font-headline">AI-Agentic <br />Workflows</h3>
            <Workflow className="text-white opacity-50" size={32} />
          </div>
          <p className="text-white/80 font-medium relative z-10">Building custom ComfyUI, Stable Diffusion, and prompt-engineered pipelines to automate creative high-output delivery.</p>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 blur-[80px] rounded-full" />
        </motion.div>

        {/* Code-Based Video */}
        <motion.div 
          variants={itemVariants}
          className="bg-primary rounded-[3rem] p-8 flex flex-col justify-between shadow-xl text-white"
        >
          <Code size={24} className="text-[#CCFF00]" />
          <div>
            <h3 className="text-xl font-headline mb-2 text-[#CCFF00]">Remotion</h3>
            <p className="text-xs text-white/60 font-medium uppercase tracking-widest">Code-Driven Video Editing</p>
          </div>
        </motion.div>

        {/* Technical Base */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-[3rem] p-8 flex flex-col justify-center shadow-xl border border-black/5"
        >
          <div className="mb-4">
            <Binary size={24} className="text-secondary mb-2" />
            <span className="text-[10px] font-bold uppercase text-secondary tracking-widest">B.Tech Engineer</span>
          </div>
          <h3 className="text-2xl font-headline text-[#4A4A4A]">Systems Thinking</h3>
          <p className="text-xs text-muted-foreground mt-2">Technical foundation in EIE for complex IT/Production troubleshooting.</p>
        </motion.div>

        {/* Rapid Deployment */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 bg-[#CCFF00] rounded-[3rem] p-10 flex items-center justify-between shadow-xl group cursor-pointer"
        >
          <div className="max-w-[60%]">
            <h3 className="text-3xl font-headline text-black leading-tight">Rapid Creative <br />Execution</h3>
            <p className="text-black/60 text-sm mt-2">Turning complex brand strategies into high-engagement visuals in record time.</p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="text-black opacity-20"
          >
            <Layers size={80} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

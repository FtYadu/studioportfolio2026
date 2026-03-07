
'use client';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { BentoSkills } from '@/components/BentoSkills';
import { Gallery } from '@/components/Gallery';
import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { user, isUserLoading } = useUser();

  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      
      <Hero />
      
      <Marquee />
      
      <BentoSkills />
      
      <div className="w-full h-px bg-black/5" />
      
      {/* Dynamic Gallery Section */}
      <section className="bg-white">
        <Gallery />
      </section>
      
      <section className="px-6 py-32 bg-primary text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} className="text-[#CCFF00]" />
              AI-Powered Innovation
            </div>
            <h2 className="text-5xl md:text-7xl font-headline tracking-tighter mb-8 max-w-4xl mx-auto">
              Ready to automate your <span className="italic text-[#CCFF00]">creative engine?</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">
              Combining world-class production value with customized AI workflows to scale your brand's visual identity.
            </p>
            <Button size="lg" className="bg-[#CCFF00] text-black hover:bg-white rounded-full px-10 h-16 text-lg font-bold group">
              Start a Project
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CCFF00]/10 blur-[120px] rounded-full -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full -ml-64 -mb-64" />
      </section>

      <footer className="px-6 py-24 text-center border-t border-black/5 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-headline text-[#4A4A4A] mb-12 leading-tight">
            Let's build the <span className="text-primary italic">future</span> of visual tech together.
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
            <a href="mailto:hello@yadukrishnan.com" className="text-xl font-bold hover:text-primary transition-colors">
              hello@yadukrishnan.com
            </a>
            <div className="hidden md:block w-2 h-2 rounded-full bg-black/20" />
            <a href="https://linkedin.com" className="text-xl font-bold hover:text-primary transition-colors">
              LinkedIn
            </a>
            <div className="hidden md:block w-2 h-2 rounded-full bg-black/20" />
            <a href="https://instagram.com" className="text-xl font-bold hover:text-primary transition-colors">
              Instagram
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-black/5 text-xs font-bold uppercase tracking-widest opacity-40">
            <p>© 2025 YADU KRISHNAN K S</p>
            <p>POWERED BY NEXUSFOLIO AI</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

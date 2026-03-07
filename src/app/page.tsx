
'use client';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { BentoSkills } from '@/components/BentoSkills';
import { Gallery } from '@/components/Gallery';
import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { user } = useUser();

  const experiences = [
    { title: "Multimedia Specialist", company: "SFC Group", period: "Most Recent", description: "Led multimedia production for multiple high-end F&B brands in Abu Dhabi." },
    { title: "Marketing Multimedia", company: "TEN11", period: "2024 - 2025", description: "Developed short-form content strategies and high-engagement visuals for hospitality." },
    { title: "Senior Videographer", company: "Maven Events", period: "Professional", description: "Documenting high-profile corporate and luxury events across UAE." },
  ];

  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      
      <Hero />
      
      <Marquee />
      
      <BentoSkills />
      
      {/* Professional Experience Highlight */}
      <section className="px-6 py-32 bg-white" id="tech">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs mb-6">
                <Briefcase size={14} />
                Professional Journey
              </div>
              <h2 className="text-5xl md:text-7xl font-headline tracking-tighter text-[#4A4A4A] mb-12">
                Proven impact in <br /><span className="text-primary italic">High-Stakes</span> environments.
              </h2>
              <div className="space-y-12">
                {experiences.map((exp, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-2xl font-bold text-[#4A4A4A] group-hover:text-primary transition-colors">{exp.company}</h4>
                      <span className="text-xs font-bold uppercase tracking-widest opacity-40">{exp.period}</span>
                    </div>
                    <p className="text-lg font-headline text-primary mb-2 italic">{exp.title}</p>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="bg-primary/5 rounded-[3rem] p-12 border border-primary/10">
                <GraduationCap className="text-primary mb-6" size={48} />
                <h3 className="text-3xl font-headline text-[#4A4A4A] mb-4">Academic Engineering</h3>
                <p className="text-xl text-muted-foreground mb-8">
                  My background in <span className="text-primary font-bold">Electronics & Instrumentation Engineering (B.Tech)</span> allows me to approach media through a systems-oriented lens, ensuring zero downtime and optimized technical pipelines.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest opacity-60">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Instrumentation Systems
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest opacity-60">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Advanced Technical Troubleshooting
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest opacity-60">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    AI Workflow Architecture
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="w-full h-px bg-black/5" />
      
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
              Nexus Creative Strategy
            </div>
            <h2 className="text-5xl md:text-8xl font-headline tracking-tighter mb-8 max-w-5xl mx-auto">
              Ready to <span className="italic text-[#CCFF00]">scale</span> your brand's visual identity?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">
              Combining world-class Sony Cine production with customized AI workflows to automate your content engine.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-[#CCFF00] text-black hover:bg-white rounded-full px-12 h-20 text-xl font-bold group">
                Work With Me
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-12 h-20 text-xl font-bold">
                Download Resume
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CCFF00]/10 blur-[120px] rounded-full -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full -ml-64 -mb-64" />
      </section>

      <footer className="px-6 py-24 text-center border-t border-black/5 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-headline text-[#4A4A4A] mb-12 leading-tight">
            Building the <span className="text-primary italic">future</span> of visual tech.
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
            <a href="mailto:FT.YADUWORK@GMAIL.COM" className="text-xl font-bold hover:text-primary transition-colors">
              FT.YADUWORK@GMAIL.COM
            </a>
            <div className="hidden md:block w-2 h-2 rounded-full bg-black/20" />
            <a href="tel:0585511241" className="text-xl font-bold hover:text-primary transition-colors">
              058-5511241
            </a>
            <div className="hidden md:block w-2 h-2 rounded-full bg-black/20" />
            <a href="#" className="text-xl font-bold hover:text-primary transition-colors">
              LinkedIn
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-black/5 text-xs font-bold uppercase tracking-widest opacity-40">
            <p>© 2025 YADU KRISHNAN K S</p>
            <p>ABU DHABI, UAE</p>
          </div>
        </div>
      </footer>
    </main>
  );
}


import { getAssets } from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { BentoSkills } from '@/components/BentoSkills';
import { Gallery } from '@/components/Gallery';

export default async function Home() {
  const assets = await getAssets();

  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      
      <Hero />
      
      <Marquee />
      
      <BentoSkills />
      
      <div className="w-full h-px bg-black/5" />
      
      <Gallery assets={assets} />
      
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
            <p>DESIGNED & BUILT BY NEXUSFOLIO</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

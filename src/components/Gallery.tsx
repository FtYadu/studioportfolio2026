
"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AssetCard } from './AssetCard';
import { useCollection, useFirestore, useMemoFirebase, useUser, setDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { Skeleton } from './ui/skeleton';
import { Filter, LayoutGrid, Plus, Info, Camera } from 'lucide-react';
import { Button } from './ui/button';

// Resume-aligned seed data
const DEFAULT_ASSETS = [
  { id: '1', url: 'https://picsum.photos/seed/yadu1/800/1000', caption: 'Luxury Hospitality Visuals | Yas Bay', tags: ['Hospitality', 'Cinematic', 'Sony Cine'], type: 'image' },
  { id: '2', url: 'https://picsum.photos/seed/yadu2/800/1200', caption: 'Automative Campaign | Voyah Electric', tags: ['Automotive', 'Visual Ads', 'Color Grade'], type: 'image' },
  { id: '3', url: 'https://picsum.photos/seed/yadu3/800/800', caption: 'Event Storytelling | Louvre Abu Dhabi', tags: ['Events', 'Cultural', 'Maven'], type: 'image' },
  { id: '4', url: 'https://picsum.photos/seed/yadu4/800/1100', caption: 'F&B Branding | Joud Coffee', tags: ['F&B', 'Content Strategy', 'Lifestyle'], type: 'image' },
  { id: '5', url: 'https://picsum.photos/seed/yadu5/800/1000', caption: 'AI-Enhanced Production Pipeline', tags: ['AI Workflow', 'GenAI', 'Automation'], type: 'image' },
  { id: '6', url: 'https://picsum.photos/seed/yadu6/800/1200', caption: 'Retail Visual Direction | Galleries Lafayette', tags: ['Luxury Retail', 'Direction', 'Motion'], type: 'image' },
];

export const Gallery = () => {
  const { firestore } = useFirestore();
  const { user } = useUser();

  const portfolioId = user?.uid || 'public-portfolio';

  const assetsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'users', portfolioId, 'assets'),
      orderBy('id', 'asc')
    );
  }, [firestore, portfolioId]);

  const { data: assets, isLoading } = useCollection(assetsQuery);

  useEffect(() => {
    if (firestore && assets?.length === 0 && user) {
      DEFAULT_ASSETS.forEach(asset => {
        const assetRef = doc(firestore, 'users', user.uid, 'assets', asset.id);
        setDocumentNonBlocking(assetRef, { ...asset, createdAt: new Date().toISOString() }, { merge: true });
      });
    }
  }, [firestore, assets, user]);

  return (
    <section className="px-6 py-32 max-w-[1600px] mx-auto min-h-screen" id="work">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
        <div>
          <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs mb-4">
            <Camera size={14} />
            Visual Portfolio
          </div>
          <h2 className="text-6xl md:text-8xl font-headline text-[#4A4A4A] tracking-tighter leading-none">
            Selected <span className="text-primary italic">Work</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-full px-6 border-black/10 hover:bg-black hover:text-white transition-all h-12">
            <Filter size={14} className="mr-2" />
            Sectors
          </Button>
          {user?.uid === portfolioId && (
            <Button className="bg-primary text-white rounded-full px-8 h-12 hover:scale-105 transition-transform shadow-lg shadow-primary/20">
              <Plus size={14} className="mr-2" />
              Upload Asset
            </Button>
          )}
        </div>
      </div>

      {!user && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-8 bg-secondary/10 rounded-[2.5rem] border border-secondary/20 flex flex-col md:flex-row items-center gap-6 justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
              <Info size={24} />
            </div>
            <div>
              <h4 className="font-bold text-[#4A4A4A] mb-1">Interactive AI Editor</h4>
              <p className="text-sm text-muted-foreground max-w-xl">
                Sign in to see how I use AI to optimize metadata and content strategy in real-time. 
                Currently viewing the curated public showreel.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="px-4 py-2 bg-white/50 rounded-full text-[10px] font-bold uppercase tracking-widest border border-black/5">Hospitality</div>
             <div className="px-4 py-2 bg-white/50 rounded-full text-[10px] font-bold uppercase tracking-widest border border-black/5">Automotive</div>
             <div className="px-4 py-2 bg-white/50 rounded-full text-[10px] font-bold uppercase tracking-widest border border-black/5">Events</div>
          </div>
        </motion.div>
      )}

      {isLoading ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="w-full aspect-[4/5] rounded-[2.5rem]" />
          ))}
        </div>
      ) : (
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8"
        >
          <AnimatePresence mode='popLayout'>
            {(assets && assets.length > 0 ? assets : DEFAULT_ASSETS).map((asset) => (
              <motion.div 
                key={asset.id} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="break-inside-avoid"
              >
                <AssetCard asset={asset as any} userId={portfolioId} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};

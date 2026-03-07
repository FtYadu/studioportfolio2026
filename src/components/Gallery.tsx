
"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AssetCard } from './AssetCard';
import { useCollection, useFirestore, useMemoFirebase, useUser, setDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { Skeleton } from './ui/skeleton';
import { Filter, LayoutGrid, Plus, Info } from 'lucide-react';
import { Button } from './ui/button';

// Seed data for a new portfolio if none exists
const DEFAULT_ASSETS = [
  { id: '1', url: 'https://picsum.photos/seed/101/800/1000', caption: 'Atmospheric Cinematic Study', tags: ['Cinematic', 'Lighting', '3D'], type: 'image' },
  { id: '2', url: 'https://picsum.photos/seed/102/800/1200', caption: 'AI Integrated Workflow v1.0', tags: ['Workflow', 'Tech', 'Automation'], type: 'image' },
  { id: '3', url: 'https://picsum.photos/seed/103/800/800', caption: 'High-End Gear Visualization', tags: ['Hardware', 'Symmetry'], type: 'image' },
  { id: '4', url: 'https://picsum.photos/seed/104/800/1100', caption: 'Abstract Digital Pulse', tags: ['Abstract', 'Motion', 'Vibrant'], type: 'image' },
  { id: '5', url: 'https://picsum.photos/seed/105/800/1000', caption: 'Modern Studio Environment', tags: ['Architecture', 'Clean'], type: 'image' },
];

export const Gallery = () => {
  const { firestore } = useFirestore();
  const { user } = useUser();

  // For this prototype, we'll use a fixed 'public-portfolio' ID or the user's ID
  const portfolioId = user?.uid || 'public-portfolio';

  const assetsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'users', portfolioId, 'assets'),
      orderBy('id', 'asc')
    );
  }, [firestore, portfolioId]);

  const { data: assets, isLoading } = useCollection(assetsQuery);

  // Initialize data if empty (for prototype demo)
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
            <LayoutGrid size={14} />
            Portfolio Index
          </div>
          <h2 className="text-6xl md:text-8xl font-headline text-[#4A4A4A] tracking-tighter leading-none">
            Selected <span className="text-primary italic">Works</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-full px-6 border-black/10 hover:bg-black hover:text-white transition-all">
            <Filter size={14} className="mr-2" />
            Filter
          </Button>
          {user?.uid === portfolioId && (
            <Button className="bg-primary text-white rounded-full px-6 hover:scale-105 transition-transform">
              <Plus size={14} className="mr-2" />
              Add Asset
            </Button>
          )}
        </div>
      </div>

      {!user && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-6 bg-secondary/10 rounded-[2rem] border border-secondary/20 flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
            <Info size={20} />
          </div>
          <div>
            <h4 className="font-bold text-[#4A4A4A] mb-1">Interactive Mode Disabled</h4>
            <p className="text-sm text-muted-foreground">Sign in to refine captions and tags using Nexus AI. You are currently viewing the public demonstration portfolio.</p>
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
            {(assets || DEFAULT_ASSETS).map((asset) => (
              <motion.div 
                key={asset.id} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="break-inside-avoid"
              >
                <AssetCard asset={asset} userId={portfolioId} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};

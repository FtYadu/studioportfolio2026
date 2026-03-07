
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AssetCard } from './AssetCard';
import { useCollection, useFirestore, useMemoFirebase, useUser, setDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { Skeleton } from './ui/skeleton';
import { Filter, Plus, Info, Camera, X, Maximize2, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from 'next/image';

const CATEGORIES = ["All", "Hospitality", "Automotive", "Events", "AI Workflow", "Luxury Retail"];

// Resume-aligned seed data
const DEFAULT_ASSETS = [
  { id: '1', url: 'https://picsum.photos/seed/yadu1/800/1000', caption: 'Luxury Hospitality Visuals | Yas Bay', tags: ['Hospitality', 'Cinematic', 'Sony Cine'], type: 'image' },
  { id: '2', url: 'https://picsum.photos/seed/yadu2/800/1200', caption: 'Automotive Campaign | Voyah Electric', tags: ['Automotive', 'Visual Ads', 'Color Grade'], type: 'image' },
  { id: '3', url: 'https://picsum.photos/seed/yadu3/800/800', caption: 'Event Storytelling | Louvre Abu Dhabi', tags: ['Events', 'Cultural', 'Maven'], type: 'image' },
  { id: '4', url: 'https://picsum.photos/seed/yadu4/800/1100', caption: 'F&B Branding | Joud Coffee', tags: ['Hospitality', 'F&B', 'Lifestyle'], type: 'image' },
  { id: '5', url: 'https://picsum.photos/seed/yadu5/800/1000', caption: 'AI-Enhanced Production Pipeline', tags: ['AI Workflow', 'GenAI', 'Automation'], type: 'image' },
  { id: '6', url: 'https://picsum.photos/seed/yadu6/800/1200', caption: 'Retail Visual Direction | Galleries Lafayette', tags: ['Luxury Retail', 'Direction', 'Motion'], type: 'image' },
];

export const Gallery = () => {
  const { firestore } = useFirestore();
  const { user } = useUser();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null);

  const portfolioId = user?.uid || 'public-portfolio';

  const assetsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'users', portfolioId, 'assets'),
      orderBy('id', 'asc')
    );
  }, [firestore, portfolioId]);

  const { data: assets, isLoading } = useCollection(assetsQuery);

  const displayAssets = useMemo(() => {
    const list = assets && assets.length > 0 ? assets : DEFAULT_ASSETS;
    if (activeCategory === "All") return list;
    return list.filter(asset => 
      asset.tags?.some((tag: string) => tag.toLowerCase().includes(activeCategory.toLowerCase()))
    );
  }, [assets, activeCategory]);

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
        
        <div className="flex flex-wrap items-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                activeCategory === cat 
                ? "bg-black text-white border-black" 
                : "bg-white text-black/40 border-black/5 hover:border-black/20"
              }`}
            >
              {cat}
            </button>
          ))}
          {user?.uid === portfolioId && (
            <Button className="bg-primary text-white rounded-full px-8 h-12 hover:scale-105 transition-transform shadow-lg shadow-primary/20 ml-4">
              <Plus size={14} className="mr-2" />
              Upload
            </Button>
          )}
        </div>
      </div>

      {!user && activeCategory === "All" && (
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
              <h4 className="font-bold text-[#4A4A4A] mb-1">Interactive Showcase</h4>
              <p className="text-sm text-muted-foreground max-w-xl">
                Click any image to enter the high-fidelity showcase mode. 
                Sign in to see how I use AI to optimize metadata in real-time.
              </p>
            </div>
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
            {displayAssets.map((asset) => (
              <motion.div 
                key={asset.id} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="break-inside-avoid"
                onClick={() => setSelectedAsset(asset)}
              >
                <AssetCard asset={asset as any} userId={portfolioId} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Showcase Lightbox */}
      <Dialog open={!!selectedAsset} onOpenChange={() => setSelectedAsset(null)}>
        <DialogContent className="max-w-[90vw] h-[90vh] p-0 overflow-hidden border-none bg-black/95 backdrop-blur-2xl">
          <div className="relative w-full h-full flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="relative flex-1 bg-black/20 flex items-center justify-center p-4">
              {selectedAsset && (
                <div className="relative w-full h-full max-h-full">
                  <Image
                    src={selectedAsset.url}
                    alt={selectedAsset.caption}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
              <button 
                onClick={() => setSelectedAsset(null)}
                className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Info Section */}
            <div className="w-full lg:w-[450px] bg-white p-12 overflow-y-auto">
              {selectedAsset && (
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] mb-6">
                    <Maximize2 size={12} />
                    Project Details
                  </div>
                  
                  <h3 className="text-4xl font-headline text-[#4A4A4A] tracking-tighter mb-6 leading-tight">
                    {selectedAsset.caption}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-12">
                    {selectedAsset.tags?.map((tag: string) => (
                      <span key={tag} className="px-4 py-1.5 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full border border-primary/10">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-8 mb-12">
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-3">Creative Strategy</h5>
                      <p className="text-muted-foreground leading-relaxed">
                        This piece showcases a blend of professional cinematography and high-impact visual direction, tailored specifically for the UAE's luxury brand ecosystem.
                      </p>
                    </div>
                    
                    <div className="p-6 bg-[#F5F5F7] rounded-3xl border border-black/5">
                      <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] mb-3">
                        <Sparkles size={12} className="text-[#FF5E00]" />
                        Technical Stack
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[9px] font-bold uppercase opacity-40">Capture</p>
                          <p className="text-xs font-bold">Sony Cine Series</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase opacity-40">Post</p>
                          <p className="text-xs font-bold">DaVinci Resolve</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-12 border-t border-black/5">
                    <Button size="lg" className="w-full rounded-full bg-black text-white hover:bg-primary h-14 font-bold uppercase tracking-widest text-xs">
                      Enquire About Project
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

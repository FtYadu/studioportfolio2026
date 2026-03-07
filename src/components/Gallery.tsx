"use client";

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCollection, useFirestore, useMemoFirebase, useUser, setDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { Skeleton } from './ui/skeleton';
import { Camera, Plus, Info, X, Maximize2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from 'next/image';
import { cn } from '@/lib/utils';

const CATEGORIES = ["All", "Hospitality", "Automotive", "Events", "AI Workflow", "Luxury Retail"];

const DEFAULT_ASSETS = [
  { id: '1', url: 'https://picsum.photos/seed/yadu1/1200/1800', caption: 'Luxury Hospitality Visuals | Yas Bay', tags: ['Hospitality', 'Cinematic', 'Sony Cine'], type: 'image' },
  { id: '2', url: 'https://picsum.photos/seed/yadu2/1200/1800', caption: 'Automotive Campaign | Voyah Electric', tags: ['Automotive', 'Visual Ads', 'Color Grade'], type: 'image' },
  { id: '3', url: 'https://picsum.photos/seed/yadu3/1200/1800', caption: 'Event Storytelling | Louvre Abu Dhabi', tags: ['Events', 'Cultural', 'Maven'], type: 'image' },
  { id: '4', url: 'https://picsum.photos/seed/yadu4/1200/1800', caption: 'F&B Branding | Joud Coffee', tags: ['Hospitality', 'F&B', 'Lifestyle'], type: 'image' },
  { id: '5', url: 'https://picsum.photos/seed/yadu5/1200/1800', caption: 'AI-Enhanced Production Pipeline', tags: ['AI Workflow', 'GenAI', 'Automation'], type: 'image' },
  { id: '6', url: 'https://picsum.photos/seed/yadu6/1200/1800', caption: 'Retail Visual Direction | Galleries Lafayette', tags: ['Luxury Retail', 'Direction', 'Motion'], type: 'image' },
  { id: '7', url: 'https://picsum.photos/seed/yadu7/1200/1800', caption: 'High-Impact Brand Strategy', tags: ['Strategy', 'Luxury'], type: 'image' },
  { id: '8', url: 'https://picsum.photos/seed/yadu8/1200/1800', caption: 'Cinematic Post Production', tags: ['DaVinci', 'Editing'], type: 'image' },
];

export const Gallery = () => {
  const { firestore } = useFirestore();
  const { user } = useUser();
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [openIndex, setOpenIndex] = useState(-1);
  const [shift, setShift] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

  const handlePointerMove = (e: React.PointerEvent) => {
    if (openIndex !== -1 || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // Find closest item based on X position
    let closestIdx = -1;
    let minDistance = Infinity;

    itemsRef.current.forEach((item, idx) => {
      if (item) {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(e.clientX - itemCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      }
    });

    if (closestIdx !== -1) setHoverIndex(closestIdx);
  };

  const centerItem = (idx: number) => {
    if (!containerRef.current || !itemsRef.current[idx]) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const item = itemsRef.current[idx];
    if (!item) return;

    const itemRect = item.getBoundingClientRect();
    const containerCenterX = containerRect.left + containerRect.width / 2;
    const itemCenterX = itemRect.left + itemRect.width / 2;
    
    const delta = containerCenterX - itemCenterX;
    const maxShift = containerRect.width * 0.35;
    const clamped = Math.max(-maxShift, Math.min(maxShift, delta));
    setShift(clamped);
  };

  const handleItemClick = (idx: number) => {
    if (openIndex === idx) {
      setOpenIndex(-1);
      setShift(0);
    } else {
      setOpenIndex(idx);
      setTimeout(() => centerItem(idx), 50);
    }
  };

  const getCardClasses = (idx: number) => {
    const base = "gallery-3d-item";
    if (openIndex === idx) return cn(base, "is-open");
    if (openIndex !== -1) return base; // Other items when one is open

    if (hoverIndex === idx) return cn(base, "is-hover-main");
    const diff = idx - hoverIndex;
    if (diff === 1) return cn(base, "is-right-1");
    if (diff === 2) return cn(base, "is-right-2");
    if (diff === 3) return cn(base, "is-right-3");
    if (diff === 4) return cn(base, "is-right-4");
    if (diff === -1) return cn(base, "is-left-1");
    if (diff === -2) return cn(base, "is-left-2");
    if (diff === -3) return cn(base, "is-left-3");
    if (diff === -4) return cn(base, "is-left-4");
    
    return base;
  };

  return (
    <section className="px-6 py-32 max-w-[1800px] mx-auto min-h-screen overflow-hidden" id="work">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 px-12">
        <div>
          <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs mb-4">
            <Camera size={14} />
            Showcase Exhibition
          </div>
          <h2 className="text-6xl md:text-9xl font-headline text-[#4A4A4A] tracking-tighter leading-none">
            3D <span className="text-primary italic">Portfolio</span>
          </h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(-1);
                setShift(0);
              }}
              className={cn(
                "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border",
                activeCategory === cat 
                ? "bg-black text-white border-black" 
                : "bg-white text-black/40 border-black/5 hover:border-black/20"
              )}
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

      <div className="gallery-3d-wrapper">
        <div 
          ref={containerRef}
          className={cn(
            "gallery-3d-items",
            hoverIndex !== -1 && "hovering",
            openIndex !== -1 && "is-open"
          )}
          style={{ '--gallery-shift': `${shift}px` } as any}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => {
            if (openIndex === -1) setHoverIndex(-1);
          }}
        >
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <Skeleton key={i} className="gallery-3d-item opacity-20" />
            ))
          ) : (
            displayAssets.map((asset, idx) => (
              <div
                key={asset.id}
                ref={el => { itemsRef.current[idx] = el; }}
                className={getCardClasses(idx)}
                onClick={() => handleItemClick(idx)}
                style={{ backgroundImage: `url(${asset.url})` }}
              >
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white transition-opacity duration-500",
                  openIndex === idx ? "opacity-100" : "opacity-0"
                )}>
                  <div className="flex justify-between items-end gap-6">
                    <div className="flex-1">
                      <div className="flex gap-2 mb-4">
                        {asset.tags?.map((tag: string) => (
                          <span key={tag} className="text-[9px] uppercase font-bold tracking-widest px-3 py-1 bg-white/10 backdrop-blur-md rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-4xl font-headline tracking-tighter leading-tight">{asset.caption}</h3>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full h-14 w-14 p-0">
                        <Sparkles size={20} />
                      </Button>
                      <Button className="bg-[#CCFF00] text-black hover:bg-white rounded-full h-14 w-14 p-0">
                        <Maximize2 size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Edge Lighting Effect */}
                <div className="absolute inset-0 border-[0.5px] border-white/5 pointer-events-none rounded-[inherit]" />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-20 flex justify-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 px-12 text-center">
        <div className="flex items-center gap-2">
          <ChevronLeft size={12} />
          Scroll & Hover
          <ChevronRight size={12} />
        </div>
        <div className="w-px h-4 bg-black/20" />
        <div>Click To Expand</div>
      </div>
    </section>
  );
};

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Info, CheckCircle2, Maximize2 } from 'lucide-react';
import { generateAssetMetadata } from '@/ai/flows/generate-asset-metadata-flow';
import { doc } from 'firebase/firestore';
import { useFirestore, useUser, updateDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

interface AssetData {
  id: string;
  url: string;
  caption: string;
  tags: string[];
  type: string;
}

interface AssetCardProps {
  asset: AssetData;
  userId: string;
}

export const AssetCard = ({ asset, userId }: AssetCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);
  const [justUpdated, setJustUpdated] = useState(false);
  const { firestore } = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();

  const handleEnrich = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!firestore || !user || user.uid !== userId) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: "Sign in to refine this asset.",
      });
      return;
    }

    setIsEnriching(true);
    try {
      const result = await generateAssetMetadata({
        assetUrl: asset.url,
        currentCaption: asset.caption,
      });

      const assetRef = doc(firestore, 'users', userId, 'assets', asset.id);
      
      updateDocumentNonBlocking(assetRef, {
        caption: result.refinedCaption,
        tags: result.suggestedTags,
        updatedAt: new Date().toISOString()
      });

      setJustUpdated(true);
      setTimeout(() => setJustUpdated(false), 3000);
      
      toast({
        title: "Asset Refined",
        description: "AI metadata successfully saved to Firestore.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Enrichment Failed",
        description: "The AI curator encountered an error.",
      });
    } finally {
      setIsEnriching(false);
    }
  };

  const tags = asset.tags || [];

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full rounded-[2.5rem] bg-white overflow-hidden shadow-lg group cursor-pointer transition-all duration-500 ease-out border border-black/5"
      style={{
        zIndex: isHovered ? 10 : 1,
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={asset.url}
          alt={asset.caption}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Enrichment Status */}
        <div className="absolute top-6 left-6 z-20">
          <AnimatePresence>
            {justUpdated && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 px-3 py-1 bg-[#CCFF00] text-black rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl"
              >
                <CheckCircle2 size={12} />
                Enriched
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 text-white"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-wrap gap-1.5 max-w-[80%]">
                  {tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[8px] uppercase font-bold tracking-[0.1em] px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  {user?.uid === userId && (
                    <button 
                      onClick={handleEnrich}
                      disabled={isEnriching}
                      className="w-9 h-9 flex items-center justify-center bg-primary text-white rounded-full hover:scale-110 transition-transform disabled:opacity-50 shadow-xl border border-white/20"
                      title="Optimize with AI"
                    >
                      <Sparkles size={14} className={isEnriching ? "animate-spin" : ""} />
                    </button>
                  )}
                  <div className="w-9 h-9 flex items-center justify-center bg-white/10 backdrop-blur-md text-white rounded-full border border-white/10">
                    <Maximize2 size={14} />
                  </div>
                </div>
              </div>
              
              <h4 className="text-xl font-headline mb-2 leading-tight line-clamp-2">
                {asset.caption}
              </h4>
              <p className="text-[9px] uppercase font-bold tracking-[0.2em] opacity-50 flex items-center gap-2">
                <Info size={10} />
                Showcase Details
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

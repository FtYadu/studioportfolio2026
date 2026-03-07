
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Asset } from '@/lib/data';
import { Sparkles } from 'lucide-react';
import { generateAssetMetadata } from '@/ai/flows/generate-asset-metadata-flow';

interface AssetCardProps {
  asset: Asset;
}

export const AssetCard = ({ asset }: AssetCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [enrichedData, setEnrichedData] = useState<{ caption: string; tags: string[] } | null>(null);
  const [isEnriching, setIsEnriching] = useState(false);

  const handleEnrich = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEnriching(true);
    try {
      const result = await generateAssetMetadata({
        assetUrl: asset.url,
        currentCaption: asset.caption,
      });
      setEnrichedData({
        caption: result.refinedCaption,
        tags: result.suggestedTags,
      });
    } catch (error) {
      console.error("Enrichment failed:", error);
    } finally {
      setIsEnriching(false);
    }
  };

  const tags = enrichedData?.tags || asset.tags.split(';');

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full rounded-[2.5rem] bg-white overflow-hidden shadow-lg group cursor-pointer transition-all duration-500 ease-out"
      style={{
        zIndex: isHovered ? 50 : 1,
      }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={asset.url}
          alt={asset.caption}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-white/20 backdrop-blur-md rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={handleEnrich}
                  disabled={isEnriching}
                  className="p-2 bg-primary rounded-full hover:scale-110 active:scale-95 transition-transform disabled:opacity-50"
                  title="Enrich with AI"
                >
                  <Sparkles size={14} className={isEnriching ? "animate-spin" : ""} />
                </button>
              </div>
              
              <h4 className="text-xl font-headline mb-2 leading-tight">
                {enrichedData?.caption || asset.caption}
              </h4>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

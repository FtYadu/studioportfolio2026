
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Asset } from '@/lib/data';
import { AssetCard } from './AssetCard';

interface GalleryProps {
  assets: Asset[];
}

export const Gallery = ({ assets }: GalleryProps) => {
  return (
    <section className="px-6 py-20 max-w-[1600px] mx-auto" id="work">
      <div className="mb-16">
        <h2 className="text-5xl md:text-7xl font-headline text-[#4A4A4A] tracking-tighter">
          Selected <span className="text-primary">Works</span>
        </h2>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
        {assets.map((asset) => (
          <div key={asset.id} className="break-inside-avoid">
            <AssetCard asset={asset} />
          </div>
        ))}
      </div>
    </section>
  );
};

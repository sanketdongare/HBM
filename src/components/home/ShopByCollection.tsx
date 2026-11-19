'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { COLLECTIONS } from '@/data/products';

export const ShopByCollection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#f5efe6] text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block mb-2">
            Curated Aesthetics
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal">
            Shop By Collection
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-taupe leading-relaxed">
            Every home tells a distinct architectural story. Explore our collections curated by material mastery and design philosophy.
          </p>
        </div>

        {/* 3x2 Grid for 6 collections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COLLECTIONS.map(collection => (
            <Link
              key={collection.id}
              href={`/shop?category=${encodeURIComponent(collection.title.split(' ')[0])}`}
              className="group relative aspect-[4/5] rounded overflow-hidden shadow-luxury transition-all duration-500 hover:shadow-2xl"
            >
              {/* Background Image */}
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent group-hover:from-charcoal/95 transition-all duration-300" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-cream">
                <span className="text-[10px] uppercase tracking-[0.25em] text-mutedGold font-semibold mb-1">
                  {collection.itemCount} Designs
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-cream font-light mb-2 group-hover:text-goldLight transition-colors">
                  {collection.title}
                </h3>
                <p className="text-xs text-beige/80 line-clamp-2 leading-relaxed font-light mb-6">
                  {collection.subtitle}
                </p>

                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-cream group-hover:text-mutedGold transition-colors pt-2 border-t border-cream/20">
                  <span>Explore Collection</span>
                  <ArrowForwardIcon fontSize="small" className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

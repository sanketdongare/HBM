import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { COLLECTIONS } from '@/data/products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Curated Collections | Homes By Meera',
  description:
    'Explore curated console table collections by Homes By Meera: Modern, Luxury, Solid Wood, Italian Marble, Minimalist, and Architectural Statement designs.',
};

export default function CollectionsPage() {
  return (
    <div className="bg-cream min-h-screen py-16 sm:py-24 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block mb-2">
            The Design Editions
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal">
            Curated Collections
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-taupe leading-relaxed">
            Each collection is an exploration in material mastery and spatial proportion. Explore our editions tailored to bring harmony, warmth, and quiet luxury to your foyer or living space.
          </p>
        </div>

        {/* Collections Stacked Editorial Showcase */}
        <div className="space-y-16 sm:space-y-24">
          {COLLECTIONS.map((collection, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={collection.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              >
                {/* Image (7 cols) */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative aspect-[16/10] sm:aspect-[16/10] rounded overflow-hidden shadow-2xl bg-beige/30 group">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-charcoal text-cream text-[10px] uppercase tracking-widest font-semibold">
                      Edition 0{index + 1}
                    </div>
                  </div>
                </div>

                {/* Text Content (5 cols) */}
                <div
                  className={`lg:col-span-5 space-y-5 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <span className="text-xs uppercase tracking-[0.25em] text-mutedGold font-semibold block">
                    {collection.itemCount} Designs Available
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light leading-snug">
                    {collection.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-taupe font-medium uppercase tracking-wider">
                    {collection.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-taupe/90 leading-relaxed font-light">
                    {collection.description}
                  </p>

                  <div className="pt-4">
                    <Link
                      href={`/shop?category=${encodeURIComponent(
                        collection.title.split(' ')[0]
                      )}`}
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-charcoal hover:bg-darkBrown text-cream text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
                    >
                      <span>Explore {collection.title}</span>
                      <ArrowForwardIcon fontSize="small" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-cream text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block">
              Our Design Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal leading-tight">
              Beautiful Furniture. <br />
              <span className="italic font-normal">Thoughtfully Chosen.</span>
            </h2>

            <p className="text-sm sm:text-base text-taupe leading-relaxed font-light">
              At Homes By Meera, we believe every corner of your home deserves to feel special. Our console tables are thoughtfully selected to bring together beauty, functionality and timeless design, helping you create spaces that reflect your personal style.
            </p>

            <p className="text-xs sm:text-sm text-taupe/90 leading-relaxed font-light">
              Rooted in Pune, Maharashtra, we bridge the gap between architectural interior aesthetics and artisan craftsmanship. Every console table begins with hand-selected raw materials—from kiln-dried solid hardwoods to single-origin marble slabs—finished with enduring care to age gracefully alongside your memories.
            </p>

            {/* Three key pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-beige/80">
              <div className="space-y-1">
                <HandymanOutlinedIcon className="text-mutedGold" fontSize="small" />
                <h4 className="font-serif text-sm uppercase tracking-wider text-charcoal font-medium">Artisanal Craft</h4>
                <p className="text-[11px] text-taupe leading-normal">Meticulous traditional joinery and hand-rubbed wax seals.</p>
              </div>
              <div className="space-y-1">
                <SpaOutlinedIcon className="text-mutedGold" fontSize="small" />
                <h4 className="font-serif text-sm uppercase tracking-wider text-charcoal font-medium">Pure Materials</h4>
                <p className="text-[11px] text-taupe leading-normal">FSC-certified timber, natural Carrara and Makrana marble.</p>
              </div>
              <div className="space-y-1">
                <WorkspacePremiumOutlinedIcon className="text-mutedGold" fontSize="small" />
                <h4 className="font-serif text-sm uppercase tracking-wider text-charcoal font-medium">Timeless Value</h4>
                <p className="text-[11px] text-taupe leading-normal">Resistant to fleeting trends; built for generational living.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-darkBrown text-cream text-xs uppercase tracking-[0.2em] font-medium hover:bg-charcoal transition-colors shadow-md"
              >
                <span>Discover Our Story</span>
                <ArrowForwardIcon fontSize="small" />
              </Link>
            </div>
          </div>

          {/* Right Image Composition (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded overflow-hidden shadow-2xl bg-beige/30">
              <Image
                src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80"
                alt="Homes By Meera interior craftsmanship and styling"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating Inset Studio Stamp */}
            <div className="absolute -top-6 -left-6 bg-charcoal text-cream p-5 shadow-2xl rounded hidden sm:block max-w-[200px]">
              <span className="text-[10px] uppercase tracking-[0.3em] text-mutedGold block font-semibold">
                Homes By Meera
              </span>
              <p className="text-xs font-serif mt-1 text-cream/90">
                Studio & Workshop based in Pune, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

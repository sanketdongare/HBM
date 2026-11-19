'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { INSPIRATION_ITEMS } from '@/data/products';

export const InteriorInspiration: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#f6f2ec] text-charcoal border-b border-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block mb-2">
            Curated Spaces
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal">
            Find Your Style
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-taupe leading-relaxed">
            A console table is the premier canvas of your home. Discover how our interior designers style consoles with sculptural mirrors, ambient lighting, art books, and floral stems.
          </p>
        </div>

        {/* Editorial Magazine Cards (3 columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {INSPIRATION_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-cream rounded overflow-hidden shadow-luxury border border-beige/60 flex flex-col justify-between group hover:shadow-2xl transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-beige/30">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-charcoal text-cream text-[10px] uppercase tracking-widest font-semibold">
                    Look 0{idx + 1}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-mutedGold font-semibold block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl text-charcoal font-light mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs text-taupe leading-relaxed font-light mb-6">
                    {item.description}
                  </p>

                  {/* Styling Tips checklist */}
                  <div className="space-y-2 pt-4 border-t border-beige/60 text-xs text-charcoal/80">
                    <span className="text-[10px] uppercase tracking-widest text-darkBrown font-semibold block">
                      Stylist Notes:
                    </span>
                    {item.tips.map((tip, tipIdx) => (
                      <div key={tipIdx} className="flex items-start gap-2">
                        <CheckCircleOutlineIcon style={{ fontSize: 14 }} className="text-mutedGold mt-0.5 flex-shrink-0" />
                        <span className="leading-tight">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-darkBrown hover:text-charcoal transition-colors group-hover:translate-x-1 duration-300"
                >
                  <span>Shop This Look</span>
                  <ArrowForwardIcon fontSize="small" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

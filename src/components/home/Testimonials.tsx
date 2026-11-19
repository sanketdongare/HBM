'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedIcon from '@mui/icons-material/Verified';
import { TESTIMONIALS } from '@/data/products';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevReview = () => {
    setActiveIndex(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveIndex(prev => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="py-20 sm:py-28 bg-cream text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block mb-2">
            Homeowner Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal">
            Cherished by Design Lovers
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-taupe leading-relaxed">
            Read stories from architects, stylists, and homeowners across Pune and India who transformed their living spaces with Homes By Meera.
          </p>
        </div>

        {/* Featured Testimonial Spotlight */}
        <div className="max-w-4xl mx-auto bg-warmWhite rounded border border-beige/70 p-8 sm:p-12 shadow-luxury relative">
          <FormatQuoteIcon
            style={{ fontSize: 64 }}
            className="text-beige/60 absolute top-6 right-6"
          />

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Reviewer Avatar */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden flex-shrink-0 border-2 border-mutedGold/40 shadow-md">
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>

            {/* Review Details */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-1 text-mutedGold">
                {[...Array(current.rating)].map((_, i) => (
                  <StarIcon key={i} style={{ fontSize: 18 }} />
                ))}
              </div>

              <blockquote className="font-serif text-lg sm:text-2xl text-charcoal font-light leading-relaxed italic">
                &ldquo;{current.text}&rdquo;
              </blockquote>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 sm:gap-4 text-xs">
                <span className="font-medium text-charcoal uppercase tracking-wider flex items-center gap-1">
                  {current.name}
                  <VerifiedIcon style={{ fontSize: 14 }} className="text-mutedGold" />
                </span>
                <span className="hidden sm:inline text-taupe">•</span>
                <span className="text-taupe">{current.role}, {current.city}</span>
                <span className="hidden sm:inline text-taupe">•</span>
                <span className="text-darkBrown font-semibold bg-beige/40 px-2 py-0.5 rounded">
                  {current.productName}
                </span>
              </div>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="mt-8 pt-6 border-t border-beige/60 flex items-center justify-between">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? 'w-8 bg-mutedGold' : 'w-2 bg-beige'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prevReview}
                className="p-2 rounded-full border border-beige hover:border-charcoal text-charcoal/70 hover:text-charcoal transition-colors"
                aria-label="Previous review"
              >
                <ArrowBackIcon fontSize="small" />
              </button>
              <button
                onClick={nextReview}
                className="p-2 rounded-full border border-beige hover:border-charcoal text-charcoal/70 hover:text-charcoal transition-colors"
                aria-label="Next review"
              >
                <ArrowForwardIcon fontSize="small" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

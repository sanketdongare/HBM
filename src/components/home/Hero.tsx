'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import FlareOutlinedIcon from '@mui/icons-material/FlareOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background Image with warm editorial grading */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85"
          alt="Homes By Meera luxury console table in a modern living space"
          fill
          priority
          className="object-cover object-center scale-105 animate-pulseSlow"
          sizes="100vw"
        />
        {/* Editorial Gradients: Dark luxury vignette for high readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/60 to-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center flex flex-col items-center">
        {/* Eyebrow tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/10 backdrop-blur-md border border-cream/20 text-cream/90 text-[11px] uppercase tracking-[0.3em] font-medium mb-6">
          <FlareOutlinedIcon style={{ fontSize: 13 }} className="text-mutedGold" />
          <span>The Console Table Atelier • 2026 Collection</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-cream font-light tracking-tight leading-[1.08] max-w-4xl">
          Elevate Every Corner of Your Home
        </h1>

        {/* Subheadline */}
        <p className="mt-6 sm:mt-8 font-sans text-base sm:text-lg md:text-xl text-beige/90 max-w-2xl font-light leading-relaxed tracking-wide">
          Discover thoughtfully designed console tables that bring elegance, warmth and character to your living spaces. Hand-finished with natural stone, brass, and solid hardwood.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-4 bg-mutedGold hover:bg-goldDark text-charcoal font-medium text-xs sm:text-sm uppercase tracking-[0.25em] flex items-center justify-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            <span>Shop Console Tables</span>
            <ArrowForwardIcon fontSize="small" />
          </Link>

          <Link
            href="/collections"
            className="w-full sm:w-auto px-8 py-4 bg-cream/10 hover:bg-cream/20 text-cream border border-cream/30 font-medium text-xs sm:text-sm uppercase tracking-[0.25em] flex items-center justify-center gap-2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Explore Collection</span>
          </Link>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-cream/15 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 text-cream/80 text-xs tracking-wider">
          <div className="flex items-center justify-center gap-2">
            <DiamondOutlinedIcon fontSize="small" className="text-mutedGold" />
            <span>Solid Hardwood & Natural Marble</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <PlaceOutlinedIcon fontSize="small" className="text-mutedGold" />
            <span>Pune Experience Studio</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FlareOutlinedIcon fontSize="small" className="text-mutedGold" />
            <span>Complimentary White Glove Delivery</span>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-cream/50 text-[10px] uppercase tracking-[0.3em]">
        <span>Scroll to Explore</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-mutedGold to-transparent" />
      </div>
    </section>
  );
};

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Our Studio | Homes By Meera',
  description:
    'Learn about Homes By Meera, Pune-based luxury furniture brand specializing in stylish architectural console tables crafted from solid hardwoods and natural marble.',
};

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen py-16 sm:py-24 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block">
            Our Atelier &amp; Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-charcoal leading-tight">
            Beautiful Furniture. <br />
            <span className="italic font-normal">Thoughtfully Chosen.</span>
          </h1>
          <p className="text-sm sm:text-base text-taupe leading-relaxed font-light pt-2">
            At Homes By Meera, we believe every corner of your home deserves to feel special. Our console tables are thoughtfully selected to bring together beauty, functionality and timeless design, helping you create spaces that reflect your personal style.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[4/5] rounded overflow-hidden shadow-2xl bg-beige/30">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
              alt="Homes By Meera Pune studio aesthetic"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-mutedGold font-semibold block">
              The Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light leading-snug">
              Why We Specialize in Console Tables
            </h2>
            <p className="text-xs sm:text-sm text-taupe leading-relaxed font-light">
              While dining tables and sofas command rooms, it is the console table that establishes the first impression of your sanctuary. Positioned in the entryway foyer, behind a low-slung sofa, or anchoring a gallery corridor, a console table sets the emotional tone for the entire residence.
            </p>
            <p className="text-xs sm:text-sm text-taupe leading-relaxed font-light">
              Too often, homeowners faced an uninspiring choice: flimsy flat-pack consoles that lacked tactile soul, or astronomical imported luxury items with month-long shipping delays. Homes By Meera was established in Pune to craft heirloom-standard console tables with locally sourced, world-class materials and uncompromised artisan attention.
            </p>

            <div className="pt-4 border-t border-beige/80 grid grid-cols-2 gap-6 text-xs">
              <div>
                <span className="font-serif text-2xl text-charcoal block">100%</span>
                <span className="text-taupe uppercase text-[10px] tracking-wider mt-1 block">
                  Kiln-Dried Solid Hardwoods
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl text-charcoal block">Natural</span>
                <span className="text-taupe uppercase text-[10px] tracking-wider mt-1 block">
                  Vein-Matched Marble Slabs
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="bg-warmWhite p-8 sm:p-14 rounded border border-beige shadow-luxury space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="font-serif text-3xl font-light text-charcoal">
              Craftsmanship Principles
            </h3>
            <p className="text-xs text-taupe mt-2">
              Every curve, chamfered edge, and stone joint reflects our relentless standard of excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 bg-cream/50 rounded border border-beige/60">
              <HandymanOutlinedIcon className="text-mutedGold" fontSize="medium" />
              <h4 className="font-serif text-xl font-medium text-charcoal">Artisanal Joinery</h4>
              <p className="text-xs text-taupe leading-relaxed font-light">
                We eschew plastic fasteners and weak dowels in favor of traditional mortise-and-tenon structural joints that withstand decades of daily life.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-cream/50 rounded border border-beige/60">
              <SpaOutlinedIcon className="text-mutedGold" fontSize="medium" />
              <h4 className="font-serif text-xl font-medium text-charcoal">Organic Finishing</h4>
              <p className="text-xs text-taupe leading-relaxed font-light">
                Finished with zero-VOC plant-based oil waxes and breathable satin lacquers that highlight the timber grain rather than encasing it in plastic.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-cream/50 rounded border border-beige/60">
              <WorkspacePremiumOutlinedIcon className="text-mutedGold" fontSize="medium" />
              <h4 className="font-serif text-xl font-medium text-charcoal">Bespoke Precision</h4>
              <p className="text-xs text-taupe leading-relaxed font-light">
                Need a specific length to fit between entryway alcoves? Our Pune workshop collaborates closely with architects and clients on custom dimensions.
              </p>
            </div>
          </div>
        </div>

        {/* Studio Visit Card */}
        <div className="bg-charcoal text-cream p-8 sm:p-14 rounded shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-mutedGold font-semibold block">
              Pune Studio &amp; Workshop
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-cream">
              Experience the Craft in Person
            </h3>
            <p className="text-xs sm:text-sm text-beige/80 leading-relaxed font-light">
              Visit our studio at PUSHPA Complex, Lohegaon Wagholi Road. Examine our wood stains, touch unpolished travertine samples, and preview tables before placing your order.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-mutedGold hover:bg-goldDark text-charcoal text-xs uppercase tracking-[0.2em] font-medium text-center transition-colors shadow-lg"
            >
              Book Studio Visit
            </Link>
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-cream/10 hover:bg-cream/20 text-cream border border-cream/30 text-xs uppercase tracking-[0.2em] font-medium text-center transition-colors"
            >
              Shop Console Tables
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

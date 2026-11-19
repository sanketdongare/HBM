'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';

export const FeaturedProduct: React.FC = () => {
  // Feature the Aura Console Table
  const featured = PRODUCTS[0];
  const [selectedFinish, setSelectedFinish] = useState(featured.finishes[0].name);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(featured, selectedFinish, 1);
  };

  return (
    <section className="py-20 sm:py-28 bg-warmWhite text-charcoal overflow-hidden border-y border-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Col 1: Editorial Lifestyle Image (7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded overflow-hidden shadow-2xl bg-beige/30">
              <Image
                src={featured.images[0]}
                alt={featured.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-charcoal text-cream text-[10px] uppercase tracking-[0.25em] font-semibold">
                Curator&apos;s Editorial Pick
              </div>
            </div>

            {/* Inset Detail Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-cream p-4 sm:p-6 shadow-xl border border-beige/80 max-w-xs hidden sm:block rounded">
              <span className="text-[10px] uppercase tracking-widest text-mutedGold font-semibold block">
                Artisanal Detail
              </span>
              <p className="text-xs text-charcoal font-serif mt-1 italic">
                &ldquo;Hand-fluted twin pillared pedestals crafted from kiln-seasoned white oak.&rdquo;
              </p>
            </div>
          </div>

          {/* Col 2: Product Story & Specifications (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-mutedGold text-xs mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} style={{ fontSize: 15 }} />
                  ))}
                </div>
                <span className="font-semibold text-charcoal">4.9 / 5.0</span>
                <span className="text-taupe">(38 Homeowner Reviews)</span>
              </div>

              <span className="text-xs uppercase tracking-[0.3em] text-taupe font-medium block">
                Signature Piece
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal mt-1 leading-tight">
                {featured.name}
              </h2>
              <p className="text-xs sm:text-sm text-taupe mt-3 leading-relaxed">
                {featured.description}
              </p>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-4 py-2 border-y border-beige/80">
              <span className="font-serif text-3xl font-medium text-charcoal">
                ₹{featured.price.toLocaleString('en-IN')}
              </span>
              <span className="text-base text-taupe line-through">
                ₹{featured.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs uppercase tracking-widest px-2.5 py-1 bg-mutedGold/15 text-darkBrown font-semibold rounded">
                Save 20%
              </span>
            </div>

            {/* Finishes selector */}
            <div>
              <span className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-2.5">
                Available Finishes:{' '}
                <strong className="text-darkBrown font-semibold">{selectedFinish}</strong>
              </span>
              <div className="flex flex-wrap gap-2.5">
                {featured.finishes.map(finish => (
                  <button
                    key={finish.name}
                    onClick={() => setSelectedFinish(finish.name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded border text-xs tracking-wide transition-all ${
                      selectedFinish === finish.name
                        ? 'border-charcoal bg-beige/40 text-charcoal font-medium shadow-sm'
                        : 'border-beige hover:border-taupe text-charcoal/80'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: finish.colorCode }}
                    />
                    <span>{finish.name}</span>
                    {selectedFinish === finish.name && (
                      <CheckIcon style={{ fontSize: 14 }} className="text-darkBrown" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-cream/70 p-4 rounded border border-beige/70">
              <div>
                <span className="text-taupe uppercase text-[10px] tracking-wider block">Dimensions</span>
                <span className="font-medium text-charcoal mt-0.5 block">
                  {featured.dimensions.length}&quot;L × {featured.dimensions.width}&quot;W × {featured.dimensions.height}&quot;H
                </span>
              </div>
              <div>
                <span className="text-taupe uppercase text-[10px] tracking-wider block">Lead Time</span>
                <span className="font-medium text-charcoal mt-0.5 block">
                  Ships in {featured.leadTimeDays} business days
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 bg-charcoal hover:bg-darkBrown text-cream text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-lg"
              >
                <ShoppingBagOutlinedIcon fontSize="small" />
                <span>Shop Now • Add to Bag</span>
              </button>

              <Link
                href={`/product/${featured.slug}`}
                className="py-4 px-6 border border-charcoal hover:bg-charcoal hover:text-cream text-charcoal text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all duration-300"
              >
                <span>View Details</span>
                <ArrowForwardIcon fontSize="small" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

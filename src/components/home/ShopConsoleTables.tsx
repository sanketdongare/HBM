'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ProductCard } from '@/components/products/ProductCard';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';

interface ShopConsoleTablesProps {
  onQuickView: (product: Product) => void;
}

const CATEGORIES = ['All', 'Modern', 'Luxury', 'Wooden', 'Marble', 'Minimalist', 'Statement'];

export const ShopConsoleTables: React.FC<ShopConsoleTablesProps> = ({ onQuickView }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter(
          p =>
            p.category.toLowerCase() === selectedCategory.toLowerCase() ||
            p.collections.includes(selectedCategory.toLowerCase())
        );

  return (
    <section className="py-20 sm:py-28 bg-cream text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-beige pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block mb-2">
              Signature Furniture Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal leading-tight">
              Shop Our Console Tables
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-taupe max-w-xl leading-relaxed">
              Designed as statement entryways and living anchors. Crafted with solid timber joinery, vein-matched natural marble, and hand-finished bronze.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2 text-xs uppercase tracking-wider">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 font-medium ${
                  selectedCategory === category
                    ? 'bg-charcoal text-cream shadow-sm'
                    : 'bg-warmWhite/80 text-charcoal/70 hover:text-charcoal hover:bg-beige/60 border border-beige/60'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-cream text-xs uppercase tracking-[0.25em] font-medium hover:bg-darkBrown transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            <span>View All Console Table Designs</span>
            <ArrowForwardIcon fontSize="small" />
          </Link>
          <p className="text-[11px] text-taupe mt-3 uppercase tracking-widest">
            Custom sizing & finish options available at our Pune studio
          </p>
        </div>
      </div>
    </section>
  );
};

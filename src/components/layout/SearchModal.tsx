'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchTerm('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    const query = searchTerm.toLowerCase();
    const matched = PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.material.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.collections.some(c => c.toLowerCase().includes(query))
    );
    setResults(matched);
  }, [searchTerm]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 text-center flex items-start justify-center pt-20 pb-12">
        <div className="relative inline-block w-full max-w-3xl bg-cream text-left align-middle shadow-2xl overflow-hidden border border-beige animate-fadeIn">
          {/* Search Header Input */}
          <div className="p-6 sm:p-8 border-b border-beige/80 bg-warmWhite">
            <div className="flex items-center justify-between pb-4">
              <span className="text-xs uppercase tracking-[0.25em] text-taupe font-medium">
                Search Console Tables
              </span>
              <button
                onClick={onClose}
                className="p-1 text-charcoal/60 hover:text-charcoal rounded-full transition-colors"
                aria-label="Close search"
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>

            <div className="relative flex items-center">
              <SearchIcon className="absolute left-4 text-taupe" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search by name, wood, marble, collection..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-cream/70 border border-beige text-charcoal placeholder:text-taupe/70 font-serif text-lg sm:text-xl focus:outline-none focus:border-mutedGold tracking-wide"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 text-taupe hover:text-charcoal"
                >
                  <CloseIcon fontSize="small" />
                </button>
              )}
            </div>

            {/* Quick suggested search pills */}
            <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px] text-taupe">
              <span className="uppercase tracking-wider">Trending:</span>
              {['Marble', 'Oak', 'Fluted', 'Aura', 'Minimalist', 'Travertine'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="px-2.5 py-1 bg-beige/40 hover:bg-beige text-charcoal/80 transition-colors rounded-sm tracking-wider"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8 space-y-4">
            {searchTerm.trim() ? (
              results.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-xs uppercase tracking-widest text-taupe font-medium">
                    Found {results.length} {results.length === 1 ? 'Design' : 'Designs'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {results.map(product => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="group flex gap-4 p-3 bg-warmWhite/80 hover:bg-warmWhite border border-beige/60 hover:border-mutedGold transition-all rounded"
                      >
                        <div className="relative w-20 h-20 bg-beige/30 flex-shrink-0 overflow-hidden rounded">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-mutedGold font-semibold">
                            {product.category}
                          </span>
                          <h4 className="font-serif text-base text-charcoal group-hover:text-darkBrown transition-colors truncate">
                            {product.name}
                          </h4>
                          <p className="text-xs font-medium text-charcoal mt-1">
                            ₹{product.price.toLocaleString('en-IN')}
                          </p>
                          <span className="text-[11px] text-taupe flex items-center gap-1 mt-1 font-medium group-hover:translate-x-1 transition-transform">
                            View piece <ArrowForwardIcon style={{ fontSize: 12 }} />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="font-serif text-lg text-charcoal">No console tables found for &ldquo;{searchTerm}&rdquo;</p>
                  <p className="text-xs text-taupe mt-1">Try searching for &ldquo;Aura&rdquo;, &ldquo;Marble&rdquo;, or &ldquo;Oak&rdquo;.</p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <p className="font-serif text-lg text-charcoal">Featured Collections</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 text-xs">
                  {PRODUCTS.slice(0, 6).map(p => (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      onClick={onClose}
                      className="p-3 bg-warmWhite/60 hover:bg-warmWhite border border-beige/60 text-charcoal font-serif tracking-wide hover:border-mutedGold transition-all rounded"
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

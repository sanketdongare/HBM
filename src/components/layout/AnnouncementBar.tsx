'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const MESSAGES = [
  'Discover Timeless Console Tables | Elevate Your Home',
  'Premium Designs for Modern Homes — Handcrafted in India',
  'Discover Our Signature Collection | Free Delivery Across Pune & Metro Cities',
  'Style Your Home with Homes By Meera | Schedule a Studio Visit',
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-charcoal text-cream text-[11px] sm:text-xs tracking-widest uppercase font-medium py-2.5 px-4 relative z-50 border-b border-[#3b3733]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden lg:flex items-center space-x-4 text-[11px] text-taupe lowercase">
          <a href="tel:7083895839" className="hover:text-cream transition-colors">
            +91 7083895839
          </a>
          <span>•</span>
          <a href="mailto:homesbymeera05@gmail.com" className="hover:text-cream transition-colors">
            homesbymeera05@gmail.com
          </a>
        </div>

        <div className="flex-1 text-center transition-all duration-700 ease-in-out px-4 truncate">
          <span className="text-mutedGold font-semibold mr-2 hidden sm:inline">✦</span>
          <span className="tracking-wider">{MESSAGES[currentIndex]}</span>
          <span className="text-mutedGold font-semibold ml-2 hidden sm:inline">✦</span>
        </div>

        <div className="hidden lg:flex items-center space-x-3 text-[11px] text-taupe uppercase tracking-wider">
          <Link href="/contact" className="hover:text-mutedGold transition-colors">
            Pune Studio
          </Link>
          <span>•</span>
          <a
            href="https://www.instagram.com/homes_by_meera"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-mutedGold transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

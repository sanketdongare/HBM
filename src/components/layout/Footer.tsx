'use client';

import React from 'react';
import Link from 'next/link';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-cream pt-16 sm:pt-20 pb-12 border-t border-[#3b3733]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-16 border-b border-[#3b3733]">
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.2em] uppercase font-light text-cream block">
                Homes By Meera
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-mutedGold block mt-1">
                Luxury Console Tables & Curated Living
              </span>
            </Link>

            <p className="text-xs text-taupe leading-relaxed max-w-sm pt-2">
              Thoughtfully selected furniture and décor to make every space feel beautiful. We specialize in bespoke, architectural console tables crafted from solid hardwoods, natural marble, and hand-forged metals.
            </p>

            <div className="pt-3">
              <a
                href="https://www.instagram.com/homes_by_meera"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2 border border-mutedGold/40 text-cream text-xs uppercase tracking-widest hover:bg-mutedGold hover:text-charcoal transition-all duration-300"
              >
                <InstagramIcon fontSize="small" className="text-mutedGold group-hover:text-charcoal" />
                <span>@homes_by_meera</span>
              </a>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-mutedGold font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-cream/80">
              <li>
                <Link href="/" className="hover:text-mutedGold transition-colors tracking-wider">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-mutedGold transition-colors tracking-wider">
                  Shop All Tables
                </Link>
              </li>
              <li>
                <Link href="/shop?category=all" className="hover:text-mutedGold transition-colors tracking-wider">
                  Console Tables
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-mutedGold transition-colors tracking-wider">
                  Curated Collections
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-mutedGold transition-colors tracking-wider">
                  About Our Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-mutedGold transition-colors tracking-wider">
                  Contact & Visit Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Collections */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-mutedGold font-semibold">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-cream/80">
              <li>
                <Link href="/shop?category=Modern" className="hover:text-mutedGold transition-colors tracking-wider">
                  Modern Consoles
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Luxury" className="hover:text-mutedGold transition-colors tracking-wider">
                  Luxury Consoles
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Wooden" className="hover:text-mutedGold transition-colors tracking-wider">
                  Solid Wood Series
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Marble" className="hover:text-mutedGold transition-colors tracking-wider">
                  Italian Marble Series
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Minimalist" className="hover:text-mutedGold transition-colors tracking-wider">
                  Quiet Minimalist
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Statement" className="hover:text-mutedGold transition-colors tracking-wider">
                  Statement Pedestals
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Studio Visit & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-mutedGold font-semibold">
              Pune Studio
            </h4>
            <ul className="space-y-3 text-xs text-cream/80">
              <li>
                <a
                  href="https://maps.app.goo.gl/ADXauhRxA2HXUakZ7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-mutedGold transition-colors group"
                >
                  <PlaceOutlinedIcon fontSize="small" className="text-mutedGold mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    PUSHPA Complex, Office 101, Near D Mart, Lohegaon Wagholi Road, Pune, Maharashtra – 412207
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:7083895839"
                  className="flex items-center gap-2.5 hover:text-mutedGold transition-colors"
                >
                  <PhoneOutlinedIcon fontSize="small" className="text-mutedGold flex-shrink-0" />
                  <span>+91 7083895839</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:homesbymeera05@gmail.com"
                  className="flex items-center gap-2.5 hover:text-mutedGold transition-colors"
                >
                  <EmailOutlinedIcon fontSize="small" className="text-mutedGold flex-shrink-0" />
                  <span className="truncate">homesbymeera05@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-taupe pt-1">
                <AccessTimeOutlinedIcon fontSize="small" className="text-mutedGold flex-shrink-0" />
                <span>Mon – Sat: 10:30 AM – 7:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with legal & copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-taupe gap-4">
          <p>© 2026 Homes By Meera. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-wider">
            <Link href="/policies/privacy" className="hover:text-cream transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/policies/terms" className="hover:text-cream transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/policies/shipping" className="hover:text-cream transition-colors">
              Shipping Policy
            </Link>
            <span>•</span>
            <Link href="/policies/returns" className="hover:text-cream transition-colors">
              Return Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

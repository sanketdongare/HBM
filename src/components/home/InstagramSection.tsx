'use client';

import React from 'react';
import Image from 'next/image';
import InstagramIcon from '@mui/icons-material/Instagram';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { INSTAGRAM_POSTS } from '@/data/products';

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-warmWhite text-charcoal border-b border-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-mutedGold mb-2">
            <InstagramIcon fontSize="small" />
            <span className="text-xs uppercase tracking-[0.3em] font-semibold">
              @homes_by_meera
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal">
            Follow Our Home Styling Journey
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-taupe leading-relaxed">
            Discover beautiful interiors, styling inspiration and our latest console table collections.
          </p>

          <div className="mt-6">
            <a
              href="https://www.instagram.com/homes_by_meera"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3 bg-charcoal hover:bg-darkBrown text-cream text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              <InstagramIcon fontSize="small" className="text-mutedGold" />
              <span>Follow Us on Instagram</span>
            </a>
          </div>
        </div>

        {/* 6 Grid of aesthetic interior photos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map(post => (
            <a
              key={post.id}
              href="https://www.instagram.com/homes_by_meera"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded overflow-hidden shadow-sm bg-beige/30 block"
            >
              <Image
                src={post.image}
                alt="Homes By Meera Instagram feed showcase"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />

              {/* Hover overlay with Instagram icon and likes */}
              <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-cream">
                <InstagramIcon className="text-mutedGold mb-1.5" />
                <div className="flex items-center gap-1 text-[11px] font-semibold text-cream">
                  <FavoriteIcon style={{ fontSize: 13 }} className="text-red-400" />
                  <span>{post.likes}</span>
                </div>
                <p className="text-[9px] text-beige/80 mt-1 line-clamp-2 leading-tight">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

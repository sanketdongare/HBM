'use client';

import React from 'react';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import ArchitectureOutlinedIcon from '@mui/icons-material/ArchitectureOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

const FEATURES = [
  {
    icon: ArchitectureOutlinedIcon,
    title: 'Timeless Designs',
    description: 'Proportions sculpted to harmonize with both neoclassical architecture and warm contemporary minimalism.',
  },
  {
    icon: DiamondOutlinedIcon,
    title: 'Premium Quality',
    description: 'Constructed from sustainably sourced solid hardwoods, hand-honed travertine, and heavy-gauge brass accents.',
  },
  {
    icon: AutoFixHighOutlinedIcon,
    title: 'Elegant Home Styling',
    description: 'Thoughtfully conceived silhouettes that elevate mirrors, florals, ambient table lamps, and entryways.',
  },
  {
    icon: CollectionsBookmarkOutlinedIcon,
    title: 'Carefully Selected Collections',
    description: 'No mass production. Every design series is curated in limited batches with uncompromising craftsmanship.',
  },
  {
    icon: SupportAgentOutlinedIcon,
    title: 'Personal Customer Support',
    description: 'Direct consultation with our Pune design studio team for dimensions, wood finishes, and custom styling advice.',
  },
  {
    icon: VerifiedUserOutlinedIcon,
    title: 'Trusted Shopping Experience',
    description: 'Secure digital checkout, insured transit, and complimentary white-glove unboxing across India.',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-cream text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block mb-2">
            The Homes By Meera Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal">
            Why Shop With Us?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-taupe leading-relaxed">
            We are dedicated to elevating Indian homes with world-class craftsmanship, transparent pricing, and boutique personal service.
          </p>
        </div>

        {/* 6 Grid Icon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-warmWhite rounded border border-beige/60 shadow-sm hover:shadow-luxury-hover hover:border-mutedGold transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-cream border border-beige/80 flex items-center justify-center text-mutedGold mb-5 group-hover:bg-darkBrown group-hover:text-cream transition-colors duration-300">
                  <Icon fontSize="medium" />
                </div>
                <h3 className="font-serif text-xl font-normal text-charcoal mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-taupe leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

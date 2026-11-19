'use client';

import React from 'react';
import { Hero } from '@/components/home/Hero';
import { ShopConsoleTables } from '@/components/home/ShopConsoleTables';
import { ShopByCollection } from '@/components/home/ShopByCollection';
import { FeaturedProduct } from '@/components/home/FeaturedProduct';
import { AboutSection } from '@/components/home/AboutSection';
import { InteriorInspiration } from '@/components/home/InteriorInspiration';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { InstagramSection } from '@/components/home/InstagramSection';
import { Testimonials } from '@/components/home/Testimonials';
import { ContactSection } from '@/components/home/ContactSection';
import { Newsletter } from '@/components/home/Newsletter';
import { useCart } from '@/context/CartContext';

export default function HomePage() {
  const { setQuickViewProduct } = useCart();

  return (
    <>
      {/* 3. Hero Section */}
      <Hero />

      {/* 4. Shop Our Console Tables */}
      <ShopConsoleTables onQuickView={product => setQuickViewProduct(product)} />

      {/* 5. Shop By Collection */}
      <ShopByCollection />

      {/* 6. Featured Product */}
      <FeaturedProduct />

      {/* 7. About Homes By Meera */}
      <AboutSection />

      {/* 8. Interior Inspiration */}
      <InteriorInspiration />

      {/* 9. Why Shop With Us? */}
      <WhyChooseUs />

      {/* 10. Instagram Section */}
      <InstagramSection />

      {/* 11. Customer Testimonials */}
      <Testimonials />

      {/* 12. Contact & Visit Us Section */}
      <ContactSection />

      {/* 13. Newsletter */}
      <Newsletter />
    </>
  );
}

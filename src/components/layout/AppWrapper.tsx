'use client';

import React, { useState } from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { SearchModal } from './SearchModal';
import { QuickViewModal } from '../products/QuickViewModal';
import { useCart } from '@/context/CartContext';

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { quickViewProduct, setQuickViewProduct } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Header onOpenSearch={() => setSearchOpen(true)} />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
};

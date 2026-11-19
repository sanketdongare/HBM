'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, finish?: string, quantity?: number) => void;
  removeFromCart: (productId: string, finish: string) => void;
  updateQuantity: (productId: string, finish: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  discountAmount: number;
  promoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 30000;
const STANDARD_SHIPPING = 1500;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('hbm_cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedPromo = localStorage.getItem('hbm_promo');
      if (savedPromo) {
        setPromoCode(savedPromo);
        if (savedPromo === 'MEERA10') setDiscountPercent(10);
        if (savedPromo === 'LUXURY15') setDiscountPercent(15);
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('hbm_cart', JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart to storage', e);
      }
    }
  }, [items, isLoaded]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(prev => !prev);

  const addToCart = (product: Product, finish?: string, quantity = 1) => {
    const selectedFinish = finish || product.finishes[0]?.name || 'Default';
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.selectedFinish === selectedFinish
      );
      if (existingIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += quantity;
        return newItems;
      }
      return [...prevItems, { product, quantity, selectedFinish }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (productId: string, finish: string) => {
    setItems(prev => prev.filter(item => !(item.product.id === productId && item.selectedFinish === finish)));
  };

  const updateQuantity = (productId: string, finish: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, finish);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.selectedFinish === finish
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'MEERA10') {
      setPromoCode('MEERA10');
      setDiscountPercent(10);
      localStorage.setItem('hbm_promo', 'MEERA10');
      return { success: true, message: 'Coupon MEERA10 applied! 10% discount on entire cart.' };
    }
    if (cleanCode === 'LUXURY15') {
      setPromoCode('LUXURY15');
      setDiscountPercent(15);
      localStorage.setItem('hbm_promo', 'LUXURY15');
      return { success: true, message: 'VIP Code LUXURY15 applied! 15% discount on entire order.' };
    }
    return { success: false, message: 'Invalid voucher code. Try "MEERA10" for 10% off.' };
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
    localStorage.removeItem('hbm_promo');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        discountAmount,
        promoCode,
        applyPromoCode,
        removePromoCode,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

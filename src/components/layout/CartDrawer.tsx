'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useCart } from '@/context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    discountAmount,
    promoCode,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  if (!isOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const finalTotal = subtotal - discountAmount + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyPromoCode(couponInput);
    setCouponStatus(res);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream shadow-2xl flex flex-col border-l border-beige animate-slideLeft">
          {/* Header */}
          <div className="p-6 border-b border-beige/80 bg-warmWhite/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-2xl tracking-wider uppercase text-charcoal">
                Your Bag
              </h2>
              <span className="text-xs uppercase tracking-widest px-2 py-0.5 bg-beige text-charcoal font-semibold rounded-full">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-charcoal/60 hover:text-charcoal rounded-full hover:bg-beige/40 transition-colors"
              aria-label="Close cart drawer"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#f2ece2] px-6 py-3 border-b border-beige text-xs">
            {amountToFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-charcoal/80 font-medium">
                  <LocalShippingOutlinedIcon fontSize="small" className="text-mutedGold" />
                  <span>
                    Add <strong className="text-charcoal">₹{amountToFreeShipping.toLocaleString('en-IN')}</strong> more for <span className="text-darkBrown font-semibold">Complimentary White Glove Delivery</span>
                  </span>
                </div>
                <div className="w-full bg-beige h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-mutedGold h-full rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-darkBrown font-medium">
                <CheckCircleOutlineIcon fontSize="small" className="text-mutedGold" />
                <span>You have unlocked Complimentary Delivery across India!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-beige/40 flex items-center justify-center mb-4 text-taupe">
                  <LocalShippingOutlinedIcon style={{ fontSize: 36 }} />
                </div>
                <h3 className="font-serif text-xl uppercase tracking-wider text-charcoal">
                  Your bag is empty
                </h3>
                <p className="text-xs text-taupe mt-2 max-w-xs leading-relaxed">
                  Explore our curated collection of architectural console tables and bring timeless elegance to your home.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-cream text-xs uppercase tracking-[0.2em] font-medium hover:bg-darkBrown transition-colors"
                >
                  Explore Console Tables
                  <ArrowForwardIcon fontSize="small" />
                </Link>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedFinish}-${idx}`}
                  className="flex gap-4 pb-6 border-b border-beige/60 last:border-b-0"
                >
                  <div className="relative w-24 h-24 bg-beige/30 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-serif text-base text-charcoal hover:text-mutedGold transition-colors leading-snug"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedFinish)}
                          className="text-taupe hover:text-red-700 transition-colors p-1"
                          title="Remove item"
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </button>
                      </div>

                      <p className="text-[11px] text-taupe mt-1 tracking-wider uppercase">
                        Finish: {item.selectedFinish}
                      </p>

                      <div className="flex items-baseline gap-2 mt-1.5">
                        <span className="font-medium text-sm text-charcoal">
                          ₹{item.product.price.toLocaleString('en-IN')}
                        </span>
                        {item.product.originalPrice > item.product.price && (
                          <span className="text-[11px] text-taupe line-through">
                            ₹{item.product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-beige bg-warmWhite rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedFinish, item.quantity - 1)
                          }
                          className="p-1 px-2 text-charcoal/70 hover:text-charcoal hover:bg-beige/40 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <RemoveIcon style={{ fontSize: 14 }} />
                        </button>
                        <span className="px-3 text-xs font-semibold text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedFinish, item.quantity + 1)
                          }
                          className="p-1 px-2 text-charcoal/70 hover:text-charcoal hover:bg-beige/40 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <AddIcon style={{ fontSize: 14 }} />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-charcoal">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with totals and checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-warmWhite border-t border-beige space-y-4">
              {/* Promo voucher input */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#f5f1eb] border border-mutedGold/40 text-xs rounded">
                    <span className="text-darkBrown font-medium">
                      Code <strong>{promoCode}</strong> applied (-₹{discountAmount.toLocaleString('en-IN')})
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-taupe hover:text-charcoal underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Discount code (e.g. MEERA10)"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-cream border border-beige focus:outline-none focus:border-mutedGold uppercase tracking-wider"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-charcoal text-cream text-xs uppercase tracking-widest font-medium hover:bg-darkBrown transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponStatus && !promoCode && (
                  <p
                    className={`text-[11px] mt-1.5 ${
                      couponStatus.success ? 'text-green-700' : 'text-red-600'
                    }`}
                  >
                    {couponStatus.message}
                  </p>
                )}
              </div>

              {/* Subtotal, Shipping & Total breakdown */}
              <div className="space-y-2 text-xs text-charcoal/80 pt-2 border-t border-beige/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-mutedGold">
                    <span>Voucher Discount</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping & Handling</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-green-700 font-semibold uppercase text-[11px]">Free</span>
                    ) : (
                      `₹${shippingFee.toLocaleString('en-IN')}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif text-charcoal pt-2 border-t border-beige">
                  <span className="uppercase tracking-wider">Estimated Total</span>
                  <span className="font-semibold">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] text-taupe text-right">Taxes included. Delivery within 4-7 business days.</p>
              </div>

              {/* Checkout & Actions */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-darkBrown text-cream text-xs uppercase tracking-[0.2em] font-medium hover:bg-charcoal transition-colors shadow-lg"
                >
                  Proceed to Checkout
                  <ArrowForwardIcon fontSize="small" />
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full py-2.5 text-xs uppercase tracking-widest text-charcoal/70 hover:text-charcoal transition-colors text-center"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

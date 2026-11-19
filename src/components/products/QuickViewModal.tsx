'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedFinish, setSelectedFinish] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedFinish(product.finishes[0]?.name || '');
      setQuantity(1);
      setActiveImageIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, selectedFinish, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-8">
        <div className="relative inline-block w-full max-w-4xl bg-cream text-left align-middle shadow-2xl overflow-hidden border border-beige animate-fadeIn">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-charcoal/60 hover:text-charcoal bg-warmWhite/80 rounded-full hover:bg-warmWhite transition-colors shadow-sm"
            aria-label="Close modal"
          >
            <CloseIcon fontSize="small" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Gallery */}
            <div className="bg-[#f0ebe1] p-6 flex flex-col justify-between">
              <div className="relative aspect-[4/5] w-full bg-beige/40 overflow-hidden rounded">
                <Image
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold bg-charcoal text-cream shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded overflow-hidden flex-shrink-0 border-2 transition-all ${
                        activeImageIndex === idx ? 'border-darkBrown scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Controls */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-warmWhite">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-mutedGold font-semibold">
                  {product.category} Collection
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal mt-1 leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs text-taupe mt-1.5 leading-relaxed">{product.tagline}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3 text-xs">
                  <div className="flex text-mutedGold">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} style={{ fontSize: 16 }} />
                    ))}
                  </div>
                  <span className="font-semibold text-charcoal">{product.rating}</span>
                  <span className="text-taupe">({product.reviewCount} customer reviews)</span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif text-2xl font-medium text-charcoal">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-taupe line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discountPercent > 0 && (
                    <span className="text-xs uppercase tracking-wider text-mutedGold font-semibold">
                      Save {product.discountPercent}%
                    </span>
                  )}
                </div>

                {/* Finish Selection */}
                <div className="mt-6">
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-2">
                    Finish: <strong className="text-darkBrown">{selectedFinish}</strong>
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {product.finishes.map(finish => (
                      <button
                        key={finish.name}
                        onClick={() => setSelectedFinish(finish.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs tracking-wide transition-all ${
                          selectedFinish === finish.name
                            ? 'border-charcoal bg-beige/40 text-charcoal font-medium'
                            : 'border-beige hover:border-taupe text-charcoal/80'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-inner"
                          style={{ backgroundColor: finish.colorCode }}
                        />
                        <span>{finish.name}</span>
                        {selectedFinish === finish.name && (
                          <CheckIcon style={{ fontSize: 13 }} className="text-darkBrown" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Key Specs */}
                <div className="mt-6 p-3 bg-cream/60 border border-beige/60 rounded text-xs space-y-1.5 text-charcoal/80">
                  <p>
                    <strong className="text-charcoal">Dimensions:</strong> {product.dimensions.length}&quot;L ×{' '}
                    {product.dimensions.width}&quot;W × {product.dimensions.height}&quot;H
                  </p>
                  <p>
                    <strong className="text-charcoal">Material:</strong> {product.material}
                  </p>
                  <p>
                    <strong className="text-charcoal">Delivery:</strong> Ships in {product.leadTimeDays} business days • White Glove Installation in Pune
                  </p>
                </div>
              </div>

              {/* Quantity & CTA */}
              <div className="mt-8 pt-6 border-t border-beige/60 space-y-3">
                <div className="flex gap-4">
                  <div className="flex items-center border border-beige bg-cream rounded">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-2 text-charcoal/70 hover:text-charcoal transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <RemoveIcon style={{ fontSize: 16 }} />
                    </button>
                    <span className="px-4 text-xs font-semibold text-charcoal">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="p-2 text-charcoal/70 hover:text-charcoal transition-colors"
                      aria-label="Increase quantity"
                    >
                      <AddIcon style={{ fontSize: 16 }} />
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3 px-6 bg-charcoal hover:bg-darkBrown text-cream text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <ShoppingBagOutlinedIcon fontSize="small" />
                    <span>Add to Bag • ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-taupe hover:text-charcoal transition-colors"
                  >
                    View Full Product Details & Styling Guide
                    <ArrowForwardIcon style={{ fontSize: 13 }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

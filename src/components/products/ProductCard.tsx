'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import StarIcon from '@mui/icons-material/Star';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, setQuickViewProduct } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      setQuickViewProduct(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-cream/30 hover:bg-warmWhite transition-all duration-300 rounded border border-beige/40 hover:border-beige hover:shadow-luxury-hover overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] w-full overflow-hidden bg-beige/30 block">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold bg-charcoal text-cream shadow-sm">
              {product.badge}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold bg-mutedGold text-white shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist toggle button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 shadow-sm ${
            isFavorited
              ? 'bg-cream text-red-700'
              : 'bg-warmWhite/80 backdrop-blur-sm text-charcoal hover:bg-warmWhite hover:text-red-700'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isFavorited ? (
            <FavoriteIcon fontSize="small" className="text-red-600" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </button>

        {/* Product Images with smooth swap */}
        <div className="relative w-full h-full">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {secondaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.name} alternative view`}
              fill
              className={`object-cover transition-opacity duration-700 ease-in-out ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0'
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          )}
        </div>

        {/* Floating Quick View & Add to Cart Action Bar on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleQuickViewClick}
            className="flex-1 py-2.5 px-3 bg-warmWhite/95 hover:bg-warmWhite text-charcoal text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 shadow-md backdrop-blur-sm transition-colors border border-beige/60"
            title="Quick View"
          >
            <VisibilityOutlinedIcon style={{ fontSize: 16 }} />
            <span className="hidden sm:inline">Quick View</span>
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2.5 px-3 bg-charcoal/95 hover:bg-darkBrown text-cream text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 shadow-md transition-colors"
            title="Add to Cart"
          >
            <ShoppingBagOutlinedIcon style={{ fontSize: 16 }} />
            <span>Add</span>
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-taupe uppercase tracking-wider mb-1.5">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-mutedGold">
              <StarIcon style={{ fontSize: 13 }} />
              <span className="font-semibold text-charcoal">{product.rating}</span>
              <span className="text-taupe">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif text-lg sm:text-xl text-charcoal hover:text-darkBrown transition-colors font-normal leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Finishes preview color dots */}
          <div className="flex items-center gap-1.5 mt-2.5">
            {product.finishes.map(finish => (
              <span
                key={finish.name}
                className="w-3.5 h-3.5 rounded-full border border-beige shadow-inner"
                style={{ backgroundColor: finish.colorCode }}
                title={finish.name}
              />
            ))}
            <span className="text-[10px] text-taupe ml-1 uppercase">
              {product.finishes.length} finishes
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-4 pt-3 border-t border-beige/40 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg sm:text-xl font-medium text-charcoal">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-taupe line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-wider text-mutedGold font-semibold">
            Free Shipping
          </span>
        </div>
      </div>
    </div>
  );
};

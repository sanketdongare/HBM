'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="bg-cream min-h-screen py-16 sm:py-24 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block mb-2">
            Your Personal Selection
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal">
            Saved Designs
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-taupe leading-relaxed">
            Keep track of console tables you love. When you&apos;re ready, move them to your bag or consult with our studio team.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-20 bg-warmWhite rounded border border-beige p-8 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-cream border border-beige flex items-center justify-center text-taupe mx-auto mb-4">
              <FavoriteBorderIcon fontSize="large" />
            </div>
            <h3 className="font-serif text-2xl text-charcoal font-light">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-taupe mt-2 leading-relaxed">
              Explore our handcrafted collections and click the heart icon on any console table to save it here.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-cream text-xs uppercase tracking-[0.2em] font-medium hover:bg-darkBrown transition-colors"
            >
              <span>Explore Console Tables</span>
              <ArrowForwardIcon fontSize="small" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {wishlist.map(product => (
              <div
                key={product.id}
                className="bg-warmWhite rounded border border-beige/80 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-luxury-hover transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[4/5] w-full bg-beige/30 overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 bg-warmWhite/90 rounded-full text-taupe hover:text-red-600 transition-colors shadow-sm"
                      title="Remove from wishlist"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </button>
                  </div>

                  <div className="p-4 sm:p-5">
                    <span className="text-[10px] uppercase tracking-wider text-mutedGold font-semibold">
                      {product.category}
                    </span>
                    <Link href={`/product/${product.slug}`} className="block mt-1">
                      <h4 className="font-serif text-lg text-charcoal font-medium hover:text-darkBrown transition-colors truncate">
                        {product.name}
                      </h4>
                    </Link>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-serif text-lg font-medium text-charcoal">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-taupe line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      addToCart(product);
                      removeFromWishlist(product.id);
                    }}
                    className="w-full py-2.5 px-4 bg-charcoal hover:bg-darkBrown text-cream text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <ShoppingBagOutlinedIcon style={{ fontSize: 15 }} />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

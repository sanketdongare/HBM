'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.id as string;

  const product = PRODUCTS.find(p => p.slug === slug || p.id === slug) || PRODUCTS[0];
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(product.finishes[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<{
    checked: boolean;
    available?: boolean;
    estimate?: string;
    message?: string;
  }>({ checked: false });

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState<string | null>('materials');
  const [copiedLink, setCopiedLink] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleCheckDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || isNaN(Number(pincode))) {
      setDeliveryResult({
        checked: true,
        available: false,
        message: 'Please enter a valid 6-digit Indian PIN code.',
      });
      return;
    }

    if (pincode.startsWith('411') || pincode.startsWith('412')) {
      setDeliveryResult({
        checked: true,
        available: true,
        estimate: 'Express 48-Hour White Glove Delivery in Pune & PCMC',
        message: 'Free installation & unboxing included.',
      });
    } else {
      setDeliveryResult({
        checked: true,
        available: true,
        estimate: 'Insured Delivery within 5–7 Business Days',
        message: 'Complimentary transit insurance & door delivery.',
      });
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedFinish, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedFinish, quantity);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-cream min-h-screen py-10 sm:py-16 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-taupe uppercase tracking-wider mb-8">
          <Link href="/" className="hover:text-charcoal transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-charcoal transition-colors">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-charcoal transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-charcoal font-medium truncate">{product.name}</span>
        </nav>

        {/* Top Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded overflow-hidden shadow-2xl bg-[#efe9df] border border-beige/60">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.name} view ${activeImageIndex + 1}`}
                fill
                priority
                className="object-cover transition-all duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-charcoal text-cream text-[10px] uppercase tracking-widest font-semibold shadow">
                  {product.badge}
                </div>
              )}

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 p-2.5 rounded-full shadow-md transition-all ${
                  isFavorited
                    ? 'bg-cream text-red-600'
                    : 'bg-warmWhite/80 text-charcoal hover:bg-warmWhite hover:text-red-600'
                }`}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                {isFavorited ? (
                  <FavoriteIcon fontSize="small" className="text-red-600" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </button>
            </div>

            {/* Thumbnails Row */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[4/3] rounded overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-darkBrown shadow-md scale-[0.98]'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 15vw"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quality & Materials Guarantee Banner */}
            <div className="p-6 bg-warmWhite rounded border border-beige/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-charcoal/80">
              <div className="flex items-center gap-2.5">
                <VerifiedUserOutlinedIcon className="text-mutedGold" fontSize="small" />
                <span>10-Year Solid Hardwood Frame Warranty</span>
              </div>
              <div className="flex items-center gap-2.5">
                <LocalShippingOutlinedIcon className="text-mutedGold" fontSize="small" />
                <span>White Glove Installation in Pune</span>
              </div>
              <div className="flex items-center gap-2.5">
                <AutorenewOutlinedIcon className="text-mutedGold" fontSize="small" />
                <span>7-Day Return Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Product Details & Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold">
                  {product.category} Collection
                </span>
                <button
                  onClick={handleShare}
                  className="text-xs uppercase tracking-wider text-taupe hover:text-charcoal flex items-center gap-1"
                >
                  <ShareOutlinedIcon style={{ fontSize: 14 }} />
                  <span>{copiedLink ? 'Copied!' : 'Share'}</span>
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal mt-1 leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-taupe mt-2 leading-relaxed">
                {product.tagline}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3 text-xs">
                <div className="flex text-mutedGold">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} style={{ fontSize: 16 }} />
                  ))}
                </div>
                <span className="font-semibold text-charcoal">{product.rating}</span>
                <span className="text-taupe">({product.reviewCount} verified reviews)</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="py-4 border-y border-beige flex items-baseline gap-4">
              <span className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-base text-taupe line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="text-xs uppercase tracking-widest px-2.5 py-1 bg-mutedGold text-white font-semibold rounded">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>
            <p className="text-[11px] text-taupe -mt-3">
              MRP inclusive of all taxes. Free shipping on this piece.
            </p>

            {/* Finish Selection */}
            <div>
              <span className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-2.5">
                Selected Finish: <strong className="text-darkBrown">{selectedFinish}</strong>
              </span>
              <div className="flex flex-wrap gap-2.5">
                {product.finishes.map(finish => (
                  <button
                    key={finish.name}
                    onClick={() => setSelectedFinish(finish.name)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded border text-xs tracking-wide transition-all ${
                      selectedFinish === finish.name
                        ? 'border-charcoal bg-warmWhite text-charcoal font-medium shadow-sm'
                        : 'border-beige hover:border-taupe text-charcoal/80 bg-cream'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: finish.colorCode }}
                    />
                    <span>{finish.name}</span>
                    {selectedFinish === finish.name && (
                      <CheckIcon style={{ fontSize: 14 }} className="text-darkBrown" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-beige bg-warmWhite rounded px-1">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 text-charcoal/70 hover:text-charcoal"
                    aria-label="Decrease quantity"
                  >
                    <RemoveIcon style={{ fontSize: 16 }} />
                  </button>
                  <span className="px-4 text-xs font-semibold text-charcoal">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2 text-charcoal/70 hover:text-charcoal"
                    aria-label="Increase quantity"
                  >
                    <AddIcon style={{ fontSize: 16 }} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 bg-charcoal hover:bg-darkBrown text-cream text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <ShoppingBagOutlinedIcon fontSize="small" />
                  <span>Add to Bag</span>
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-4 px-6 bg-mutedGold hover:bg-goldDark text-charcoal text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <FlashOnIcon fontSize="small" />
                <span>Buy It Now • Instant Checkout</span>
              </button>
            </div>

            {/* PIN Code Delivery Checker */}
            <div className="p-4 bg-warmWhite rounded border border-beige/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-medium text-charcoal">
                <LocationOnOutlinedIcon fontSize="small" className="text-mutedGold" />
                <span>Check Estimated Delivery & Installation</span>
              </div>
              <form onSubmit={handleCheckDelivery} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN code (e.g. 412207)"
                  value={pincode}
                  onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-3 py-2 text-xs bg-cream border border-beige rounded focus:outline-none focus:border-mutedGold tracking-wider"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-darkBrown text-cream text-xs uppercase tracking-wider font-medium hover:bg-charcoal transition-colors rounded"
                >
                  Check
                </button>
              </form>
              {deliveryResult.checked && (
                <div className="text-xs pt-1">
                  {deliveryResult.available ? (
                    <div className="text-green-800 space-y-0.5">
                      <p className="font-semibold">{deliveryResult.estimate}</p>
                      <p className="text-[11px] text-taupe">{deliveryResult.message}</p>
                    </div>
                  ) : (
                    <p className="text-red-600 text-xs">{deliveryResult.message}</p>
                  )}
                </div>
              )}
            </div>

            {/* Accordion Tabs for Specifications, Shipping & Care */}
            <div className="border-t border-beige pt-4 space-y-3">
              {/* Materials & Dimensions */}
              <div className="border border-beige rounded overflow-hidden bg-warmWhite">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'materials' ? null : 'materials')
                  }
                  className="w-full p-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-charcoal"
                >
                  <span>Materials &amp; Dimensions</span>
                  <ExpandMoreIcon
                    className={`transition-transform duration-200 ${
                      openAccordion === 'materials' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'materials' && (
                  <div className="p-4 pt-0 text-xs text-charcoal/80 space-y-2 border-t border-beige/40">
                    <p>
                      <strong>Dimensions:</strong> {product.dimensions.length}&quot; Length ×{' '}
                      {product.dimensions.width}&quot; Depth × {product.dimensions.height}&quot; Height
                    </p>
                    <p>
                      <strong>Primary Material:</strong> {product.material}
                    </p>
                    <p>
                      <strong>Weight:</strong> Approximately {product.dimensions.weightKg} kg
                    </p>
                    <p>
                      <strong>Joinery:</strong> Reinforced internal mortise-and-tenon structural joints.
                    </p>
                  </div>
                )}
              </div>

              {/* Shipping & Delivery */}
              <div className="border border-beige rounded overflow-hidden bg-warmWhite">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')
                  }
                  className="w-full p-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-charcoal"
                >
                  <span>Shipping, Delivery &amp; Returns</span>
                  <ExpandMoreIcon
                    className={`transition-transform duration-200 ${
                      openAccordion === 'shipping' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="p-4 pt-0 text-xs text-charcoal/80 space-y-2 border-t border-beige/40">
                    <p>
                      <strong>Free Metro Delivery:</strong> Ships within {product.leadTimeDays} business days via insured logistics partners.
                    </p>
                    <p>
                      <strong>White Glove Pune Service:</strong> Our trained installation crew unboxes and levels the console in your designated room at no extra charge.
                    </p>
                    <p>
                      <strong>7-Day Returns:</strong> Hassle-free return policy if damaged in transit or defective.
                    </p>
                  </div>
                )}
              </div>

              {/* Care Instructions */}
              <div className="border border-beige rounded overflow-hidden bg-warmWhite">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-charcoal"
                >
                  <span>Care &amp; Maintenance</span>
                  <ExpandMoreIcon
                    className={`transition-transform duration-200 ${
                      openAccordion === 'care' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'care' && (
                  <div className="p-4 pt-0 text-xs text-charcoal/80 space-y-1.5 border-t border-beige/40">
                    {product.careInstructions.map((instruction, i) => (
                      <p key={i}>• {instruction}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20 pt-12 border-t border-beige">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-mutedGold font-semibold block">
                Verified Feedback
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal mt-1">
                Customer Reviews
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-mutedGold">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} style={{ fontSize: 20 }} />
                ))}
              </div>
              <span className="font-serif text-xl font-medium text-charcoal">{product.rating}</span>
              <span className="text-xs text-taupe">({product.reviewCount} ratings)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map(rev => (
                <div key={rev.id} className="p-6 bg-warmWhite rounded border border-beige/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-charcoal text-xs">{rev.author}</span>
                    <span className="text-[11px] text-taupe">{rev.date}</span>
                  </div>
                  <div className="flex text-mutedGold">
                    {[...Array(rev.rating)].map((_, i) => (
                      <StarIcon key={i} style={{ fontSize: 14 }} />
                    ))}
                  </div>
                  <h5 className="font-serif text-base text-charcoal font-medium">{rev.title}</h5>
                  <p className="text-xs text-taupe leading-relaxed">{rev.comment}</p>
                  <p className="text-[10px] text-mutedGold uppercase tracking-wider font-semibold pt-1">
                    Verified Buyer • {rev.city}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-2 p-8 bg-warmWhite rounded border border-beige text-center">
                <p className="font-serif text-lg text-charcoal">Be the first to review {product.name}</p>
                <p className="text-xs text-taupe mt-1">
                  Purchased this console table? Share your styling photographs and review with us.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Grid */}
        <div className="mt-20 pt-12 border-t border-beige">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-mutedGold font-semibold block mb-1">
              Complete Your Space
            </span>
            <h3 className="font-serif text-3xl text-charcoal font-light">
              You May Also Admire
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory.toLowerCase() === 'all' ? 'All' : initialCategory
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = ['All', 'Modern', 'Luxury', 'Wooden', 'Marble', 'Minimalist', 'Statement'];
  const priceRanges = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under ₹35,000', value: 'under-35k' },
    { label: '₹35,000 – ₹45,000', value: '35k-45k' },
    { label: 'Above ₹45,000', value: 'above-45k' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (
        selectedCategory !== 'All' &&
        product.category.toLowerCase() !== selectedCategory.toLowerCase() &&
        !product.collections.includes(selectedCategory.toLowerCase())
      ) {
        return false;
      }

      // Price filter
      if (selectedPriceRange === 'under-35k' && product.price >= 35000) return false;
      if (selectedPriceRange === '35k-45k' && (product.price < 35000 || product.price > 45000))
        return false;
      if (selectedPriceRange === 'above-45k' && product.price <= 45000) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.material.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return 0; // featured / default
    });
  }, [selectedCategory, selectedPriceRange, sortBy, searchQuery]);

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedPriceRange !== 'All' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedPriceRange('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="bg-cream min-h-screen py-12 sm:py-16 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block mb-2">
            Homes By Meera Catalog
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal">
            The Console Table Collection
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-taupe leading-relaxed">
            From hand-fluted oak pedestals to monolithic Italian travertine and curved brass profiles. Explore our complete suite of architectural console tables.
          </p>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="bg-warmWhite border border-beige p-4 sm:p-5 rounded mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar inside catalog */}
          <div className="relative w-full md:w-72">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe" style={{ fontSize: 18 }} />
            <input
              type="text"
              placeholder="Filter by name or wood..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-cream text-xs border border-beige rounded focus:outline-none focus:border-mutedGold tracking-wider"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-taupe hover:text-charcoal"
              >
                <CloseIcon style={{ fontSize: 14 }} />
              </button>
            )}
          </div>

          {/* Desktop Category Filters */}
          <div className="hidden lg:flex items-center gap-2 overflow-x-auto max-w-xl">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-charcoal text-cream shadow-sm'
                    : 'bg-cream text-charcoal/70 hover:text-charcoal border border-beige'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown & Mobile Filter Button */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 bg-cream border border-beige rounded text-xs uppercase tracking-wider text-charcoal font-medium"
            >
              <FilterListIcon fontSize="small" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            <div className="flex items-center gap-2">
              <SortIcon style={{ fontSize: 16 }} className="text-taupe" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-cream border border-beige text-xs uppercase tracking-wider text-charcoal py-2 px-3 rounded focus:outline-none focus:border-mutedGold font-medium cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <span className="text-taupe uppercase tracking-wider">Active Filters:</span>
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-warmWhite border border-beige rounded-full text-charcoal font-medium">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('All')}>
                  <CloseIcon style={{ fontSize: 13 }} />
                </button>
              </span>
            )}
            {selectedPriceRange !== 'All' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-warmWhite border border-beige rounded-full text-charcoal font-medium">
                Price: {priceRanges.find(p => p.value === selectedPriceRange)?.label}
                <button onClick={() => setSelectedPriceRange('All')}>
                  <CloseIcon style={{ fontSize: 13 }} />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-warmWhite border border-beige rounded-full text-charcoal font-medium">
                Search: &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery('')}>
                  <CloseIcon style={{ fontSize: 13 }} />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-mutedGold hover:underline uppercase tracking-wider font-semibold ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Grid & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Desktop Filter Sidebar (1 col) */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-warmWhite p-6 rounded border border-beige shadow-sm space-y-6">
              {/* Category */}
              <div>
                <h4 className="font-serif text-base uppercase tracking-wider text-charcoal font-medium mb-3 pb-2 border-b border-beige">
                  Category
                </h4>
                <div className="space-y-2 text-xs">
                  {categories.map(cat => (
                    <label
                      key={cat}
                      className="flex items-center justify-between cursor-pointer hover:text-mutedGold transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                          className="accent-darkBrown"
                        />
                        <span>{cat}</span>
                      </div>
                      <span className="text-[10px] text-taupe">
                        (
                        {cat === 'All'
                          ? PRODUCTS.length
                          : PRODUCTS.filter(
                              p =>
                                p.category.toLowerCase() === cat.toLowerCase() ||
                                p.collections.includes(cat.toLowerCase())
                            ).length}
                        )
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-serif text-base uppercase tracking-wider text-charcoal font-medium mb-3 pb-2 border-b border-beige">
                  Price Range
                </h4>
                <div className="space-y-2 text-xs">
                  {priceRanges.map(range => (
                    <label
                      key={range.value}
                      className="flex items-center gap-2 cursor-pointer hover:text-mutedGold transition-colors"
                    >
                      <input
                        type="radio"
                        name="priceRange"
                        checked={selectedPriceRange === range.value}
                        onChange={() => setSelectedPriceRange(range.value)}
                        className="accent-darkBrown"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* White glove delivery note */}
              <div className="p-4 bg-cream/70 rounded border border-beige/60 text-[11px] text-taupe space-y-1">
                <p className="font-semibold text-charcoal uppercase tracking-wider">
                  Complimentary Delivery
                </p>
                <p>All console tables include free insurance and white-glove unboxing in Pune.</p>
              </div>
            </div>
          </div>

          {/* Product Grid (3 cols desktop) */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-warmWhite rounded border border-beige">
                <h3 className="font-serif text-2xl text-charcoal">No Console Tables Found</h3>
                <p className="text-xs text-taupe mt-2 max-w-sm mx-auto">
                  No tables matched your active filter selections. Try broadening your criteria or reset the filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 bg-charcoal text-cream text-xs uppercase tracking-widest font-medium hover:bg-darkBrown transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-cream shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-beige">
              <h3 className="font-serif text-xl uppercase tracking-wider text-charcoal">
                Filters
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-charcoal/60 hover:text-charcoal"
              >
                <CloseIcon />
              </button>
            </div>

            <div>
              <h4 className="font-serif text-sm uppercase tracking-wider text-charcoal mb-3">
                Category
              </h4>
              <div className="space-y-2 text-xs">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="mobileCategory"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="accent-darkBrown"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-serif text-sm uppercase tracking-wider text-charcoal mb-3">
                Price Range
              </h4>
              <div className="space-y-2 text-xs">
                {priceRanges.map(range => (
                  <label key={range.value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="mobilePrice"
                      checked={selectedPriceRange === range.value}
                      onChange={() => setSelectedPriceRange(range.value)}
                      className="accent-darkBrown"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-beige space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-charcoal text-cream text-xs uppercase tracking-widest font-medium"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              <button
                onClick={resetFilters}
                className="w-full py-2 text-xs uppercase tracking-widest text-taupe text-center block"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream py-20 text-center font-serif text-xl">Loading Console Tables...</div>}>
      <ShopContent />
    </Suspense>
  );
}

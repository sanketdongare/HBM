'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SearchIcon from '@mui/icons-material/Search';
import { PRODUCTS } from '@/data/products';
import type { Product } from '@/types';

const CATEGORIES = ['All', 'Modern', 'Luxury', 'Wooden', 'Marble', 'Minimalist', 'Statement'];

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  const filtered = products.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchStock =
      stockFilter === 'All' ||
      (stockFilter === 'In Stock' && p.inStock) ||
      (stockFilter === 'Out of Stock' && !p.inStock);
    return matchSearch && matchCategory && matchStock;
  });

  const handleDelete = (id: string) => {
    if (confirm('Delete this product? This cannot be undone.')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-[#2c2420]">Products</h1>
          <p className="text-sm text-[#9e8872] mt-1">{products.length} total products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2c2420] text-white text-sm font-medium rounded-lg hover:bg-[#3d3028] transition-colors"
        >
          <AddIcon sx={{ fontSize: 18 }} />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-[#ede8e3] p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon sx={{ fontSize: 18 }} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9e8872]" />
            <input
              type="text"
              placeholder="Search by name or SKU…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#ddd5c8] rounded-lg text-sm focus:outline-none focus:border-[#c9a96e]"
            />
          </div>
          {/* Category */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-[#ddd5c8] rounded-lg text-sm focus:outline-none focus:border-[#c9a96e] text-[#2c2420]"
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          {/* Stock */}
          <select
            value={stockFilter}
            onChange={e => setStockFilter(e.target.value)}
            className="px-3 py-2 border border-[#ddd5c8] rounded-lg text-sm focus:outline-none focus:border-[#c9a96e] text-[#2c2420]"
          >
            {['All', 'In Stock', 'Out of Stock'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#ede8e3] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#faf7f4] border-b border-[#ede8e3]">
                <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-[#9e8872] font-medium">Product</th>
                <th className="text-left px-4 py-4 text-xs uppercase tracking-widest text-[#9e8872] font-medium">Category</th>
                <th className="text-left px-4 py-4 text-xs uppercase tracking-widest text-[#9e8872] font-medium">Price</th>
                <th className="text-left px-4 py-4 text-xs uppercase tracking-widest text-[#9e8872] font-medium">Status</th>
                <th className="text-left px-4 py-4 text-xs uppercase tracking-widest text-[#9e8872] font-medium">Badge</th>
                <th className="text-right px-6 py-4 text-xs uppercase tracking-widest text-[#9e8872] font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0ebe5]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-[#9e8872]">
                    No products found.
                  </td>
                </tr>
              ) : (
                filtered.map(product => (
                  <tr key={product.id} className="hover:bg-[#faf7f4] transition-colors">
                    {/* Product */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg bg-[#f5f1ec] flex-shrink-0"
                        />
                        <div>
                          <p className="font-medium text-[#2c2420]">{product.name}</p>
                          <p className="text-xs text-[#9e8872]">SKU: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="px-4 py-4 text-[#6b5c4e]">{product.category}</td>
                    {/* Price */}
                    <td className="px-4 py-4">
                      <p className="font-semibold text-[#2c2420]">₹{product.price.toLocaleString('en-IN')}</p>
                      {product.originalPrice > product.price && (
                        <p className="text-xs text-[#9e8872] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</p>
                      )}
                    </td>
                    {/* Stock */}
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.inStock
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-700'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    {/* Badge */}
                    <td className="px-4 py-4">
                      {product.badge ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#c9a96e]/10 text-[#a07c3f]">
                          {product.badge}
                        </span>
                      ) : (
                        <span className="text-[#c5b8ab] text-xs">—</span>
                      )}
                    </td>
                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/product/${product.slug}`}
                          target="_blank"
                          className="p-1.5 text-[#9e8872] hover:text-[#2c2420] hover:bg-[#f0ebe5] rounded transition-colors"
                          title="Preview"
                        >
                          <OpenInNewIcon sx={{ fontSize: 16 }} />
                        </Link>
                        <button
                          onClick={() => {
                            const clone = { ...product, id: `${product.id}-copy`, name: `${product.name} (Copy)` };
                            setProducts(prev => [clone, ...prev]);
                          }}
                          className="p-1.5 text-[#9e8872] hover:text-[#2c2420] hover:bg-[#f0ebe5] rounded transition-colors"
                          title="Duplicate"
                        >
                          <ContentCopyIcon sx={{ fontSize: 16 }} />
                        </button>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-1.5 text-[#9e8872] hover:text-[#c9a96e] hover:bg-[#f0ebe5] rounded transition-colors"
                          title="Edit"
                        >
                          <EditIcon sx={{ fontSize: 16 }} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-1.5 text-[#9e8872] hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <DeleteIcon sx={{ fontSize: 16 }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

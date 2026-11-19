'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import InventoryIcon from '@mui/icons-material/Inventory';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PendingIcon from '@mui/icons-material/Pending';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddIcon from '@mui/icons-material/Add';
import { PRODUCTS } from '@/data/products';

export default function AdminDashboard() {
  const { data: session } = useSession();

  const totalProducts = PRODUCTS.length;
  const inStock = PRODUCTS.filter(p => p.inStock).length;
  const outOfStock = PRODUCTS.filter(p => !p.inStock).length;
  const featured = PRODUCTS.filter(p => p.badge).length;

  const stats = [
    { label: 'Total Products', value: totalProducts, icon: InventoryIcon, color: 'bg-blue-50 text-blue-600' },
    { label: 'In Stock', value: inStock, icon: PublishedWithChangesIcon, color: 'bg-green-50 text-green-600' },
    { label: 'Out of Stock', value: outOfStock, icon: UnpublishedIcon, color: 'bg-red-50 text-red-600' },
    { label: 'Featured', value: featured, icon: WarningAmberIcon, color: 'bg-amber-50 text-amber-600' },
    { label: 'Total Orders', value: 0, icon: ShoppingCartIcon, color: 'bg-purple-50 text-purple-600' },
    { label: 'Pending Orders', value: 0, icon: PendingIcon, color: 'bg-orange-50 text-orange-600' },
    { label: 'Revenue', value: '₹0', icon: CurrencyRupeeIcon, color: 'bg-emerald-50 text-emerald-600' },
  ];

  const quickActions = [
    { label: 'Add New Product', href: '/admin/products/new', primary: true },
    { label: 'Manage Products', href: '/admin/products', primary: false },
    { label: 'Manage Orders', href: '/admin/orders', primary: false },
    { label: 'View Website', href: '/', primary: false },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-[#2c2420]">
          Welcome back, {session?.user?.name?.split(' ')[0] ?? 'Admin'} 👋
        </h1>
        <p className="text-sm text-[#9e8872] mt-1">Here&apos;s what&apos;s happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-[#ede8e3]">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${color} mb-3`}>
              <Icon sx={{ fontSize: 20 }} />
            </div>
            <p className="text-2xl font-semibold text-[#2c2420]">{value}</p>
            <p className="text-xs text-[#9e8872] mt-0.5 uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ede8e3] mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[#6b5c4e] mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map(({ label, href, primary }) => (
            <Link
              key={href}
              href={href}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                primary
                  ? 'bg-[#2c2420] text-white hover:bg-[#3d3028]'
                  : 'border border-[#ddd5c8] text-[#2c2420] hover:bg-[#f5f1ec]'
              }`}
            >
              {primary && <AddIcon sx={{ fontSize: 16 }} />}
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-xl shadow-sm border border-[#ede8e3]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ede8e3]">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#6b5c4e]">Recent Products</h2>
          <Link href="/admin/products" className="text-xs text-[#c9a96e] hover:text-[#a07c3f] transition-colors">
            View all →
          </Link>
        </div>
        <div className="divide-y divide-[#f0ebe5]">
          {PRODUCTS.slice(0, 5).map(product => (
            <div key={product.id} className="flex items-center gap-4 px-6 py-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-lg bg-[#f5f1ec]"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#2c2420] truncate">{product.name}</p>
                <p className="text-xs text-[#9e8872]">{product.category} · {product.badge ?? 'Standard'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#2c2420]">₹{product.price.toLocaleString('en-IN')}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  product.inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="text-xs text-[#c9a96e] hover:text-[#a07c3f] ml-2 transition-colors"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LogoutIcon from '@mui/icons-material/Logout';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: DashboardIcon },
  { label: 'Products', href: '/admin/products', icon: InventoryIcon },
  { label: 'Categories', href: '/admin/categories', icon: CategoryIcon },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCartIcon },
  { label: 'Customers', href: '/admin/customers', icon: PeopleIcon },
  { label: 'Settings', href: '/admin/settings', icon: SettingsIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#1a1410] text-white flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="font-serif text-lg tracking-[0.15em] uppercase text-white">Homes By Meera</h1>
        <p className="text-[10px] uppercase tracking-widest text-[#c9a96e] mt-0.5">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-[#c9a96e] text-[#1a1410] font-semibold'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon sx={{ fontSize: 18 }} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-4 py-6 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <OpenInNewIcon sx={{ fontSize: 18 }} />
          View Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-red-400 hover:bg-white/10 transition-colors"
        >
          <LogoutIcon sx={{ fontSize: 18 }} />
          Logout
        </button>
      </div>
    </aside>
  );
}

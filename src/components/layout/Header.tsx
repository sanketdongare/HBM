'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useSession } from 'next-auth/react';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const { openCart, totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Console Tables', href: '/shop?category=all' },
    { label: 'Collections', href: '/collections' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const headerBgClass = isHomePage
    ? isScrolled
      ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-beige/60 text-charcoal'
      : 'bg-gradient-to-b from-charcoal/60 via-charcoal/20 to-transparent text-white'
    : 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-beige/60 text-charcoal';

  const logoColorClass = isHomePage && !isScrolled ? 'text-white' : 'text-charcoal';
  const navTextColor = isHomePage && !isScrolled ? 'text-white/90 hover:text-white' : 'text-charcoal/80 hover:text-charcoal';
  const iconColorClass = isHomePage && !isScrolled ? 'text-white' : 'text-charcoal';

  // Determine account link
  const accountHref =
    session?.user?.role === 'admin' ? '/admin/dashboard' : '/account';
  const accountLabel =
    session?.user?.role === 'admin' ? 'Admin' : 'Account';

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${headerBgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">

            {/* Mobile Hamburger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`p-2 -ml-2 rounded-md transition-colors ${iconColorClass}`}
                aria-label="Open mobile navigation menu"
              >
                <MenuIcon fontSize="medium" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-1 lg:flex-initial flex items-center justify-center lg:justify-start">
              <Link href="/" className="group flex flex-col items-center lg:items-start">
                <span className={`font-serif text-2xl sm:text-3xl tracking-[0.2em] uppercase font-light transition-colors ${logoColorClass}`}>
                  Homes By Meera
                </span>
                <span className={`text-[9px] uppercase tracking-[0.35em] mt-0.5 transition-colors ${isHomePage && !isScrolled ? 'text-cream/80' : 'text-taupe'}`}>
                  Luxury Console Tables &amp; Living
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              {navLinks.map(link => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative text-xs uppercase tracking-[0.2em] font-medium transition-colors py-2 ${navTextColor} ${isActive ? 'font-semibold' : ''}`}
                  >
                    {link.label}
                    {isActive && <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-mutedGold animate-fadeIn" />}
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-3 sm:space-x-5">

              {/* Search */}
              <button
                onClick={onOpenSearch}
                className={`p-2 rounded-full hover:bg-black/5 transition-colors ${iconColorClass}`}
                aria-label="Search"
                title="Search"
              >
                <SearchIcon fontSize="small" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className={`p-2 rounded-full hover:bg-black/5 transition-colors relative ${iconColorClass}`}
                aria-label="Wishlist"
                title="Your Wishlist"
              >
                <FavoriteBorderIcon fontSize="small" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-mutedGold text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className={`p-2 rounded-full hover:bg-black/5 transition-colors relative ${iconColorClass}`}
                aria-label="View shopping cart"
                title="Shopping Bag"
              >
                <ShoppingBagOutlinedIcon fontSize="small" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-darkBrown text-cream text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Account / Login */}
              {status === 'loading' ? null : session?.user ? (
                <Link
                  href={accountHref}
                  className={`hidden sm:flex items-center gap-1 p-2 rounded-full hover:bg-black/5 transition-colors ${iconColorClass}`}
                  title={accountLabel}
                >
                  <AccountCircleIcon fontSize="small" />
                  <span className="text-xs uppercase tracking-widest">{accountLabel}</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className={`hidden sm:flex items-center gap-1 p-2 rounded-full hover:bg-black/5 transition-colors ${iconColorClass}`}
                  title="Login"
                >
                  <AccountCircleIcon fontSize="small" />
                  <span className="text-xs uppercase tracking-widest">Login</span>
                </Link>
              )}

            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-cream shadow-2xl z-50 flex flex-col justify-between overflow-y-auto border-r border-beige">
            <div className="p-6">
              <div className="flex items-center justify-between pb-6 border-b border-beige">
                <div>
                  <h3 className="font-serif text-xl tracking-[0.18em] uppercase text-charcoal">Homes By Meera</h3>
                  <p className="text-[10px] uppercase tracking-widest text-taupe mt-0.5">Pune • Maharashtra</p>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                  <CloseIcon className="text-charcoal" />
                </button>
              </div>

              <nav className="mt-6 space-y-4">
                {navLinks.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-charcoal text-base hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Account / Login */}
              <div className="mt-6 pt-6 border-t border-beige">
                {status !== 'loading' && (
                  <Link
                    href={session?.user ? accountHref : '/login'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-charcoal text-base hover:underline"
                  >
                    <AccountCircleIcon fontSize="small" />
                    {session?.user ? accountLabel : 'Login / My Account'}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

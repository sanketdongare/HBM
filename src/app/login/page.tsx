'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setError('');
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (result?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      router.push('/');
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    await signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-[#f9f6f1] flex">

      {/* Left Panel — decorative image side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#2c2420]">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
          alt="Luxury Console Table"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c2420]/80 via-[#2c2420]/30 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-14 text-white">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a96e]/80 mb-4">
            Homes By Meera
          </p>
          <h2 className="font-serif text-4xl xl:text-5xl font-light leading-tight mb-4">
            Crafted for<br />Every Corner
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Sign in to explore our curated collection of luxury console tables, track your orders, and save your favourites.
          </p>
          <div className="mt-10 flex items-center gap-3">
            <div className="w-8 h-[1px] bg-[#c9a96e]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">
              Pune Experience Studio
            </span>
          </div>
        </div>
      </div>

      {/* Right Panel — form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12">

        {/* Back to site */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#6b5c4e] hover:text-[#2c2420] transition-colors"
          >
            <ArrowBackIcon sx={{ fontSize: 14 }} />
            Back to website
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">

          {/* Logo */}
          <div className="mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.15em] uppercase font-light text-[#2c2420]">
              Homes By Meera
            </h1>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#9e8872] mt-1">
              Luxury Console Tables &amp; Living
            </p>
          </div>

          <h2 className="text-xl font-serif text-[#2c2420] mb-1">Welcome back</h2>
          <p className="text-sm text-[#9e8872] mb-8">Sign in to your account to continue</p>

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border border-[#ddd5c8] rounded-lg text-sm text-[#2c2420] hover:bg-[#f3ede6] transition-colors font-medium disabled:opacity-60 mb-6"
          >
            <GoogleIcon sx={{ fontSize: 18 }} />
            {googleLoading ? 'Redirecting…' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#e5ddd4]" />
            <span className="text-xs text-[#b5a899] uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-[#e5ddd4]" />
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6b5c4e] mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-white border border-[#ddd5c8] rounded-lg text-sm text-[#2c2420] placeholder-[#c5b8ab] focus:outline-none focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e] transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs uppercase tracking-widest text-[#6b5c4e]">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#c9a96e] hover:text-[#a07c3f] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 pr-12 bg-white border border-[#ddd5c8] rounded-lg text-sm text-[#2c2420] placeholder-[#c5b8ab] focus:outline-none focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9e8872] hover:text-[#2c2420] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword
                    ? <VisibilityOffIcon sx={{ fontSize: 18 }} />
                    : <VisibilityIcon sx={{ fontSize: 18 }} />
                  }
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#2c2420] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-lg hover:bg-[#3d3028] transition-colors disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Sign up */}
          <p className="mt-8 text-center text-sm text-[#9e8872]">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="text-[#c9a96e] hover:text-[#a07c3f] font-medium transition-colors"
            >
              Create account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

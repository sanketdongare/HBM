'use client';

import React, { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 600);
  };

  return (
    <section className="py-20 sm:py-24 bg-[#231f1c] text-cream relative overflow-hidden border-t border-[#3b3733]">
      {/* Subtle decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-mutedGold/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block mb-3">
          The Design Journal
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-cream leading-tight">
          Bring Beauty Into Your Home
        </h2>
        <p className="mt-4 text-xs sm:text-sm text-beige/80 max-w-xl mx-auto leading-relaxed">
          Subscribe for new collections, home styling inspiration and exclusive offers. Receive our curated lookbook on entryways &amp; console table styling.
        </p>

        {status === 'success' ? (
          <div className="mt-8 p-6 bg-cream/10 border border-mutedGold/50 max-w-md mx-auto rounded animate-fadeIn">
            <CheckCircleOutlineIcon className="text-mutedGold mb-2" fontSize="large" />
            <h4 className="font-serif text-xl text-cream font-medium">Thank You for Subscribing</h4>
            <p className="text-xs text-beige/80 mt-1">
              Welcome to the Homes By Meera inner circle. Our inaugural seasonal lookbook is on its way to your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                className="flex-1 px-4 py-3.5 bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/50 text-xs focus:outline-none focus:border-mutedGold transition-colors tracking-wide"
                aria-label="Email for newsletter subscription"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-3.5 bg-mutedGold hover:bg-goldDark text-charcoal font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                <span>{status === 'loading' ? 'Joining...' : 'Subscribe'}</span>
                <ArrowForwardIcon fontSize="small" />
              </button>
            </div>
            {status === 'error' && (
              <p className="text-xs text-red-400 mt-2 text-left">{errorMessage}</p>
            )}
            <p className="text-[10px] text-taupe mt-3 uppercase tracking-wider">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

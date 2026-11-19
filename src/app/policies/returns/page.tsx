import React from 'react';
import Link from 'next/link';

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-cream min-h-screen py-16 sm:py-24 text-charcoal">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block mb-2">
            Homes By Meera
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">Returns &amp; Exchanges</h1>
          <p className="text-xs text-taupe mt-1">Last updated: 2026</p>
        </div>

        <div className="prose prose-sm text-xs sm:text-sm text-charcoal/80 space-y-4 leading-relaxed">
          <p>
            We take immense pride in the craftsmanship of every console table. We want you to be thoroughly delighted with your piece.
          </p>

          <h3 className="font-serif text-lg text-charcoal pt-4">1. 7-Day Inspection Window</h3>
          <p>
            If your console table arrives damaged, defective, or does not match your chosen finish or dimensions, notify us within 7 days of delivery for a prompt replacement or full refund.
          </p>

          <h3 className="font-serif text-lg text-charcoal pt-4">2. Initiation Process</h3>
          <p>
            To initiate a return or exchange, send photos of the piece along with your order ID to{' '}
            <a href="mailto:homesbymeera05@gmail.com" className="text-darkBrown underline">
              homesbymeera05@gmail.com
            </a>{' '}
            or call our customer support team directly at{' '}
            <a href="tel:7083895839" className="text-darkBrown underline">
              7083895839
            </a>
            .
          </p>
        </div>

        <div className="pt-8 border-t border-beige">
          <Link href="/" className="text-xs uppercase tracking-wider text-darkBrown font-medium hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

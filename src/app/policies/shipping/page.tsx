import React from 'react';
import Link from 'next/link';

export default function ShippingPolicyPage() {
  return (
    <div className="bg-cream min-h-screen py-16 sm:py-24 text-charcoal">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block mb-2">
            Homes By Meera
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">Shipping &amp; White Glove Delivery</h1>
          <p className="text-xs text-taupe mt-1">Last updated: 2026</p>
        </div>

        <div className="prose prose-sm text-xs sm:text-sm text-charcoal/80 space-y-4 leading-relaxed">
          <p>
            At Homes By Meera, we treat the transit of our console tables with the highest reverence. Every piece is crated in shock-absorbing protective foam and transported via dedicated furniture handling specialists.
          </p>

          <h3 className="font-serif text-lg text-charcoal pt-4">1. White Glove Delivery in Pune &amp; PCMC</h3>
          <p>
            For clients in Pune, our specialized delivery personnel bring the console into your home, place it in your room of choice, assemble and level the pedestal base, and remove all packaging materials.
          </p>

          <h3 className="font-serif text-lg text-charcoal pt-4">2. Pan-India Shipping Timelines</h3>
          <p>
            Standard in-stock orders are dispatched within 3–5 business days. Delivery to Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, and other metro cities generally takes 5–7 business days following dispatch.
          </p>

          <h3 className="font-serif text-lg text-charcoal pt-4">3. Transit Insurance</h3>
          <p>
            100% of shipments are comprehensively insured against breakage, structural defect, or loss during transportation.
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

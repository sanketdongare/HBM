import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="bg-cream min-h-screen py-16 sm:py-24 text-charcoal">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block mb-2">
            Homes By Meera
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">Terms &amp; Conditions</h1>
          <p className="text-xs text-taupe mt-1">Last updated: 2026</p>
        </div>

        <div className="prose prose-sm text-xs sm:text-sm text-charcoal/80 space-y-4 leading-relaxed">
          <p>
            Welcome to Homes By Meera. These terms and conditions outline the rules and regulations for the use of Homes By Meera’s Website and bespoke furniture services.
          </p>

          <h3 className="font-serif text-lg text-charcoal pt-4">1. Natural Materials &amp; Variation</h3>
          <p>
            Because our console tables feature authentic natural timber (oak, walnut, ash) and quarried stone (Carrara marble, travertine), subtle variations in grain pattern, mineral veining, and organic coloration are hallmarks of authentic natural materials rather than manufacturing defects.
          </p>

          <h3 className="font-serif text-lg text-charcoal pt-4">2. Custom &amp; Bespoke Commissions</h3>
          <p>
            Orders made with custom non-standard dimensions are tailored specifically for the client&apos;s residence and are confirmed once final dimensional approval is granted.
          </p>

          <h3 className="font-serif text-lg text-charcoal pt-4">3. Governing Law</h3>
          <p>
            These terms are governed by and construed in accordance with the laws of India, under the jurisdiction of the courts in Pune, Maharashtra.
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

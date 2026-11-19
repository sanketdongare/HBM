import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-cream min-h-screen py-16 sm:py-24 text-charcoal">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block mb-2">
            Homes By Meera
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">Privacy Policy</h1>
          <p className="text-xs text-taupe mt-1">Last updated: 2026</p>
        </div>

        <div className="prose prose-sm text-xs sm:text-sm text-charcoal/80 space-y-4 leading-relaxed">
          <p>
            At Homes By Meera, accessible from homesbymeera.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Homes By Meera and how we use it.
          </p>

          <h3 className="font-serif text-lg text-charcoal pt-4">1. Information We Collect</h3>
          <p>
            When you purchase a console table or request an interior consultation, we collect personal information such as your name, delivery address, phone number, and email to process your order, provide white-glove delivery, and send order updates.
          </p>

          <h3 className="font-serif text-lg text-charcoal pt-4">2. Payment Security</h3>
          <p>
            All electronic payment transactions are encrypted using industrial standard 256-bit SSL protocols. We do not store your complete credit card details or banking passwords on our servers.
          </p>

          <h3 className="font-serif text-lg text-charcoal pt-4">3. Contact Information</h3>
          <p>
            If you have questions about our privacy practices, please contact us at{' '}
            <a href="mailto:homesbymeera05@gmail.com" className="text-darkBrown underline">
              homesbymeera05@gmail.com
            </a>{' '}
            or call <a href="tel:7083895839" className="text-darkBrown underline">7083895839</a>.
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

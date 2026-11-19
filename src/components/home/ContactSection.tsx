'use client';

import React from 'react';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';

export const ContactSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#f5efe7] text-charcoal border-b border-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block mb-2">
            Visit Our Design Studio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal">
            Contact & Visit Us
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-taupe leading-relaxed">
            Experience our console tables in person. Inspect stone finishes, feel natural solid hardwood grains, and consult with our design specialists in Pune.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Contact Cards & Details (5 cols) */}
          <div className="lg:col-span-5 bg-warmWhite p-8 sm:p-10 rounded border border-beige/80 shadow-luxury flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-mutedGold font-semibold block">
                  Studio Headquarters
                </span>
                <h3 className="font-serif text-2xl text-charcoal font-light mt-1">
                  Homes By Meera Studio
                </h3>
              </div>

              {/* Clickable Address */}
              <a
                href="https://maps.app.goo.gl/ADXauhRxA2HXUakZ7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3.5 bg-cream/60 hover:bg-cream border border-beige/60 rounded transition-colors group block"
              >
                <PlaceOutlinedIcon className="text-mutedGold mt-0.5 flex-shrink-0" />
                <div className="text-xs text-charcoal/85 leading-relaxed">
                  <strong className="block text-charcoal font-medium">PUSHPA Complex, Office 101</strong>
                  Near D Mart, Lohegaon Wagholi Road,
                  <br />
                  Pune, Maharashtra – 412207, India.
                  <span className="text-[11px] text-mutedGold block mt-1 font-semibold group-hover:underline">
                    View on Google Maps →
                  </span>
                </div>
              </a>

              {/* Clickable Phone */}
              <a
                href="tel:7083895839"
                className="flex items-center gap-3 p-3.5 bg-cream/60 hover:bg-cream border border-beige/60 rounded transition-colors group"
              >
                <PhoneOutlinedIcon className="text-mutedGold flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-taupe block text-[10px] uppercase tracking-wider">Phone / WhatsApp</span>
                  <span className="text-charcoal font-medium text-sm group-hover:text-mutedGold transition-colors">
                    +91 7083895839
                  </span>
                </div>
              </a>

              {/* Clickable Email */}
              <a
                href="mailto:homesbymeera05@gmail.com"
                className="flex items-center gap-3 p-3.5 bg-cream/60 hover:bg-cream border border-beige/60 rounded transition-colors group"
              >
                <EmailOutlinedIcon className="text-mutedGold flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-taupe block text-[10px] uppercase tracking-wider">Inquiries & Custom Orders</span>
                  <span className="text-charcoal font-medium group-hover:text-mutedGold transition-colors">
                    homesbymeera05@gmail.com
                  </span>
                </div>
              </a>

              {/* Timings */}
              <div className="flex items-center gap-3 p-3.5 bg-cream/40 rounded border border-beige/40 text-xs text-taupe">
                <AccessTimeOutlinedIcon className="text-mutedGold flex-shrink-0" />
                <div>
                  <span className="text-charcoal font-medium block">Studio Visiting Hours</span>
                  <span>Monday to Saturday: 10:30 AM – 7:30 PM (Sunday by appointment)</span>
                </div>
              </div>
            </div>

            {/* 3 Call to Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 mt-6 border-t border-beige/80">
              <a
                href="tel:7083895839"
                className="py-3 px-2 bg-charcoal hover:bg-darkBrown text-cream text-[11px] uppercase tracking-widest font-medium text-center rounded transition-colors shadow-sm"
              >
                Call Now
              </a>
              <a
                href="mailto:homesbymeera05@gmail.com"
                className="py-3 px-2 bg-warmWhite hover:bg-cream border border-beige text-charcoal text-[11px] uppercase tracking-widest font-medium text-center rounded transition-colors"
              >
                Email Us
              </a>
              <a
                href="https://maps.app.goo.gl/ADXauhRxA2HXUakZ7"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-2 bg-mutedGold hover:bg-goldDark text-charcoal text-[11px] uppercase tracking-widest font-medium text-center rounded transition-colors shadow-sm flex items-center justify-center gap-1"
              >
                <DirectionsOutlinedIcon style={{ fontSize: 14 }} />
                Directions
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Card & Location Map (7 cols) */}
          <div className="lg:col-span-7 bg-warmWhite rounded border border-beige/80 shadow-luxury overflow-hidden flex flex-col">
            {/* Interactive Map Embed */}
            <div className="relative w-full h-[360px] sm:h-[420px] bg-[#e5e3df]">
              <iframe
                title="Homes By Meera Pune Studio Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.9961633596775!2d73.939223!3d18.574246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1274041b3e7%3A0xb3514a4c58cf32df!2sPushpa%20Complex!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Floating Card */}
              <div className="absolute top-4 left-4 bg-warmWhite/95 backdrop-blur-md p-4 rounded shadow-lg border border-beige max-w-xs text-xs">
                <div className="flex items-center gap-1.5 text-mutedGold font-semibold uppercase tracking-wider text-[10px]">
                  <MapOutlinedIcon style={{ fontSize: 14 }} />
                  <span>Homes By Meera Studio</span>
                </div>
                <p className="text-charcoal font-medium mt-1">PUSHPA Complex, Office 101, Pune</p>
                <p className="text-taupe text-[11px]">Near D Mart, Lohegaon Wagholi Road</p>
              </div>
            </div>

            {/* Bottom bar of location card */}
            <div className="p-6 bg-cream/70 border-t border-beige flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-serif text-base text-charcoal font-medium block">
                  Visiting from Mumbai or outside Pune?
                </span>
                <span className="text-xs text-taupe">
                  We are conveniently situated just 15 minutes from Pune International Airport.
                </span>
              </div>
              <a
                href="https://maps.app.goo.gl/ADXauhRxA2HXUakZ7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-darkBrown hover:bg-charcoal text-cream text-xs uppercase tracking-wider font-medium rounded transition-colors flex-shrink-0"
              >
                <span>Open in Google Maps</span>
                <DirectionsOutlinedIcon fontSize="small" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

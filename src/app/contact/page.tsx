'use client';

import React, { useState } from 'react';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'custom-dimensions',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'custom-dimensions',
        message: '',
      });
    }, 700);
  };

  return (
    <div className="bg-cream min-h-screen py-16 sm:py-24 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block mb-2">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal">
            Contact &amp; Studio Visit
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-taupe leading-relaxed">
            Have questions about custom sizing, stone swatches, or interior styling advice? Reach out to our Pune team or drop by our showroom.
          </p>
        </div>

        {/* 2-Column Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Direct Contact Details & Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-warmWhite p-8 sm:p-10 rounded border border-beige shadow-sm space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-mutedGold font-semibold block">
                  Homes By Meera
                </span>
                <h3 className="font-serif text-2xl text-charcoal font-light mt-1">
                  Pune Studio Headquarters
                </h3>
              </div>

              {/* Clickable Address */}
              <a
                href="https://maps.app.goo.gl/ADXauhRxA2HXUakZ7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 p-4 bg-cream/70 hover:bg-cream border border-beige/70 rounded transition-colors group block"
              >
                <PlaceOutlinedIcon className="text-mutedGold mt-0.5 flex-shrink-0" />
                <div className="text-xs text-charcoal/85 leading-relaxed">
                  <strong className="block text-charcoal font-semibold">Address</strong>
                  PUSHPA Complex, Office 101,
                  <br />
                  Near D Mart, Lohegaon Wagholi Road,
                  <br />
                  Pune, Maharashtra – 412207, India.
                  <span className="text-[11px] text-mutedGold block mt-1.5 font-semibold group-hover:underline">
                    Open in Google Maps →
                  </span>
                </div>
              </a>

              {/* Clickable Phone */}
              <a
                href="tel:7083895839"
                className="flex items-center gap-3.5 p-4 bg-cream/70 hover:bg-cream border border-beige/70 rounded transition-colors group"
              >
                <PhoneOutlinedIcon className="text-mutedGold flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-taupe block text-[10px] uppercase tracking-wider font-semibold">
                    Contact Number
                  </span>
                  <span className="text-charcoal font-medium text-sm group-hover:text-mutedGold transition-colors">
                    7083895839
                  </span>
                </div>
              </a>

              {/* Clickable Email */}
              <a
                href="mailto:homesbymeera05@gmail.com"
                className="flex items-center gap-3.5 p-4 bg-cream/70 hover:bg-cream border border-beige/70 rounded transition-colors group"
              >
                <EmailOutlinedIcon className="text-mutedGold flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-taupe block text-[10px] uppercase tracking-wider font-semibold">
                    Email Address
                  </span>
                  <span className="text-charcoal font-medium group-hover:text-mutedGold transition-colors truncate">
                    homesbymeera05@gmail.com
                  </span>
                </div>
              </a>

              {/* Clickable Instagram */}
              <a
                href="https://www.instagram.com/homes_by_meera"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 bg-cream/70 hover:bg-cream border border-beige/70 rounded transition-colors group"
              >
                <InstagramIcon className="text-mutedGold flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-taupe block text-[10px] uppercase tracking-wider font-semibold">
                    Instagram Profile
                  </span>
                  <span className="text-charcoal font-medium group-hover:text-mutedGold transition-colors">
                    https://www.instagram.com/homes_by_meera
                  </span>
                </div>
              </a>

              {/* Timings */}
              <div className="flex items-center gap-3.5 p-4 bg-cream/40 rounded border border-beige/40 text-xs text-taupe">
                <AccessTimeOutlinedIcon className="text-mutedGold flex-shrink-0" />
                <div>
                  <span className="text-charcoal font-medium block">Working Hours</span>
                  <span>Monday – Saturday: 10:30 AM – 7:30 PM (IST)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-warmWhite p-8 sm:p-10 rounded border border-beige shadow-sm">
            <h3 className="font-serif text-2xl text-charcoal font-light mb-2">
              Send a Note or Inquire for Bespoke Sizing
            </h3>
            <p className="text-xs text-taupe mb-6 leading-relaxed">
              We frequently work with interior decorators, architects, and discerning homeowners across India. Fill out the form below and our studio team will revert within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 bg-cream/80 border border-mutedGold/60 rounded text-center space-y-3 animate-fadeIn">
                <CheckCircleOutlineIcon className="text-mutedGold" style={{ fontSize: 44 }} />
                <h4 className="font-serif text-2xl text-charcoal">Message Sent Successfully</h4>
                <p className="text-xs text-taupe max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to Homes By Meera. Our design concierge will contact you shortly via email or phone.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-charcoal text-cream text-xs uppercase tracking-widest font-medium hover:bg-darkBrown transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-charcoal/80 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-3 bg-cream border border-beige focus:outline-none focus:border-mutedGold text-xs"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-charcoal/80 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-3 bg-cream border border-beige focus:outline-none focus:border-mutedGold text-xs"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-charcoal/80 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-3 bg-cream border border-beige focus:outline-none focus:border-mutedGold text-xs"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-charcoal/80 mb-1">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={e => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3 py-3 bg-cream border border-beige focus:outline-none focus:border-mutedGold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    <option value="custom-dimensions">Custom Dimensions &amp; Tailored Sizing</option>
                    <option value="studio-visit">Schedule an In-Person Studio Visit (Pune)</option>
                    <option value="trade-architect">Architect / Interior Designer Partnership</option>
                    <option value="order-support">Order Delivery Status &amp; Support</option>
                    <option value="general">General Furniture Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-charcoal/80 mb-1">
                    Message / Specification Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-3 bg-cream border border-beige focus:outline-none focus:border-mutedGold text-xs leading-relaxed"
                    placeholder="Tell us about your space, preferred console table model, timber finish, or dimensions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-charcoal hover:bg-darkBrown text-cream text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <SendOutlinedIcon style={{ fontSize: 16 }} />
                  <span>{loading ? 'Submitting...' : 'Send Inquiry to Concierge'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Full-Width Interactive Google Maps Showcase */}
        <div className="bg-warmWhite p-6 sm:p-8 rounded border border-beige shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-mutedGold font-semibold block">
                Pune Studio Location
              </span>
              <h3 className="font-serif text-2xl text-charcoal">
                Interactive Studio Map
              </h3>
            </div>
            <a
              href="https://maps.app.goo.gl/ADXauhRxA2HXUakZ7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-darkBrown text-cream text-xs uppercase tracking-wider font-medium hover:bg-charcoal transition-colors rounded"
            >
              <DirectionsOutlinedIcon fontSize="small" />
              <span>Get Directions</span>
            </a>
          </div>

          <div className="relative w-full h-[380px] sm:h-[450px] rounded overflow-hidden border border-beige">
            <iframe
              title="Homes By Meera Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.9961633596775!2d73.939223!3d18.574246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1274041b3e7%3A0xb3514a4c58cf32df!2sPushpa%20Complex!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

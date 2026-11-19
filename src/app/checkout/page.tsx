'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { items, subtotal, shippingFee, discountAmount, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '412207',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = subtotal - discountAmount + shippingFee + (deliverySpeed === 'express' ? 999 : 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10)
      newErrors.phone = 'Valid 10-digit phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.pincode.trim() || formData.pincode.length !== 6)
      newErrors.pincode = 'Valid 6-digit PIN code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsPlacingOrder(true);
    setTimeout(() => {
      const orderId = `HBM-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderConfirmed(orderId);
      setIsPlacingOrder(false);
      clearCart();
    }, 1200);
  };

  if (orderConfirmed) {
    return (
      <div className="bg-cream min-h-screen py-16 sm:py-24 text-charcoal">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-warmWhite p-8 sm:p-12 rounded border border-beige shadow-luxury text-center space-y-6">
            <div className="w-20 h-20 bg-cream border border-mutedGold/40 text-mutedGold rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircleIcon style={{ fontSize: 44 }} />
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-mutedGold font-semibold block">
                Order Received
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mt-1">
                Thank You, {formData.firstName}!
              </h1>
              <p className="text-xs sm:text-sm text-taupe mt-2">
                Your bespoke console table order has been recorded with reference number:
              </p>
              <div className="inline-block mt-3 px-5 py-2 bg-cream border border-beige text-charcoal font-mono text-base font-semibold tracking-wider rounded">
                {orderConfirmed}
              </div>
            </div>

            <div className="p-4 bg-cream/70 rounded border border-beige/60 text-xs text-left text-charcoal/85 space-y-2">
              <p>
                <strong>Delivery Address:</strong> {formData.address}, {formData.apartment && `${formData.apartment}, `}
                {formData.city}, {formData.state} – {formData.pincode}
              </p>
              <p>
                <strong>Contact:</strong> {formData.phone} • {formData.email}
              </p>
              <p>
                <strong>Status:</strong> Our Pune concierge will contact you within 24 hours to coordinate white-glove arrival and room-of-choice installation.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="px-8 py-3.5 bg-charcoal text-cream text-xs uppercase tracking-[0.2em] font-medium hover:bg-darkBrown transition-colors"
              >
                Return to Shop
              </Link>
              <a
                href="tel:7083895839"
                className="px-8 py-3.5 bg-cream border border-beige text-charcoal text-xs uppercase tracking-[0.2em] font-medium hover:bg-warmWhite transition-colors"
              >
                Contact Concierge
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen py-20 text-center text-charcoal">
        <div className="max-w-md mx-auto p-8 bg-warmWhite rounded border border-beige shadow-sm">
          <h2 className="font-serif text-2xl text-charcoal">Your Shopping Bag is Empty</h2>
          <p className="text-xs text-taupe mt-2">
            Add a console table to proceed with checkout.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block px-6 py-3 bg-charcoal text-cream text-xs uppercase tracking-widest font-medium hover:bg-darkBrown transition-colors"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-12 sm:py-16 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-beige">
          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-taupe hover:text-charcoal transition-colors"
          >
            <ArrowBackIcon style={{ fontSize: 14 }} />
            <span>Continue Shopping</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-taupe uppercase tracking-wider">
            <LockOutlinedIcon style={{ fontSize: 14 }} className="text-mutedGold" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Shipping & Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Customer Information */}
            <div className="bg-warmWhite p-6 sm:p-8 rounded border border-beige shadow-sm space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-normal flex items-center justify-between">
                <span>1. Customer &amp; Shipping Details</span>
                <span className="text-xs font-sans text-taupe uppercase tracking-widest">Step 1 of 2</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal/80 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-cream border border-beige text-xs focus:outline-none focus:border-mutedGold"
                  />
                  {errors.firstName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal/80 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-cream border border-beige text-xs focus:outline-none focus:border-mutedGold"
                  />
                  {errors.lastName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal/80 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2.5 bg-cream border border-beige text-xs focus:outline-none focus:border-mutedGold"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal/80 mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile"
                    className="w-full px-3 py-2.5 bg-cream border border-beige text-xs focus:outline-none focus:border-mutedGold"
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-charcoal/80 mb-1">
                  Street Address / Society / Villa *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Flat/House No, Building Name, Street"
                  className="w-full px-3 py-2.5 bg-cream border border-beige text-xs focus:outline-none focus:border-mutedGold"
                />
                {errors.address && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal/80 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-cream border border-beige text-xs focus:outline-none focus:border-mutedGold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal/80 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-cream border border-beige text-xs focus:outline-none focus:border-mutedGold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal/80 mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-cream border border-beige text-xs focus:outline-none focus:border-mutedGold"
                  />
                  {errors.pincode && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.pincode}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Delivery Speed */}
            <div className="bg-warmWhite p-6 sm:p-8 rounded border border-beige shadow-sm space-y-3">
              <h3 className="font-serif text-lg text-charcoal uppercase tracking-wider">
                Delivery Preference
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label
                  className={`p-3.5 border rounded cursor-pointer transition-all flex items-start gap-3 ${
                    deliverySpeed === 'standard'
                      ? 'border-charcoal bg-beige/30'
                      : 'border-beige hover:border-taupe bg-cream'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliverySpeed"
                    checked={deliverySpeed === 'standard'}
                    onChange={() => setDeliverySpeed('standard')}
                    className="accent-darkBrown mt-0.5"
                  />
                  <div>
                    <span className="font-semibold block text-charcoal">
                      Standard White Glove Delivery
                    </span>
                    <span className="text-[11px] text-taupe block">
                      Free (4–7 business days) • Free Room Placement
                    </span>
                  </div>
                </label>

                <label
                  className={`p-3.5 border rounded cursor-pointer transition-all flex items-start gap-3 ${
                    deliverySpeed === 'express'
                      ? 'border-charcoal bg-beige/30'
                      : 'border-beige hover:border-taupe bg-cream'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliverySpeed"
                    checked={deliverySpeed === 'express'}
                    onChange={() => setDeliverySpeed('express')}
                    className="accent-darkBrown mt-0.5"
                  />
                  <div>
                    <span className="font-semibold block text-charcoal">
                      Priority Express Delivery (+₹999)
                    </span>
                    <span className="text-[11px] text-taupe block">
                      48-Hour Guaranteed Dispatch &amp; Dedicated Slot
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-warmWhite p-6 sm:p-8 rounded border border-beige shadow-sm space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-normal flex items-center justify-between">
                <span>2. Payment Method</span>
                <span className="text-xs font-sans text-taupe uppercase tracking-widest">Step 2 of 2</span>
              </h2>

              <div className="space-y-3 text-xs">
                {/* UPI */}
                <label
                  className={`p-4 border rounded cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-charcoal bg-beige/30'
                      : 'border-beige hover:border-taupe bg-cream'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-darkBrown"
                    />
                    <div className="flex items-center gap-2">
                      <QrCode2OutlinedIcon className="text-mutedGold" />
                      <div>
                        <span className="font-semibold text-charcoal block">Instant UPI Payment</span>
                        <span className="text-[11px] text-taupe">Google Pay, PhonePe, Paytm, BHIM QR</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                    Instant
                  </span>
                </label>

                {/* Cards */}
                <label
                  className={`p-4 border rounded cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'card'
                      ? 'border-charcoal bg-beige/30'
                      : 'border-beige hover:border-taupe bg-cream'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-darkBrown"
                    />
                    <div className="flex items-center gap-2">
                      <CreditCardOutlinedIcon className="text-mutedGold" />
                      <div>
                        <span className="font-semibold text-charcoal block">Credit or Debit Card</span>
                        <span className="text-[11px] text-taupe">Visa, MasterCard, American Express, RuPay</span>
                      </div>
                    </div>
                  </div>
                </label>

                {/* Net Banking */}
                <label
                  className={`p-4 border rounded cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-charcoal bg-beige/30'
                      : 'border-beige hover:border-taupe bg-cream'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                      className="accent-darkBrown"
                    />
                    <div className="flex items-center gap-2">
                      <AccountBalanceOutlinedIcon className="text-mutedGold" />
                      <div>
                        <span className="font-semibold text-charcoal block">Net Banking</span>
                        <span className="text-[11px] text-taupe">All major Indian banks supported</span>
                      </div>
                    </div>
                  </div>
                </label>

                {/* COD */}
                <label
                  className={`p-4 border rounded cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-charcoal bg-beige/30'
                      : 'border-beige hover:border-taupe bg-cream'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-darkBrown"
                    />
                    <div className="flex items-center gap-2">
                      <PaymentsOutlinedIcon className="text-mutedGold" />
                      <div>
                        <span className="font-semibold text-charcoal block">
                          Pay on White Glove Delivery (Pune Region Only)
                        </span>
                        <span className="text-[11px] text-taupe">Inspect piece in home before payment</span>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-warmWhite p-6 sm:p-8 rounded border border-beige shadow-sm space-y-6 sticky top-28">
              <h3 className="font-serif text-xl text-charcoal uppercase tracking-wider pb-3 border-b border-beige">
                Order Summary ({items.length} {items.length === 1 ? 'Piece' : 'Pieces'})
              </h3>

              {/* Items List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-3 pb-3 border-b border-beige/40">
                    <div className="relative w-16 h-16 rounded overflow-hidden bg-beige/40 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm text-charcoal font-medium truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-taupe uppercase tracking-wider mt-0.5">
                        Finish: {item.selectedFinish} • Qty: {item.quantity}
                      </p>
                      <span className="text-xs font-semibold text-charcoal mt-1 block">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 text-xs text-charcoal/80 pt-2 border-t border-beige/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-mutedGold">
                    <span>Voucher Discount</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White Glove Shipping</span>
                  <span>{shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}</span>
                </div>
                {deliverySpeed === 'express' && (
                  <div className="flex justify-between">
                    <span>Priority Express Fee</span>
                    <span>₹999</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-serif text-charcoal pt-3 border-t border-beige">
                  <span className="uppercase tracking-wider font-semibold">Total Payable</span>
                  <span className="font-semibold text-xl">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] text-taupe text-right">Includes all GST &amp; Transit Insurance</p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isPlacingOrder}
                className="w-full py-4 bg-darkBrown hover:bg-charcoal text-cream text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-xl disabled:opacity-50"
              >
                {isPlacingOrder ? 'Confirming Order...' : 'Place Order & Complete Booking'}
              </button>

              <div className="pt-2 text-[11px] text-taupe text-center space-y-1">
                <p>Need custom sizing? Call us directly at <a href="tel:7083895839" className="underline text-charcoal font-medium">7083895839</a></p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

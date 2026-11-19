'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

const CATEGORIES = ['Modern', 'Luxury', 'Wooden', 'Marble', 'Minimalist', 'Statement'];

interface FormData {
  name: string;
  tagline: string;
  description: string;
  price: string;
  originalPrice: string;
  category: string;
  material: string;
  sku: string;
  stock: string;
  heightCm: string;
  widthCm: string;
  depthCm: string;
  color: string;
  isFeatured: boolean;
  isBestseller: boolean;
  isNewArrival: boolean;
  isPublished: boolean;
}

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState<FormData>({
    name: '',
    tagline: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Modern',
    material: '',
    sku: '',
    stock: '',
    heightCm: '',
    widthCm: '',
    depthCm: '',
    color: '',
    isFeatured: false,
    isBestseller: false,
    isNewArrival: false,
    isPublished: false,
  });

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggle = (field: keyof FormData) => () => setForm(prev => ({ ...prev, [field]: !prev[field] }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      setImages(prev => [...prev, url]);
    });
  };

  const removeImage = (idx: number) => setImages(prev => prev.filter((_, i) => i !== idx));

  const handleSave = async (publish: boolean) => {
    if (!form.name || !form.price) {
      alert('Product name and price are required.');
      return;
    }
    setSaving(true);
    // TODO: save to Supabase
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    router.push('/admin/products');
  };

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 rounded-lg hover:bg-[#ede8e3] transition-colors">
          <ArrowBackIcon sx={{ fontSize: 20 }} className="text-[#6b5c4e]" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif text-[#2c2420]">Add New Product</h1>
          <p className="text-sm text-[#9e8872] mt-0.5">Fill in the details below to create a new product</p>
        </div>
      </div>

      <div className="space-y-6">

        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm border border-[#ede8e3] p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#6b5c4e] mb-5">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6b5c4e] mb-1.5">Product Name *</label>
              <input value={form.name} onChange={set('name')} placeholder="e.g. Roma Marble Console Table" className="input-field" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6b5c4e] mb-1.5">Tagline</label>
              <input value={form.tagline} onChange={set('tagline')} placeholder="Short elegant description" className="input-field" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6b5c4e] mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={set('description')}
                rows={4}
                placeholder="Full product description…"
                className="input-field resize-none"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm border border-[#ede8e3] p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#6b5c4e] mb-5">Product Images</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {images.map((src, i) => (
              <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-[#ede8e3]">
                <img src={src} alt="" className="w-full h-full object-cover" />
                {i === 0 && (
                  <span className="absolute top-1 left-1 text-[9px] bg-[#c9a96e] text-white px-1.5 py-0.5 rounded">Main</span>
                )}
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 p-0.5 bg-black/50 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <CloseIcon sx={{ fontSize: 12 }} />
                </button>
              </div>
            ))}
            <label className="aspect-square rounded-lg border-2 border-dashed border-[#ddd5c8] flex flex-col items-center justify-center cursor-pointer hover:border-[#c9a96e] hover:bg-[#faf7f4] transition-colors">
              <CloudUploadIcon sx={{ fontSize: 24 }} className="text-[#9e8872]" />
              <span className="text-xs text-[#9e8872] mt-1">Upload</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          <p className="text-xs text-[#9e8872]">First image becomes the main thumbnail. Drag to reorder.</p>
        </div>

        {/* Pricing & Stock */}
        <div className="bg-white rounded-xl shadow-sm border border-[#ede8e3] p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#6b5c4e] mb-5">Pricing & Stock</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6b5c4e] mb-1.5">Sale Price (₹) *</label>
              <input type="number" value={form.price} onChange={set('price')} placeholder="32500" className="input-field" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6b5c4e] mb-1.5">Original Price (₹)</label>
              <input type="number" value={form.originalPrice} onChange={set('originalPrice')} placeholder="39000" className="input-field" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6b5c4e] mb-1.5">SKU</label>
              <input value={form.sku} onChange={set('sku')} placeholder="HBM-001" className="input-field" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6b5c4e] mb-1.5">Stock Quantity</label>
              <input type="number" value={form.stock} onChange={set('stock')} placeholder="10" className="input-field" />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl shadow-sm border border-[#ede8e3] p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#6b5c4e] mb-5">Product Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6b5c4e] mb-1.5">Category</label>
              <select value={form.category} onChange={set('category')} className="input-field">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6b5c4e] mb-1.5">Material</label>
              <input value={form.material} onChange={set('material')} placeholder="Solid oak, Brass" className="input-field" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6b5c4e] mb-1.5">Color / Finish</label>
              <input value={form.color} onChange={set('color')} placeholder="Natural Oak" className="input-field" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6b5c4e] mb-1.5">Height (cm)</label>
              <input type="number" value={form.heightCm} onChange={set('heightCm')} placeholder="80" className="input-field" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6b5c4e] mb-1.5">Width (cm)</label>
              <input type="number" value={form.widthCm} onChange={set('widthCm')} placeholder="120" className="input-field" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6b5c4e] mb-1.5">Depth (cm)</label>
              <input type="number" value={form.depthCm} onChange={set('depthCm')} placeholder="40" className="input-field" />
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="bg-white rounded-xl shadow-sm border border-[#ede8e3] p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#6b5c4e] mb-5">Badges & Visibility</h2>
          <div className="space-y-3">
            {([
              ['isFeatured', 'Featured Product'],
              ['isBestseller', 'Bestseller'],
              ['isNewArrival', 'New Arrival'],
              ['isPublished', 'Published (visible on website)'],
            ] as [keyof FormData, string][]).map(([field, label]) => (
              <label key={field} className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={toggle(field)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${form[field] ? 'bg-[#c9a96e]' : 'bg-[#ddd5c8]'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form[field] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-sm text-[#2c2420]">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pb-8">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-6 py-2.5 border border-[#ddd5c8] text-[#2c2420] text-sm font-medium rounded-lg hover:bg-[#f5f1ec] transition-colors disabled:opacity-60"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="px-6 py-2.5 bg-[#2c2420] text-white text-sm font-medium rounded-lg hover:bg-[#3d3028] transition-colors disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Publish Product'}
          </button>
          <Link href="/admin/products" className="px-6 py-2.5 text-sm text-[#9e8872] hover:text-[#2c2420] transition-colors">
            Cancel
          </Link>
        </div>

      </div>

      <style jsx global>{`
        .input-field {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1px solid #ddd5c8;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          color: #2c2420;
          background: white;
          outline: none;
          transition: border-color 0.15s;
        }
        .input-field:focus {
          border-color: #c9a96e;
          box-shadow: 0 0 0 1px #c9a96e;
        }
        .input-field::placeholder {
          color: #c5b8ab;
        }
      `}</style>
    </div>
  );
}

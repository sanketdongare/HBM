export interface ProductFinish {
  name: string;
  colorCode: string;
  image?: string;
}

export interface ProductDimensions {
  length: number; // in inches
  width: number;
  height: number;
  unit: 'inches' | 'cm';
  weightKg?: number;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  badge?: 'Bestseller' | 'New Arrival' | 'Signature' | 'Limited Edition';
  category: 'Modern' | 'Luxury' | 'Wooden' | 'Marble' | 'Minimalist' | 'Statement';
  collections: string[];
  finishes: ProductFinish[];
  dimensions: ProductDimensions;
  material: string;
  careInstructions: string[];
  description: string;
  features: string[];
  images: string[];
  inStock: boolean;
  leadTimeDays: number;
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFinish: string;
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  slug: string;
  description: string;
  itemCount: number;
}

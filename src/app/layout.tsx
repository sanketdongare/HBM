import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/layout/Providers';
import { AppWrapper } from '@/components/layout/AppWrapper';

export const metadata: Metadata = {
  title: 'Homes By Meera | Premium Console Tables & Home Décor',
  description:
    'Discover elegant console tables at Homes By Meera. Shop premium furniture and timeless home décor designs for modern homes in Pune and across India.',
  keywords: [
    'console tables',
    'luxury console table',
    'marble console table',
    'wooden console table',
    'furniture Pune',
    'Homes By Meera',
    'entryway table',
    'interior design',
  ],
  authors: [{ name: 'Homes By Meera' }],
  metadataBase: new URL('https://homesbymeera.com'),
  openGraph: {
    title: 'Homes By Meera | Premium Console Tables & Home Décor',
    description:
      'Discover elegant console tables at Homes By Meera. Shop premium furniture and timeless home décor designs for modern homes in Pune and across India.',
    url: 'https://homesbymeera.com',
    siteName: 'Homes By Meera',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Homes By Meera Luxury Console Tables',
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: 'Homes By Meera',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    telephone: '+91 7083895839',
    email: 'homesbymeera05@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'PUSHPA Complex, Office 101, Near D Mart, Lohegaon Wagholi Road',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '412207',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '18.574246',
      longitude: '73.939223',
    },
    url: 'https://homesbymeera.com',
    priceRange: '₹₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:30',
        closes: '19:30',
      },
    ],
    sameAs: ['https://www.instagram.com/homes_by_meera'],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-cream text-charcoal font-sans antialiased">
        <Providers>
          <AppWrapper>{children}</AppWrapper>
        </Providers>
      </body>
    </html>
  );
}

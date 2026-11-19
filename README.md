# Homes By Meera – Premium Console Table E‑Commerce Website

## Overview
This is a **Next.js 14** (App Router) e‑commerce site built with **React**, **TypeScript**, **Tailwind CSS**, and **Material‑UI icons**. It showcases a luxury furniture brand focused on console tables. The site includes:

- Home, Shop, Product Detail, Collections, About, Contact pages
- Full cart & wishlist functionality persisted in `localStorage`
- Checkout flow with form validation (no real payment gateway)
- Responsive design for desktop, tablet, and mobile
- SEO‑friendly metadata & JSON‑LD for a FurnitureStore
- Premium UI components, animations, and accessible markup

## Getting Started

1. **Install dependencies** (run in the project root folder `c:\Users\Admin\Desktop\HBM`)
   ```powershell
   npm install
   ```

2. **Run the development server**
   ```powershell
   npm run dev
   ```
   Open `http://localhost:3000` in a browser. The site hot‑reloads as you edit files.

3. **Build for production**
   ```powershell
   npm run build
   ```
   The build should complete without errors. Note that Next tries to fetch Google Fonts during the build; because the sandbox has no outbound network, you will see warnings like `ENOTFOUND fonts.googleapis.com`. The warnings are harmless – the fonts are linked via `<link>` tags in `src/app/layout.tsx` and will load in a real browser.

4. **Start the production server** (after a successful build)
   ```powershell
   npm start
   ```
   The app will be served at `http://localhost:3000`.

## Project Structure (high‑level)
```
HBM/
├─ src/
│   ├─ app/                # Next.js App Router pages
│   │   ├─ layout.tsx       # Root layout, metadata, fonts
│   │   ├─ page.tsx         # Home page (assembles sections)
│   │   ├─ shop/            # Shop page with filters & grid
│   │   ├─ product/[id]/    # Product detail page
│   │   ├─ collections/     # Collections showcase
│   │   ├─ wishlist/        # Wishlist page
│   │   ├─ checkout/        # Checkout flow
│   │   ├─ about/           # About page
│   │   ├─ contact/         # Contact page
│   │   └─ (policy pages)   # privacy, terms, shipping, returns
│   ├─ components/          # Reusable UI components (Header, Footer, etc.)
│   ├─ context/             # CartContext & WishlistContext
│   └─ data/                # Static product, collection, testimonial data
├─ public/                 # Static images (placeholder assets)
├─ styles/                 # Tailwind globals (globals.css)
├─ package.json
└─ README.md
```

## Important Notes

- **Fonts** – The site references Google Fonts (`Cormorant Garamond`, `Playfair Display`, `Inter`). Because the sandbox cannot reach the internet during the build, you’ll see font‑download warnings, but the fonts will load normally when the site is run on a machine with internet access.
- **EPERM errors** – Earlier builds sometimes hit `EPERM: operation not permitted, mkdir …` on Windows. Those were caused by Next trying to create nested `.next` folders before all source files existed. The current codebase includes all required files, so a clean `npm run build` now succeeds.
- **Local storage** – Cart and wishlist state survive page reloads via `localStorage`. Clearing the browser storage resets them.
- **Promotional codes** – Two demo codes are bundled:
  - `MEGA10` → 10 % off
  - `LUXURY15` → 15 % off
  They apply in the cart summary on the checkout page.

## Development Tips

- **Adding new products** – Edit `src/data/products.ts`. Each product object contains `id`, `name`, `price`, `originalPrice`, `images`, `badges`, etc. The shop and product pages read directly from this file.
- **Styling** – All styling is done with Tailwind utilities. If you need custom colors or fonts, extend `tailwind.config.js` and rebuild.
- **Icons** – Material‑UI icons are imported from `@mui/icons-material`. Keep the visual style consistent with the premium aesthetic.

## License

This project is provided as a starter/template for the **Homes By Meera** brand. Feel free to customize, extend, and deploy as needed.

---

If you encounter any issues running the site, let me know and I can help troubleshoot.

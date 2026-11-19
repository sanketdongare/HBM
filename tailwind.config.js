/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F8F5F0',
        warmWhite: '#FFFFFF',
        beige: '#E8DED1',
        taupe: '#B6A18D',
        darkBrown: '#49382D',
        charcoal: '#282522',
        mutedGold: '#B89A68',
        goldLight: '#DFCDA7',
        goldDark: '#977A44',
        sandLight: '#F3EFE9',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(40, 37, 34, 0.07)',
        'luxury-hover': '0 25px 50px -12px rgba(40, 37, 34, 0.15)',
        'drawer': '-10px 0 30px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}

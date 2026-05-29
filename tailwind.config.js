/** @type {import('tailwindcss').Config} */
// Loaded by Tailwind v4 via the `@config` directive in src/index.css.
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        amazon: {
          orange: '#FF9900',
          blue: '#146EB4',
          dark: '#0F1111',
        },
        price: {
          sale: '#B12704',
          original: '#565959',
          savings: '#007600',
        },
        star: '#FFA41C',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 28px rgba(0,0,0,0.14)',
      },
    },
  },
  plugins: [],
}

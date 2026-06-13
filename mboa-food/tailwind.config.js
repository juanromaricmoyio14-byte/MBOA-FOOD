/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mboa-green': '#1b4d3e',
        'mboa-green-light': '#2d6a4f',
        'mboa-gold': '#f39c12',
        'mboa-cream': '#fffaf5',
        'mboa-rose': '#f8e8e0',
        'mboa-soft-green': '#e8f5e9',
        'mboa-dark-text': '#2d2d2d',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        lato: ['Lato', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'float': '0 20px 40px -5px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
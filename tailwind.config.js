/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'c-neutral': {
          50: '#F9F9FC',
          100: '#F3F4F7',
          200: '#80b3ff',
          300: '#4d94ff',
          400: '#1a75ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
      },
      transitionTimingFunction: {
        'custom-ease': 'cubic-bezier(0.270, -0.005, 0.000, 1.100)',
      },
    },
  },
  plugins: [],
}
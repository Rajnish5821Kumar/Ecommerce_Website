/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#fbfaf7',
        porcelain: '#ffffff',
        charcoal: '#263238',
        ink: '#36454f',
        slate: '#708090',
        line: '#e7e2d8',
        wheat: '#f3eee4',
        saffron: '#b86b2b',
        saffronDark: '#8a4b1d',
        mint: '#547c66',
        mist: '#eef4ef'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Arial', 'sans-serif']
      },
      boxShadow: {
        soft: '0 24px 70px rgba(38, 50, 56, 0.10)',
        card: '0 16px 40px rgba(38, 50, 56, 0.08)'
      }
    }
  },
  plugins: []
};

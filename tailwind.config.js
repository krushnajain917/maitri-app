/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      tablet: '481px',
      desktop: '1024px',
    },
    extend: {
      fontFamily: {
        brush: ['"DK Brushzilla"', 'cursive'],
        jost: ['"Jost"', 'sans-serif'],
      },
      colors: {
        ink: '#1a1a1a',
        thread: '#D6443C',
        warm: '#F5F4F0',
        hairline: '#ebebeb',
      },
    },
  },
  plugins: [],
};

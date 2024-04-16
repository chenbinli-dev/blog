import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,tsx,jsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: colors.purple[500]
      },
      fontFamily: {
        sans: ['Harmoney_Sans-Regular', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')]
};

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
      },
      typography: ({theme}) => ({
        DEFAULT: {
          css: {
            code: {
              paddingRight: theme('padding[2]'),
              paddingLeft: theme('padding[2]'),
            },
            'code::before': {
              content: 'normal',
            },
            'code::after': {
              content: 'normal',
            },
          }
        },
      })
    }
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')]
};

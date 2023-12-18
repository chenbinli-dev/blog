const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./src/**/*.{astro,tsx,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
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
}

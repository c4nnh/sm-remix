const defaultTheme = require('tailwindcss/defaultTheme')
const eggshellDelightsTheme = require('tailwind-saasblocks/themes/eggshell-delights.theme')
const midnightEnvyTheme = require('tailwind-saasblocks/themes/midnight-envy.theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-children'),
    require('tailwind-saasblocks')({
      themes: {
        light: eggshellDelightsTheme,
        dark: midnightEnvyTheme,
      },
    }),
  ],
}

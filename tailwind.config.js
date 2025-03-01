const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "",
  theme: {
    extend: {
      typography: ({theme}) => ({
        DEFAULT: {
          css: [
            {
              maxWidth: '85ch',
              a: {
                fontWeight: 'inherit',
              },
              'blockquote p:first-of-type::before': false,
              'blockquote p:last-of-type::after': false,
              code: {
                borderRadius: defaultTheme.borderRadius.lg,
                fontWeight: false,
                padding: '.2em .4em',
                '&::before': false,
                '&::after': false,
              }
            },
            false
          ]
        },
        slate: {
          css: false
        },
        gray: {
          css: false
        },
        zinc: {
          css: false
        },
        neutral: {
          css: false
        },
        stone: {
          css: false
        },
        invert: {
          css: false
        }
      }),
    },
  }
}
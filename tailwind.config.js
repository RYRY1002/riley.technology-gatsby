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
          css: {
            maxWidth: '85ch',
            a: {
              fontWeight: 'inherit',
            },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
            'code::before': false,
            'code::after': false,
            code: {
              borderRadius: defaultTheme.borderRadius.lg,
              fontWeight: false,
              backgroundColor: 'var(--tw-prose-pre-bg)',
              padding: '.2em .4em'
            },
            '--tw-prose-code': 'var(--tw-prose-invert-code)'
          },
        },
        invert: {
          css: {
            '--tw-prose-pre-bg': colors.neutral[900],
          }
        },
        neutral: {
          css: {
            '--tw-prose-pre-bg': colors.neutral[900],
          }
        }
      }),
    },
  }
}
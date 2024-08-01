const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/{components,lib,pages,posts,styles,templates}/**/!(*.d).{ts,tsx,js,jsx}",
    "./posts/**/*.{md,mdx}"
  ],
  prefix: "",
  theme: {
    fontFamily: {
      sans: ["IBM Plex Sans", "sans-serif"],
      //serif: ["Noto Serif", "serif"],
      mono: [
        ["JetBrains Mono", "monospace"],
        { fontFeatureSettings: "'zero', 'cv07', 'cv11', 'cv14', 'cv16', 'cv18', 'cv19', 'cv20'" }, // TODO: Disable a bunch of code-specific ligatures
      ],
      //noto: ["Noto Sans", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    stretch: {
      85: '85%',
      90: '90%',
      95: '95%',
      100: '100%',
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart1: "hsl(var(--chart-1))",
        chart2: "hsl(var(--chart-2))",
        chart3: "hsl(var(--chart-3))",
        chart4: "hsl(var(--chart-4))",
        chart5: "hsl(var(--chart-5))",
        chart6: "hsl(var(--chart-6))"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      transitionProperty: {
        'varfonts': 'font-style, font-optical-sizing, font-weight, font-stretch',
      },
      typography: {
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
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'stretch': (value) => ({
            'font-stretch': value
          }),
        },
        { values: theme('stretch') }
      )
    }),
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'weight': (value) => ({
            'font-weight': value
          }),
        },
        { values: theme('weight') }
      )
    })
  ],
}
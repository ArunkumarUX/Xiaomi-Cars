import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand:       '#FF6900',
        'brand-dark':'#E55C00',
        dark:        '#1A1A1A',
        darker:      '#0A0A0A',
        light:       '#F5F5F5',
        'card-dark': '#1A1A1A',
        'card-darker':'#111111',
      },
      fontFamily: {
        sans: ['MiSans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        'xl':  '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      letterSpacing: {
        tight: '-0.02em',
        tighter: '-0.03em',
      },
    },
  },
  plugins: [],
}

export default config

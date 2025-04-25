import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['var(--font-playfair)', 'serif'],
        'sans': ['var(--font-dm-sans)', 'sans-serif'],
      }
    },
  },
  plugins: [],
  safelist: [
    'opacity-90',
    'hover:bg-opacity-90',
    'hover:opacity-90'
  ]
}

export default config
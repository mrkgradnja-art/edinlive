import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: {
            DEFAULT: '#000000',
            dark: '#0a0a0a',
            light: '#1a1a1a',
          },
          gold: {
            DEFAULT: '#d4af37',
            light: '#f4d03f',
            dark: '#b8941f',
          },
          platinum: {
            DEFAULT: '#e5e4e2',
            light: '#f5f5f5',
            dark: '#d0d0d0',
          },
          text: {
            DEFAULT: '#f5f5f5',
            light: '#ffffff',
            dark: '#e0e0e0',
            muted: '#b0b0b0',
          },
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)',
        'gradient-gold': 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
      },
      boxShadow: {
        'luxury': '0 10px 40px rgba(212, 175, 55, 0.1)',
        'luxury-glow': '0 0 20px rgba(212, 175, 55, 0.3)',
      },
    },
  },
  plugins: [],
}
export default config


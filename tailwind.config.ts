import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './constants/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#C9973F',
          goldLight: '#D9B15C',
          goldDark: '#9E6F22',
          cream: '#F5F0E8',
          creamDark: '#EDE5D4',
        },
        dark: {
          bg: '#0F0D09',
          surface: '#17130E',
          card: '#1F1A13',
          border: '#332A1D',
          muted: '#8A7A5C',
        },
        admin: {
          sidebar: '#0F0D09',
          sidebarHover: '#1F1A13',
          sidebarActive: '#C9973F',
          content: '#F8F5F0',
          card: '#FFFFFF',
          border: '#E8E0D0',
        },
        status: {
          active: '#22C55E',
          inactive: '#EF4444',
          warning: '#F59E0B',
          info: '#3B82F6',
        },
        chart: {
          starters: '#C9973F',
          salads: '#7EC8A4',
          mains: '#9B8EC4',
          burgers: '#E8956D',
          pasta: '#F0C040',
          desserts: '#6BB8D4',
          drinks: '#E8809A',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(30, 26, 18, 0.08)',
        cardHover: '0 8px 32px 0 rgba(30, 26, 18, 0.14)',
        gold: '0 4px 20px 0 rgba(201, 151, 63, 0.30)',
        admin: '0 1px 4px 0 rgba(0,0,0,0.10)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.5s ease forwards',
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
};

export default config;

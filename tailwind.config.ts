import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0B0C0E',
        paper: '#FAFAF9',
        accent: {
          DEFAULT: '#1E5EFF',
          dark: '#1443C4',
          light: '#EEF3FF'
        },
        line: '#E7E7E4'
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,12,14,0.04), 0 8px 24px rgba(11,12,14,0.06)',
        pop: '0 12px 40px rgba(11,12,14,0.14)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
};

export default config;

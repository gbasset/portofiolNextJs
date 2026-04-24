/** @type {import('tailwindcss').Config} */
/**
 * Design system — aligné sur les variables historiques (globals.css).
 * Utilisation : bg-primary-700, text-primary-200, font-display, rounded-ds-lg, shadow-glow-amber
 */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    // Évite le conflit avec la classe globale legacy `.container`
    container: false,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#c8b3ce',
          100: '#a07aaa',
          200: '#D5DCF9',
          300: '#646694',
          400: '#4B469B',
          500: '#474876',
          600: '#333556',
          700: '#1F2235',
        },
        secondary: {
          100: '#F2D1A6',
          700: '#EBB876',
        },
        accent: {
          DEFAULT: '#f8d7ab',
          bright: '#ffce0b',
          muted: 'rgba(255, 203, 132, 0.9)',
        },
        surface: {
          ink: '#1f2235',
          cream: '#fff9f2',
          snow: '#fefff6',
        },
        neutral: {
          50: 'hsl(265, 55%, 96%)',
          100: 'hsl(265, 19%, 88%)',
          200: 'hsl(265, 7%, 70%)',
          300: 'hsl(265, 6%, 66%)',
          400: 'hsl(265, 4%, 57%)',
          500: 'hsl(265, 3%, 53%)',
          600: 'hsl(265, 4%, 42%)',
          700: 'hsl(265, 4%, 31%)',
          800: 'hsl(276, 5%, 20%)',
          900: 'hsl(280, 5%, 13%)',
        },
        success: {
          100: '#a2f0bc',
          500: '#12bd4b',
        },
        error: {
          100: '#f1acc9',
          500: '#a10c4a',
        },
      },
      fontFamily: {
        sans: [
          'Roboto',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'sans-serif',
        ],
        display: ['Bayon', 'Roboto', 'sans-serif'],
        script: ['Pacifico', 'cursive'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        'display-sm': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        'ds-sm': '6px',
        'ds-md': '10px',
        'ds-lg': '15px',
        'ds-xl': '1.25rem',
      },
      boxShadow: {
        'glow-amber':
          '0 0 0 1px rgba(255, 203, 132, 0.35), 0 12px 40px -12px rgba(235, 184, 118, 0.45)',
        'glow-primary':
          '0 0 0 1px rgba(100, 102, 148, 0.4), 0 18px 50px -20px rgba(31, 34, 53, 0.9)',
        'inner-soft': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
      },
      maxWidth: {
        content: '80rem',
        readable: '65ch',
      },
      transitionDuration: {
        400: '400ms',
      },
      zIndex: {
        curtain: '1000',
      },
    },
  },
  plugins: [],
};

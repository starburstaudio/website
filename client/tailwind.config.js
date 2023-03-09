/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#1953FF',
          secondary: '#12b939',
          accent: '#fa18c5',
          neutral: '#cacaca',
          'base-100': '#fff',
          'base-200': '#f6f6f7',
          'base-300': '#e8e8ea',
          info: '#e4dcff',
          success: '#b2ffc4',
          warning: '#ffecb9',
          error: '#ffd8cd',
          '--rounded-btn': '.8rem',
          '--rounded-box': '1rem',
          '--btn-focus-scale': '1',
          '--btn-text-case': 'uppercase'
        },
        dark: {
          primary: '#0a84ff',
          secondary: '#07BA19',
          accent: '#DA0AFA',
          neutral: '#545459',
          'base-100': '#1D1D1F',
          info: '#183445',
          success: '#184520',
          warning: '#452B18',
          error: '#45181F',
          '--rounded-btn': '.5rem',
          '--rounded-box': '1rem',
          '--btn-focus-scale': '1',
          '--btn-text-case': 'uppercase'
        }
      }
    ],
    darkTheme: 'dark'
  },
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Inter', 'sans-serif']
      }
    },
    animation: {
      scaleLoader: 'scale 1200ms ease-in-out infinite'
    },
    keyframes: {
      scale: {
        '0%, 100%': { height: '2rem', opacity: 0.1 },
        '50%': { height: '6rem', opacity: 1 }
      }
    },
    fontSize: {
      xs: '0.64rem',
      sm: '0.8rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.563rem',
      '2xl': '1.953rem',
      '3xl': '2.441rem',
      '4xl': '3.052rem',
      '5xl': '3.815rem'
    }
  },
  plugins: [require('daisyui')]
}

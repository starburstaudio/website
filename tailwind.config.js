/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#1953FF",
          "secondary": "#12b939",
          "accent": "#fa18c5",
          "neutral": "#1a1a1e",
          "base-100": "#fff",
          "info": "#e4dcff",
          "success": "#b2ffc4",
          "warning": "#ffecb9",
          "error": "#ffd8cd",
        },
      },
    ],
  },
  theme: {
    extend:
    {
      fontFamily: {
        'rubik': ['Inter', 'sans-serif']
      },
    },
    fontSize: {
      sm: '0.8rem',
      base: '17px',
      xl: '22px',
      '2xl': '28px',
      '3xl': '35px',
      '4xl': '45px',
      '5xl': '72px',
    }
  },
  plugins: [require("daisyui")],
}

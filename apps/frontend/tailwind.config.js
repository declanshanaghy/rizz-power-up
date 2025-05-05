/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vaporwave color palette
        'rizz': {
          'pink': '#F15BB5',
          'blue': '#00BBF9',
          'purple': '#9B5DE5',
          'yellow': '#FEE440',
          'cyan': '#00F5D4',
          'dark': '#1A1A1A',
          'light': '#FFFFFF',
          'gray': {
            '800': '#2D2D2D',
            '700': '#3D3D3D',
            '400': '#7E7E7E',
          }
        },
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'serif'],
        'sans': ['"Source Sans Pro"', 'sans-serif'],
      },
      boxShadow: {
        'neon-pink': '0 0 15px #F15BB5',
        'neon-blue': '0 0 15px #00BBF9',
        'neon-purple': '0 0 15px #9B5DE5',
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(90deg, #F15BB5, #00BBF9)',
      },
      textShadow: {
        'neon': '0 0 5px #FFF',
      },
    },
  },
  plugins: [
    // Add plugin for text shadow
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-neon': {
          textShadow: '0 0 5px #FFF',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
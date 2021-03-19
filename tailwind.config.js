const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      yellow: '#DBC27D',
      green: '#457637',
      red: '#813B3C',
      blue: '#455BC9'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Lab Grotesque', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      text: '#000000',
      grey: '#95979A',
      error: '#F84E4E',
      success: '#029C08',
      bg: '#FFFFFF',
      primary: {
        DEFAULT: '#AAE632',
      },
      secondary: {
        green: '#CBFFCA',
        grey: '#E4E4E4'
      },
    },
  },
  plugins: [],
}

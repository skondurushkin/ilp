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
      black:'#000000',
      white:'#ffffff',
      green: '#AAE632',
      grey: '#95979A',
      error: '#F84E4E',
      success: '#029C08',
    },
    screens:{
      'xs':'320px',
      'sm':'640px',
      'md':'768px',
      'lg':	'1024px',
      'xl':'1280px',
      '2xl': '1536px'
    }
  },
  plugins: [],
}

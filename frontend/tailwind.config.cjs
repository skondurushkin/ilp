/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Lab Grotesque', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        'sidebar': '312px',
      }
    },
    colors: {
      black:'#000000',
      white:'#ffffff',
      primary: '#AAE632',
      gray: '#95979A',
      'gray-dark': '#111111',
      error: '#F84E4E',
      success: '#029C08',
    },
    screens:{
      'xs':'320px',
      'sm':'768px',
      'md':'960px',
      'lg':	'1024px',
      'xl':'1280px',
      '2xl': '1536px'
    }
  },
  plugins: [],
}

/* eslint-disable */
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      main: colors.amber,
      secondary: colors.green,
      gray: colors.coolGray,
      white: colors.white
    },
    extend: {
      fontFamily: {
        'hand-writing': ['Reenie Beanie']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

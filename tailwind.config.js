const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  /*mode: 'jit',*/
  purge: [],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        cyberDark: '#050814',
        cyberPink: {
          light: '#f38aff',
          dark: '#009eeb',
        },
      }
    },
  },
  variants: {
    extend: {},
  },
}

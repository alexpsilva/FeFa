/** @type {import('tailwindcss').Config} */
const formatColorString = (color) => ({ opacityValue }) => opacityValue === undefined
  ? `rgb(var(${color}))`
  : `rgba(var(${color}), ${opacityValue})`

const colorVariations = {
  base: formatColorString('--color-base'),
  selected: formatColorString('--color-selected'),
  offwhite: formatColorString('--color-offwhite'),
  alert: formatColorString('--color-alert'),
}

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        skin: colorVariations
      },
      stroke: {
        skin: colorVariations
      },
      borderColor: {
        skin: colorVariations
      },
      backgroundColor: {
        skin: colorVariations
      }
    },
  },
  plugins: [],
}


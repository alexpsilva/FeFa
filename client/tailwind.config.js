/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: ({ opacityValue }) => opacityValue === undefined
            ? 'rgb(var(--color-text-base))'
            : `rgba(var(--color-text-base), ${opacityValue})`,
          selected:
            ({ opacityValue }) => opacityValue === undefined
              ? 'rgb(var(--color-text-selected))'
              : `rgba(var(--color-text-selected), ${opacityValue})`,
        }
      },
      stroke: {
        skin: {
          base: ({ opacityValue }) => opacityValue === undefined
            ? 'rgb(var(--color-text-base))'
            : `rgba(var(--color-text-base), ${opacityValue})`,
          selected:
            ({ opacityValue }) => opacityValue === undefined
              ? 'rgb(var(--color-text-selected))'
              : `rgba(var(--color-text-selected), ${opacityValue})`,
        }
      }
    },
  },
  plugins: [],
}


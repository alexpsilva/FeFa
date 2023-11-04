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
            ? 'rgb(var(--color-base))'
            : `rgba(var(--color-base), ${opacityValue})`,
          selected:
            ({ opacityValue }) => opacityValue === undefined
              ? 'rgb(var(--color-selected))'
              : `rgba(var(--color-selected), ${opacityValue})`,
        }
      },
      stroke: {
        skin: {
          base: ({ opacityValue }) => opacityValue === undefined
            ? 'rgb(var(--color-base))'
            : `rgba(var(--color-base), ${opacityValue})`,
          selected:
            ({ opacityValue }) => opacityValue === undefined
              ? 'rgb(var(--color-selected))'
              : `rgba(var(--color-selected), ${opacityValue})`,
        }
      },
      borderColor: {
        skin: {
          base: ({ opacityValue }) => opacityValue === undefined
            ? 'rgb(var(--color-base))'
            : `rgba(var(--color-base), ${opacityValue})`,
          selected:
            ({ opacityValue }) => opacityValue === undefined
              ? 'rgb(var(--color-selected))'
              : `rgba(var(--color-selected), ${opacityValue})`,
        }
      },
      backgroundColor: {
        skin: {
          base: ({ opacityValue }) => opacityValue === undefined
            ? 'rgb(var(--color-base))'
            : `rgba(var(--color-base), ${opacityValue})`,
          selected:
            ({ opacityValue }) => opacityValue === undefined
              ? 'rgb(var(--color-selected))'
              : `rgba(var(--color-selected), ${opacityValue})`,
          offwhite:
            ({ opacityValue }) => opacityValue === undefined
              ? 'rgb(var(--color-offwhite))'
              : `rgba(var(--color-offwhite), ${opacityValue})`,
        }
      }
    },
  },
  plugins: [],
}


module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.svelte', './src/**/*.ts'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Arial', 'sans-serif'],
      mono: ['Fira Mono'],
    },
    extend: {
      colors: {
        primary: '#b9c6d2',
        secondary: '#d0dde9',
        tertiary: '#edf0f8',
        accent: '#ff3e00',
        text: '#444444',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.accent'),
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
};

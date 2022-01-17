module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        '2xl': '1440px',
      },
      colors: {
        dark: '#121212',
        'light-gray': '#f8f8f8',
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

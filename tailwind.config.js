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
        'tag-gray': '#b2b2b2',
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      maxWidth: {
        '725px': '725px',
        '846px': '846px',
      },
      spacing: {
        '50px': '50px',
        '150px': '150px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0.3 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

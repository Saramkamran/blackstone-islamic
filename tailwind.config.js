/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040D1E',
          900: '#0B1624',
          800: '#0D2040',
          700: '#1A3A70',
          600: '#073985',
          500: '#094AAB',
          400: '#2E72DC',
        },
        teal: '#3EB5A7',
      },
      fontFamily: {
        barlow:    ['Barlow Condensed', 'Arial Narrow', 'sans-serif'],
        inter:     ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        sans:      ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
        syne:      ['Syne', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.18em',
      },
    },
  },
  plugins: [],
}

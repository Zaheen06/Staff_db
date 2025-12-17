module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        problue: {
          50: '#f2f8ff',
          100: '#e6f0ff',
          200: '#e0fbfc',
          500: '#0b6ff2',
          700: '#075ec6'
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#fefbf5',
          100: '#fdf7eb',
          200: '#f9eed1',
          300: '#f4e0b3',
          400: '#eccf8a',
          500: '#e0b85c',
          600: '#d4a047',
          700: '#b8853a',
          800: '#966a33',
          900: '#7a572d',
        },
        ink: {
          50: '#f5f4f2',
          100: '#e8e6e1',
          200: '#d1ccc3',
          300: '#b3aba0',
          400: '#948a7d',
          500: '#7a7063',
          600: '#625a4f',
          700: '#504a42',
          800: '#433e38',
          900: '#3a3631',
        },
      },
      backgroundImage: {
        'parchment-texture': "url('/textures/parchment.jpg')",
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'handwriting': ['"Brush Script MT"', 'cursive'],
      },
    },
  },
  plugins: [],
}



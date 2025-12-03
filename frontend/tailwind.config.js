/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Базовая тема Nexus Vita (сепия, пергамент)
        parchment: {
          50: '#fefbf7',
          100: '#fdf6ef',
          200: '#faecd7',
          300: '#f5d9b8',
          400: '#eec08f',
          500: '#e5a866',
          600: '#d88a3f',
          700: '#b86f33',
          800: '#965a2e',
          900: '#7a4b29',
        },
        ink: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#262626',
        },
        accent: {
          turquoise: '#4fd1c7',
          red: '#c53030',
          blue: '#2c5282',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        handwritten: ['var(--font-handwritten)', 'cursive'],
      },
      backgroundImage: {
        'parchment-texture': "url('/textures/parchment.jpg')",
        'ink-sketches': "url('/textures/ink-sketches.svg')",
      },
    },
  },
  plugins: [],
}


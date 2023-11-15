/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{jsx,tsx,js}",
     "./components/**/*.{jsx,tsx,js}",
    
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-exo2)','sans-serif'],
        orbitron: ['var(--font-orbitron)','sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}


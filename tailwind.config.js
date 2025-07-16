/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'selfcast-primary': 'var(--primary, #0047AB)',       // Dynamic primary color from CMS
        'selfcast-secondary': 'var(--secondary, #6B8E23)',   // Calculated secondary color
        'selfcast-accent': 'var(--accent, #FF8C00)',         // Calculated accent color
        'selfcast-dark': '#202020',       // Fixed dark gray
        'selfcast-light': '#F5F5F5',      // Fixed light gray
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0c10',
        card: '#1f2833',
        textMain: '#f8f8f2',
        textMuted: '#c5c6c7',
        accent1: '#66fcf1',
        accent2: '#45a29e',
        accentPurple: '#bb86fc',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

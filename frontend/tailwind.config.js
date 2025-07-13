/** @type {import('tailwindcss').Config} */
export default {
  content: [  "./index.html",
  "./src/**/*.{js,ts,jsx}",],
  theme: {
    extend: {},
    screens: {
      sm: "400px",       // 👈 sm now starts at 400px
      md: "768px",       // default md
      lg: "1024px",      // default lg
      xl: "1280px",      // default xl
      "2xl": "1536px",   // default 2xl
    },
  },
  plugins: [],
}


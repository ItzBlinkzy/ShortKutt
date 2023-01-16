/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-mont)", ...fontFamily.sans]
      },
      backgroundImage: {
        "heroPattern": "url(/static/hero.svg)"
      },
      backgroundSize: {
        "100%": "100% 100%"
      },
      colors: {
        midnight: "#03254c",
        darkblue: "#1167b1",
        standardblue: "#187bcd",
        lightblue: "#2a9df4",
        paleblue: "#d0efff",
        grayblue: "#d1ecf1"
      },
    },
  },
  plugins: [],
}
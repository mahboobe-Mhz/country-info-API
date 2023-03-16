/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg':'url(public/bg.png)'
      },
      colors: {
        'primary': '#18252B',
        'primery2': '#2B7979',
        'primary3': '#38ADA5',
      }
    },
  },
  plugins: [],
}
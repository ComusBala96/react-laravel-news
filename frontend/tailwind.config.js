/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans - serif"],
        lusitana: ["Lusitana", "serif"],
        bangers: ["Bangers", "cursive"],
      },
      colors: {
        profilebar: "rgb(57, 121, 121, .9)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

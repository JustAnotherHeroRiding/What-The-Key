/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./UiComponents/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beigeCustom: "#f4dfc8",
        cream: "#f4eae0",
        creamLight: "#faf6f0",
        beigeDarker: "#e0dcd6",
      },
    },
  },
  plugins: [],
};

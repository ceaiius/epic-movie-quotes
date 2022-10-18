/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: "#DDCCAA",
        red: "#E31221",
        grey: "#D9D9D9",
        input_bg: "#CED4DA",
        link: "#0D6EFD",
        grey_text: "#6C757D",
      },
      screens: {
        xs: "375px",
      },
      spacing: {
        large_dash_top: "40px",
        large_dash_right: "80px",
        small_dash_top: "16px",
        small_dash_right: "24px",
      },
    },
  },
  plugins: [],
};

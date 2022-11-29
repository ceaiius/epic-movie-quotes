/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: "#DDCCAA",
        grey: "#D9D9D9",
        input_bg: "#CED4DA",
        link: "#0D6EFD",
        grey_text: "#6C757D",
        form_bg: "#222030",
        validation_color: "#F15524",
        default_red: "#E31221",
        black_bg: "#11101A",
        rgba: "rgba(25, 135, 84, 0.2)",
        border_rgba: "rgba(206, 212, 218, 0.2)",
        notification_border: "rgba(108,117,125,0.5)",
        success: "#D1E7DD",
        success_text: "#0F5132",
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
      width: {
        input_width: "600px",
        google_input_width: "368px",
      },
      height: {
        input_height: "700px",
      },
    },
  },
  plugins: [],
};

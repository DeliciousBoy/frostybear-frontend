import daisyui from "daisyui";

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to top left, #f6fbf4, #f5df99, #5fd068)",
      },
      opacity: {
        10: "0.1",
        20: "0.2",
        30: "0.3",
        40: "0.4",
        50: "0.5",
        60: "0.6",
        70: "0.7",
        80: "0.8",
        90: "0.9",
      },
      fontFamily: {
        caveat: ["Caveat Brush", "cursive"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], // ลองเปลี่ยนจาก "dark" เป็น "light"
  },
};

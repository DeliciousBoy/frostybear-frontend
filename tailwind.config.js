import daisyui from "daisyui";

module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"], // ลองเปลี่ยนจาก "dark" เป็น "light"
  },
};


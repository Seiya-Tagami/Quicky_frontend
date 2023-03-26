/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-bottom": "slide-bottom 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      keyframes: {
        "slide-bottom": {
          "0%": {
            transform: "translateX(-50%) translateY(0)",
          },
          to: {
            transform: "translateX(-50%) translateY(100px)",
          },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'slide-in': 'slide-in 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'show-miniModal': 'show-miniModal 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
      keyframes: {
        'slide-in': {
          '0%': {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(0%)',
          },
        },
        'show-miniModal': {
          '0%': {
            transform: 'translateY(-20%)',
          },
          to: {
            transform: ' translateY(20%)',
          },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};

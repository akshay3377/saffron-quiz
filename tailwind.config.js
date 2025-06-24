// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Set 'Inter' as default sans-serif font
      },
    },
  },
  plugins: [],
};

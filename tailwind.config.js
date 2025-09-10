/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        text: "#f0f0f0",
        primary: "#00aaff",
      },
      fontFamily: {
        sans: ["var(--font-poppins)"],
        heading: ["var(--font-rajdhani)"],
      },
    },
  },
  plugins: [],
};
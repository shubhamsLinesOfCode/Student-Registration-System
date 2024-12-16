/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.htm",
    "./output_styles.css", // Include CSS files if they use Tailwind classes
    "./styles.css",
    "./script.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

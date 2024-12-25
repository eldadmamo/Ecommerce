import animate from 'tailwindcss-animate';

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html", // Include the root HTML file if used
  ],
  theme: {
    extend: {},
  },
  plugins: [animate],
};
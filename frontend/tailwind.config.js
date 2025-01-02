import animate from 'tailwindcss-animate';

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html", // Include the root HTML file if used
  ],
  theme: {
    extend: {},
    screens:{
      'xl': {'max':'1200px'},
      'lg': {'max':'1080px'},
      'md-lg': {'max':'991px'},
      'md': {'max':'768px'},
      'sm': {'max':'576px'},
      'xs': {'max':'480px'},
      '2xs': {'max':'340px'},
    }
  },
  plugins: [animate],
};
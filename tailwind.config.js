/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}



// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
      oswald: ['Oswald', 'sans-serif'],
       anton: ['Anton', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
    },
      keyframes: {
         scroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }, // loops halfway
        },
      },
      animation: {
        slide: "slide 30s linear infinite",
        scroll: "scroll 40s linear infinite", // adjust duration for speed
      },
    },
  },
  plugins: [],
};



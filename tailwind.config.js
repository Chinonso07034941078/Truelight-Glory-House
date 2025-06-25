/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
       fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      keyframes: {
         typewriter: {
        from: { width: '0' },
        to: { width: '100%' },
         },
        scroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slowZoom: {
          "0%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1.2)" },
        },
      },
      animation: {
         typewriter: 'typewriter 4s steps(40, end) 1s forwards',
      fadeIn: 'fadeIn 1s ease-out',
        scroll: "scroll 40s linear infinite",
        slide: "slide 30s linear infinite",
        fadeInUp: "fadeInUp 1s ease-out forwards",
        slowZoom: "slowZoom 30s linear infinite",
      },
    },
  },
  plugins: [],
}

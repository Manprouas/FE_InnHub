/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "button": "#FFD900",
        "blue-theme": "#4A628A"
      },
      fontFamily:{
        Lora: ["Lora", "serif"],
        Inter: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}


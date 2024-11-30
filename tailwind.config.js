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
      },
      boxShadow: {
        glowing: "0 0 15px rgba(253, 224, 71, 0.7), 0 0 30px rgba(253, 224, 71, 0.5)",
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Caminhos para todos os seus arquivos React
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        lightGreen: "#1ED760",
        darkGreen: "#1DB954",
        blackfy: "#191414",
      },
    },
  },
  plugins: [],
};

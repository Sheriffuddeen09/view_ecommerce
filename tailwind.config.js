/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // scans all files in /src for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        border: '#e5e7eb', // 👈 custom border color (optional)
      },
    },
  },
  plugins: [],
}

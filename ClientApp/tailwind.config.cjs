/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        secondary: {
          DEFAULT: '#6B7280',
          dark: '#4B5563',
        },
        text: {
          DEFAULT: '#1F2937',
          light: '#6B7280',
        },
        background: '#F9FAFB',
        surface: '#FFFFFF',
        border: '#E5E7EB',
      },
    },
  },
  plugins: [],
}
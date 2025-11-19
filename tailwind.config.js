/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        muscle: {
          'very-weak': '#ff4d4d',
          'weak': '#ff944d',
          'normal': '#f2f2f2',
          'strong': '#8cc6ff',
          'very-strong': '#1e90ff',
        }
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

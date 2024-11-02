/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Ensure paths are correct
  ],
  theme: {
    extend: {
      fontFamily: {
        // Define your custom fonts here
        sans: ['YourCustomFont', 'Arial', 'sans-serif'],
        serif: ['New Amsterdam', 'Georgia', 'serif'],
      },
      colors: {
        background: '#000000', // Dark background color
        primary: '#038F44',  // Neon green from the "GAME" text
        secondary: '#000000', // Black for the background
        accent: '#ffffff',    // White for the switch and borders
        'dark-primary': '#3FA9F5', // Keeping neon green for dark mode
        'dark-secondary': '#000000', // Black for dark mode backgrounds
        'dark-accent': '#f5f5f5',    // White accent for dark mode text
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        rotateStar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(90deg)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        rotateStar: 'rotateStar 2s linear',
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg, #1e1e2f, #2c2c54)', // Gradient for dark mode background
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        notion: {
          light: '#F7F7F7', // Light background
          dark: '#373531',  // Darker background/text
          blue: '#2f80ed',  // Accent blue
          gray: '#E0E0E0',  // Light gray for borders/dividers
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
      extend: {
          fontFamily: {
              urbanist: ['Urbanist', 'sans-serif'],
          },
      },
  },
  daisyui: {
      themes: [{
          mytheme: {
              primary: "#570DF8", // Example color customization
              secondary: "#F000B8",
              accent: "#37CDBE",
              neutral: "#3D4451",
              "base-100": "#ffffff",
          },
      }, ],
  },
  plugins: [
      require('daisyui'),
  ],
}
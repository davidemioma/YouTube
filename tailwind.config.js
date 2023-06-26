/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        gradient:
          "linear-gradient(to bottom, rgba(75,37,114,0.800) 0%, rgba(75,37,114,0.298) 33%, rgba(15,15,15,1.000) 100%)",
        "gradient-to-b":
          "linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#010101 68%,#010101 100%);",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide", "@tailwindcss/line-clamp")],
};

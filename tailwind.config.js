/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem", // or '16px'
      screens: {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        "2xl": "1320px",
      },
    },
    colors: {
      primary: "#6C63FF",
      secondary: "#ECEBFF",
      main: "#9B95FF",
      green: {
        400: "#4ade80",
      },
      gray: {
        300: "#d1d5db",
      },
      red: "red",
      white: "white",
      black: "black",
    },

    extend: {
      fontFamily: {
        sans: ["Cairo", "sans-serif"],
      },
      boxShadow: {
        custom: "0px 2px 13.7px 0px rgba(0, 0, 0, 0.1)",
        card: "0px 4px 16px 0px #2F2E411A",
      },
      animation: {
        wave: "wave 1.2s ease-in-out infinite",
      },
      keyframes: {
        wave: {
          "0%, 60%, 100%": { transform: "translateY(0)" },
          "30%": { transform: "translateY(-10px)" },
        },
      },
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".flex-center": {
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
        },
        ".flex-between": {
          display: "flex",
          "justify-content": "space-between",
          "align-items": "center",
        },
      });
    },
  ],
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      keyframes: {
        "trans-left": {
          "0%": { transform: "translateX(300px)" },
          "50%": { transform: "translateX(0)" },
        },
        "trans-right": {
          "50%": { transform: "translateX(450px)" },
          "0%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "trans-left": "trans-left 1.0s ease-in",
        "trans-right": "trans-right 1.0s ease-in",
      },
    },
  },
  plugins: [],
};
export default config;

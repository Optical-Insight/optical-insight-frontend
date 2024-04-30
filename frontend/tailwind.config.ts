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

      colors: {
        //backgrounds
        lightBg: "#F6F8FF",
        blueBg: "#0E2249",
        sidebarFillBg: "#EFF6FF",
        inputBg: "#F5F8FC",

        //texts
        headerText: "#262E34",
        labelText: "#4A4844",
        buttonText: "#FFFFFF",
        blueText: "#14367B",
        lightBlueText: "#1582B5",
        sidebarText: "#1A8DC2",
        darkText: "#262E34",
        disabledText: "#CACACA",
        inputText: "#808080",

        //buttons
        buttonPrimary: "#14367B",
        buttonSecondary: "#dadcdc",

        //colors
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      theme: {
        "200%": "200%",
      },
      backgroundImage: {
        "radial-gradient":
          "radial-gradient(circle at top left, mediumslateblue 0%, transparent 50%), radial-gradient(circle at 100% 50%, lightcyan 0%, transparent 50%), radial-gradient(circle at 0% 100%, mistyrose 0%, transparent 75%)",
      },
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
};
export default config;

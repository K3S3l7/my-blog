import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'Courier New'", "Courier", "monospace"],
      },
      colors: {
        accent: "#f5f5dc",
        bg: "#0d0d0d",
        surface: "#141414",
        border: "#222",
        muted: "#555",
        text: "#d4d4d4",
      },
    },
  },
  plugins: [],
};
export default config;

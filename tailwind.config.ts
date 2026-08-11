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
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Spectral", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "Menlo", "monospace"],
      },
      colors: {
        paper: "var(--paper)",
        raised: "var(--paper-raised)",
        sunken: "var(--paper-sunken)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        muted: "var(--muted)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        accent: "var(--accent)",
        "accent-deep": "var(--accent-deep)",
      },
    },
  },
  plugins: [],
};
export default config;

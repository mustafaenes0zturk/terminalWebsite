import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "terminal-green": "var(--terminal-green)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        mono: ["Fira Code", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--terminal-text)',
            h1: {
              color: 'var(--terminal-text)',
            },
            h2: {
              color: 'var(--terminal-text)',
            },
            h3: {
              color: 'var(--terminal-text)',
            },
            strong: {
              color: 'var(--terminal-text)',
            },
            code: {
              color: 'var(--terminal-green)',
            },
            hr: {
              borderColor: 'var(--terminal-text)',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    spacing: {
      0: "0px",
      0.25: "4px",
      0.5: "8px",
      1: "16px",
      2: "32px",
      3: "48px",
    },
    extend: {
      colors: {
        body: {
          background: "var(--color-body-background)",
          text: "var(--color-body-text)",
        },
        line: {
          background: "var(--color-line-background)",
          foreground: "var(--color-line-foreground)",
        },
      },
    },
  },
  plugins: [],
};

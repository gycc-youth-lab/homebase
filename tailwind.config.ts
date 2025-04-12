import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend:{
      fontFamily:{
        'sans': 'var(--font-inter)',
        'content': 'var(--font-inter)',
        'title': 'var(--font-dm-sans)',
      },
      colors: {
        primary: {
          DEFAULT: "#1DADDF",
          variant: "#028DBF",
        },
        secondary: {
          DEFAULT: "#90EE02",
          variant: "#61D800",
        },
        background: "#FCFCFD",
        divider: "#EAECF0",
        text: {
          DEFAULT: "#182230",
        },
        error: {
          DEFAULT: "#FECDCA",
          variant: "#E47375",
        },
        warning: {
          DEFAULT: "#FEF0C7",
          variant: "#F7941D",
        },
        success: {
          DEFAULT: "#DCFAE6",
          variant: "#067647",
        },
        cta: {
          DEFAULT: "#FFFAE3",
          variant: "#FFE888",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

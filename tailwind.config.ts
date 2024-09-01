import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./app/index.html"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

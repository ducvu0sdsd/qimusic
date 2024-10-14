/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      animation: {
        'bar-1': 'volume-bar 1.2s ease-in-out infinite',
        'bar-2': 'volume-bar 1.5s ease-in-out infinite 0.3s',
        'bar-3': 'volume-bar 1.7s ease-in-out infinite 0.6s',
        'bar-4': 'volume-bar 1.3s ease-in-out infinite 0.9s',
      },
      keyframes: {
        'volume-bar': {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.5)' },
        },
      },
    },
  },
  plugins: [],
};

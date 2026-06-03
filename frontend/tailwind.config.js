/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mint: '#24ffae',
        'mint-light': '#afffe2',
        ink: '#171717',
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1.05s steps(1, end) infinite',
      },
    },
  },
  plugins: [],
}

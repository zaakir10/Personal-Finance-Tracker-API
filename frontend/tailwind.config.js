/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
        },
        'bg-main': '#0f172a',
        'bg-card': '#1e293b',
        'text-main': '#f8fafc',
        'text-muted': '#94a3b8',
        success: '#10b981',
        error: '#ef4444',
        border: '#334155',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

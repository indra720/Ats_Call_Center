/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          sidebar: '#02142B',
          'sidebar-hover': '#0B203E',
          'sidebar-text': '#8A99AD',
          'sidebar-header': '#4E6178',
          card: '#0A192F',
        },
        page: {
          bg: '#F6FAFD',
          card: '#FFFFFF',
          border: '#E5EBF2',
        },
        card: {
          bg: '#FFFFFF',
          border: '#E5EBF2',
          borderLight: '#F1F5F9',
        },
        brand: {
          50: '#EBF3FE',
          100: '#D6E7FD',
          200: '#B0D2FB',
          500: '#0362FA',
          600: '#0362FA',
          700: '#0252D4',
          light: '#EBF3FE',
        },
        status: {
          success: '#13AB4A',
          'success-bg': '#E6F7EC',
          warning: '#EF9612',
          'warning-bg': '#FEF3E6',
          danger: '#E73647',
          'danger-bg': '#FDE8E8',
          purple: '#871CF4',
          'purple-bg': '#F3E8FF',
          blue: '#0362FA',
          'blue-bg': '#EBF3FE',
        },
        slate: {
          textDark: '#0F172A',
          textMuted: '#64748B',
          textLight: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'pill': '10px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(2, 20, 43, 0.03)',
        'float': '0 10px 25px -5px rgba(3, 98, 250, 0.25)',
      },
      width: {
        'sidebar': '220px',
      }
    },
  },
  plugins: [],
}

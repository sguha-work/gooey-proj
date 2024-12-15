/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'jost': ['Jost', 'sans-serif'],
      },
      colors: {
        'primary': {
          '50': '#eef9ff',
          '100': '#d9f0ff',
          '200': '#bce6ff',
          '300': '#8ed7ff',
          '400': '#58bfff',
          '500': '#32a1ff',
          '600': '#1b82f5',
          '700': '#146be1',
          '800': '#195ec8',
          '900': '#194a8f',
          '950': '#142e57',
        },

        'secondary': {
          100: '#82bfe7',
          200: '#64a3cc',
          300: '#4c8ab3',
          400: '#919191',
          500: '#575560',
          600: '#164869',
          700: '#393939',
          800: '#fe7804',
          900: '#171520',
        },
      },
      screens: {
        'xs': '480px',
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 60s linear infinite',
        'infinite-scroll-inverse': 'infinite-scroll-inverse 60s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'infinite-scroll-inverse': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        }
      }
    },

    animation: {
      'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) infinite',
      'wobble': 'wobble 1s ease-in-out infinite',

    },
    keyframes: {
      'shake': {
        '10%, 90%': {
          transform: 'translate3d(-1px, 0, 0)'
        },
        '20%, 80%': {
          transform: 'translate3d(2px, 0, 0)'
        },
        '30%, 50%, 70%': {
          transform: 'translate3d(-4px, 0, 0)'
        },
        '40%, 60%': {
          transform: 'translate3d(4px, 0, 0)'
        }
      },
      wobble: {
        '0%, 100%': { transform: 'translateX(0%)' },
        '15%': { transform: 'translateX(-25%) rotate(-5deg)' },
        '30%': { transform: 'translateX(20%) rotate(3deg)' },
        '45%': { transform: 'translateX(-15%) rotate(-3deg)' },
        '60%': { transform: 'translateX(10%) rotate(2deg)' },
        '75%': { transform: 'translateX(-5%) rotate(-1deg)' },
      },
    }
  },
  plugins: [],
}


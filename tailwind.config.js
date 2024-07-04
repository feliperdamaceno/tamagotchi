import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3898cb'
      }
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('progress-bar', ['&::-webkit-progress-bar', '&'])
      addVariant('progress-value', [
        '&::-webkit-progress-value',
        '&::-moz-progress-bar'
      ])
    })
  ]
}

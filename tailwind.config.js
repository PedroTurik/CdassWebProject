/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'), require('@tailwindcss/forms')],

  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#04c90d",
        "secondary": "#0f766e",
        "accent": "#d1d5db",
        "neutral": "#1f2937",
        "base-100": "#1c1917",
        "info": "#98dceb",
        "success": "#84cc16",
        "warning": "#dfab11",
        "error": "#b91c1c",
        },
      },
    ],
  },
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        muted: 'var(--muted)',
      },
      borderRadius: {
        '4xl': 'var(--radius-4xl)',
      },
      backgroundImage: {
        'linear-to-b': 'linear-gradient(to bottom, var(--tw-gradient-from) 0%, var(--tw-gradient-to) var(--tw-gradient-to-position))',
        'linear-to-t': 'linear-gradient(to top, var(--tw-gradient-from) 0%, var(--tw-gradient-to) var(--tw-gradient-to-position))',
        'linear-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'linear-115': 'linear-gradient(115deg, var(--tw-gradient-stops))',
        'linear-145': 'linear-gradient(145deg, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        'subgrid': 'subgrid',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
} 
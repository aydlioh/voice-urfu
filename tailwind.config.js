import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryText: '#E3E1E6',
        sidebar: '#E3E1E6',
        sidebarActiveLink: '#C5C3C7',
        sidebarActiveHover: '#AFAFB4',
        background: '#3B3B3F',
        links: '#006FEE',
      },
      fontFamily: {
        kanit: ['KanitFont', 'sans-serif'],
        minecraft: ['MinecraftFont'],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        laptop: '1440px',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};

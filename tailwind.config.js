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
        primary: '#3B3B3F',
        secondary: '#E3E1E6',
        sidebar: '#E3E1E6',
        sidebarActiveLink: '#C5C3C7',
        sidebarActiveHover: '#AFAFB4',
        sidebarNested: '#494950',
        page: '#404046',
        pageNested: '#494950',
        background: '#3B3B3F',
        currentUser: '#494950',
        opponent: '#3B3B3F',
        links: '#006FEE',
        authForm: '#E3E1E6',
        authFormSecondary: '#CCCCD1',
        greenColor: '#0A8507'
      },
      fontFamily: {
        montserrat: ['MontserratFont'],
        roboto: ['RobotoFont'],
        minecraft: ['MinecraftFont'],
      },
      screens: {
        mobile: '435px',
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

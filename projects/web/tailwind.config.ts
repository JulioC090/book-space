import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/presentation/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'green-haze': {
          '50': '#f0fdf6',
          '100': '#dcfceb',
          '200': '#bcf6d8',
          '300': '#87eeba',
          '400': '#4cdc94',
          '500': '#24c374',
          '600': '#18a15d',
          '700': '#177e4b',
          '800': '#17643e',
          '900': '#155235',
          '950': '#062d1b',
        },
      },
      spacing: {
        '128': '32rem',
        'radix-trigger-width': 'var(--radix-select-trigger-width)',
      },
    },
  },
  plugins: [],
};
export default config;

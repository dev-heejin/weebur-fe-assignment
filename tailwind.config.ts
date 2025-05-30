import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    // shadcn 컴포넌트 위치에 따라 추가
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [],
};
export default config;

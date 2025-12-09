import { defineConfig, loadEnv } from 'vite'; 
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: '/',
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
    preview: {
      port: 3000,
      open: true,
    },
    server: {
      port: 3000,
      open: true,
    },
    define: {
      'import.meta.env.AI_SERVER_URL': JSON.stringify(env.AI_SERVER_URL),
    },
  };
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/pomodoro',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Pomodoro Timer',
        short_name: 'Pomodoro',
        description: 'A simple Pomodoro timer to boost your productivity.',
        theme_color: '#421017',
        display: 'standalone',
        icons: [
          {
            src: '/pomodoro/favicon-144.png',
            sizes: '144x144',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

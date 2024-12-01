import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'public',

  plugins: [
    react(),
    federation({
      name: 'tp-auth',
      filename: 'remoteEntry.js',
      exposes: {
        './entry': './src/remoteEntry',
      },
      shared: ['react', 'react-dom', 'zustand', 'react-router-dom'],
    }),
  ],
  build: {
    assetsDir: 'assets',
    modulePreload: false,
    target: 'esnext',
    minify: true,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: true,
    port: 7981,
    headers: {
      // 'Cross-Origin-Resource-Policy': 'cross-origin',
      'Cross-Origin-Resource-Policy': 'same-site',
      // 'Cross-Origin-Opener-Policy': 'same-origin',
      // 'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
});

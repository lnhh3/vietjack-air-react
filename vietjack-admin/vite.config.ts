import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import prism from 'vite-plugin-prismjs';

import ViteFederation from './configs/federation';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      ViteFederation(env),
      prism({
        languages: ['javascript', 'css', 'html', 'typescript'],
        plugins: ['line-numbers'],
        theme: 'tomorrow',
        css: true,
      }),
    ],
    server: {
      port: Number(env.VITE_PORT),
      host: true,
      strictPort: true,
      headers: {
        'Cross-Origin-Resource-Policy': 'same-site',
        // 'Cross-Origin-Opener-Policy': 'same-origin',
        // 'Cross-Origin-Embedder-Policy': 'require-corp',
      },
    },
    preview: {
      port: Number(env.VITE_PORT),
      strictPort: true,
    },
    build: {
      target: 'es2022',
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  };
});

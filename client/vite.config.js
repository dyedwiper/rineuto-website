import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import macrosPlugin from 'vite-plugin-babel-macros';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [
      react({
        jsxRuntime: 'classic',
        babel: {
          plugins: ['babel-plugin-styled-components'],
        },
      }),
    ],
  };
});

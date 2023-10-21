import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify';
import { VitePWA } from 'vite-plugin-pwa';
import Markdown from 'vite-plugin-md';
import { vitePWAOptions } from './src/pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vuetify({ autoImport: true }),
    VitePWA(vitePWAOptions),
    Markdown(),
  ],
  optimizeDeps: {
    // https://stackoverflow.com/questions/75469067/vite-cypress-how-to-prevent-reloading-due-to-optimized-dependencies-causin
    exclude: ['vuetify'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: () => 'index',
      },
    },
  },
});

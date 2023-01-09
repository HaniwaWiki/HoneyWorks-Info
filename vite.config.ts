import * as path from 'path';
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          return id.includes('node_modules') ? 'vendor' : 'index';
        },
      },
    },
  },
  server: {
    proxy: {
      '/locale': {
        // use deployed i18n json files
        // target: 'https://honeyworks.info/',
        // use local i18n json files
        target: 'http://127.0.0.1:35173',
        changeOrigin: true,
      },
    },
  },
});

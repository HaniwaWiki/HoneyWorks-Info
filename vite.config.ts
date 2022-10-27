/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://honeyworks.info/',
        changeOrigin: true,
      },
      '/assets': {
        target: 'https://honeyworks.info/',
        changeOrigin: true,
      },
      '/locale': {
        // use deployed i18n json files
        // target: 'https://honeyworks.info/',
        // if you prefer i18n json files from local, un-comment the following line, and run an http-server at root of HoneyWorks-Info-i18n
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
});

import type { VitePWAOptions } from 'vite-plugin-pwa';
import { defaultPrimaryColor } from '../palette';

export const vitePWAOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  workbox: {
    // cache all files from dist
    globPatterns: ['**/*.{html,css,js,png,jpg}'],
    // cache fonts and css files from remote (gstatic, googleapis)
    runtimeCaching: [
      {
        urlPattern: /^.*\.(ttf|woff2|eot)/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'fonts',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  includeAssets: [
    'favicon.webp',
    'favicon_1024x1024.png',
    'favicon_512x512.png',
    'favicon_192x192.png',
  ],
  manifest: {
    name: 'HoneyWorks Info',
    short_name: 'HoneyWorks Info',
    description: 'Get Information Of HoneyWorks and HoneyWorks Premium Live',
    theme_color: defaultPrimaryColor,
    icons: [
      {
        src: 'favicon_192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'favicon_512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'favicon_512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: 'favicon_1024x1024.png',
        sizes: '1024x1024',
        type: 'image/png',
      },
    ],
  },
};

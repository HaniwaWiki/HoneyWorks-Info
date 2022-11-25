import type { VitePWAOptions } from 'vite-plugin-pwa';

export const vitePWAOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
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
    theme_color: '#6200ee',
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

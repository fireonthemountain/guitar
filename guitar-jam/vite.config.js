import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// BASE_PATH lets CI deploy under a sub-path (GitHub Pages serves at /guitar/).
// Local dev/build stays at '/'.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      workbox: {
        // Include the real-guitar samples (+ cab IR) so playback works offline.
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest,mp3,wav}'],
      },
      manifest: {
        name: 'Guitar Practice',
        short_name: 'Guitar',
        description: 'Stage Ready 90 + the Grateful Dead program — every tab is playable',
        start_url: base,
        scope: base,
        display: 'standalone',
        theme_color: '#0d9488',
        background_color: '#111827',
        icons: [
          { src: `${base}icons/icon-192.png`, sizes: '192x192', type: 'image/png' },
          { src: `${base}icons/icon-512.png`, sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
  server: {
    host: true, // expose on the LAN
  },
});

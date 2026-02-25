// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://iansun.github.io',
  base: '/lpo-use-cases',
  integrations: [preact()],
  vite: {
    plugins: [tailwindcss()],
  },
});

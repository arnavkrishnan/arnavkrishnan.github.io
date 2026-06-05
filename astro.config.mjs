// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://arnavkrishnan.github.io',
  base: '/portfolio',
  output: 'static',
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap(), mdx()],
});
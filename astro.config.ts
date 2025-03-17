// @ts-check
import { resolve } from 'node:path';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import svgr from 'vite-plugin-svgr';

import { sidebarPlugin } from './plugins/sidebar-plugin';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: '秦振的文档',
      customCss: [_resolve('./src/styles/global.css')],
      expressiveCode: {
        themes: ['github-dark'],
        styleOverrides: {
          borderRadius: '0.5rem',
          frames: {
            shadowColor: '#124',
          },
        },
      },
      plugins: [sidebarPlugin],
      components: {
        Header: _resolve('./src/astro-components/Header.astro'),
        Sidebar: _resolve('./src/astro-components/Sidebar.astro'),
      },
    }),
    mdx(),
    react(),
  ],
  vite: {
    plugins: [
      svgr({
        include: _resolve('./src/assets/*.svg?react'),
        svgrOptions: {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
          svgoConfig: {
            floatPrecision: 2,
          },
        },
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': _resolve('./src'),
      },
    },
  },
  site: 'https://www.my-site.dev',
  server: {
    host: true,
  },
});

function _resolve(...args: string[]): string {
  return resolve(import.meta.dirname, ...args);
}

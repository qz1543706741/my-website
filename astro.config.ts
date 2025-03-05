// @ts-check
import { resolve } from 'node:path';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import type { StarlightUserConfig } from '@astrojs/starlight/types';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import svgr from 'vite-plugin-svgr';

const _resolve = (...args: string[]) => resolve(import.meta.dirname, ...args);

const sidebar: StarlightUserConfig['sidebar'] = [
  {
    label: '文档',
    autogenerate: { directory: 'documents' },
  },
  {
    label: '组件',
    autogenerate: { directory: 'ui-lib' },
  },
];

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: '秦振的文档',
      sidebar,
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
});

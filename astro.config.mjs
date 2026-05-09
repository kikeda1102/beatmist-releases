// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { styledComponentsSSR } from './src/integrations/styled-components-ssr';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [styledComponentsSSR()],
    resolve: {
      alias: {
        'styled-components': 'styled-components/dist/styled-components.esm.js',
      },
    },
  },
});
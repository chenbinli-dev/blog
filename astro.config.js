import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './remark-reading-time.mjs';
// https://astro.build/config
export default defineConfig({
  site: 'https://blog-codercoin.vercel.app',
  // Enable React to support React JSX components.
  integrations: [
    react(),
    tailwind({
      configFile: 'tailwind.config.js'
    }),
    mdx({
      syntaxHighlight: 'shiki'
    })
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime]
  }
});

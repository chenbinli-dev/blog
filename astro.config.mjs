import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { remarkReadingTime } from './remark-reading-time.mjs';
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.codercoin.top',
  // Enable React to support React JSX components.
  integrations: [react(), tailwind(), mdx()],
  markdown: {
    remarkPlugins: [remarkReadingTime]
  }
});
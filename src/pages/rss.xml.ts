import rss from '@astrojs/rss';
import type { AstroConfig } from 'astro';
import { getCollection } from 'astro:content';
export async function GET(context: AstroConfig) {
  const blogs = await getCollection('blogs');
  return rss({
    title: "Codercoin's Blog",
    description: 'This is a tech blog written by codercin. ',
    site: context.site!,
    items: blogs.map(({ data, slug }) => ({
      title: data.title,
      pubDate: data.pubDateTime,
      description: data.description,
      link: `/blog/${slug}/`
    }))
  });
}

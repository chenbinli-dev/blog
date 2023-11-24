import rss from '@astrojs/rss';
import type { AstroConfig } from 'astro';
import { getCollection } from 'astro:content';
export async function GET(context: AstroConfig) {
  const notes = await getCollection('notes');
  const handwritings = await getCollection('handwritings');
  return rss({
    title: "Codercoin's Book",
    description: 'This is a tech blog written by codercin. ',
    site: context.site!,
    items: [...notes, ...handwritings].map(({ data, slug }) => ({
      title: data.title,
      pubDate: data.pubDateTime,
      description: data.description,
      link: `/blog/${slug}/`
    })),
  });
}

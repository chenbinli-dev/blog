import { defineCollection } from 'astro:content';
import { genPostSchema } from './_schema';

const postCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => genPostSchema(image)
});

export const collections = {
  blogs: postCollection
};

export type CollectionsKeys = 'blogs';

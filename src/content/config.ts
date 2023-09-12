import { defineCollection } from 'astro:content';
import { postSchema } from './_schema';

const postCollection = defineCollection({
  type: 'content',
  schema: postSchema
});

export const collections = {
  notes: postCollection,
  handwritings: postCollection
};

export type CollectionsKeys = 'notes' | 'handwritings';

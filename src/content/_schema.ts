import { z } from 'astro:content'

export const postSchema = z
  .object({
    author: z.string().optional(),
    pubDateTime: z.date(),
    title: z.string(),
    postSlug: z.string().optional(),
    tags: z.array(z.string()).default(['others']),
    minutesRead: z.string().optional(),
    description: z.string().optional(),
  })
  .strict()
export type PostFrontmatter = z.infer<typeof postSchema>

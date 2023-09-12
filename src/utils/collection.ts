import type { CollectionEntry } from 'astro:content';
import type { CollectionsKeys } from '@/content/config.ts';
/**
 * Get latest item of collection
 * @param collection
 * @param num
 * @returns
 */
export function getLatestItem(
  collection: CollectionEntry<'notes' | 'handwritings'>[],
  num: number
) {
  if (num >= collection.length) return collection;
  collection.sort(
    (a, b) =>
      new Date(a.data.pubDateTime).getTime() -
      new Date(b.data.pubDateTime).getTime()
  );
  return collection.slice(0, num);
}
/**
 * Sortings collection
 * @param collection
 * @param order
 * @returns
 */
export function getOrderCollection<T extends CollectionsKeys>(
  collection: CollectionEntry<T>[],
  order: 'asc' | 'desc' = 'desc'
): CollectionEntry<T>[] {
  collection.sort((a, b) => {
    if (order === 'asc') {
      return (
        new Date(a.data.pubDateTime).getTime() -
        new Date(b.data.pubDateTime).getTime()
      );
    }
    return (
      new Date(b.data.pubDateTime).getTime() -
      new Date(a.data.pubDateTime).getTime()
    );
  });
  return collection;
}

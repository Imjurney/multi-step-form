import { z } from 'zod';

export const BookSchema = z.object({
  isbn: z.string(),
  title: z.string(),
  author: z.string(),
  cover: z.string().url(),
  publisher: z.string(),
  pubDate: z.string(),
});

//staus 스키마 (상태)

export const BookSearchResponseSchema = z.object({
  books: z.array(BookSchema),
  itemsPerPage: z.number(),
  query: z.string(),
  startIndex: z.number(),
  totalResults: z.number(),
});

export type BookFromApi = z.infer<typeof BookSchema>;
export type BookSearchResponse = z.infer<typeof BookSearchResponseSchema>;

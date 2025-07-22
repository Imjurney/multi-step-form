import { z } from 'zod';

export const BookSchema = z.object({
  isbn: z.string(),
  title: z.string(),
  author: z.string(),
  cover: z.string().url(),
  status: z.string(),
  publisher: z.string(),
});

export type BookFromApi = z.infer<typeof BookSchema>;

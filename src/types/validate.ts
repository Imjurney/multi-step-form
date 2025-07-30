import { z } from 'zod';
import { BookSchema } from '@/types/domain/bookSchema';

const BookInfoSchema = BookSchema.extend({
  search: z.string().optional(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
});

const BookInfoValidate = BookInfoSchema.refine(
  data => {
    const { startDate, endDate } = data;
    if (startDate && endDate) {
      return new Date(startDate) <= new Date(endDate);
    }
    return true;
  },
  {
    message: '시작일은 종료일보다 이전이어야 합니다.',
    path: ['endDate'],
  }
);

type BookInfoType = z.infer<typeof BookInfoSchema>;
export type { BookInfoType };
export { BookInfoValidate, BookInfoSchema };

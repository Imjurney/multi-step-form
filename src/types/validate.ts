import { z } from 'zod';
import { BookStatus } from './common/bookStatus';

const BookInfoSchema = z.object({
  isbn: z.string().optional(),
  title: z.string().optional(),
  author: z.string().optional(),
  cover: z.string().url().optional(),
  status: z.string().optional(),
  publisher: z.string().optional(),
  pubDate: z.string().optional(),
  search: z.string().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  recommendation: z.enum(['Y', 'N']).default('Y').optional(),
  rating: z.number().min(0.5).max(5).optional(),
  feedback: z.string().optional(),
});

const BookInfoValidate = BookInfoSchema.refine(
  data => {
    const { startDate, endDate, status } = data;

    if (status === BookStatus.WANT_TO_READ) {
      return true;
    }
    if (status === BookStatus.READING || status === BookStatus.PAUSED) {
      if (!startDate) return false;
      if (endDate !== null && endDate !== undefined && endDate !== '')
        return false;
      return true;
    }
    if (status === BookStatus.COMPLETED) {
      if (!startDate || !endDate) return false;
      return new Date(startDate) <= new Date(endDate);
    }

    return true;
  },
  {
    message: '독서 시작 날짜가 독서 종료 날짜보다 늦을 수 없습니다.',
    path: ['endDate'],
  }
).refine(
  data => {
    const { rating, feedback } = data;
    if (rating! <= 1 || rating === 5) {
      return feedback && feedback.trim().length >= 100 ? true : false;
    }
    return true;
  },
  {
    message: '피드백은 100자 이상이어야 합니다.',
    path: ['feedback'],
  }
);

type BookInfoType = z.infer<typeof BookInfoSchema>;
export type { BookInfoType };
export { BookInfoValidate, BookInfoSchema };

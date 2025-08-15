import { z } from 'zod';
import { BookStatus } from './common/bookStatus';

// 전체 폼 스키마 (최종 제출용)
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
  totalPage: z.number().optional(),
});

// 1단계: 독서 상태 및 기간
const Step1Schema = BookInfoSchema.pick({
  status: true,
  startDate: true,
  endDate: true,
}).refine(
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
);

// 2단계: 별점
const Step2Schema = BookInfoSchema.pick({
  rating: true,
});

// 3단계: 피드백
const Step3Schema = BookInfoSchema.pick({
  rating: true,
  feedback: true,
}).refine(
  data => {
    const { rating, feedback } = data;
    // 별점이 1점 이하 또는 5점이면 피드백 100자 이상 필수
    if (rating !== undefined && (rating <= 1 || rating === 5)) {
      return !!feedback && feedback.trim().length >= 100;
    }
    return true;
  },
  {
    message:
      '별점이 1점 이하 또는 5점일 때는 100자 이상의 피드백을 작성해야 합니다.',
    path: ['feedback'],
  }
);

// 전체 폼 유효성 검증 (최종 제출 시)
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
    if (rating !== undefined && (rating <= 1 || rating === 5)) {
      return !!feedback && feedback.trim().length >= 100;
    }
    return true;
  },
  {
    message:
      '별점이 1점 이하 또는 5점일 때는 100자 이상의 피드백을 작성해야 합니다.',
    path: ['feedback'],
  }
);

type BookInfoType = z.infer<typeof BookInfoSchema>;
export type { BookInfoType };
export {
  BookInfoValidate,
  BookInfoSchema,
  Step1Schema,
  Step2Schema,
  Step3Schema,
};

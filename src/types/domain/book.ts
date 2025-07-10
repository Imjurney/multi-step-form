import { BookStatusType } from '../common/book-status';

export interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatusType;
  // ...기타 도메인 필드
}

export interface BookPostForm {
  title: string;
  author: string;
  status: BookStatusType;
  // ...기타 폼 필드
}

export interface BookApiResponse {
  id: string;
  title: string;
  status: BookStatusType;
  // ...기타 API 응답 필드
}

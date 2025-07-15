import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { BookStatusType } from '../common/bookStatus';

export interface Book {
  isbn: string;
  title: string;
  cover: string | StaticImport;
  author: string;
  publisher: string;
  status: BookStatusType;
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

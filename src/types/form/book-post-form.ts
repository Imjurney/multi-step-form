import { BookStatusType } from '../common/book-status';

export interface BookPostForm {
  title: string;
  author: string;
  status: BookStatusType;
  // ...기타 폼 필드
}

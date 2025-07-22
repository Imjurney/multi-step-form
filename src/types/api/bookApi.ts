import { BookStatusType } from '../common/bookStatus';

export interface BookApiResponse {
  id: string;
  title: string;
  status: BookStatusType;
  // ...기타 API 응답 필드
}

export interface ClientQueryCommon {
  query: string;
  enabled: boolean;
}

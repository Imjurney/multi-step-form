import { atomWithStorage } from 'jotai/utils';

import { BookStatus } from '../types/common/bookStatus';
import { BookInfoType } from '../types/validate';

// 폼 상태를 localStorage에 저장하는 jotai atom
const formAtom = atomWithStorage<BookInfoType>('registerForm', {
  isbn: '',
  title: '',
  author: '',
  publisher: '',
  pubDate: '',
  startDate: '',
  endDate: '',
  status: BookStatus.WANT_TO_READ,
  recommendation: 'Y',
  feedback: '',
  totalPage: 128,
  // ...필요한 필드 추가
});

export default formAtom;

export enum BookStatus {
  WANT_TO_READ = 'wantToRead',
  READING = 'reading',
  COMPLETED = 'completed',
  PAUSED = 'paused',
}

export type BookStatusType =
  | BookStatus.WANT_TO_READ
  | BookStatus.READING
  | BookStatus.COMPLETED
  | BookStatus.PAUSED;

export const statusLabelMap: Record<BookStatusType, string> = {
  [BookStatus.WANT_TO_READ]: '읽고 싶은 책',
  [BookStatus.READING]: '읽는 중',
  [BookStatus.COMPLETED]: '읽음',
  [BookStatus.PAUSED]: '보류 중',
};

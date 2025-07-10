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

import { BookStatus } from '@/types/common/bookStatus';

const getCalendarTypeByStatus = (status: BookStatus) => {
  switch (status) {
    case BookStatus.READING:
    case BookStatus.PAUSED:
      return 'single';
    case BookStatus.COMPLETED:
      return 'range';
    default:
      return 'single';
  }
};

export default getCalendarTypeByStatus;

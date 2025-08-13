import { useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { BookStatus } from '@/types/common/bookStatus';
import { BookInfoType } from '@/types/validate';

const useBookStatus = () => {
  const [selectedStatus, setSelectedStatus] = useState<BookStatus>(
    BookStatus.WANT_TO_READ
  );

  const handleStatusClick = useCallback(
    (status: BookStatus, methods: UseFormReturn<BookInfoType>) => {
      if (selectedStatus === status) return;

      setSelectedStatus(status);
      methods.setValue('startDate', null);
      methods.setValue('endDate', null);
      methods.setValue('status', status);
      methods.clearErrors(['startDate', 'endDate']);
    },
    [selectedStatus]
  );

  return {
    selectedStatus,
    handleStatusClick,
  };
};

export default useBookStatus;

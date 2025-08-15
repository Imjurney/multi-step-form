import { useFormContext } from 'react-hook-form';
import { BookInfoType } from '@/types/validate';
import useBookSelection from '../../hooks/useBookSelection';
import useBookStatus from '../../hooks/useBookStatus';
import BookSearch from '../BookSearch/BookSearch';
import SelectedBookItem from '../SelectedBookItem/SelectedBookItem';
import { Fragment, useEffect } from 'react';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import { BookStatusType } from '../../types/common/bookStatus';

const Step01 = () => {
  const methods = useFormContext<BookInfoType>();

  const { handleStatusClick, selectedStatus } = useBookStatus(); // Custom hook to manage book status
  const { watch, trigger } = methods;
  const {
    handleResetBook,
    bookList,
    selectPubDate,
    handleSearch,
    handleSelectBook,
    searchQuery,
    isLoading,
  } = useBookSelection();
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const isSelectedBook = !!watch('isbn');

  useEffect(() => {
    if (startDate && endDate) {
      trigger(['startDate', 'endDate']);
    }

    trigger(['status']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, selectedStatus]);

  return (
    <Fragment key={'step01'}>
      <BookSearch
        isSelectedBook={isSelectedBook}
        handleSearch={handleSearch}
        bookList={bookList}
        handleSelectBook={book => handleSelectBook(book, methods)}
        isLoading={isLoading}
        searchQuery={searchQuery}
      />
      <SelectedBookItem
        isSelectedBook={isSelectedBook}
        handleResetBook={() => handleResetBook(methods)}
        src={methods.watch('cover') || '/placeholder.jpg'}
      />
      <DateRangePicker
        isSelectedBook={isSelectedBook}
        selectedStatus={selectedStatus}
        selectPubDate={selectPubDate}
        handleStatusClick={(status: BookStatusType, methods) =>
          handleStatusClick(status, methods)
        }
      />
    </Fragment>
  );
};

export default Step01;

/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from 'lodash';
import { useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { BookFromApi } from '../types/domain/bookSchema';
import { BookInfoType } from '../types/validate';
import updateBookInfoFields from '../utils/updateBookInfoFields';
import useBookSearch from './useBookSearch';

const useBookSelection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectPubDate, setSelectPubDate] = useState<string | null>(null);

  const { data, isLoading } = useBookSearch({
    query: searchQuery,
    enabled: searchQuery !== '',
  });

  const handleSearch = useCallback(
    debounce((value: string) => {
      if (value && value.trim() !== '') {
        setSearchQuery(value.trim());
      }
    }, 300),
    []
  );

  const handleSelectBook = useCallback(
    (book: BookFromApi, methods: UseFormReturn<BookInfoType>) => {
      updateBookInfoFields(methods, book);
      setSearchQuery('');
      setSelectPubDate(book.pubDate);
    },
    []
  );

  const handleResetBook = useCallback(
    (methods: UseFormReturn<BookInfoType>) => {
      updateBookInfoFields(methods, null);
      setSelectPubDate(null);
      setSearchQuery('');
    },
    []
  );

  return {
    searchQuery,
    selectPubDate,
    bookList: data?.books || [],
    isLoading,
    handleSearch,
    handleSelectBook,
    handleResetBook,
  };
};

export default useBookSelection;

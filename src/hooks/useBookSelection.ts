/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from 'lodash';
import { useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { BookFromApi } from '../types/domain/bookSchema';
import { BookInfoType } from '../types/validate';
import updateBookInfoFields from '../utils/updateBookInfoFields';
import useBookSearch from './useBookSearch';
import { useAtom } from 'jotai';
import formAtom from '../atom/form';

const useBookSelection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [formState] = useAtom(formAtom);
  const [selectPubDate, setSelectPubDate] = useState<string | null>(
    formState.pubDate || null
  );

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
      methods.setValue('pubDate', book.pubDate);
    },
    [selectPubDate]
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
    bookList: data ? data.books : [],
    handleSearch,
    handleSelectBook,
    handleResetBook,
    isLoading,
  };
};

export default useBookSelection;

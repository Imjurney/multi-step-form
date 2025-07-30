//https://velog.io/@yonghk423/Next.js-getServerSideProps-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%A0%81%EC%9A%A9

import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { css } from '@emotion/react';
// import { theme } from '@/styles';
// const { common, typography, colors } = theme;

import updateBookInfoFields from '@/utils/updateBookInfoFields';
import { BookInfoValidate, BookInfoType } from '@/types/validate';
import { BookStatus } from '@/types/common/bookStatus';
import { BookFromApi } from '@/types/domain/bookSchema';

import { Layout } from '@/components/Layout/Layout';
import Button from '@/components/Button/Button';

import useBookSearch from '@/hooks/useBookSearch';

import dynamic from 'next/dynamic';
import Step01 from '../../components/step/step01';
import { useRouter } from 'next/router';
import Step02 from '../../components/step/step02';
const DevT: React.ElementType = dynamic(
  () => import('@hookform/devtools').then(module => module.DevTool),
  { ssr: false }
);

export default function Register() {
  const [selectPubDate, setSelectPubDate] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<BookStatus>(
    BookStatus.WANT_TO_READ
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();
  const step = Number(router.query.step ?? 1);

  const goToStep = (nextStep: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, step: nextStep },
      },
      undefined,
      { shallow: true }
    );
  };
  const methods = useForm<BookInfoType>({
    resolver: zodResolver(BookInfoValidate),
    defaultValues: {
      isbn: '',
      title: '',
      author: '',
      publisher: '',
      pubDate: '',
      startDate: '',
      endDate: '',
      status: BookStatus.WANT_TO_READ,
      recommendation: 'Y', // '추천해요'가 기본 선택됨
    },
  });

  const {
    handleSubmit,
    getValues,
    watch,
    setValue,
    clearErrors,
    trigger,
    formState: { isValid },
  } = methods;

  const { data, isLoading } = useBookSearch({
    query: searchQuery,
    enabled: searchQuery !== '',
  });
  const bookList = data?.books || [];

  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const isbn = methods.watch('isbn');
  const isSelectedBook = !!isbn;

  const handleSearch = useCallback(() => {
    const title = getValues('search');
    if (title && title.trim() !== '') {
      setSearchQuery(title.trim());
    }
  }, [getValues, searchQuery]);

  useEffect(() => {
    if (startDate && endDate) {
      trigger(['startDate', 'endDate']);
    }
    trigger(['status']);
    trigger(['rating', 'feedback']);
  }, [startDate, endDate, selectedStatus]);

  const handleSelectBook = useCallback(
    (book: BookFromApi, methods: UseFormReturn<BookInfoType>) => {
      updateBookInfoFields(methods, book);
      setSearchQuery('');
      setSelectPubDate(book.pubDate);
    },
    [setSearchQuery, setSelectPubDate]
  );

  const handleResetBook = useCallback(
    (methods: UseFormReturn<BookInfoType>) => {
      updateBookInfoFields(methods, null);
      setSelectPubDate(null);
      setSearchQuery('');
    },
    [setSearchQuery, setSelectPubDate]
  );

  const handleStatusClick = useCallback(
    (status: BookStatus) => {
      if (selectedStatus === status) return;
      setSelectedStatus(status);
      setValue('startDate', null);
      setValue('endDate', null);
      setValue('status', status);
      clearErrors(['startDate', 'endDate']);
    },
    [setValue, selectedStatus]
  );

  return (
    <FormProvider {...methods}>
      <Layout title='도서 등록' subtitle='새로운 도서를 등록해보세요.'>
        <div>
          <form
            css={FormLayout}
            onSubmit={handleSubmit(data => console.log(data))}
          >
            {/*1. 도서 검색 및 기본 선택 영역 */}
            {step === 1 && (
              <Step01
                isSelectedBook={isSelectedBook}
                isLoading={isLoading}
                bookList={bookList}
                searchQuery={searchQuery}
                selectedStatus={selectedStatus}
                handleSearch={handleSearch}
                handleSelectBook={handleSelectBook}
                handleResetBook={handleResetBook}
                handleStatusClick={handleStatusClick}
                selectPubDate={selectPubDate}
              />
            )}
            {/*2. 도서 추천 여부, 별점*/}
            {step === 2 && <Step02 />}

            <Button
              disabled={!isSelectedBook || !isValid}
              type='button'
              onClick={() => goToStep(step + 1)}
              variant='primary'
              size='lg'
            >
              다음 단계로
            </Button>
          </form>
          <DevT control={methods.control} />
        </div>
      </Layout>
    </FormProvider>
  );
}

const FormLayout = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

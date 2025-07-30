//https://velog.io/@yonghk423/Next.js-getServerSideProps-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%A0%81%EC%9A%A9
import { FormProvider, useForm } from 'react-hook-form';
import { Layout } from '@/components/Layout/Layout';
import RHInput from '@/components/RHInput/RHInput';
import { css } from '@emotion/react';
import Button from '@/components/Button/Button';
import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { IoSearchOutline } from 'react-icons/io5';
import { useCallback, useEffect, useState } from 'react';
import useBookSearch from '@/hooks/useBookSearch';
import { BookFromApi } from '@/types/domain/bookSchema';

import BookSearchResult from '@/components/BookSearchResult/BookSearchResult';
import { theme } from '@/styles';
const { common, typography, colors } = theme;
import dynamic from 'next/dynamic';
import updateBookInfoFields from '@/utils/updateBookInfoFields';
import Label from '@/components/Label/Label';
import {
  BookStatus,
  BookStatusType,
  statusLabelMap,
} from '@/types/common/bookStatus';
import RHCalendarPicker from '@/components/RHcalendarPicker/RHcalendarPicker';
import { BookInfoValidate, BookInfoType } from '@/types/validate';
import parseLocalDate from '@/utils/parseLocalDate';
import type { UseFormReturn } from 'react-hook-form';
const DevT: React.ElementType = dynamic(
  () => import('@hookform/devtools').then(module => module.DevTool),
  { ssr: false }
);

export default function Register() {
  const [selectPubDate, setSelectPubDate] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<BookStatus>(
    BookStatus.WANT_TO_READ
  );

  const methods = useForm<BookInfoType>({
    resolver: zodResolver(BookInfoValidate),
  });
  const { handleSubmit, getValues, watch, setValue, unregister } = methods;

  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data, isLoading } = useBookSearch({
    query: searchQuery,
    enabled: searchQuery !== '',
  });
  const bookList = data?.books || [];
  const isbn = methods.watch('isbn');
  const isSelectedBook = !!isbn; // 값이 있으면 true
  const renderCalendarCondition =
    selectPubDate && selectedStatus === BookStatus.WANT_TO_READ;
  const STATUS_LIST: BookStatusType[] = Object.keys(
    statusLabelMap
  ) as BookStatusType[];

  const handleSearch = () => {
    const title = getValues('search');
    if (title && title.trim() !== '') {
      setSearchQuery(title.trim());
    }
  };
  useEffect(() => {
    if (isSelectedBook) {
      unregister('search');
    }
  }, [isSelectedBook, unregister]);
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

  const startDate = watch('startDate');

  return (
    <FormProvider {...methods}>
      <Layout title='도서 등록' subtitle='새로운 도서를 등록해보세요.'>
        <div>
          <form
            css={FormLayout}
            onSubmit={handleSubmit(data => console.log(data))}
          >
            {/*1. 도서 검색 및 기본 선택 영역 */}
            <div css={isSelectedBook ? BookBasicInfoLayout : null}>
              <div
                css={isSelectedBook ? HiddenLayout : BookBasicInfoSearchLayout}
              >
                <RHInput
                  width={'100%'}
                  type='search'
                  label='도서명'
                  placeholder='도서명을 검색'
                  name={'search'}
                  required={!isSelectedBook}
                />

                <Button
                  disabled={isLoading}
                  onClick={handleSearch}
                  addcss={ButtonPosition}
                  type='button'
                  variant='primary'
                  size='sm'
                  iconPosition='left'
                  icon={<IoSearchOutline />}
                >
                  검색
                </Button>
              </div>
              <BookSearchResult
                isSelectedBook={isSelectedBook}
                onSelectBook={(book: BookFromApi) =>
                  handleSelectBook(book, methods)
                }
                isLoading={isLoading}
                books={bookList as BookFromApi[]}
                searchQuery={searchQuery}
              />
            </div>
            <div css={isSelectedBook ? BookBasicInfoLayout : HiddenLayout}>
              <Image
                css={BookCoverStyle}
                src={methods.watch('cover') || '/images/no-cover.png'}
                alt='도서 표지 이미지'
                width={150}
                height={200}
              />
              <div
                css={css`
                  ${common.flexColumn} gap: 8px;
                `}
              >
                <RHInput type='text' readOnly name='isbn' hidden />
                <RHInput label='도서명' type='text' readOnly name='title' />
                <RHInput label='저자' type='text' readOnly name='author' />
                <Button
                  addcss={css`
                    width: fit-content;
                    align-self: flex-end;
                    justify-self: flex-end;
                  `}
                  type='button'
                  variant='secondary'
                  size='sm'
                  onClick={() => handleResetBook(methods)}
                >
                  다시 선택하기
                </Button>
              </div>
            </div>
            <div css={!isSelectedBook ? HiddenLayout : FormLayout}>
              <div css={common.inputLabel}>독서 상태</div>
              <ul css={LabelLayout}>
                {STATUS_LIST.map(status => (
                  <li
                    css={common.labelButton}
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setValue('startDate', null);
                      setValue('endDate', null);
                    }}
                  >
                    <Label isAbsolute={false} status={status} />
                  </li>
                ))}
              </ul>
              {selectPubDate &&
                (selectedStatus === BookStatus.COMPLETED ? (
                  <>
                    <div css={LabelLayout}>
                      <RHCalendarPicker
                        label='독서 시작 날짜'
                        control={methods.control}
                        name='startDate'
                        required
                        minDate={parseLocalDate(selectPubDate)}
                      />
                      <RHCalendarPicker
                        control={methods.control}
                        name='endDate'
                        label='독서 종료 날짜'
                        required={selectedStatus === BookStatus.COMPLETED}
                        minDate={
                          startDate
                            ? new Date(startDate)
                            : parseLocalDate(selectPubDate)
                        }
                      />
                    </div>
                  </>
                ) : (
                  <RHCalendarPicker
                    disabled={selectedStatus === BookStatus.WANT_TO_READ}
                    label='독서 시작 날짜'
                    control={methods.control}
                    name='startDate'
                    required
                    minDate={parseLocalDate(selectPubDate)}
                  />
                ))}

              {renderCalendarCondition && (
                <p
                  css={css`
                    ${typography.caption.sm}
                    color: ${colors.feedback.error};
                  `}
                >
                  읽고 싶은 책 상태에서는 날짜를 선택할 수 없습니다.
                </p>
              )}
            </div>

            <button
              type='submit'
              css={css`
                ${common.button}
                width: 100%;
                margin-top: 16px;
              `}
            >
              도서 등록하기
            </button>
            <DevT control={methods.control} />
          </form>
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

const LabelLayout = css`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`;

const ButtonPosition = css`
  position: absolute;
  right: 12px;
  top: 32px;
`;

const BookBasicInfoLayout = css`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

const BookBasicInfoSearchLayout = css`
  position: relative;
  height: fit-content;
  display: flex;
  align-items: center;
  width: 100%;
`;

const HiddenLayout = css`
  display: none;
`;

const BookCoverStyle = css`
  object-fit: cover;
  flex: 1;
  border-radius: 8px;
  background-color: #f0f0f0;
`;

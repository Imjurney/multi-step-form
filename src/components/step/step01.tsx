import { css } from '@emotion/react';
import {
  BookStatus,
  BookStatusType,
  statusLabelMap,
} from '@/types/common/bookStatus';
import parseLocalDate from '@/utils/parseLocalDate';
import { theme } from '@/styles';
import RHInput from '@/components/RHInput/RHInput';
import BookSearchResult from '@/components/BookSearchResult/BookSearchResult';
import RHCalendarPicker from '@/components/RHcalendarPicker/RHcalendarPicker';
import Button from '@/components/Button/Button';
import { BookFromApi } from '@/types/domain/bookSchema';
import Image from 'next/image';
import Label from '@/components/Label/Label';
import { useFormContext } from 'react-hook-form';
import { BookInfoType } from '@/types/validate';
import useBookSelection from '../../hooks/useBookSelection';
import useBookStatus from '../../hooks/useBookStatus';

const { common, typography, colors } = theme;

const Step01 = () => {
  const methods = useFormContext<BookInfoType>();
  const { handleStatusClick, selectedStatus } = useBookStatus(); // Custom hook to manage book status
  const { watch, control, formState } = methods;
  const {
    searchQuery,
    handleSearch,
    handleSelectBook,
    handleResetBook,
    bookList,
    isLoading,
    selectPubDate,
  } = useBookSelection();

  const isSelectedBook = !!watch('isbn');
  const renderCalendarCondition =
    selectPubDate && selectedStatus === BookStatus.WANT_TO_READ;
  const STATUS_LIST: BookStatusType[] = Object.keys(
    statusLabelMap
  ) as BookStatusType[];

  const startDate = watch('startDate');

  return (
    <>
      <div css={isSelectedBook ? BookBasicInfoLayout : null}>
        <div css={isSelectedBook ? HiddenLayout : BookBasicInfoSearchLayout}>
          <RHInput
            onChange={e => handleSearch(e.target.value)}
            width={'100%'}
            type='search'
            label='도서명'
            placeholder='도서명을 검색'
            name={'search'}
            required={!isSelectedBook}
          />
        </div>
        <BookSearchResult
          isSelectedBook={isSelectedBook}
          onSelectBook={(book: BookFromApi) => handleSelectBook(book, methods)}
          isLoading={isLoading}
          books={bookList}
          searchQuery={searchQuery}
        />
      </div>
      <div css={BookBasicInfoLayout}>
        <Image
          css={BookCoverStyle}
          src={methods.watch('cover') || '/placeholder.jpg'}
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
            disabled={!isSelectedBook}
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
        <RHInput
          type='text'
          name='status'
          hidden
          defaultValue={selectedStatus}
          rules={{ required: true }}
        />
        <div css={common.inputLabel}>
          <em>(*필수)</em>&nbsp; 독서 상태
        </div>
        <ul css={LabelLayout}>
          {STATUS_LIST.map(status => (
            <li
              css={common.labelButton}
              key={status}
              onClick={() => handleStatusClick(status, methods)}
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
                  control={control}
                  name='startDate'
                  required
                  minDate={parseLocalDate(selectPubDate)}
                />
                <RHCalendarPicker
                  control={control}
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
              {formState.errors.endDate && (
                <p
                  css={css`
                    ${typography.caption.sm}
                    color: ${colors.feedback.error};
                  `}
                >
                  {formState.errors.endDate.message}
                </p>
              )}
            </>
          ) : (
            <RHCalendarPicker
              disabled={selectedStatus === BookStatus.WANT_TO_READ}
              label='독서 시작 날짜'
              control={control}
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
    </>
  );
};

export default Step01;

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

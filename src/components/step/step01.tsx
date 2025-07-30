import { css } from '@emotion/react';
import {
  BookStatus,
  BookStatusType,
  statusLabelMap,
} from '@/types/common/bookStatus';
import parseLocalDate from '@/utils/parseLocalDate';
import { theme } from '@/styles';
import RHInput from '@/components/RHInput/RHInput';
import { IoSearchOutline } from 'react-icons/io5';
import BookSearchResult from '@/components/BookSearchResult/BookSearchResult';
import RHCalendarPicker from '@/components/RHcalendarPicker/RHcalendarPicker';
import Button from '@/components/Button/Button';

import { BookFromApi } from '@/types/domain/bookSchema';
import Image from 'next/image';
import Label from '@/components/Label/Label';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { BookInfoType } from '@/types/validate';

const { common, typography, colors } = theme;

interface Step01Props {
  isSelectedBook: boolean;
  isLoading: boolean;
  bookList: BookFromApi[];
  searchQuery: string;
  selectedStatus: BookStatus;
  handleSearch: () => void;
  handleSelectBook: (
    book: BookFromApi,
    methods: UseFormReturn<BookInfoType>
  ) => void;
  handleResetBook: (methods: UseFormReturn<BookInfoType>) => void;
  handleStatusClick: (status: BookStatusType) => void;
  selectPubDate: string | null;
}

const Step01 = ({
  isSelectedBook,
  isLoading,
  bookList,
  searchQuery,
  selectedStatus,
  handleSearch,
  handleSelectBook,
  handleResetBook,
  handleStatusClick,
  selectPubDate,
}: Step01Props) => {
  const methods = useFormContext<BookInfoType>();
  const renderCalendarCondition =
    selectPubDate && selectedStatus === BookStatus.WANT_TO_READ;
  const STATUS_LIST: BookStatusType[] = Object.keys(
    statusLabelMap
  ) as BookStatusType[];

  const { watch, control, formState } = useFormContext<BookInfoType>();

  const startDate = watch('startDate');
  return (
    <>
      <div css={isSelectedBook ? BookBasicInfoLayout : null}>
        <div css={isSelectedBook ? HiddenLayout : BookBasicInfoSearchLayout}>
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
          onSelectBook={(book: BookFromApi) => handleSelectBook(book, methods)}
          isLoading={isLoading}
          books={bookList}
          searchQuery={searchQuery}
        />
      </div>
      <div css={isSelectedBook ? BookBasicInfoLayout : HiddenLayout}>
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
              onClick={() => handleStatusClick(status)}
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

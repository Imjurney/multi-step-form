import RHInput from '../RHInput/RHInput';
import RHCalendarPicker from '@/components/RHcalendarPicker/RHcalendarPicker';
import { css } from '@emotion/react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import {
  BookStatus,
  BookStatusType,
  statusLabelMap,
} from '@/types/common/bookStatus';
import Label from '@/components/Label/Label';
import parseLocalDate from '@/utils/parseLocalDate';
import { BookInfoType } from '@/types/validate';
import { theme } from '@/styles';

const { common, typography, colors } = theme;

interface StarFeedbackProps {
  isSelectedBook: boolean;
  selectedStatus: BookStatusType;
  handleStatusClick: (
    status: BookStatusType,
    methods: UseFormReturn<BookInfoType>
  ) => void;
  selectPubDate: string | null;
}

const STATUS_LIST: BookStatusType[] = Object.keys(
  statusLabelMap
) as BookStatusType[];

const DateRangePicker = ({
  isSelectedBook,
  selectedStatus,
  handleStatusClick,
  selectPubDate,
}: StarFeedbackProps) => {
  const methods = useFormContext<BookInfoType>();
  const { control, formState, watch } = methods;
  const startDate = watch('startDate');
  const renderCalendarCondition =
    selectPubDate && selectedStatus === BookStatus.WANT_TO_READ;

  return (
    <div
      css={
        !isSelectedBook
          ? css`
              display: none;
            `
          : css`
              display: flex;
              flex-direction: column;
              gap: 16px;
              width: 100%;
            `
      }
    >
      <RHInput
        type='text'
        name='status'
        hidden
        value={selectedStatus}
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
            required={selectedStatus !== BookStatus.WANT_TO_READ ? true : false}
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
  );
};

export default DateRangePicker;

const LabelLayout = css`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`;

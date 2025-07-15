import { css } from '@emotion/react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { theme } from '@/styles';
import { BookStatusType } from '@/types/common/bookStatus';

const { colors, typography } = theme;

interface CardEditProps {
  onEnterForm: () => void;
  onDelete: () => void;
  bookStatus: BookStatusType;
}

const CardEditButtonGroup = ({
  onEnterForm,
  onDelete,
  bookStatus,
}: CardEditProps) => {
  return (
    <div role='group' aria-label='카드 편집 액션' css={actionGroupStyle}>
      <button
        type='button'
        css={iconButtonStyle}
        aria-label='수정'
        onClick={onEnterForm}
      >
        <MdEdit width={32} height={32} />
        {bookStatus === 'completed' ? '수정하기' : '작성하기'}
      </button>
      <button
        type='button'
        css={iconButtonStyle}
        aria-label='삭제'
        onClick={onDelete}
      >
        <MdDelete width={32} height={32} />
        삭제하기
      </button>
    </div>
  );
};

const actionGroupStyle = css`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  justify-content: flex-end;
  width: 100%;
  padding: 0 10px 10px 10px;
`;

const iconButtonStyle = css`
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${colors.gray[500]};
  ${typography.button.sm}
  transition: background 0.15s;
  &:active {
    background: ${colors.gray[200]};
    color: ${colors.primary};
    transform: scale(0.95);
    transition: transform 0.1s;
  }
`;

CardEditButtonGroup.displayName = 'CardEditButtonGroup';

export default CardEditButtonGroup;

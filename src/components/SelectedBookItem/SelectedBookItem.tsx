import Image from 'next/image';
import { css } from '@emotion/react';
import { theme } from '@/styles';
import RHInput from '@/components/RHInput/RHInput';
import Button from '@/components/Button/Button';

const { common } = theme;

interface SelectedBookItemProps {
  isSelectedBook: boolean;
  handleResetBook: () => void;
  src: string;
}
const SelectedBookItem = ({
  isSelectedBook,
  handleResetBook,
  src,
}: SelectedBookItemProps) => {
  return (
    <div css={BookBasicInfoLayout}>
      <Image
        css={BookCoverStyle}
        src={src || '/placeholder.jpg'}
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
        <RHInput label='선택된 도서명' type='text' readOnly name='title' />
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
          onClick={handleResetBook}
        >
          다시 선택하기
        </Button>
      </div>
    </div>
  );
};

const BookBasicInfoLayout = css`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

const BookCoverStyle = css`
  object-fit: cover;
  flex: 1;
  border-radius: 8px;
  background-color: #f0f0f0;
`;

export default SelectedBookItem;

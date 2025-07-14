import {
  statusLabelMap,
  type BookStatusType,
} from '@/types/common/book-status';
import { css } from '@emotion/react';
import colors from '@/styles/color';
import typography from '@/styles/typography';

const createLabelStyles = <
  T extends Record<BookStatusType, ReturnType<typeof css>>,
>(
  obj: T
) => obj;

const labelStyles = createLabelStyles({
  wantToRead: css`
    background-color: ${colors.status.wantToRead};
    color: white;
  `,
  reading: css`
    background-color: ${colors.status.reading};
    color: white;
  `,
  completed: css`
    background-color: ${colors.status.completed};
    color: white;
  `,
  paused: css`
    background-color: ${colors.status.paused};
    color: ${colors.gray[500]};
  `,
});

const labelCommonStyle = css`
  padding: 4px 8px;
  width: 64px;
  border-radius: 16px;
  text-align: center;
  ${typography.caption.sm};
`;

interface LabelProps {
  status: BookStatusType;
}

const Label = ({ status }: LabelProps) => {
  return (
    <span css={[labelCommonStyle, labelStyles[status]]}>
      {statusLabelMap[status]}
    </span>
  );
};

Label.displayName = 'Label';

export default Label;

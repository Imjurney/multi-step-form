/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  statusLabelMap,
  type BookStatusType,
} from '@/types/common/book-status';
import { css } from '@emotion/react';

import styled from '@emotion/styled';

import { theme } from '@/styles';

const { colors, typography, shadow } = theme;

interface LabelBaseProps {
  status: BookStatusType;
  isAbsolute: boolean;
}

type Vertical =
  | { top?: string; bottom?: never }
  | { top?: never; bottom?: string }
  | {};

type Horizontal =
  | { left?: string; right?: never }
  | { left?: never; right?: string }
  | {};

type LabelProps = LabelBaseProps & Vertical & Horizontal;

const Label = ({ status, isAbsolute, ...rest }: LabelProps) => {
  const { top, bottom, left, right } =
    (rest as keyof Vertical & Horizontal) || {};

  return (
    <LabelPosition
      css={[labelCommonStyle, labelStyles[status]]}
      $isAbsolute={isAbsolute}
      $top={isAbsolute ? top : undefined}
      $bottom={isAbsolute ? bottom : undefined}
      $left={isAbsolute ? left : undefined}
      $right={isAbsolute ? right : undefined}
    >
      {statusLabelMap[status]}
    </LabelPosition>
  );
};

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
  ${shadow.md};
`;

const LabelPosition = styled.span<{
  $isAbsolute: boolean;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
}>`
  ${({ $isAbsolute }) => $isAbsolute && `position: absolute;`}
  ${({ $top }) => $top && `top: ${$top};`}
  ${({ $bottom }) => $bottom && `bottom: ${$bottom};`}
  ${({ $left }) => $left && `left: ${$left};`}
  ${({ $right }) => $right && `right: ${$right};`}
`;

Label.displayName = 'Label';

export default Label;

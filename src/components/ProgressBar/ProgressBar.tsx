import { css } from '@emotion/react';
import { colors } from '../../styles';
import { calcRem, typography } from '@/styles/theme';

const progressBarStyle = css`
  margin-bottom: 32px;

  font-size: ${calcRem(24)}; /* 24px */
`;

const progressLabelStyle = css`
  ${typography.sub.md}
  margin-bottom: 8px;
  text-align: center;
`;

const progressTrackStyle = css`
  width: 100%;
  height: 8px;
  background-color: ${colors.gray[200]};
  border-radius: 4px;
  overflow: hidden;
`;

const progressFillStyle = (progress: number) => css`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${colors.brand[500]} 0%,
    ${colors.brand[600]} 100%
  );
  border-radius: 4px;
  width: ${progress}%;
  transition: width 0.3s ease;
`;

const ProgressBar = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => {
  const progress = (current / total) * 100;

  return (
    <div css={progressBarStyle}>
      <div css={progressLabelStyle}>
        {current}/{total} 단계 완료
      </div>
      <div css={progressTrackStyle}>
        <div css={progressFillStyle(progress)} />
      </div>
    </div>
  );
};

export default ProgressBar;

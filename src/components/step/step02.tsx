import RHRadio from '../RHRadio/RHRadio';
import { theme } from '@/styles';
import { css } from '@emotion/react';
import StarFeedback from '../StarFeedback/StarFeedback';

const { colors, typography, common } = theme;
const Step02 = () => {
  return (
    <div css={Layout}>
      <div role='radiogroup' aria-labelledby='recommendation-label'>
        <div
          css={css`
            ${typography.header.sm}
            color: ${colors.brand[600]};
            margin-bottom: 8px;
          `}
          id='recommendation-label'
        >
          <strong>이 책을 추천하시나요?</strong>
        </div>
        <RHRadio
          name='recommendation'
          value='Y'
          label='추천해요'
          required
          rules={{ required: '필수 선택입니다.' }}
        />
        <RHRadio
          name='recommendation'
          value='N'
          label='추천하지 않아요'
          required
          rules={{ required: '필수 선택입니다.' }}
        />
      </div>
      <div>
        <div
          css={css`
            ${typography.header.sm}
            color: ${colors.brand[600]};
            margin-bottom: 8px;
          `}
          id='recommendation-label'
        >
          <strong>이 책에 대한 평점을 남겨주세요</strong>
        </div>
        <StarFeedback name='rating' />
      </div>
    </div>
  );
};

const Layout = css`
  ${common.flexColumn};
  gap: 16px;
  width: 100%;
  justify-content: space-evenly;
  height: 30svh;
`;
export default Step02;

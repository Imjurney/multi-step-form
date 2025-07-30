import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';

import { css } from '@emotion/react';
import { useFormContext, Controller } from 'react-hook-form';
import { theme } from '@/styles';
import RHTextarea from '../RHTextarea/RHTextarea';
const { colors, typography } = theme;

interface StarProps {
  name?: string;
  label?: string;
  required?: boolean;
}
const StarFeedBack = ({
  name = 'rating',
  label = '평점',
  required = false,
}: StarProps) => {
  const { control, watch } = useFormContext();

  const rating = watch(name);

  const placeholder = (rating: number) => {
    switch (rating) {
      case 0:
      case 0.5:
      case 1:
        return '어떤점이 아쉬웠나요? 피드백을 남겨주세요.';
      case 1.5:
      case 2:
      case 2.5:
      case 3:
      case 3.5:
      case 4:
      case 4.5:
        return '(선택) 어떤 점이 좋았나요?';
      case 5:
        return '어떤 점이 좋았나요? 피드백을 남겨주세요.';
      default:
        return '피드백을 남겨주세요.';
    }
  };

  return (
    <div css={Layout}>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 8px;
          ${typography.content.sm}
        `}
      >
        {label && (
          <label
            htmlFor={name}
            css={css`
              ${typography.content.md}
              font-weight: 600;
            `}
          >
            {label}
          </label>
        )}
        <Controller
          name={name}
          control={control}
          defaultValue={1}
          rules={required ? { required: '별점은 필수입니다.' } : undefined}
          render={({ field }) => (
            <>
              <Rate
                id={name}
                allowHalf
                character='★'
                count={5}
                value={field.value}
                onChange={field.onChange}
              />
              <p>
                평점:
                <em
                  css={css`
                    color: ${colors.brand[600]};
                  `}
                >
                  {field.value}점
                </em>
              </p>
            </>
          )}
        />
      </div>

      <RHTextarea name='feedback' placeholder={placeholder(rating)} />
    </div>
  );
};

const Layout = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export default StarFeedBack;

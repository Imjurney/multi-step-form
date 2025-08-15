import { useFormContext } from 'react-hook-form';
import RHTextarea from '../RHTextarea/RHTextarea';
import { css } from '@emotion/react';
import { theme } from '@/styles';

const { common } = theme;
const Step03 = () => {
  const { watch, trigger } = useFormContext();
  const rating = watch('rating') || 0;

  const getContent = (rating: number) => {
    switch (rating) {
      case 0:
      case 0.5:
      case 1:
        return {
          isRequired: '필수',
          placeholder: '어떤점이 아쉬웠나요? 피드백을 남겨주세요.',
          params:
            '어떤점이 아쉬웠나요? 소중한 피드백을 남겨주시면 감사하겠습니다.',
        };
      case 1.5:
      case 2:
      case 2.5:
      case 3:
      case 3.5:
      case 4:
      case 4.5:
        return {
          isRequired: '선택',
          placeholder: '어떤 점이 좋았나요? 피드백을 남겨주세요.',
          params:
            '어떤 점이 좋았나요? 소중한 피드백을 남겨주시면 감사하겠습니다.',
        };
      case 5:
        return {
          isRequired: '필수',
          placeholder: '이 책을 추천하고 싶은 이유를 남겨주세요.',
          params:
            '이 책을 추천하고 싶은 이유를 남겨주시면 다른 유저들에게 큰 도움이 됩니다.',
        };
      default:
        return {
          isRequired: '선택',
          placeholder: '피드백을 남겨주세요.',
          params: '피드백을 남겨주시면 다른 유저들에게 큰 도움이 됩니다.',
        };
    }
  };

  return (
    <div
      css={[
        common.flexColumn,
        css`
          gap: 16px;
          width: 100%;
          height: 30svh;
        `,
      ]}
    >
      <p css={common.inputLabel}>
        <em>&#40;{getContent(rating).isRequired}&#41;</em>&nbsp;
        {getContent(rating).params}
      </p>
      <RHTextarea
        onFocus={() => trigger('feedback')}
        rating={rating}
        name='feedback'
        label='피드백'
        placeholder={getContent(rating).placeholder}
      />
    </div>
  );
};

export default Step03;

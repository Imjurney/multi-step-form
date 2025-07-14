import { css } from '@emotion/react';
import calcRemWithBase from '../utils/calcRemWithBase';
import colors from './color';

const typography = {
  header: {
    /** @usage 메인 페이지 제목 (text-4xl) */
    xl: css`
      font-size: ${calcRemWithBase(36)}; /* 36px */
      line-height: 1.1; /* 110% */
      font-weight: 800;
      letter-spacing: -0.02em;
    `,
    /** @usage 섹션 제목, 카드 제목 (text-3xl) */
    lg: css`
      font-size: ${calcRemWithBase(30)}; /* 30px */
      line-height: 1.2; /* 120% */
      font-weight: 700;
      letter-spacing: -0.01em;
    `,
    /** @usage 서브 섹션 제목 (text-2xl) */
    md: css`
      font-size: ${calcRemWithBase(24)}; /* 24px */
      line-height: 1.3; /* 130% */
      font-weight: 700;
    `,
    /** @usage 컴포넌트 제목 (text-xl) */
    sm: css`
      font-size: ${calcRemWithBase(20)}; /* 20px */
      line-height: 1.4; /* 140% */
      font-weight: 600;
    `,
  },

  content: {
    /** @usage 중요한 본문, 인트로 텍스트 (text-lg) */
    lg: css`
      font-size: ${calcRemWithBase(18)}; /* 18px */
      line-height: 1.6; /* 160% */
      font-weight: 400;
    `,
    /** @usage 기본 본문 텍스트 (text-base) */
    md: css`
      font-size: ${calcRemWithBase(16)}; /* 16px */
      line-height: 1.5; /* 150% */
      font-weight: 400;
    `,
    /** @usage 작은 본문, 설명 텍스트 (text-sm) */
    sm: css`
      font-size: ${calcRemWithBase(14)}; /* 14px */
      line-height: 1.5; /* 150% */
      font-weight: 400;
    `,
  },

  sub: {
    /** @usage 중요한 서브텍스트, 폼 라벨 */
    md: css`
      font-size: ${calcRemWithBase(14)}; /* 14px */
      line-height: 1.4; /* 140% */
      font-weight: 500;
      color: ${colors.gray[600]};
    `,
    /** @usage 일반 서브텍스트, 힌트 */
    sm: css`
      font-size: ${calcRemWithBase(12)}; /* 12px */
      line-height: 1.4; /* 140% */
      font-weight: 400;
      color: ${colors.gray[500]};
    `,
  },

  caption: {
    /** @usage 이미지 캡션, 메타 정보 */
    md: css`
      font-size: ${calcRemWithBase(12)}; /* 12px */
      line-height: 1.3; /* 130% */
      font-weight: 400;
      color: ${colors.gray[400]};
    `,
    /** @usage 매우 작은 텍스트, 저작권 */
    sm: css`
      font-size: ${calcRemWithBase(10)}; /* 10px */
      line-height: 1.2; /* 120% */
      font-weight: 400;
      color: ${colors.gray[400]};
    `,
  },

  button: {
    /** @usage 큰 버튼 (lg size) */
    lg: css`
      font-size: ${calcRemWithBase(16)}; /* 16px */
      line-height: 1.2; /* 120% */
      font-weight: 600;
    `,
    /** @usage 기본 버튼 (md size) */
    md: css`
      font-size: ${calcRemWithBase(14)}; /* 14px */
      line-height: 1.2; /* 120% */
      font-weight: 600;
    `,
    /** @usage 작은 버튼 (sm size) */
    sm: css`
      font-size: ${calcRemWithBase(12)}; /* 12px */
      line-height: 1.2; /* 120% */
      font-weight: 500;
    `,
  },

  input: {
    /** @usage 큰 입력 필드 */
    lg: css`
      font-size: ${calcRemWithBase(16)}; /* 16px */
      line-height: 1.5; /* 150% */
      font-weight: 400;
    `,
    /** @usage 기본 입력 필드 */
    md: css`
      font-size: ${calcRemWithBase(14)}; /* 14px */
      line-height: 1.5; /* 150% */
      font-weight: 400;
    `,
    /** @usage 작은 입력 필드 */
    sm: css`
      font-size: ${calcRemWithBase(12)}; /* 12px */
      line-height: 1.5; /* 150% */
      font-weight: 400;
    `,
  },

  special: {
    /** @usage 숫자, 통계, 점수 */
    number: css`
      font-size: ${calcRemWithBase(24)}; /* 24px */
      line-height: 1.2; /* 120% */
      font-weight: 700;
      font-feature-settings: 'tnum' 1; /* 등폭 숫자 */
    `,
    /** @usage 코드, 모노스페이스 텍스트 */
    code: css`
      font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
      font-size: ${calcRemWithBase(14)}; /* 14px */
      line-height: 1.4; /* 140% */
      font-weight: 400;
      background-color: ${colors.gray[100]};
      padding: 2px 4px;
      border-radius: 4px;
    `,
    /** @usage 링크 텍스트 */
    link: css`
      font-size: inherit;
      line-height: inherit;
      font-weight: 500;
      color: ${colors.brand[500]};
      text-decoration: underline;
      text-underline-offset: 2px;

      &:hover {
        color: ${colors.brand[600]};
      }
    `,
  },
} as const;

export default typography;

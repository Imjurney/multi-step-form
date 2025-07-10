import { css } from '@emotion/react';

/**
 * px을 rem으로 변환하는 유틸리티 함수
 * @param px - 픽셀 값
 * @returns rem 값 문자열
 */
export const calcRem = (px: number) => `${px / 16}rem`;

export const colors = {
  /**
   * 중성 색상 팔레트 (텍스트, 배경, 구분선)
   * @usage 텍스트, 배경, 구분선, 비활성 요소
   */
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  /**
   * 브랜드 색상 팔레트 (#0064FF 기반)
   * @usage 버튼, 링크, 로고, 강조 요소
   */
  brand: {
    50: '#F0F7FF',
    100: '#E0EFFF',
    200: '#B3D9FF',
    300: '#66C2FF',
    400: '#3399FF',
    500: '#0064FF',
    600: '#0052CC',
    700: '#0040A3',
    800: '#003380',
    900: '#001A4D',
  },

  /** @usage 주요 액션 버튼, 링크, 활성 상태 */
  primary: '#0064FF',

  /** @usage 보조 버튼, 서브 액션 */
  secondary: '#0052CC',

  /** @usage 강조 요소, 하이라이트 */
  accent: '#66C2FF',

  /** @usage 카드, 모달, 패널 배경 */
  surface: '#F5F7FA',

  /**
   * 시스템 피드백 색상
   * @usage 토스트, 알림, 상태 메시지
   */
  feedback: {
    /** @usage 성공 메시지, 완료 상태 */
    success: '#10B981',
    /** @usage 경고 메시지, 주의 상태 */
    warning: '#F59E0B',
    /** @usage 에러 메시지, 실패 상태 */
    error: '#EF4444',
  },

  /**
   * 독서 상태별 색상
   * @usage 상태 뱃지
   */
  status: {
    wantToRead: '#8B5CF6',
    reading: '#0064FF',
    completed: '#10B981',
    paused: '#e5e5e5',
  },
} as const;

/**
 * 반응형 미디어 쿼리
 * 모바일 우선(Mobile-first) 접근 방식
 */
export const mediaQueries = {
  tablet: '@media (min-width: 768px)',
  /** 데스크탑 이상 (1024px~) */
  desktop: '@media (min-width: 1024px)',
  /** 라지 스크린 (1440px~) */
  large: '@media (min-width: 1440px)',

  /**
   * 모바일 우선 미디어 쿼리 (Mobile-first)
   * @usage 모바일부터 위로 적용
   */

  /**
   * 기능 기반 미디어 쿼리
   */
  feature: {
    /** 터치 디바이스 */
    touch: '@media (hover: none) and (pointer: coarse)',
    /** 마우스 디바이스 */
    mouse: '@media (hover: hover) and (pointer: fine)',
    /** 고해상도 디스플레이 */
    retina:
      '@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
    /** 다크 모드 선호 */
    prefersDark: '@media (prefers-color-scheme: dark)',
    /** 라이트 모드 선호 */
    prefersLight: '@media (prefers-color-scheme: light)',
    /** 애니메이션 감소 선호 */
    reducedMotion: '@media (prefers-reduced-motion: reduce)',
  },
} as const;

export const commonStyles = {
  flexCenter: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  flexBetween: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  flexColumn: css`
    display: flex;
    flex-direction: column;
  `,

  container: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 12px;

    ${mediaQueries.tablet} {
      padding: 0 16px;
    }
  `,

  button: css`
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    background: none;
    font-family: inherit;

    &:focus-visible {
      outline: 2px solid ${colors.brand[500]};
      outline-offset: 2px;
    }

    ${mediaQueries.feature.mouse} {
      &:hover {
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }
    }

    ${mediaQueries.feature.touch} {
      -webkit-tap-highlight-color: transparent;
    }

    ${mediaQueries.feature.reducedMotion} {
      transition: none;

      &:hover {
        transform: none;
      }
    }
  `,

  card: css`
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border: 1px solid ${colors.gray[200]};
  `,

  input: css`
    width: 100%;
    padding: 12px 16px;
    border: 1px solid ${colors.gray[300]};
    border-radius: 8px;
    font-size: ${calcRem(16)};
    line-height: 1.5;
    color: ${colors.gray[900]};
    background-color: white;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &::placeholder {
      color: ${colors.gray[500]};
    }

    &:focus {
      outline: none;
      border-color: ${colors.brand[500]};
      box-shadow: 0 0 0 3px rgba(0, 100, 255, 0.1);
    }

    &:disabled {
      background-color: ${colors.gray[50]};
      color: ${colors.gray[500]};
      cursor: not-allowed;
    }

    /* 애니메이션 감소 선호 시 트랜지션 제거 */
    ${mediaQueries.feature.reducedMotion} {
      transition: none;
    }
  `,
} as const;

export const typography = {
  header: {
    /** @usage 메인 페이지 제목 (text-4xl) */
    xl: css`
      font-size: ${calcRem(36)}; /* 36px */
      line-height: 1.1; /* 110% */
      font-weight: 800;
      letter-spacing: -0.02em;
    `,
    /** @usage 섹션 제목, 카드 제목 (text-3xl) */
    lg: css`
      font-size: ${calcRem(30)}; /* 30px */
      line-height: 1.2; /* 120% */
      font-weight: 700;
      letter-spacing: -0.01em;
    `,
    /** @usage 서브 섹션 제목 (text-2xl) */
    md: css`
      font-size: ${calcRem(24)}; /* 24px */
      line-height: 1.3; /* 130% */
      font-weight: 700;
    `,
    /** @usage 컴포넌트 제목 (text-xl) */
    sm: css`
      font-size: ${calcRem(20)}; /* 20px */
      line-height: 1.4; /* 140% */
      font-weight: 600;
    `,
  },

  content: {
    /** @usage 중요한 본문, 인트로 텍스트 (text-lg) */
    lg: css`
      font-size: ${calcRem(18)}; /* 18px */
      line-height: 1.6; /* 160% */
      font-weight: 400;
    `,
    /** @usage 기본 본문 텍스트 (text-base) */
    md: css`
      font-size: ${calcRem(16)}; /* 16px */
      line-height: 1.5; /* 150% */
      font-weight: 400;
    `,
    /** @usage 작은 본문, 설명 텍스트 (text-sm) */
    sm: css`
      font-size: ${calcRem(14)}; /* 14px */
      line-height: 1.5; /* 150% */
      font-weight: 400;
    `,
  },

  sub: {
    /** @usage 중요한 서브텍스트, 폼 라벨 */
    md: css`
      font-size: ${calcRem(14)}; /* 14px */
      line-height: 1.4; /* 140% */
      font-weight: 500;
      color: ${colors.gray[600]};
    `,
    /** @usage 일반 서브텍스트, 힌트 */
    sm: css`
      font-size: ${calcRem(12)}; /* 12px */
      line-height: 1.4; /* 140% */
      font-weight: 400;
      color: ${colors.gray[500]};
    `,
  },

  caption: {
    /** @usage 이미지 캡션, 메타 정보 */
    md: css`
      font-size: ${calcRem(12)}; /* 12px */
      line-height: 1.3; /* 130% */
      font-weight: 400;
      color: ${colors.gray[400]};
    `,
    /** @usage 매우 작은 텍스트, 저작권 */
    sm: css`
      font-size: ${calcRem(10)}; /* 10px */
      line-height: 1.2; /* 120% */
      font-weight: 400;
      color: ${colors.gray[400]};
    `,
  },

  button: {
    /** @usage 큰 버튼 (lg size) */
    lg: css`
      font-size: ${calcRem(16)}; /* 16px */
      line-height: 1.2; /* 120% */
      font-weight: 600;
    `,
    /** @usage 기본 버튼 (md size) */
    md: css`
      font-size: ${calcRem(14)}; /* 14px */
      line-height: 1.2; /* 120% */
      font-weight: 600;
    `,
    /** @usage 작은 버튼 (sm size) */
    sm: css`
      font-size: ${calcRem(12)}; /* 12px */
      line-height: 1.2; /* 120% */
      font-weight: 500;
    `,
  },

  input: {
    /** @usage 큰 입력 필드 */
    lg: css`
      font-size: ${calcRem(16)}; /* 16px */
      line-height: 1.5; /* 150% */
      font-weight: 400;
    `,
    /** @usage 기본 입력 필드 */
    md: css`
      font-size: ${calcRem(14)}; /* 14px */
      line-height: 1.5; /* 150% */
      font-weight: 400;
    `,
    /** @usage 작은 입력 필드 */
    sm: css`
      font-size: ${calcRem(12)}; /* 12px */
      line-height: 1.5; /* 150% */
      font-weight: 400;
    `,
  },

  special: {
    /** @usage 숫자, 통계, 점수 */
    number: css`
      font-size: ${calcRem(24)}; /* 24px */
      line-height: 1.2; /* 120% */
      font-weight: 700;
      font-feature-settings: 'tnum' 1; /* 등폭 숫자 */
    `,
    /** @usage 코드, 모노스페이스 텍스트 */
    code: css`
      font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
      font-size: ${calcRem(14)}; /* 14px */
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

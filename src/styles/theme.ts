import { css } from '@emotion/react';

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

  /** @usage 메인 페이지 배경 */
  background: '#FAFBFC',

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
    paused: '#737373',
  },
} as const;

// 미디어 쿼리
export const mediaQueries = {
  mobile: '@media (max-width: 767px)',
  tablet: '@media (min-width: 768px) and (max-width: 1023px)',
  desktop: '@media (min-width: 1024px)',
  large: '@media (min-width: 1440px)',
} as const;

// 공통 스타일
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
    padding: 0 20px;

    ${mediaQueries.mobile} {
      padding: 0 16px;
    }
  `,

  button: css`
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  `,
} as const;

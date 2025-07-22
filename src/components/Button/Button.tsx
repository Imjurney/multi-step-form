import { css } from '@emotion/react';
import { theme } from '@/styles';
import { ReactNode, ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
type IconPosition = 'left' | 'right';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  size: ButtonSize;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  fullWidth?: boolean;
  loading?: boolean;
}

const { colors, common, typography } = theme;

const sizeStyles = {
  sm: css`
    padding: 8px 16px;
    border-radius: 6px;
    ${typography.button.sm}
  `,
  md: css`
    padding: 12px 20px;
    ${typography.button.md}
    line-height: 24px;
    border-radius: 8px;
  `,
  lg: css`
    padding: 16px 24px;
    ${typography.button.lg}
    border-radius: 10px;
  `,
} as const;

/**
 * 변형별 스타일 정의
 */
const variantStyles = {
  primary: css`
    background-color: ${colors.brand[500]};
    color: white;
    border: 1px solid ${colors.brand[500]};

    &:hover:not(:disabled) {
      background-color: ${colors.brand[600]};
    }

    &:active:not(:disabled) {
      background-color: ${colors.brand[700]};
    }

    &:focus-visible {
      outline: 2px solid ${colors.brand[300]};
      outline-offset: 2px;
    }
  `,
  secondary: css`
    background-color: white;
    color: ${colors.gray[700]};
    border: 1px solid ${colors.gray[300]};

    &:hover:not(:disabled) {
      background-color: ${colors.gray[50]};
      color: ${colors.gray[800]};
      border-color: ${colors.gray[400]};
    }

    &:active:not(:disabled) {
      background-color: ${colors.gray[100]};
      color: ${colors.gray[800]};
      border-color: ${colors.gray[500]};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${colors.brand[500]};
    border: 1px solid ${colors.brand[500]};

    &:hover:not(:disabled) {
      background-color: ${colors.brand[100]};
    }

    &:active:not(:disabled) {
      background-color: ${colors.brand[200]};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${colors.gray[700]};
    border: none;

    &:hover:not(:disabled) {
      background-color: ${colors.gray[100]};
      color: ${colors.gray[900]};
    }

    &:active:not(:disabled) {
      background-color: ${colors.gray[200]};
      color: ${colors.gray[900]};
    }
  `,
} as const;

/**
 * 기본 버튼 스타일
 */
const baseButtonStyle = css`
  ${common.flexCenter};
  gap: 8px;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  white-space: nowrap;
  outline: none;

  &:disabled {
    background-color: ${colors.gray[200]};
    color: ${colors.gray[500]};
    border-color: ${colors.gray[300]};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;

    &:hover,
    &:active,
    &:focus-visible {
      background-color: ${colors.gray[200]};
      color: ${colors.gray[500]};
      border-color: ${colors.gray[300]};
      transform: none;
      outline: none;
    }
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

/**
 * 아이콘 간격 스타일
 */
const iconGapStyles = {
  sm: css`
    gap: 6px;
  `,
  md: css`
    gap: 8px;
  `,
  lg: css`
    gap: 10px;
  `,
} as const;

/**
 * 로딩 스피너 컴포넌트
 */
const LoadingSpinner = ({ size }: { size: ButtonSize }) => {
  const spinnerSize = {
    sm: '16px',
    md: '18px',
    lg: '20px',
  };

  return (
    <div
      css={css`
        width: ${spinnerSize[size]};
        height: ${spinnerSize[size]};
        border: 2px solid currentColor;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}
      aria-hidden='true'
    />
  );
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  children,
  disabled,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const isDisabled = disabled || loading;

  const renderIcon = () => {
    if (!icon || loading) return null;

    return (
      <span
        css={css`
          display: inline-flex;
          align-items: center;
          justify-content: center;
        `}
        aria-hidden='true'
      >
        {icon}
      </span>
    );
  };

  const leftIcon = iconPosition === 'left' ? renderIcon() : null;
  const rightIcon = iconPosition === 'right' ? renderIcon() : null;

  return (
    <button
      css={[
        baseButtonStyle,
        sizeStyles[size],
        variantStyles[variant],
        ...(icon ? [iconGapStyles[size]] : []),
        ...(fullWidth
          ? [
              css`
                width: 100%;
              `,
            ]
          : []),
      ]}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...rest}
    >
      {loading && <LoadingSpinner size={size} />}
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};

export default Button;

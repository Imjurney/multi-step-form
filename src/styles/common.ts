import { css } from '@emotion/react';
import mediaQueries from './mediaQueries';
import colors from './color';
import typography from './typography';

const common = {
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

  inputLabel: css`
    color: ${colors.gray[900]};
    ${typography.content.sm};

    em {
      color: ${colors.feedback.error};
      font-style: normal;
      font-weight: 500;
    }
  `,

  input: css`
    width: 100%;
    padding: 12px 16px;
    border: 1px solid ${colors.gray[300]};
    border-radius: 8px;
    ${typography.input.md};
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

    ${mediaQueries.feature.reducedMotion} {
      transition: none;
    }
  `,

  errorMessage: css`
    color: ${colors.feedback.error};
    ${typography.input.sm};
  `,
  label: css`
    padding: 4px 8px;
    width: 64px;
    border-radius: 16px;
    text-align: center;
    ${typography.caption.sm};
  `,
} as const;

export default common;

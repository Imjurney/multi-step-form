import { css } from '@emotion/react';
import type { Theme } from '@emotion/react';
import emotionReset from 'emotion-reset';
export const globalStyles = (theme: Theme) => css`
  ${emotionReset}

  html,
  body {
    box-sizing: border-box;
    height: 100%;
    font-family:
      'Toss Product Sans',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smooth: never;
    background: linear-gradient(
      135deg,
      ${theme.colors.brand[50]} 0%,
      #fff 100%
    );
    color: ${theme.colors.gray[800]};
  }

  #__next {
    height: 100%;
  }

  *:focus {
    outline: none;
  }

  *:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  input,
  textarea,
  select,
  button {
    box-sizing: border-box;
  }
`;

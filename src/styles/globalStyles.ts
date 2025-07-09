import { css } from '@emotion/react';
import type { Theme } from '@emotion/react';

export const globalStyles = (theme: Theme) => css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
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
    background-color: ${theme.colors.background};
    color: ${theme.colors.gray[800]};
  }

  #__next {
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  input,
  textarea {
    border: none;
    outline: none;
    font-family: inherit;
  }

  ul,
  ol {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* 스크롤바 스타일 */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[500]};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.gray[600]};
  }

  @media (prefers-color-scheme: dark) {
    html,
    body {
      background-color: ${theme.colors.gray[900]};
      color: ${theme.colors.gray[100]};
    }

    ::-webkit-scrollbar-track {
      background: ${theme.colors.gray[800]};
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.colors.gray[700]};
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${theme.colors.gray[600]};
    }
  }

  ::selection {
    background-color: ${theme.colors.brand[100]};
    color: ${theme.colors.brand[900]};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  @media (min-width: 769px) {
    body {
      font-size: 16px;
    }
  }

  *:focus {
    outline: none;
  }

  *:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`;

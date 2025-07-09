import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import { globalStyles } from '@/styles/globalStyles';
import { colors, mediaQueries } from '@/styles';

// 테마 객체 생성
const theme = {
  colors,
  mediaQueries,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles(theme)} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import { globalStyles } from '@/styles/globalStyles';
import { theme } from '@/styles/index';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles(theme)} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

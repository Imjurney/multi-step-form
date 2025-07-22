import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import { globalStyles } from '@/styles/globalStyles';
import { theme } from '@/styles/index';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
//https://tanstack.com/query/v5/docs/framework/react/examples/nextjs?path=examples%2Freact%2Fnextjs%2Fsrc%2Fpages%2Findex.tsx
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles(theme)} />
          <Component {...pageProps} />
        </ThemeProvider>
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

import '@emotion/react';
import { colors, mediaQueries } from './styles/theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors;
    mediaQueries: typeof mediaQueries;
  }
}

const mediaQueries = {
  tablet: '@media (min-width: 768px)',
  desktop: '@media (min-width: 1024px)',
  large: '@media (min-width: 1440px)',
  feature: {
    touch: '@media (hover: none) and (pointer: coarse)',
    mouse: '@media (hover: hover) and (pointer: fine)',
    retina:
      '@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
    prefersDark: '@media (prefers-color-scheme: dark)',
    prefersLight: '@media (prefers-color-scheme: light)',
    reducedMotion: '@media (prefers-reduced-motion: reduce)',
  },
} as const;

export default mediaQueries;

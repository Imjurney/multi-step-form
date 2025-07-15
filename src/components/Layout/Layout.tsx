import { css } from '@emotion/react';
import { theme } from '@/styles/index';
import { PropsWithChildren } from 'react';

const { colors, mediaQueries, typography } = theme;
interface LayoutProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle: string;
}

export const Layout = ({
  children,
  title,
  subtitle,
}: Pick<PropsWithChildren<LayoutProps>, 'children' | 'title' | 'subtitle'>) => {
  return (
    <main css={containerStyle}>
      <div css={WrapperStyle}>
        <div css={CardStyle}>
          {(title || subtitle) && (
            <div css={headerStyle}>
              {title && <h1 css={titleStyle}>{title}</h1>}
              {subtitle && <p css={subtitleStyle}>{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      </div>
    </main>
  );
};

export const BookLayout = ({
  children,
}: {
  children: PropsWithChildren<LayoutProps>['children'];
}) => {
  return (
    <section css={cardListStyle} aria-label='독서 목록'>
      {children}
    </section>
  );
};

const containerStyle = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const WrapperStyle = css`
  width: 100%;
  max-width: 800px;
  margin-top: 24px;
  padding: 0 8px;
  ${mediaQueries.tablet} {
    margin-top: 40px;
    padding: 0 16px;
  }
`;

const CardStyle = css`
  ${mediaQueries.tablet} {
    padding: 24px;
    border-radius: 12px;
  }

  ${mediaQueries.desktop} {
    background: white;
    border-radius: 16px;

    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid ${colors.gray[200]};
    min-height: 50svh;
  }

  ${mediaQueries.feature.reducedMotion} {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const headerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 24px;
`;

const titleStyle = css`
  ${typography.header.md}
  color: ${colors.gray[900]};
`;

const subtitleStyle = css`
  ${typography.content.sm}
  color: ${colors.gray[600]};
`;

const cardListStyle = css`
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 16px;
  width: 100%;
`;

BookLayout.displayName = 'BookLayout';
Layout.displayName = 'Layout';

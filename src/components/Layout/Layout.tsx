import { css } from '@emotion/react';
import { colors, typography, mediaQueries } from '@/styles/theme';
import { PropsWithChildren } from 'react';
import ProgressBar from '@/components/ProgressBar/ProgressBar';

interface LayoutProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle: string;
}

const containerStyle = css`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${colors.gray[50]} 0%,
    ${colors.gray[100]} 100%
  );
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  ${mediaQueries.down.md} {
    align-items: center;
  }

  ${mediaQueries.down.sm} {
    padding: 16px;
  }
`;

const WrapperStyle = css`
  width: 100%;
  max-width: 800px;
  margin-top: 40px;

  ${mediaQueries.down.md} {
    margin-top: 24px;
  }

  ${mediaQueries.down.sm} {
    margin-top: 20px;
  }
`;

const CardStyle = css`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid ${colors.gray[200]};
  min-height: 50svh;

  ${mediaQueries.device.tabletOnly} {
    padding: 24px;
    border-radius: 12px;
  }

  ${mediaQueries.down.sm} {
    padding: 20px;
    border-radius: 8px;
    min-height: 40svh;
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

  ${mediaQueries.down.sm} {
    margin-bottom: 20px;
    gap: 2px;
  }
`;

const titleStyle = css`
  ${typography.header.md}
  color: ${colors.gray[900]};

  ${mediaQueries.down.sm} {
    ${typography.header.sm}
  }
`;

const subtitleStyle = css`
  ${typography.content.sm}
  color: ${colors.gray[600]};

  ${mediaQueries.down.sm} {
    ${typography.sub.sm}
  }
`;

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

export const StepLayout = ({
  children,
  currentStep = 1,
  totalSteps = 5,
  title = '도서 등록',
  subtitle = '읽은 책의 정보를 단계별로 입력해주세요',
}: PropsWithChildren<LayoutProps>) => {
  return (
    <Layout title={title} subtitle={subtitle}>
      {totalSteps > 1 && (
        <ProgressBar current={currentStep} total={totalSteps} />
      )}

      {children}
    </Layout>
  );
};

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { typography, responsiveTypography } from '@/styles/theme';

/**
 * 타이포그래피 시스템 사용 예시
 *
 * 다단계 폼에서 사용되는 모든 텍스트 스타일의 가이드라인
 */
export const TypographyExamples = () => {
  return (
    <div
      css={css`
        max-width: 800px;
        margin: 0 auto;
        padding: 40px 20px;
        background: white;
      `}
    >
      {/* 헤더 스타일 */}
      <section
        css={css`
          margin-bottom: 48px;
        `}
      >
        <h2 css={typography.header.lg}>헤더 스타일</h2>

        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-top: 24px;
          `}
        >
          <h1 css={typography.header.xl}>Header XL - 메인 페이지 제목</h1>
          <h2 css={typography.header.lg}>Header LG - 섹션 제목</h2>
          <h3 css={typography.header.md}>Header MD - 서브 섹션 제목</h3>
          <h4 css={typography.header.sm}>Header SM - 컴포넌트 제목</h4>
        </div>
      </section>

      {/* 콘텐츠 스타일 */}
      <section
        css={css`
          margin-bottom: 48px;
        `}
      >
        <h2 css={typography.header.lg}>콘텐츠 스타일</h2>

        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-top: 24px;
          `}
        >
          <p css={typography.content.lg}>
            Content LG - 중요한 본문 텍스트입니다. 인트로나 강조하고 싶은 내용에
            사용합니다.
          </p>
          <p css={typography.content.md}>
            Content MD - 기본 본문 텍스트입니다. 가장 많이 사용되는 일반적인
            텍스트 스타일입니다.
          </p>
          <p css={typography.content.sm}>
            Content SM - 작은 본문 텍스트입니다. 설명이나 부가 정보에
            사용합니다.
          </p>
        </div>
      </section>

      {/* 서브텍스트 스타일 */}
      <section
        css={css`
          margin-bottom: 48px;
        `}
      >
        <h2 css={typography.header.lg}>서브텍스트 & 캡션</h2>

        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-top: 24px;
          `}
        >
          <div css={typography.sub.md}>
            Sub MD - 폼 라벨이나 중요한 서브텍스트
          </div>
          <div css={typography.sub.sm}>Sub SM - 일반적인 힌트나 서브텍스트</div>
          <div css={typography.caption.md}>
            Caption MD - 이미지 캡션이나 메타 정보
          </div>
          <div css={typography.caption.sm}>
            Caption SM - 저작권이나 매우 작은 정보
          </div>
        </div>
      </section>

      {/* 다단계 폼에서 사용 예시 */}
      <section
        css={css`
          margin-bottom: 48px;
        `}
      >
        <h2 css={typography.header.lg}>다단계 폼 사용 예시</h2>

        <div
          css={css`
            background: #f9fafb;
            padding: 24px;
            border-radius: 12px;
            margin-top: 24px;
          `}
        >
          {/* 1단계: 도서 정보 */}
          <div
            css={css`
              margin-bottom: 32px;
            `}
          >
            <h3 css={typography.header.md}>1단계: 도서 기본 정보</h3>
            <p css={typography.sub.md}>
              읽으신 도서의 기본 정보를 입력해주세요.
            </p>

            <div
              css={css`
                margin-top: 16px;
              `}
            >
              <label
                css={css`
                  display: block;
                  margin-bottom: 8px;
                  ${typography.sub.md}
                `}
              >
                도서 제목 *
              </label>
              <input
                css={css`
                  width: 100%;
                  padding: 12px;
                  border: 1px solid #d1d5db;
                  border-radius: 8px;
                  ${typography.input.md}

                  &:focus {
                    outline: none;
                    border-color: #3b82f6;
                  }
                `}
                placeholder='도서 제목을 입력하세요'
              />
              <div css={typography.caption.md}>예: 클린 코드</div>
            </div>
          </div>

          {/* 2단계: 별점 */}
          <div
            css={css`
              margin-bottom: 32px;
            `}
          >
            <h3 css={typography.header.md}>2단계: 평가</h3>
            <p css={typography.sub.md}>이 도서에 대한 평가를 남겨주세요.</p>

            <div
              css={css`
                margin-top: 16px;
              `}
            >
              <label css={typography.sub.md}>별점</label>
              <div
                css={css`
                  margin-top: 8px;
                  display: flex;
                  align-items: center;
                  gap: 8px;
                `}
              >
                <span css={typography.special.number}>4.5</span>
                <span css={typography.caption.md}>/ 5.0</span>
              </div>
            </div>
          </div>

          {/* 특수 텍스트 예시 */}
          <div>
            <h4 css={typography.header.sm}>특수 텍스트 예시</h4>
            <div
              css={css`
                margin-top: 16px;
                display: flex;
                flex-direction: column;
                gap: 12px;
              `}
            >
              <div>
                통계: <span css={typography.special.number}>1,234</span>권 완독
              </div>
              <div>
                코드:{' '}
                <code css={typography.special.code}>
                  const book = &quot;Clean Code&quot;
                </code>
              </div>
              <div>
                링크:{' '}
                <a href='#' css={typography.special.link}>
                  더 많은 책 보기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 반응형 타이포그래피 */}
      <section
        css={css`
          margin-bottom: 48px;
        `}
      >
        <h2 css={typography.header.lg}>반응형 타이포그래피</h2>

        <div
          css={css`
            margin-top: 24px;
          `}
        >
          <h1 css={responsiveTypography.hero}>
            히어로 제목 (화면 크기에 따라 조정됨)
          </h1>
          <h2 css={responsiveTypography.pageTitle}>
            페이지 제목 (모바일에서 작아짐)
          </h2>
        </div>
      </section>

      {/* 사용 가이드 */}
      <section
        css={css`
          background: #f0f9ff;
          padding: 24px;
          border-radius: 12px;
          border-left: 4px solid #3b82f6;
        `}
      >
        <h3 css={typography.header.sm}>📚 사용 가이드</h3>
        <div
          css={css`
            margin-top: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
          `}
        >
          <div css={typography.content.sm}>
            <strong>헤더:</strong> 제목, 섹션 구분에 사용
          </div>
          <div css={typography.content.sm}>
            <strong>콘텐츠:</strong> 본문, 설명 텍스트에 사용
          </div>
          <div css={typography.content.sm}>
            <strong>서브:</strong> 라벨, 힌트, 보조 정보에 사용
          </div>
          <div css={typography.content.sm}>
            <strong>캡션:</strong> 메타 정보, 저작권 등에 사용
          </div>
          <div css={typography.content.sm}>
            <strong>특수:</strong> 숫자, 코드, 링크 등 특별한 텍스트에 사용
          </div>
        </div>
      </section>
    </div>
  );
};

export default TypographyExamples;

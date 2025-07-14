import { css } from '@emotion/react';
import { theme } from '@/styles';
import Image from 'next/image';

const cardListStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 16px 0;
`;

const cardStyle = css`
  width: 100%;
  max-width: 230px;
  min-width: 180px;
  aspect-ratio: 5/7.5;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid ${theme.colors.gray[200]};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  margin: 0 auto;
`;

const coverStyle = css`
  width: 100%;
  height: 120px;
  object-fit: cover;
  background: ${theme.colors.gray[100]};
`;

const figcaptionStyle = css`
  padding: 12px 10px 10px 10px;
  width: 100%;
  text-align: left;
  font-size: 1rem;
  color: ${theme.colors.gray[900]};
`;

const titleStyle = css`
  font-weight: 700;
  font-size: 1.05rem;
  margin-bottom: 4px;
  color: ${theme.colors.gray[900]};
`;

const authorStyle = css`
  font-size: 0.95rem;
  color: ${theme.colors.gray[600]};
`;

export default function CardList() {
  return (
    <section css={cardListStyle} aria-label='독서 목록'>
      <figure css={cardStyle}>
        <Image
          css={coverStyle}
          src='https://image.aladin.co.kr/product/29241/6/cover500/k292836282_1.jpg'
          alt='불편한 편의점 표지'
          width={230}
          height={120}
          priority
        />
        <figcaption css={figcaptionStyle}>
          <div css={titleStyle}>불편한 편의점</div>
          <div css={authorStyle}>김호연 · 나무옆의자</div>
        </figcaption>
      </figure>
      <figure css={cardStyle}>
        <Image
          css={coverStyle}
          src='https://image.aladin.co.kr/product/31520/6/cover500/k112935899_1.jpg'
          alt='세이노의 가르침 표지'
          width={230}
          height={120}
          priority
        />
        <figcaption css={figcaptionStyle}>
          <div css={titleStyle}>세이노의 가르침</div>
          <div css={authorStyle}>세이노 · 데이원</div>
        </figcaption>
      </figure>
      <figure css={cardStyle}>
        <Image
          css={coverStyle}
          src='https://image.aladin.co.kr/product/31214/6/cover500/k832935899_1.jpg'
          alt='역행자 표지'
          width={230}
          height={120}
          priority
        />
        <figcaption css={figcaptionStyle}>
          <div css={titleStyle}>역행자</div>
          <div css={authorStyle}>자청 · 웅진지식하우스</div>
        </figcaption>
      </figure>
    </section>
  );
}

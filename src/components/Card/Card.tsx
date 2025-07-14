import { css } from '@emotion/react';
import { theme } from '@/styles';
import Image from 'next/image';
import Label from '@/components/Label/Label';
import { BookStatus } from '@/types/common/book-status';
import { MdEdit, MdDelete } from 'react-icons/md'; // 추가
const { colors, typography, shadow, mediaQueries } = theme;

const cardListStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
  width: 100%;
`;

const cardStyle = css`
  position: relative;
  width: 100%;

  aspect-ratio: 5 / 6;
  background: #fff;
  border-radius: 16px;
  ${shadow.lg}
  border: 1px solid ${colors.gray[200]};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  margin: 0 auto;

  ${mediaQueries.desktop} {
    max-width: 230px;
  }
`;

const coverStyle = css`
  width: 100%;
  height: 120px;
  object-fit: cover;
  background: ${colors.gray[100]};
  ${mediaQueries.desktop} {
    height: 150px;
  }
`;

const figcaptionStyle = css`
  padding: 12px 10px;
  width: 100%;
  height: 100%;
  text-align: left;
  font-size: 1rem;
  color: ${colors.gray[900]};
`;

const titleStyle = css`
  font-weight: 700;
  font-size: 1.05rem;
  margin-bottom: 4px;
  color: ${colors.gray[900]};
`;

const authorStyle = css`
  font-size: 0.95rem;
  color: ${colors.gray[600]};
`;

const actionGroupStyle = css`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  justify-content: flex-end;
  width: 100%;
  padding: 0 10px 10px 10px;
`;

const iconButtonStyle = css`
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  color: ${colors.gray[500]};
  ${typography.caption.md}
  transition: background 0.15s;
  &:hover {
    background: ${colors.gray[200]};
    color: ${colors.primary};
  }
`;

//현재 테스트

export default function CardList() {
  return (
    <section css={cardListStyle} aria-label='독서 목록'>
      <figure css={cardStyle}>
        <Label isAbsolute top='8px' right='8px' status={BookStatus.COMPLETED} />
        <Image
          css={coverStyle}
          src='https://image.aladin.co.kr/product/33000/68/coversum/k972937779_1.jpg'
          alt='불편한 편의점 표지'
          width={180}
          height={120}
          priority
        />
        <figcaption css={figcaptionStyle}>
          <div css={titleStyle}>불편한 편의점</div>
          <div css={authorStyle}>김호연 · 나무옆의자</div>
        </figcaption>
      </figure>
      <figure css={cardStyle}>
        <Label isAbsolute top='8px' right='8px' status={BookStatus.PAUSED} />
        <Image
          css={coverStyle}
          src='https://image.aladin.co.kr/product/33000/68/coversum/k972937779_1.jpg'
          alt='세이노의 가르침 표지'
          width={180}
          height={120}
          priority
        />
        <figcaption css={figcaptionStyle}>
          <div css={titleStyle}>세이노의 가르침</div>
          <div css={authorStyle}>세이노 · 데이원</div>
        </figcaption>
      </figure>
      <figure css={cardStyle}>
        <Label
          isAbsolute
          top='8px'
          right='8px'
          status={BookStatus.WANT_TO_READ}
        />
        <Image
          css={coverStyle}
          src='https://image.aladin.co.kr/product/33000/68/coversum/k972937779_1.jpg'
          alt='역행자 표지'
          width={180}
          height={120}
          priority
        />
        <figcaption css={figcaptionStyle}>
          <div css={titleStyle}>역행자</div>
          <div css={authorStyle}>자청 · 웅진지식하우스</div>
        </figcaption>
        <div css={actionGroupStyle}>
          <button type='button' css={iconButtonStyle} aria-label='수정'>
            <MdEdit />
            작성하기
          </button>
          <button type='button' css={iconButtonStyle} aria-label='삭제'>
            <MdDelete />
            삭제하기
          </button>
        </div>
      </figure>
    </section>
  );
}

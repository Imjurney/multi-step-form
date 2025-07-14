import { css } from '@emotion/react';
import { theme } from '@/styles';
import Image from 'next/image';
import Label from '@/components/Label/Label';
import CardEditButtonGroup from '@/components/ButtonGroup/CardEditButtonGroup';
import { Book } from '@/types/domain/book';
import { useState } from 'react';

const { colors, shadow, mediaQueries, typography } = theme;

interface CardProps {
  book: Book;
  onEnterForm: () => void;
  onDelete: () => void;
}
const Card = ({ book, onEnterForm, onDelete }: CardProps) => {
  const { isbn, title, author, cover, status, publisher } = book;
  const [imgSrc, setImgSrc] = useState(cover);
  return (
    <figure id={isbn} css={cardStyle}>
      <Label isAbsolute top='8px' right='8px' status={status} />
      <Image
        css={coverStyle}
        placeholder='blur'
        blurDataURL='/placeholder.jpg'
        src={imgSrc}
        alt={`${title} 표지`}
        width={180}
        height={120}
        priority
        onError={() => setImgSrc('/placeholder.jpg')}
      />
      <figcaption css={figcaptionStyle}>
        <div css={titleStyle}>{title}</div>
        <div css={authorStyle}>
          {author}&nbsp;&middot;&nbsp;{publisher}
        </div>
      </figcaption>
      <CardEditButtonGroup
        onEnterForm={onEnterForm}
        onDelete={onDelete}
        bookStatus={status}
      />
    </figure>
  );
};

const cardStyle = css`
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 6;
  background: ${colors.surface};
  border-radius: 16px;
  ${shadow.lg}
  border: 1px solid ${colors.gray[200]};
  display: flex;
  flex-direction: column;
  max-width: calc(50% - 4px);
  overflow: hidden;

  ${mediaQueries.tablet} {
    max-width: 223px;
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
`;

const titleStyle = css`
  color: ${colors.gray[900]};
  ${typography.content.md}
`;

const authorStyle = css`
  color: ${colors.gray[500]};
  ${typography.caption.md}
`;

Card.displayName = 'Card';

export default Card;

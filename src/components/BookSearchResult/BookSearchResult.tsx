import type { BookFromApi } from '@/types/domain/bookSchema';
import Image from 'next/image';
import { css } from '@emotion/react';
import { theme } from '@/styles';
const { colors, typography, mediaQueries } = theme;
interface BookSearchResultProps {
  isLoading: boolean;
  books: BookFromApi[];
  searchQuery: string;
  onSelectBook: (book: BookFromApi) => void;
  isSelectedBook: boolean;
}

const BookSearchResult = ({
  isLoading,
  books,
  searchQuery,
  onSelectBook,
  isSelectedBook,
}: BookSearchResultProps) => {
  if (isLoading) return <p css={SearchTextStyle}>로딩 중...</p>;
  if (books.length > 0)
    return (
      <ul
        css={!isSelectedBook ? bookListStyle : HiddenLayout}
        aria-label='검색된 도서 목록'
      >
        {books.map(book => (
          <li
            onClick={() => onSelectBook(book)}
            key={book.isbn}
            css={bookItemStyle}
          >
            <Image
              src={book.cover}
              alt={book.title}
              width={40}
              height={60}
              style={{ objectFit: 'cover', borderRadius: 4 }}
            />
            <div css={bookInfoStyle}>
              <div css={bookTitleStyle}>{book.title}</div>
              <div css={bookAuthorStyle}>{book.author}</div>
            </div>
          </li>
        ))}
      </ul>
    );
  if (!isLoading && searchQuery)
    return <p css={SearchTextStyle}> 검색 결과가 없습니다.</p>;
  return null;
};
const SearchTextStyle = css`
  ${typography.content.sm}
  color: ${colors.gray[600]};
  text-align: center;
  margin-top: 16px;
`;

const HiddenLayout = css`
  display: none;
`;

const bookListStyle = css`
  margin-top: 4px;
  max-height: 320px;
  width: 100%;
  min-height: 40px;
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid ${colors.gray[200]};
  border-radius: 8px;
  background: #fff;
  &::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.gray[200]};
    border-radius: 4px;
    margin-left: 2px; /* 스크롤바와 컨텐츠 사이 여백 */
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const bookItemStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 0.5px solid ${colors.gray[200]};
  }
  ${mediaQueries.desktop} {
    &:hover {
      background: ${colors.brand[50]};
    }
  }
`;

const bookInfoStyle = css`
  display: flex;
  flex-direction: column;
`;

const bookTitleStyle = css`
  ${typography.content.sm}
  color: ${colors.gray[900]};
  font-weight: 500;
  margin-bottom: 4px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const bookAuthorStyle = css`
  ${typography.caption.sm}
  color: ${colors.gray[600]};
`;

export default BookSearchResult;

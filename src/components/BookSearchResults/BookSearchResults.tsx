import { BookFromApi } from '../../types/domain/bookSchema';
import BookSearchResult from '../BookSearchResult/BookSearchResult';

import { theme } from '@/styles';
import { css } from '@emotion/react';

const { colors, typography } = theme;

interface BookSearchResultsProps {
  isSelectedBook: boolean;
  bookList: BookFromApi[];
  searchQuery: string;
  handleSelectBook: (book: BookFromApi) => void;
  isLoading: boolean;
}
const BookSearchResults = ({
  isSelectedBook,
  bookList,
  searchQuery,
  handleSelectBook,
  isLoading,
}: BookSearchResultsProps) => {
  if (isLoading) {
    return <p css={SearchTextStyle}>검색 중...</p>;
  }

  if (bookList.length === 0) {
    if (!searchQuery.trim()) {
      return null;
    }
    return (
      <p css={SearchTextStyle}>
        검색 결과가 없습니다.
        <br /> 다른 키워드로 검색해보세요.
      </p>
    );
  }

  return (
    <BookSearchResult
      isSelectedBook={isSelectedBook}
      onSelectBook={handleSelectBook}
      books={bookList}
      searchQuery={searchQuery}
    />
  );
};

const SearchTextStyle = css`
  ${typography.content.sm}
  color: ${colors.gray[600]};
  text-align: center;
  margin-top: 16px;
`;

export default BookSearchResults;

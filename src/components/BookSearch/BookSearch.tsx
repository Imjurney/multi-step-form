import { css } from '@emotion/react';
import RHInput from '../RHInput/RHInput';
import BookSearchResults from '../BookSearchResults/BookSearchResults';
import { BookFromApi } from '../../types/domain/bookSchema';

interface BookSearchProps {
  isSelectedBook: boolean;
  handleSearch: (query: string) => void;
  bookList: BookFromApi[];
  handleSelectBook: (book: BookFromApi) => void;
  isLoading: boolean;
  searchQuery: string;
}

const BookSearch = ({
  isSelectedBook,
  handleSearch,
  bookList,
  handleSelectBook,
  isLoading,
  searchQuery,
}: BookSearchProps) => {
  return (
    <div css={isSelectedBook ? BookBasicInfoLayout : null}>
      <div css={isSelectedBook ? HiddenLayout : BookBasicInfoSearchLayout}>
        <RHInput
          onChange={e => handleSearch(e.target.value)}
          width={'100%'}
          type='search'
          label='도서명'
          placeholder='도서명을 검색'
          name={'search'}
          required={!isSelectedBook}
        />
      </div>

      <BookSearchResults
        isSelectedBook={isSelectedBook}
        bookList={bookList}
        searchQuery={searchQuery}
        handleSelectBook={handleSelectBook}
        isLoading={isLoading}
      />
    </div>
  );
};

const BookBasicInfoSearchLayout = css`
  position: relative;
  height: fit-content;
  display: flex;
  align-items: center;
  width: 100%;
`;
const HiddenLayout = css`
  display: none;
`;

const BookBasicInfoLayout = css`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

export default BookSearch;

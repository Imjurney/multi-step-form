import { FormProvider, useForm } from 'react-hook-form';
import { Layout } from '../../components/Layout/Layout';
import RHInput from '../../components/RHInput/RHInput';
import { css } from '@emotion/react';
import Image from 'next/image';
import Button from '../../components/Button/Button';
import { IoSearchOutline } from 'react-icons/io5';

// import { useCallback, useEffect, useState } from 'react';
// import useBookSearch from '../../hooks/useBookSearch';
import { BookFromApi } from '../../types/domain/bookSchema';

export default function Register() {
  const methods = useForm();
  const { handleSubmit, watch } = methods;
  //   const searchTitle = watch('title');
  //   // 검색 버튼 클릭 시 실제 검색어로 쿼리키를 갱신
  //   const [searchQuery, setSearchQuery] = useState<string>('');
  //   const { data, refetch } = useBookSearch({
  //     query: searchQuery,
  //     enabled: !!searchQuery,
  //   });

  //   const { books } = { ...data };

  //   const handleSearch = useCallback(() => {
  //     if (searchTitle && searchTitle.length > 0) {
  //       setSearchQuery(searchTitle); // 쿼리키 갱신
  //       // refetch는 searchQuery가 바뀐 후 실행되어야 하므로 useEffect에서 처리
  //     }
  //   }, [searchTitle]);

  return (
    <FormProvider {...methods}>
      <Layout title='도서 등록' subtitle='새로운 도서를 등록해보세요.'>
        <div>
          <form onSubmit={handleSubmit(data => console.log(data))}>
            <div css={BookBasicInfoLayout}>
              <Image
                src='/images/book-cover-placeholder.png'
                alt='도서 표지 이미지'
                width={150}
                height={180}
              />
              <div>
                <div css={BookBasicInfoSearchLayout}>
                  <RHInput
                    width={'100%'}
                    type='search'
                    label='도서명'
                    placeholder='도서명을 검색'
                    required
                    name={'title'}
                  />

                  <Button
                    onClick={handleSearch}
                    addcss={ButtonPosition}
                    type='button'
                    variant='primary'
                    size='sm'
                    iconPosition='left'
                    icon={<IoSearchOutline />}
                  >
                    검색
                  </Button>
                </div>
                <ul>
                  {books?.map((book: BookFromApi) => (
                    <li key={book.isbn}>
                      <div>
                        <Image
                          src={book.cover}
                          alt={`${book.title} 표지`}
                          width={50}
                          height={70}
                        />
                        <span>{book.title}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </FormProvider>
  );
}

const ButtonPosition = css`
  position: absolute;
  right: 12px;
  top: 32px;
`;

const BookBasicInfoLayout = css`
  display: grid;
  grid-template-columns: auto 1fr;

  background-color: #f9f9f9;
  gap: 16px;
`;

const BookBasicInfoSearchLayout = css`
  position: relative;
  height: fit-content;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: red;
`;

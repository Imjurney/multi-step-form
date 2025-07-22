// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from 'react';
// import ky from 'ky';
// import styled from '@emotion/styled';
// import { FormProvider, useForm } from 'react-hook-form';
// import RHInput from '@/components/RHInput/RHInput';
// import { BookStatus } from '../../types/common/book-status';
// import Card from '@/components/Card/Card';
// import { BookLayout } from '../Layout/Layout';
// import { Button } from '../Button/Button';
// import { theme } from '@/styles';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';

// const schema = z.object({
//   username: z.string().min(1, '필수 입력').max(20, '최대 20자'),
// });

// const { colors } = theme;
// const Container = styled.div`
//   max-width: 840px;
//   height: 70svh;
//   padding: 1rem;
//   border-radius: 16px;
//   margin: 0 auto;
//   background: ${colors.gray[50]};
//   overflow-x: scroll;
// `;

// const Section = styled.div`
//   margin-bottom: 2rem;
//   width: 100%;
//   border: 1px solid ${colors.gray[200]};
//   border-radius: 8px;
//   background: ${colors.surface};
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem;
//   border: 1px solid ${colors.gray[300]};
//   border-radius: 6px;
//   margin-bottom: 1rem;
//   font-family: inherit;

//   &:focus {
//     outline: none;
//     border-color: ${colors.primary};
//     box-shadow: 0 0 0 3px ${colors.brand[100]};
//   }
// `;

// const MyForm = () => {
//   const methods = useForm({ resolver: zodResolver(schema), mode: 'onChange' });

//   return (
//     <FormProvider {...methods}>
//       <form>
//         <RHInput
//           placeholder='사용자 이름을 입력하세요'
//           type='text'
//           name='username'
//           rules={{
//             required: '필수 입력',
//             maxLength: {
//               value: 20,
//               message: '최대 20자까지 입력 가능합니다.',
//             },
//           }}
//         />
//         <button type='submit'>제출</button>
//       </form>
//       {/* <DevTool control={methods.control} /> */}
//     </FormProvider>
//   );
// };
// export const APITestComponent = () => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [_response, setResponse] = useState<any | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [searchQuery, setSearchQuery] = useState('');

//   const handleAPICall = async (
//     url: string,
//     method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
//     payload?: Record<string, unknown>
//   ) => {
//     setLoading(true);
//     setResponse(null);

//     try {
//       const options: Record<string, unknown> = {
//         timeout: 10000, // 10초 타임아웃
//       };

//       if (payload && method !== 'GET') {
//         options.json = payload;
//       }

//       const result = await ky(url, {
//         method,
//         ...options,
//       }).json();

//       setResponse({
//         status: 200,
//         data: result,
//       });
//     } catch (error: unknown) {
//       console.error('API Error:', error);

//       const errorMessage =
//         error instanceof Error
//           ? error.message
//           : '알 수 없는 오류가 발생했습니다.';
//       const errorStatus =
//         (error as { response?: { status?: number } })?.response?.status || 500;

//       setResponse({
//         status: errorStatus,
//         data: null,
//         error: errorMessage,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const testAladinAPI = () => {
//     const handleBookSearch = () => {
//       if (!searchQuery.trim()) {
//         alert('검색어를 입력해주세요.');
//         return;
//       }

//       // 알라딘 Open API 호출 (CORS 우회를 위해 로컬 API 라우트 사용)
//       const searchParams = new URLSearchParams({
//         query: searchQuery,
//         queryType: 'Keyword', // Keyword, ISBN, Author, Publisher
//         maxResults: '20',
//         start: '1',
//         sort: 'Accuracy',
//         cover: "Small'", // Small, Medium, Big
//       });

//       handleAPICall(`/api/aladin/search?${searchParams.toString()}`);
//     };

//     return (
//       <Section>
//         <Input
//           type='text'
//           placeholder='검색할 책 제목이나 저자명을 입력하세요 (예: 해리포터, 김영하)'
//           value={searchQuery}
//           onChange={e => setSearchQuery(e.target.value)}
//         />

//         <Button
//           variant='primary'
//           size='md'
//           onClick={handleBookSearch}
//           disabled={loading || !searchQuery.trim()}
//         >
//           📖 도서 검색
//         </Button>
//       </Section>
//     );
//   };

//   return (
//     <Container>
//       <MyForm />
//       <BookLayout>
//         <Card
//           book={{
//             isbn: '9788936433862',
//             title: '해리포터와 마법사의 돌',
//             cover: 'https://image.aladin.co.kr/product/8936433862_01.jpg',
//             author: 'J.K. 롤링',
//             publisher: '문학수첩',
//             status: BookStatus.WANT_TO_READ,
//           }}
//           onEnterForm={() => {}}
//           onDelete={() => {}}
//         />
//         <Card
//           book={{
//             isbn: '9788936433862',
//             title: '해리포터와 마법사의 돌',
//             cover: 'https://image.aladin.co.kr/product/8936433862_01.jpg',
//             author: 'J.K. 롤링',
//             publisher: '문학수첩',
//             status: BookStatus.WANT_TO_READ,
//           }}
//           onEnterForm={() => {}}
//           onDelete={() => {}}
//         />
//         <Card
//           book={{
//             isbn: '9788936433862',
//             title: '해리포터와 마법사의 돌',
//             cover: 'https://image.aladin.co.kr/product/8936433862_01.jpg',
//             author: 'J.K. 롤링',
//             publisher: '문학수첩',
//             status: BookStatus.WANT_TO_READ,
//           }}
//           onEnterForm={() => {}}
//           onDelete={() => {}}
//         />
//         <Card
//           book={{
//             isbn: '9788936433862',
//             title: '해리포터와 마법사의 돌',
//             cover: 'https://image.aladin.co.kr/product/8936433862_01.jpg',
//             author: 'J.K. 롤링',
//             publisher: '문학수첩',
//             status: BookStatus.WANT_TO_READ,
//           }}
//           onEnterForm={() => {}}
//           onDelete={() => {}}
//         />
//       </BookLayout>
//     </Container>
//   );
// };

export {};

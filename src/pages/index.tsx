import Head from 'next/head';
import { Layout } from '@/components/Layout/Layout';
import Button from '../components/Button/Button';
import { css } from '@emotion/react';

const RegisterSection = css`
  display: flex;
  justify-content: flex-end;
`;
export default function Home() {
  return (
    <>
      <Head>
        <title>도서 등록 폼</title>
        <meta name='description' content='multi-step-form' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout title='독서 목록' subtitle='나의 독서들을 기록해보세요.'>
        <div css={RegisterSection}>
          <Button
            type='button'
            variant='primary'
            size='sm'
            iconPosition='left'
            icon={<>📚</>}
          >
            도서 등록
          </Button>
        </div>
      </Layout>
    </>
  );
}

import Head from 'next/head';
import { Layout } from '@/components/Layout/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>도서 등록 폼</title>
        <meta name='description' content='다단계 도서 등록 폼' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout title='독서 목록' subtitle='나의 독서들을 기록해보세요.'>
        xptm
      </Layout>
    </>
  );
}

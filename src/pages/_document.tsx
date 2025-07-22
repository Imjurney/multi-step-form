import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {/* 폰트 프리로드 */}
        <link
          rel='preload'
          href='https://static.toss.im/tps/main.css'
          as='style'
        />
        <link
          rel='preload'
          href='https://static.toss.im/tps/others.css'
          as='style'
        />

        {/* 폰트 로드 */}
        <link rel='stylesheet' href='https://static.toss.im/tps/main.css' />
        <link rel='stylesheet' href='https://static.toss.im/tps/others.css' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

//https://velog.io/@yonghk423/Next.js-getServerSideProps-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%A0%81%EC%9A%A9
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { css } from '@emotion/react';
import { BookInfoValidate, BookInfoType } from '@/types/validate';
import { BookStatus } from '@/types/common/bookStatus';
import { Layout } from '@/components/Layout/Layout';
import Button from '@/components/Button/Button';
import dynamic from 'next/dynamic';
import Step01 from '@/components/step/step01';
import { useRouter } from 'next/router';
import Step02 from '@/components/step/step02';
import SwitchCases from '@/components/common/SwitchCases';

const DevT: React.ElementType = dynamic(
  () => import('@hookform/devtools').then(module => module.DevTool),
  { ssr: false }
);

export default function Register() {
  const router = useRouter();
  const step = Number(router.query.step ?? 1);

  const goToStep = (nextStep: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, step: nextStep },
      },
      undefined,
      { shallow: true }
    );
  };
  const methods = useForm<BookInfoType>({
    resolver: zodResolver(BookInfoValidate),
    defaultValues: {
      isbn: '',
      title: '',
      author: '',
      publisher: '',
      pubDate: '',
      startDate: '',
      endDate: '',
      status: BookStatus.WANT_TO_READ,
      recommendation: 'Y', // '추천해요'가 기본 선택됨
    },
  });

  const {
    handleSubmit,
    watch,
    trigger,
    formState: { isValid },
  } = methods;

  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const isbn = methods.watch('isbn');
  const isSelectedBook = !!isbn;

  useEffect(() => {
    if (startDate && endDate) {
      trigger(['startDate', 'endDate']);
    }
    trigger(['status']);
    trigger(['rating', 'feedback']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  return (
    <FormProvider {...methods}>
      <Layout title='도서 등록' subtitle='새로운 도서를 등록해보세요.'>
        <div>
          <form
            css={FormLayout}
            onSubmit={handleSubmit(data => console.log(data))}
          >
            {/*1. 도서 검색 및 기본 선택 영역 */}

            <SwitchCases
              value={step}
              cases={{
                1: <Step01 />,
                2: <Step02 />,
              }}
            />

            <Button
              disabled={!isSelectedBook || !isValid}
              type='button'
              onClick={() => goToStep(step + 1)}
              variant='primary'
              size='lg'
            >
              다음 단계로
            </Button>
          </form>
          <DevT control={methods.control} />
        </div>
      </Layout>
    </FormProvider>
  );
}

const FormLayout = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

//https://velog.io/@yonghk423/Next.js-getServerSideProps-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%A0%81%EC%9A%A9

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { css } from '@emotion/react';
import { BookInfoValidate, BookInfoType } from '@/types/validate';

import { Layout } from '@/components/Layout/Layout';
import Button from '@/components/Button/Button';
import dynamic from 'next/dynamic';
import Step01 from '@/components/step/step01';
import { useRouter } from 'next/router';
import Step02 from '@/components/step/step02';
import SwitchCases from '@/components/common/SwitchCases';
import Step03 from '../../components/step/step03';
import Step04 from '../../components/step/step04';
import Step05 from '@/components/step/step05';
import { useAtom } from 'jotai';
import formAtom from '../../atom/form';
import debounce from 'lodash/debounce';
import { useEffect } from 'react';
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
  const [formState, setFormState] = useAtom(formAtom);
  const methods = useForm<BookInfoType>({
    resolver: zodResolver(BookInfoValidate),
    defaultValues: formState,
    mode: 'all',
  });

  const debouncedSetFormState = debounce((values: BookInfoType) => {
    console.log('Form values changed:', values);
    setFormState(values);
  }, 1000);

  useEffect(() => {
    methods.reset(formState);
  }, [formState, methods]);

  useEffect(() => {
    const subscription = watch(values => {
      debouncedSetFormState(values as BookInfoType);
    });
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods, setFormState]);

  const { handleSubmit, watch } = methods;

  const isStepValid = () => {
    if (step === 1) {
      // 도서 선택 + 독서 상태
      return !!watch('isbn') && !!watch('status');
    }
    if (step === 2) {
      // 별점
      return !!watch('rating');
    }
    if (step === 3) {
      // 별점 + 피드백
      const rating = watch('rating');
      const feedback = watch('feedback');

      if ((rating && rating <= 1) || rating === 5) {
        return !!feedback && feedback.trim().length >= 100;
      }
      return true;
    }
    // 4, 5단계 등은 필요에 따라 추가
    return true;
  };
  const isbn = methods.watch('isbn');
  const isSelectedBook = !!isbn;

  return (
    <FormProvider {...methods}>
      <Layout title='도서 등록' subtitle='새로운 도서를 등록해보세요.'>
        <div>
          <form
            css={FormLayout}
            onSubmit={handleSubmit(data => console.log(data))}
          >
            <SwitchCases
              value={step}
              cases={{
                1: <Step01 />,
                2: <Step02 />,
                3: <Step03 />,
                4: <Step04 />,
                5: <Step05 />,
              }}
            />

            <Button
              disabled={!isStepValid() || !isSelectedBook}
              type='button'
              onClick={() => goToStep(step + 1)}
              variant='primary'
              size='lg'
            >
              다음 단계로
            </Button>
            <DevT control={methods.control} />
          </form>
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

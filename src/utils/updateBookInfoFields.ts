import { BookFromApi } from '@/types/domain/bookSchema';
import { UseFormReturn } from 'react-hook-form';
import { BookInfoType } from '@/types/validate';
/**
 * bookInfo 관련 필드를 일괄적으로 업데이트하는 함수
 * @param methods useForm return 객체
 * @param values BookFromApi | null (null이면 리셋)
 */
const updateBookInfoFields = (
  methods: UseFormReturn<BookInfoType>,
  values: BookFromApi | null
) => {
  const fields = ['isbn', 'title', 'author', 'cover'] as const;
  fields.forEach(field => {
    methods.setValue(`${field}`, values ? values[field] : '', {
      shouldValidate: true,
      shouldDirty: true,
    });
  });
  methods.setValue('search', '', {
    shouldValidate: true,
    shouldDirty: true,
  });
};

export default updateBookInfoFields;

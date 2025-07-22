// hooks/useBookSearch.ts
import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import type { ClientQueryCommon } from '@/types/api/bookApi';
import { BookSearchResponseSchema } from '@/types/domain/bookSchema';

// 알라딘 API 응답 타입 예시 (실제 구조에 맞게 수정)

const useBookSearch = ({ query, enabled }: ClientQueryCommon) => {
  return useQuery({
    queryKey: ['aladinSearch', query],
    queryFn: async () => {
      const params = new URLSearchParams({
        query: query,
        queryType: 'Keyword',
        maxResults: '20',
        start: '1',
        sort: 'Accuracy',
        cover: 'Small',
      });
      const raw = await ky
        .get(`/api/aladin/search?${params.toString()}`)
        .json();
      const parsed = BookSearchResponseSchema.safeParse(raw);
      if (!parsed.success) {
        throw new Error('Invalid API response');
      }
      return parsed.data;
    },
    enabled,
    retry: 1,
  });
};

export default useBookSearch;

// hooks/useBookSearch.ts
import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import type { ClientQueryCommon } from '@/types/api/bookApi';
import { BookSearchResponseSchema } from '@/types/domain/bookSchema';

const useBookSearch = ({ query, enabled }: ClientQueryCommon) => {
  return useQuery({
    queryKey: ['aladinSearch', query],
    queryFn: async ({ queryKey }) => {
      const [, searchQuery] = queryKey;

      if (
        !searchQuery ||
        typeof searchQuery !== 'string' ||
        !searchQuery.trim()
      ) {
        throw new Error('검색어가 유효하지 않습니다.');
      }

      const params = new URLSearchParams({
        query: searchQuery.trim(),
        queryType: 'Keyword',
        maxResults: '20',
        start: '1',
        sort: 'Accuracy',
        cover: 'Medium',
      });

      const raw = await ky
        .get(`/api/aladin/search?${params.toString()}`)
        .json();
      const parsed = BookSearchResponseSchema.safeParse(raw);
      if (!parsed.success) {
        console.error('API 응답 파싱 실패:', parsed.error);
        throw new Error(
          `API 응답 형식이 올바르지 않습니다: ${parsed.error.message}`
        );
      }
      return parsed.data;
    },
    enabled: enabled && Boolean(query?.trim()),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};

export default useBookSearch;

import type { NextApiRequest, NextApiResponse } from 'next';

interface AladinSearchParams {
  query?: string;
  queryType?: 'Title' | 'Author' | 'Keyword';
  maxResults?: string;
  start?: string;
  sort?: string;
  cover?: string;
}

interface AladinBook {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  description: string;
  cover: string;
  categoryName: string;
  customerReviewRank: number;
  priceStandard: number;
  priceSales: number;
  link: string;
  salesPoint: number;
  adult: boolean;
  fixedPrice: boolean;
  seriesInfo: unknown;
  subInfo: unknown;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    query,
    queryType = 'Keyword',
    maxResults = '20',
    start = '1',
    sort = 'Accuracy',
    cover = "Small'", // Small, Medium, Big
  } = req.query as AladinSearchParams;

  if (!query) {
    return res.status(400).json({ error: '검색어가 필요합니다.' });
  }

  try {
    // 알라딘 API 파라미터 구성
    const params = new URLSearchParams({
      ttbkey: process.env.NEXT_ALADIN_API_KEY!, // 테스트용 TTB 키 (실제로는 환경변수 사용)
      Query: query,
      QueryType: queryType,
      MaxResults: maxResults,
      Start: start,
      SearchTarget: 'Book',
      Output: 'JS', // JSON 형식
      Version: '20131101',
      Cover: cover,
      Sort: sort,
    });

    const aladinUrl = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?${params.toString()}`;

    const response = await fetch(aladinUrl);

    if (!response.ok) {
      throw new Error(`알라딘 API 오류: ${response.status}`);
    }

    const data = await response.json();

    // 응답 데이터 정리
    const books =
      data.item?.map((book: AladinBook) => ({
        isbn: book.isbn,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        pubDate: book.pubDate,
        description: book.description,
        cover: book.cover,
        categoryName: book.categoryName,
        customerReviewRank: book.customerReviewRank,
        priceStandard: book.priceStandard,
        priceSales: book.priceSales,
        link: book.link,
        salesPoint: book.salesPoint,
        adult: book.adult,
        fixedPrice: book.fixedPrice,
      })) || [];

    return res.status(200).json({
      totalResults: data.totalResults || 0,
      startIndex: data.startIndex || 1,
      itemsPerPage: data.itemsPerPage || 0,
      query: data.query || query,
      books,
    });
  } catch (error) {
    console.error('알라딘 API 호출 오류:', error);

    return res.status(500).json({
      error: '도서 검색 중 오류가 발생했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류',
    });
  }
}

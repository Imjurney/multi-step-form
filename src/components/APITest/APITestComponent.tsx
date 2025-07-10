import { useState } from 'react';
import ky from 'ky';
import styled from '@emotion/styled';
import { mediaQueries } from '../../styles';
import Label from '../Label/Label';
import { BookStatus } from '../../types/common/book-status';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.gray[100]};
`;

const ArticleContainer = styled.article`
  display: grid;

  ${mediaQueries.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  gap: 1rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500;

  &:hover {
    background: ${({ theme }) => theme.colors.brand[600]};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.gray[400]};
    cursor: not-allowed;
  }
`;

const ResponseBox = styled.div``;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 6px;
  margin-bottom: 1rem;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.brand[100]};
  }
`;

export const APITestComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const handleAPICall = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    payload?: Record<string, unknown>
  ) => {
    setLoading(true);
    setResponse(null);

    try {
      const options: Record<string, unknown> = {
        timeout: 10000, // 10초 타임아웃
      };

      if (payload && method !== 'GET') {
        options.json = payload;
      }

      const result = await ky(url, {
        method,
        ...options,
      }).json();

      setResponse({
        status: 200,
        data: result,
      });
    } catch (error: unknown) {
      console.error('API Error:', error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.';
      const errorStatus =
        (error as { response?: { status?: number } })?.response?.status || 500;

      setResponse({
        status: errorStatus,
        data: null,
        error: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const testAladinAPI = () => {
    const handleBookSearch = () => {
      if (!searchQuery.trim()) {
        alert('검색어를 입력해주세요.');
        return;
      }

      // 알라딘 Open API 호출 (CORS 우회를 위해 로컬 API 라우트 사용)
      const searchParams = new URLSearchParams({
        query: searchQuery,
        queryType: 'Keyword', // Keyword, ISBN, Author, Publisher
        maxResults: '20',
        start: '1',
        sort: 'Accuracy',
        cover: "Small'", // Small, Medium, Big
      });

      handleAPICall(`/api/aladin/search?${searchParams.toString()}`);
    };

    return (
      <Section>
        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
            }}
          >
            검색 유형:
          </label>
        </div>

        <Input
          type='text'
          placeholder='검색할 책 제목이나 저자명을 입력하세요 (예: 해리포터, 김영하)'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <Button
          onClick={handleBookSearch}
          disabled={loading || !searchQuery.trim()}
        >
          📖 도서 검색
        </Button>

        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          <strong>검색 예시:</strong>
          <div style={{ marginTop: '0.5rem' }}>
            • 제목 검색: &quot;해리포터&quot;, &quot;어린왕자&quot;,
            &quot;1984&quot;
            <br />
            • 저자 검색: &quot;김영하&quot;, &quot;무라카미 하루키&quot;,
            &quot;조지 오웰&quot;
            <br />• 통합 검색: &quot;해리포터 롤링&quot;, &quot;어린왕자
            생텍쥐페리&quot;
          </div>
        </div>
      </Section>
    );
  };

  return (
    <Container>
      {testAladinAPI()}

      {/* 로딩 상태 */}
      {loading && (
        <Section>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div
              style={{
                display: 'inline-block',
                width: '32px',
                height: '32px',
                border: '3px solid #f3f3f3',
                borderTop: '3px solid #0064FF',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
            <p style={{ marginTop: '1rem' }}>API 호출 중...</p>
          </div>
        </Section>
      )}
      <ArticleContainer>
        <Label status={BookStatus.WANT_TO_READ} />
        <Label status={BookStatus.READING} />
        <Label status={BookStatus.COMPLETED} />
        <Label status={BookStatus.PAUSED} />
      </ArticleContainer>
      {/* 응답 결과 */}
      {response && (
        <Section>
          <h3>📋 응답 결과</h3>
          <div style={{ marginBottom: '1rem' }}>
            <strong>상태 코드:</strong>
            <span
              style={{
                color:
                  response.status >= 200 && response.status < 300
                    ? '#10B981'
                    : '#EF4444',
                marginLeft: '0.5rem',
                fontWeight: 'bold',
              }}
            >
              {response.status}
            </span>
          </div>

          {response.error && (
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#EF4444' }}>에러:</strong>
              <span style={{ marginLeft: '0.5rem', color: '#EF4444' }}>
                {response.error}
              </span>
            </div>
          )}

          <strong>응답 데이터:</strong>
          <ResponseBox></ResponseBox>
        </Section>
      )}

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Container>
  );
};

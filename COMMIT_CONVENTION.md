# 커밋 메시지 가이드

## 📝 Conventional Commits 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 🏷️ Type (필수)

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 업데이트
- `style`: 코드 스타일 변경 (포맷팅, 세미콜론 등)
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드 도구, 패키지 매니저 설정 등
- `perf`: 성능 개선
- `ci`: CI 설정 변경
- `build`: 빌드 시스템 변경
- `revert`: 이전 커밋 되돌리기

### 🎯 Scope (선택사항)

- `auth`: 인증 관련
- `ui`: UI 컴포넌트 관련
- `api`: API 관련
- `config`: 설정 관련

### 📋 Subject (필수)

- 50자 이하
- 명령형 현재 시제 사용
- 첫 글자 소문자
- 마침표 없음

## ✅ 올바른 예시

```
feat(auth): 로그인 기능 추가
fix(ui): 버튼 클릭 시 색상 변경 버그 수정
docs: README 설치 가이드 업데이트
style: 코드 포맷팅 적용
refactor(api): 사용자 데이터 fetching 로직 개선
test: 로그인 컴포넌트 단위 테스트 추가
chore: webpack 설정 업데이트
```

## ❌ 잘못된 예시

```
로그인 기능 추가          # type 없음
feat: Login feature      # 영어 사용
feat(auth): 로그인 기능 추가.  # 마침표 사용
FEAT: 로그인 기능 추가     # 대문자 사용
```

## 🔧 로컬 테스트

```bash
# 커밋 메시지 검증 테스트
echo "feat: 테스트 메시지" | npx commitlint

# 성공시: 아무 출력 없음
# 실패시: 오류 메시지 출력
```

# 위버 프론트엔드 과제

자세한 과제 진행 과정은 노션
페이지인 [위버 프론트엔드 과제](https://heejiney.notion.site/WEEBUR-20293c314ccb8074a541f0a44acf8038)에서 확인 가능합니다.
<br />

## 기술스택

- **프론트엔드**: Next.js 14, React, TypeScript
- **스타일링**: Tailwind CSS, shadcn/ui
- **상태 관리**: React Query
- **폼 관리**: React Hook Form, Zod
- **코드 품질**: ESLint, Prettier, TypeScript
- **버전 관리**: Git

## 프로젝트 실행 방법

### 사전 준비

- 환경변수 설정  
  루트 디렉토리에 `.env.local` 파일을 생성하고 아래와 같이 설정합니다.

    ```env
  NEXT_PUBLIC_API_URL=https://dummyjson.com
  NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```

### 설치 환경

- Node.js 20 이상
- npm 또는 yarn 또는 pnpm

### 패키지 설치

```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

- 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

## 프로젝트 폴더 구조 안내

이 프로젝트는 **Next.js 14 (App Router)** 기반이며, 도메인 중심 설계와 관심사 분리를 통해 유지보수성과 확장성을 고려해 구성되어 있습니다.

---

### 디렉토리별 역할 요약

| 경로                                  | 설명                                        |
|-------------------------------------|-------------------------------------------|
| `app/`                              | Next.js App Router 라우트, API, 페이지 진입점      |
| `components/layout/`                | 글로벌 공통 레이아웃 구성 요소 (`Header`, `Footer`)    |
| `components/shared/ui/`             | 도메인 독립적인 공용 UI 컴포넌트 (`ThumbnailWrapper`)  |
| `components/shared/ui/form-fields/` | shadcn + RHF 기반 폼 필드 컴포넌트                 |
| `components/ui/`                    | 외부(shadcn) UI primitive (Button, Input 등) |
| `lib/features/[domain]/api`         | 해당 도메인의 서버 통신 유틸 정의                       |
| `lib/features/[domain]/constants`   | 상수 값, enum 등 정의                           |
| `lib/features/[domain]/hooks`       | react-query 등 도메인 로직 커스텀 훅                |
| `lib/features/[domain]/schemas`     | Zod 기반 폼 및 요청 유효성 검사 스키마                  |
| `lib/features/[domain]/types`       | API 응답, 클라이언트 렌더링용 타입 정의                  |
| `lib/features/[domain]/utils`       | 도메인 관련 계산 및 유틸 함수들                        |
| `lib/shared/hooks/`                 | 도메인과 무관한 공용 훅 (e.g. IntersectionObserver) |
| `lib/shared/utils/`                 | `classNames`, `cn` 등 범용 유틸 함수             |

---

### 네이밍 및 구조 규칙

- `features/[도메인]/`: 도메인 단위로 API, schema, types, hooks, utils를 한 곳에 모아 응집도 높게 구성
- `components/ui`: 외부 라이브러리 기반 UI 별도 관리
- `components/shared`: 도메인에 의존하지 않는 공통 UI 컴포넌트 관리
- `components/layout`: 글로벌 레이아웃 컴포넌트 관리

---

## 개발 설계

- React Hook Form을 사용한 상품 등록 폼 개발
- Zod를 통한 입력값 유효성 검사 및 타입 안정성 확보
- shadcn 기반 공통 UI 컴포넌트를 활용하여 일관된 디자인 체계 유지
- 도메인 중심 구조를 채택하여 `lib/features/[domain]` 단위로 구성
- UI는 역할별로 `layout` / `shared` / `form-fields`로 분리
- 액션 로직을 계산/실행으로 분리해 테스트 가능성과 가독성 확보

---

## 고려했던 문제와 해결

- 폼 유효성 로직과 RHF 연동 <br />
  문제: number 입력 필드의 초기값을 ' '로 두고 싶었으나, Zod에서 number() 타입과 충돌 <br />
  해결: 문자열 기반으로 Zod validation 작성 후 `transform(Number)` 처리 ⇒ 입력은 ' ', 최종 submit은 number
- zod 스키마와 실제 API Request 타입 분리 <br />
  문제: Zod 스키마의 입력값(string)과 API 요청 시 타입(number)이 달라 타입 오류 발생 <br />
  해결: `ProductFormSchema` (입력값 기준) ↔ `ProductRequestSchema` (API 전송 기준) 분리
- Select 컴포넌트에서 enum 타입 사용 <br />
  문제: z.enum에 객체 배열(`{ label, value }`)을 넘길 수 없음 <br />
  해결: as const로 선언된 `string literal array(['Apple', 'Samsung'])`를 유지하면서 `.map()`을 통해 UI 전용 `brandOptions` 객체 배열로 분리

### 확장 고려사항

- `/lib/features/` 구조에 따라 새로운 도메인(users, orders) 추가 용이
- React Hook Form + Zod 추상화를 통한 공통 폼 컴포넌트 확장 (`FormTextarea`, `FormCheckbox` 등)
  <br />
  <br />
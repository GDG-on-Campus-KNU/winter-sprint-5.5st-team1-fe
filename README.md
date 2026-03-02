# GDG Winter Sprint 5.5 - Team1 FE

React 기반 전자상거래 데모 웹 애플리케이션으로
상품 조회부터 주문, 관리자 상품 관리까지 전반적인 커머스 흐름을 구현했습니다


## 🚀 Demo

👉 **[Live Demo 바로가기](https://winter-team1.vercel.app/)**



## 🛠 Tech Stack

| 분류 | 기술 |
|------|------|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite 7 |
| Styling | TailwindCSS v4 |
| UI | shadcn/ui, Radix UI |
| Server State | TanStack Query v5 |
| Client State | Zustand v5 (persist) |
| Form | React Hook Form + Zod |
| Routing | React Router v7 |
| HTTP | Axios |
| Icons | Lucide React |

---

## ✨ Features

### 🛍 상품
- 상품 목록 조회 (카테고리, 정렬, 페이지네이션)
- 상품 상세 페이지
- 수량 선택 및 장바구니 담기

### 🛒 장바구니
- 수량 변경
- 상품 삭제
- 로그인 사용자 전용 기능
- 낙관적 업데이트 적용

### 🧾 주문
- 쿠폰 적용
- 배송지 입력
- 주문 완료 페이지

### 👤 마이페이지
- 주문 내역 조회
- 쿠폰 관리

### 🛠 관리자
- 상품 목록 관리
- 상품 등록 / 수정

---

## 시작하기

### 요구사항

- Node.js 18 이상

### 환경 변수 설정

```bash
# .env
VITE_API_BASE_URL=http://localhost:8080
```

### 설치 및 실행

```bash
npm install
npm run dev
```

개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
npm run build
```

### 코드 품질

```bash
npm run lint        # 린트 검사
npm run lint:fix    # 린트 자동 수정
npm run format      # Prettier 포맷팅
```

---

## 라우팅 구조

| 경로 | 페이지 | 비고 |
|------|--------|------|
| `/` | 상품 목록 | |
| `/products/:id` | 상품 상세 | |
| `/cart` | 장바구니 | 로그인 필요 |
| `/order` | 주문 | |
| `/order/complete/:orderId` | 주문 완료 | |
| `/mypage` | 마이페이지 | |
| `/login` | 로그인 | |
| `/signup` | 회원가입 | |
| `/admin/product` | 관리자 상품 목록 | |
| `/admin/product/new` | 상품 등록 | |
| `/admin/product/:id` | 상품 수정 | |

## 프로젝트 구조

```
src/
├── api/              # API 요청 함수 (product, cart, order)
├── components/
│   ├── admin/        # 관리자 컴포넌트
│   ├── cards/        # 카드 UI (장바구니, 주문, 쿠폰 등)
│   ├── layouts/      # 레이아웃
│   ├── product/      # 상품 상세 컴포넌트
│   └── ui/           # shadcn/ui 기본 컴포넌트
├── hooks/            # 커스텀 훅 (useCart, useProduct)
├── lib/              # axios 인스턴스, 유틸리티
├── pages/            # 페이지 컴포넌트
├── schemas/          # Zod 유효성 검사 스키마
├── stores/           # Zustand 전역 상태 (cart.store)
├── types/            # TypeScript 타입 정의
└── utils/            # 유틸리티 함수
```


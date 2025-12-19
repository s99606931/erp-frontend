# Phase 5 완료보고서: @erp/shared 패키지

> **완료일**: 2025-12-19
> **작성자**: AI Assistant
> **소요시간**: 30분

---

## 📋 작업 요약

### 목표
모든 서비스가 공유하는 비즈니스 로직 및 유틸리티 구축

### ✅ 완료 상태
- [x] @erp/shared 패키지 초기화 (package.json, tsconfig.json)
- [x] API 클라이언트 (src/api/client.ts) - Axios, JWT 인터셉터
- [x] 공통 타입 (src/types/user.ts, tenant.ts)
- [x] 메뉴 구조 (src/constants/menu-structure.ts) - 3 Depth
- [x] 유틸리티 함수 (src/utils/format.ts, validate.ts)

---

## 🏗️ 아키텍처

### @erp/shared 패키지 구조

```
packages/erp-shared/
├── src/
│   ├── api/
│   │   ├── client.ts           # ✅ Axios 인스턴스 (100줄)
│   │   └── index.ts
│   ├── types/
│   │   ├── user.ts             # ✅ User, UserRole (70줄)
│   │   ├── tenant.ts           # ✅ Tenant, TenantTheme (60줄)
│   │   └── index.ts
│   ├── constants/
│   │   ├── menu-structure.ts   # ✅ 메뉴 트리 (150줄)
│   │   └── index.ts
│   ├── utils/
│   │   ├── format.ts           # ✅ 날짜, 통화 포맷 (80줄)
│   │   ├── validate.ts         # ✅ Zod 스키마 (70줄)
│   │   └── index.ts
│   └── index.ts                # ✅ 진입점
├── package.json
└── tsconfig.json
```

### 의존성

```
@erp/shared
├── axios (HTTP 클라이언트)
└── zod (유효성 검사)
```

### 용어 설명

| 용어 | 설명 |
|------|------|
| **Axios** | Promise 기반 HTTP 클라이언트 |
| **Interceptor** | 요청/응답을 가로채서 처리하는 함수 |
| **JWT** | JSON Web Token, 인증 토큰 형식 |
| **Zod** | TypeScript 친화적 유효성 검사 라이브러리 |

---

## 📝 주요 코드

### API 클라이언트

```typescript
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
});

// JWT 자동 첨부
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 401 → 로그인 페이지 리다이렉트
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login?expired=true';
    }
    return Promise.reject(error);
  }
);
```

### 비밀번호 스키마 (2025년 공공기관 보안)

```typescript
export const passwordSchema = z
  .string()
  .min(10, '비밀번호는 10자 이상')
  .regex(/[a-z]/, '소문자 포함')
  .regex(/[A-Z]/, '대문자 포함')
  .regex(/[0-9]/, '숫자 포함')
  .regex(/[!@#$%^&*]/, '특수문자 포함');
```

### 메뉴 구조 (3 Depth)

```typescript
export const MENU_STRUCTURE: MenuItem[] = [
  {
    id: 'hrm',
    label: '인사관리',
    icon: 'Users',
    servicePort: 3010,
    children: [
      {
        id: 'hrm-employee',
        label: '사원관리',
        children: [
          { id: 'hrm-employee-list', label: '사원목록', path: '/hrm/employees' },
          { id: 'hrm-employee-create', label: '사원등록', path: '/hrm/employees/create' },
        ],
      },
    ],
  },
  // ...
];
```

---

## ✅ 검증 결과

| 파일 | 줄 수 | JSDoc | 상태 |
|------|:-----:|:-----:|:----:|
| api/client.ts | 100+ | ✅ | ✅ |
| types/user.ts | 70+ | ✅ | ✅ |
| types/tenant.ts | 60+ | ✅ | ✅ |
| constants/menu-structure.ts | 150+ | ✅ | ✅ |
| utils/format.ts | 80+ | ✅ | ✅ |
| utils/validate.ts | 70+ | ✅ | ✅ |

---

## ➡️ 다음 단계

**Phase 6**: Shell 앱 기본 구조

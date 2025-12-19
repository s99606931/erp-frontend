# Phase 5: @erp/shared 패키지

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)

---

## 📌 목표

모든 서비스가 공유하는 비즈니스 로직 및 유틸리티를 구축합니다.

**완료 조건**: `import { apiClient } from '@erp/shared'` 사용 가능

---

## ✅ 작업 목록

### 5.1 API 클라이언트 (`src/api/client.ts`)

```typescript
/**
 * Axios 기반 API 클라이언트
 * - baseURL: 환경 변수에서 읽기
 * - timeout: 30초
 * - 응답 인터셉터: 에러 처리
 */
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
});
```

### 5.2 JWT 인터셉터 (`src/api/interceptors.ts`)

```typescript
/**
 * 요청 시 JWT 토큰 자동 첨부
 * 401 응답 시 토큰 갱신 시도
 */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 5.3 공통 타입 (`src/types/`)

```typescript
// user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER' | 'MANAGER';
  tenantId: string;
}

// tenant.ts
export interface Tenant {
  id: string;
  name: string;
  domain: string;
  theme: TenantTheme;
}
```

### 5.4 메뉴 구조 (`src/constants/menu-structure.ts`)

```typescript
export const MENU_STRUCTURE: MenuItem[] = [
  {
    id: 'hrm',
    label: '인사관리',
    icon: 'Users',
    children: [
      { id: 'hrm-employee', label: '사원관리', path: '/hrm/employees' },
      { id: 'hrm-card', label: '인사카드', path: '/hrm/cards' },
    ],
  },
  // ... 나머지 메뉴
];
```

### 5.5 유틸리티 함수 (`src/utils/`)

```typescript
// format.ts
export function formatDate(date: Date): string { ... }
export function formatCurrency(amount: number): string { ... }

// validate.ts
export const emailSchema = z.string().email();
export const passwordSchema = z.string().min(10)...
```

---

## 📊 완료 체크리스트

- [ ] API 클라이언트 구현
- [ ] JWT 인터셉터 구현
- [ ] 공통 타입 정의
- [ ] 메뉴 구조 정의
- [ ] 유틸리티 함수 작성
- [ ] 모든 파일 **JSDoc 주석**

---

## ➡️ 다음 단계

[Phase 6: Shell 앱 기본](./task_phase_06_shell_basic.md)

# Phase 5 완료보고서: @erp/shared 패키지 설정

> **완료일**: 2025-12-20
> **작성자**: AI Assistant (20년차 UI/UX 디자이너 & 풀스택 개발자)
> **프로젝트**: 공공기관 ERP SaaS (Micro Frontend)

---

## 🎯 목표

모든 마이크로서비스가 공유하는 비즈니스 로직, 타입 정의, 유틸리티 함수를 중앙화하여 **코드 중복을 제거**하고 **일관성**을 확보합니다.

---

## ✅ 완료 항목

### 5.1 패키지 기본 설정

| 파일 | 경로 | 설명 |
|------|------|------|
| package.json | `packages/shared/package.json` | 의존성 관리 (`axios`, `zod`, `date-fns`) |
| tsconfig.json | `packages/shared/tsconfig.json` | TypeScript 컴파일 설정 |
| index.ts | `src/index.ts` | 패키지 진입점 (모듈 Export) |

### 5.2 API 모듈

| 모듈 | 경로 | 내용 |
|------|------|------|
| ApiClient | `src/api/client.ts` | Axios 인스턴스 (BaseURL, Timeout 30s) |
| Interceptor | `src/api/client.ts` | JWT 토큰 자동 주입 및 401 에러 처리 |

### 5.3 타입 정의 (Type Definitions)

| 타입 | 경로 | 내용 |
|------|------|------|
| Common | `src/types/common.ts` | `ApiResponse`, `Pagination` 등 표준 응답 포맷 |
| User | `src/types/user.ts` | 사용자 정보(`User`), 역할(`UserRole`), 상태(`UserStatus`) |
| Tenant | `src/types/tenant.ts` | 테넌트 정보(`Tenant`), 테마(`TenantTheme`) |

### 5.4 유틸리티 및 상수

| 모듈 | 경로 | 내용 |
|------|------|------|
| MenuStructure | `src/constants/menu-structure.ts` | 전체 ERP 메뉴 계층 및 접근 권한 정의 |
| Format | `src/utils/format.ts` | 날짜(`date-fns`), 통화(KRW), 전화번호 포맷팅 |
| Validate | `src/utils/validate.ts` | Zod 스키마 기반 유효성 검사 (로그인, 이메일 등) |

---

## 🏗️ 파일 구조

```
packages/shared/
├── src/
│   ├── api/
│   │   └── client.ts            # Axios 설정 및 인터셉터
│   ├── constants/
│   │   └── menu-structure.ts    # 메뉴 상수
│   ├── types/
│   │   ├── common.ts            # 공통 타입
│   │   ├── tenant.ts            # 테넌트 도메인 타입
│   │   └── user.ts              # 사용자 도메인 타입
│   ├── utils/
│   │   ├── format.ts            # 포맷팅 유틸리티
│   │   └── validate.ts          # 유효성 검사 (Zod)
│   └── index.ts                 # Barrel Export
├── package.json
└── tsconfig.json
```

---

## 🛠️ 기술 스택 및 트렌드 (2025)

### 적용된 기술 전략

1. **Type-Safe Ecosystem**
   - 백엔드와 프론트엔드 간의 타입 불일치 방지
   - `Zod`를 활용한 런타임 타입 검증 및 스키마 추론 (`z.infer`)

2. **Centralized Logic (DRY 원칙)**
   - API 호출 로직을 한 곳에서 관리하여 유지보수성 향상
   - 인증 토큰 처리를 인터셉터로 위임하여 비즈니스 로직과 분리

3. **Domain Driven Design (DDD) 기초**
   - 도메인별(User, Tenant)로 타입을 분리하여 관리
   - 비즈니스 규칙(유효성 검사)을 유틸리티로 캡슐화

---

## � 사용 가이드

### API 호출 예시

```typescript
import { apiClient, ApiResponse, User } from '@erp/shared';

async function fetchUser(id: string) {
  try {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user', error);
  }
}
```

### 유효성 검사 예시

```typescript
import { loginSchema, LoginFormData } from '@erp/shared';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const { register, handleSubmit } = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
});
```

---

## 📋 완료 체크리스트

- [x] `@erp/shared` 패키지 초기화
- [x] `axios` 기반 API 클라이언트 구현
- [x] JWT 토큰 처리용 Interceptor 구현
- [x] 공통 타입 (`User`, `Tenant`, `Pagination`) 정의
- [x] 메뉴 구조 상수 정의
- [x] `zod` 기반 유효성 검사 로직 구현
- [x] 날짜 및 통화 포맷팅 함수 구현
- [x] `tsc --noEmit` 타입 검사 통과

---

## 📚 용어 사전

| 용어 | 설명 |
|------|------|
| **Interceptor** | HTTP 요청/응답을 가로채서 로직을 추가하는 Axios 기능 |
| **Zod** | TypeScript 중심의 스키마 선언 및 검증 라이브러리 |
| **Barrel Export** | `index.ts`에서 여러 모듈을 모아서 내보내는 패턴 |
| **RBAC** | Role-Based Access Control, 역할 기반 접근 제어 |
| **Pagination** | 데이터를 페이지 단위로 나누어 응답하는 방식 |

---

## ➡️ 다음 단계

Phase 5가 완료되었습니다. [Phase 6: Shell 앱 기본 구현](../task_phase_06_shell_basic.md)으로 이동하여, `shared` 패키지를 실제 앱에 연동합니다.

---

## 📎 관련 문서

- [Task 파일](../task_phase_05_shared.md)
- [코딩 가이드라인](../CODING_GUIDELINES.md)

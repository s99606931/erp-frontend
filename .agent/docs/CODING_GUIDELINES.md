# 🛠️ Task 구현 공통 지침 (필독!)

> **문서 목적**: 모든 개발자가 **반드시** 준수해야 할 코딩 규칙
> **대상 독자**: 초급 개발자, 신규 프로젝트 참여자
> **마지막 업데이트**: 2025-12-20

---

## ⚠️ 이 문서를 읽지 않고 코드를 작성하면 PR이 반려됩니다!

> **패키지 매니저**: 반드시 `pnpm` 사용 (npm, yarn 금지!)
> **설치 후 오류 발생 시**: 공식 문서 웹검색 후 오류 수정

---

## 🏗️ 현재 프로젝트 구조 (2025-12-20 기준)

```
erp-frontend/
├── apps/
│   └── shell/                    # Shell 앱 (컨테이너) - Port 3000
│
├── services/                     # 마이크로 프론트엔드 서비스
│   ├── auth/web/                 # 인증 서비스 - Port 3001
│   ├── hrm/web/                  # 인사관리 - Port 3010
│   └── payroll/web/              # 급여관리 - Port 3011
│
├── packages/
│   ├── ui/                       # @erp/ui 디자인 시스템
│   ├── shared/                   # @erp/shared 공통 로직
│   ├── config/                   # @erp/config 공통 설정
│   └── storybook/                # 컴포넌트 카탈로그
│
├── docs/                         # 문서
│   ├── task/                     # Task 파일 및 완료 보고서
│   └── PRD_MAIN_UI.md            # 요구사항 정의서
│
├── docker-compose.yml            # Docker 통합 실행
├── pnpm-workspace.yaml           # 워크스페이스 설정
├── turbo.json                    # Turborepo 파이프라인
├── jest.config.js                # Jest 테스트 설정
└── tsconfig.json                 # TypeScript 설정
```

---

## 📌 핵심 원칙 3가지

### 1️⃣ 마이크로서비스 독립성 (절대 원칙)

> 각 서비스는 **다른 서비스가 중단되어도 독립적으로 실행**되어야 합니다.

```
✅ 허용                          ❌ 금지
─────────────────────────────────────────────────────────
@erp/ui 패키지 import           다른 서비스 직접 import
@erp/shared 패키지 import       ../../payroll-web/lib/utils
API 통신으로 데이터 요청         서비스 간 폴더 공유
독립 Docker 컨테이너             공유 환경 변수 의존
```

**예시**:
```typescript
// ❌ 절대 금지 - 다른 서비스 직접 참조
import { getUserData } from '../../../payroll-web/lib/utils';

// ✅ 올바른 예 - 공통 패키지 사용
import { apiClient } from '@erp/shared';
import { Button } from '@erp/ui';
```

---

### 2️⃣ 상세 주석 작성 (필수)

> 초급 개발자가 **주석만 읽고도 코드를 이해**할 수 있어야 합니다.

#### 파일 헤더 주석 (모든 파일 필수)

```typescript
/**
 * ============================================================================
 * 파일명: login-form.tsx
 * 패키지: @erp/auth-web
 * 경로: services/auth/web/components/login-form.tsx
 * 작성일: 2025-12-20
 * 작성자: 홍길동
 * ============================================================================
 * 
 * [📄 파일 설명]
 * 사용자 로그인 폼 컴포넌트입니다.
 * 이메일/비밀번호 입력, 유효성 검사, 로딩 상태를 관리합니다.
 * 
 * [🎯 주요 기능]
 * 1. 이메일/비밀번호 실시간 유효성 검사 (React Hook Form + Zod)
 * 2. 로딩 상태에서 버튼 비활성화 및 스피너 표시
 * 3. 오류 발생 시 접근성을 고려한 에러 메시지 표시
 * 
 * [📦 사용 예시]
 * ```tsx
 * <LoginForm onSuccess={() => router.push('/dashboard')} />
 * ```
 * 
 * [🔗 의존성]
 * - @erp/ui: Button, Input, Label 컴포넌트
 * - react-hook-form: 폼 상태 관리
 * - zod: 스키마 유효성 검사
 * 
 * [♿ 접근성]
 * - 모든 입력 필드에 label 연결
 * - 오류 메시지는 aria-live="polite"로 스크린리더 알림
 * - Tab 키로 모든 필드 탐색 가능
 * ============================================================================
 */
```

---

### 3️⃣ 접근성 준수 (WCAG 2.1 AA)

> 공공기관 웹사이트는 **법적으로** 웹 접근성 준수가 의무입니다.

| 항목 | 기준 | 검증 방법 |
|------|------|----------|
| 키보드 접근 | 모든 기능 Tab/Enter/Escape | 마우스 없이 테스트 |
| 포커스 표시 | 2px solid primary | `:focus-visible` 스타일 |
| 색상 대비 | **4.5:1 이상** | WebAIM 도구 |
| 스크린리더 | ARIA 라벨 필수 | NVDA/VoiceOver |
| 오류 메시지 | 텍스트 + 아이콘 | 색상만 의존 금지 |

```tsx
// ✅ 접근성 준수 예시
<div className="space-y-2">
  <Label htmlFor="user-email">
    이메일 <span className="text-error">*</span>
    <span className="sr-only">(필수 입력)</span>
  </Label>
  <Input
    id="user-email"
    type="email"
    aria-describedby="email-error email-help"
    aria-invalid={!!errors.email}
    aria-required="true"
  />
  {errors.email && (
    <p id="email-error" className="text-sm text-error" role="alert">
      <AlertCircle className="inline w-4 h-4 mr-1" />
      {errors.email.message}
    </p>
  )}
</div>
```

---

## � 개발 환경 실행 방법

### 로컬 개발

```bash
# 의존성 설치 (최초 1회)
pnpm install

# 전체 개발 서버 실행
pnpm dev

# 특정 앱만 실행
pnpm --filter shell dev           # Shell 앱 (localhost:3000)
pnpm --filter @erp/auth-web dev   # 인증 서비스 (localhost:3001)
pnpm --filter @erp/hrm-web dev    # 인사관리 (localhost:3010)

# 빌드 및 검증
pnpm build                        # 전체 빌드
pnpm typecheck                    # TypeScript 타입 검사
pnpm lint                         # ESLint 검사
pnpm test                         # 테스트 실행

# Storybook 실행
pnpm --filter @erp/storybook dev  # localhost:6006
```

### Docker 배포

```bash
# 전체 서비스 빌드 & 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down
```

---

## 🐳 서비스 포트 맵

| 서비스 | 포트 | 패키지명 | 설명 |
|--------|:----:|----------|------|
| shell | 3000 | @erp/shell | Shell 앱 (컨테이너) |
| auth-web | 3001 | @erp/auth-web | 인증 서비스 |
| hrm-web | 3010 | @erp/hrm-web | 인사관리 |
| payroll-web | 3011 | @erp/payroll-web | 급여관리 |
| storybook | 6006 | @erp/storybook | 컴포넌트 카탈로그 |

---

## 📁 파일 네이밍 규칙

| 유형 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | kebab-case.tsx | `login-form.tsx` |
| 페이지 | page.tsx | `app/login/page.tsx` |
| 레이아웃 | layout.tsx | `app/layout.tsx` |
| 훅 | use-*.ts | `use-auth.ts` |
| 유틸리티 | *.ts | `format-date.ts` |
| 타입 | *.ts 또는 *-types.ts | `user.ts`, `user-types.ts` |
| 테스트 | *.test.tsx | `button.test.tsx` |
| 스토리 | *.stories.tsx | `button.stories.tsx` |

---

## 📦 공통 패키지 사용법

### @erp/ui (디자인 시스템)

```typescript
// 컴포넌트
import { Button, Input, Label, Card, Badge } from '@erp/ui';

// 디자인 토큰
import { colors, typography, layout } from '@erp/ui/tokens';

// 테마 관리
import { applyTenantTheme, tenantThemePresets } from '@erp/ui';

// 유틸리티
import { cn } from '@erp/ui/lib/utils';
```

### @erp/shared (공통 로직)

```typescript
// API 클라이언트
import { apiClient } from '@erp/shared';

// 타입
import { User, Tenant, ApiResponse, Pagination } from '@erp/shared';

// 유효성 검사
import { loginSchema, emailSchema } from '@erp/shared';

// 유틸리티
import { formatDate, formatCurrency, formatPhoneNumber } from '@erp/shared';
```

---

## 🚫 절대 금지 사항

1. **`any` 타입 사용 금지**
   ```typescript
   // ❌ const data: any = fetch();
   // ✅ const data: User = await fetchUser();
   ```

2. **인라인 스타일 금지**
   ```tsx
   // ❌ <div style={{ color: 'red' }}>
   // ✅ <div className="text-error">
   ```

3. **하드코딩된 색상 금지**
   ```tsx
   // ❌ <button style={{ backgroundColor: '#3B82F6' }}>
   // ✅ <button className="bg-primary">
   ```

4. **npm/yarn 사용 금지** - pnpm만 사용!
   ```bash
   # ❌ npm install / yarn add
   # ✅ pnpm add <package>
   ```

5. **console.log 남기지 않기** (개발 완료 후)

6. **영어 변수명에 한글 혼용 금지**
   ```typescript
   // ❌ const 사원목록 = [];
   // ✅ const employeeList = [];
   ```

---

## 🧪 테스트 가이드

### Jest + React Testing Library

```bash
# 전체 테스트 실행
pnpm test

# 특정 패키지 테스트
pnpm --filter @erp/ui test

# 커버리지 리포트
pnpm test --coverage
```

### 테스트 파일 위치

```
packages/ui/src/components/ui/__tests__/
├── button.test.tsx
├── input.test.tsx
└── card.test.tsx
```

---

## ✅ Task 완료 체크리스트

각 Task 완료 전 반드시 확인:

- [ ] 모든 파일에 **파일 헤더 주석** 작성
- [ ] 모든 함수/컴포넌트에 **JSDoc 주석** 작성
- [ ] TypeScript **타입 명시** (any 사용 안 함)
- [ ] **접근성 검증** (Lighthouse 90점 이상)
- [ ] **ESLint/Prettier** 오류 0건 (`pnpm lint`)
- [ ] **TypeScript 오류 없음** (`pnpm typecheck`)
- [ ] **테스트 통과** (`pnpm test`)
- [ ] **빌드 성공** (`pnpm build`)
- [ ] **다른 서비스 의존성 없음** 확인

---

## 📚 전문 용어 사전

| 용어 | 설명 |
|------|------|
| **Micro Frontend** | 프론트엔드를 독립적인 앱으로 분리하는 아키텍처 |
| **Monorepo** | 여러 프로젝트를 하나의 저장소에서 관리 |
| **Shell App** | 모든 서비스를 통합하는 컨테이너 앱 |
| **pnpm workspace** | 패키지 간 의존성을 `workspace:*`로 연결 |
| **Turborepo** | 모노레포용 빌드 시스템 (캐싱, 병렬 빌드) |
| **Docker Container** | 애플리케이션을 격리된 환경에서 실행 |
| **WCAG** | 웹 접근성 국제 표준 가이드라인 |
| **ARIA** | 스크린리더 지원을 위한 HTML 속성 |
| **JWT** | JSON Web Token, 인증 토큰 형식 |
| **2FA** | Two-Factor Authentication, 2단계 인증 |
| **NextAuth** | Next.js용 인증 라이브러리 |
| **Zod** | TypeScript 중심의 스키마 유효성 검사 라이브러리 |

---

## 📞 도움이 필요할 때

1. 이 문서 다시 읽기
2. [PRD_MAIN_UI.md](../PRD_MAIN_UI.md) 참조
3. [DESIGN_SYSTEM_RULES.md](../DESIGN_SYSTEM_RULES.md) 참조
4. [완료 보고서](./reports/README.md) 참조
5. 팀 리더에게 문의

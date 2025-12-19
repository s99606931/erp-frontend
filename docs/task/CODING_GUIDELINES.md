# 🛠️ Task 구현 공통 지침 (필독!)

> **문서 목적**: 모든 개발자가 **반드시** 준수해야 할 코딩 규칙
> **대상 독자**: 초급 개발자, 신규 프로젝트 참여자
> **마지막 업데이트**: 2025-12-19

---

## ⚠️ 이 문서를 읽지 않고 코드를 작성하면 PR이 반려됩니다!

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
 * 작성일: 2025-12-19
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

#### 함수/컴포넌트 주석

```typescript
/**
 * 로그인 폼 컴포넌트
 * 
 * @component
 * @description
 * 공공기관 ERP 시스템의 로그인 폼입니다.
 * 사전 승인된 이메일만 로그인 가능하며, 실시간 유효성 검사를 제공합니다.
 * 
 * @param {LoginFormProps} props - 컴포넌트 속성
 * @param {() => void} props.onSuccess - 로그인 성공 시 호출되는 콜백
 * @param {string} [props.redirectUrl] - 로그인 후 이동할 URL (기본: /dashboard)
 * 
 * @returns {JSX.Element} 로그인 폼 UI
 * 
 * @example
 * // 기본 사용
 * <LoginForm onSuccess={() => console.log('로그인 성공!')} />
 * 
 * @example
 * // 리다이렉트 URL 지정
 * <LoginForm 
 *   onSuccess={handleSuccess} 
 *   redirectUrl="/hrm/employees" 
 * />
 * 
 * @accessibility
 * - WCAG 2.1 AA 준수
 * - 키보드 전용 탐색 지원
 * - 스크린리더 호환
 */
```

#### 복잡한 로직 인라인 주석

```typescript
async function calculateMonthlyPayroll(employeeId: string, month: number) {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1단계: 기본급 조회
  // 사원의 기본급은 employee_salary 테이블에서 가져옵니다.
  // 기본급은 매월 1일 기준으로 계산됩니다.
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const baseSalary = await getBaseSalary(employeeId);
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2단계: 수당 계산
  // - 야근수당: 시간당 기본급의 1.5배 (근로기준법 제56조)
  // - 식대: 근무일수 × 1만원 (비과세 한도 내)
  // - 교통비: 거리 기반 차등 지급 (5km 이하: 0원, 초과: km당 500원)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const allowances = await calculateAllowances(employeeId, month);
  
  return { baseSalary, allowances };
}
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
  <p id="email-help" className="text-sm text-muted-foreground">
    업무용 이메일을 입력하세요
  </p>
  {errors.email && (
    <p id="email-error" className="text-sm text-error" role="alert">
      <AlertCircle className="inline w-4 h-4 mr-1" />
      {errors.email.message}
    </p>
  )}
</div>
```

---

## 🐳 Docker 컨테이너화

### 각 서비스별 Dockerfile 템플릿

```dockerfile
# ============================================================================
# 파일: Dockerfile
# 서비스: hrm-web (인사관리)
# 포트: 3010
# ============================================================================

# 1단계: 의존성 설치
FROM node:20-alpine AS deps
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 2단계: 빌드
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# 3단계: 실행
FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup --system nodejs && adduser --system nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
USER nextjs
EXPOSE 3010
ENV NODE_ENV=production PORT=3010
CMD ["node", "server.js"]
```

---

## 📁 파일 네이밍 규칙

| 유형 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | kebab-case.tsx | `login-form.tsx` |
| 페이지 | page.tsx | `app/login/page.tsx` |
| 훅 | use-*.ts | `use-auth.ts` |
| 유틸리티 | *.ts | `format-date.ts` |
| 타입 | *-types.ts | `user-types.ts` |
| 테스트 | *.test.tsx | `login-form.test.tsx` |

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

4. **console.log 남기지 않기** (개발 완료 후)

5. **영어 변수명에 한글 혼용 금지**
   ```typescript
   // ❌ const 사원목록 = [];
   // ✅ const employeeList = [];
   ```

---

## ✅ Task 완료 체크리스트

각 Task 완료 전 반드시 확인:

- [ ] 모든 파일에 **파일 헤더 주석** 작성
- [ ] 모든 함수/컴포넌트에 **JSDoc 주석** 작성
- [ ] 복잡한 로직에 **인라인 주석** 작성
- [ ] TypeScript **타입 명시** (any 사용 안 함)
- [ ] **접근성 검증** (Lighthouse 90점 이상)
- [ ] **단위 테스트** 작성 및 통과
- [ ] **Docker 이미지** 빌드 성공
- [ ] **ESLint/Prettier** 오류 0건
- [ ] **다른 서비스 의존성 없음** 확인

---

## 📚 전문 용어 사전

| 용어 | 설명 |
|------|------|
| **Micro Frontend** | 프론트엔드를 독립적인 앱으로 분리하는 아키텍처 |
| **Monorepo** | 여러 프로젝트를 하나의 저장소에서 관리 |
| **Shell App** | 모든 서비스를 통합하는 컨테이너 앱 |
| **Docker Container** | 애플리케이션을 격리된 환경에서 실행 |
| **WCAG** | 웹 접근성 국제 표준 가이드라인 |
| **ARIA** | 스크린리더 지원을 위한 HTML 속성 |
| **JWT** | JSON Web Token, 인증 토큰 형식 |
| **2FA** | Two-Factor Authentication, 2단계 인증 |

---

## 📞 도움이 필요할 때

1. 이 문서 다시 읽기
2. [PRD_MAIN_UI.md](../PRD_MAIN_UI.md) 참조
3. [DESIGN_SYSTEM_RULES.md](../DESIGN_SYSTEM_RULES.md) 참조
4. 팀 리더에게 문의

# 공공기관 ERP SaaS 구현 계획

> **문서 버전**: 2.0
> **작성일**: 2025-12-19
> **대상 독자**: 프론트엔드 개발자

---

## 목차

1. [아키텍처](#1-아키텍처)
2. [프로젝트 구조](#2-프로젝트-구조)
3. [구현 단계](#3-구현-단계)
4. [코딩 지침](#4-코딩-지침)
5. [검증 계획](#5-검증-계획)

---

## 1. 아키텍처

### 1.1 시스템 구성도

```mermaid
graph TD
    subgraph "사용자 브라우저"
        Browser[웹 브라우저]
    end
    
    subgraph "Shell App :3000"
        Header[Header]
        Sidebar[Sidebar]
        Main[Service Loader]
        AI[AI Assistant]
        StatusBar[Status Bar]
    end
    
    subgraph "Micro Frontend Services"
        Auth[auth-web :3001]
        Tenant[tenant-web :3002]
        User[user-web :3003]
        HRM[hrm-web :3010]
        Payroll[payroll-web :3011]
        Others[... 기타 11개]
    end
    
    subgraph "Shared Packages"
        UI[@erp/ui]
        Shared[@erp/shared]
        Config[@erp/config]
    end
    
    Browser --> Header
    Browser --> Sidebar
    Main --> Auth
    Main --> Tenant
    Main --> HRM
    Main --> Payroll
    Main --> Others
    
    Auth --> UI
    HRM --> UI
    UI --> Config
    Shared --> Config
```

### 1.2 서비스 포트 할당

| 서비스 | 포트 | Docker 이미지 |
|--------|------|--------------|
| shell | 3000 | `erp/shell:latest` |
| auth-web | 3001 | `erp/auth-web:latest` |
| tenant-web | 3002 | `erp/tenant-web:latest` |
| user-web | 3003 | `erp/user-web:latest` |
| hrm-web | 3010 | `erp/hrm-web:latest` |
| payroll-web | 3011 | `erp/payroll-web:latest` |
| budget-web | 3012 | `erp/budget-web:latest` |
| attendance-web | 3013 | `erp/attendance-web:latest` |
| accounting-web | 3014 | `erp/accounting-web:latest` |
| asset-web | 3015 | `erp/asset-web:latest` |
| inventory-web | 3016 | `erp/inventory-web:latest` |
| approval-web | 3017 | `erp/approval-web:latest` |
| vehicle-web | 3018 | `erp/vehicle-web:latest` |
| report-web | 3019 | `erp/report-web:latest` |
| revenue-web | 3020 | `erp/revenue-web:latest` |
| expenditure-web | 3021 | `erp/expenditure-web:latest` |
| storybook | 6006 | `erp/storybook:latest` |

---

## 2. 프로젝트 구조

### 2.1 모노레포 루트 구조

```
d:/app/
├── apps/
│   └── shell/                         # Shell 앱 (Container)
│
├── services/                          # Micro Frontend 서비스
│   ├── auth/web/                      # auth-web (3001)
│   ├── tenant/web/                    # tenant-web (3002)
│   ├── user/web/                      # user-web (3003)
│   ├── hrm/web/                       # hrm-web (3010)
│   ├── payroll/web/                   # payroll-web (3011)
│   └── ...                            # 기타 서비스
│
├── packages/
│   ├── ui/                            # @erp/ui (디자인 시스템)
│   ├── erp-shared/                    # @erp/shared (비즈니스 로직)
│   ├── config/                        # @erp/config (설정)
│   └── storybook/                     # Storybook (컴포넌트 문서)
│
├── docs/
│   ├── PRD_MAIN_UI.md
│   ├── DESIGN_SYSTEM_RULES.md
│   ├── implementation_plan.md
│   └── task/                          # Task 파일들
│
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
└── docker-compose.yml
```

### 2.2 Shell 앱 구조 (apps/shell)

```
apps/shell/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx                 # 인증 레이아웃
│   │   └── login/page.tsx             # 로그인 페이지
│   ├── (dashboard)/
│   │   ├── layout.tsx                 # 대시보드 레이아웃
│   │   ├── page.tsx                   # 대시보드 홈
│   │   └── [...page]/page.tsx         # 서비스 로더
│   ├── api/auth/[...nextauth]/route.ts # NextAuth
│   ├── layout.tsx                     # 루트 레이아웃
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── header.tsx                 # 글로벌 헤더
│   │   ├── sidebar.tsx                # 사이드 네비게이션
│   │   ├── status-bar.tsx             # 상태 바
│   │   └── workspace-tabs.tsx         # 워크스페이스 탭
│   ├── features/
│   │   ├── global-search.tsx          # 통합 검색
│   │   ├── ai-assistant.tsx           # AI 어시스턴트
│   │   └── service-loader.tsx         # 서비스 로더
│   └── providers/
│       ├── auth-provider.tsx          # 인증 Context
│       ├── theme-provider.tsx         # 테마 Context
│       └── shortcut-provider.tsx      # 단축키 Context
│
├── lib/
│   ├── store/
│   │   ├── auth.ts                    # 인증 상태 (Zustand)
│   │   ├── menu.ts                    # 메뉴 상태
│   │   └── tabs.ts                    # 탭 상태
│   └── service-registry.ts            # 서비스 레지스트리
│
├── hooks/
│   ├── use-auth.ts
│   ├── use-shortcuts.ts
│   └── use-session-timeout.ts
│
├── Dockerfile
├── next.config.js
├── tailwind.config.ts
└── package.json
```

### 2.3 서비스 구조 (예: services/hrm/web)

```
services/hrm/web/
├── app/
│   ├── layout.tsx                     # 서비스 레이아웃
│   ├── page.tsx                       # 사원 리스트
│   ├── [id]/page.tsx                  # 사원 상세
│   ├── create/page.tsx                # 사원 등록
│   └── actions.ts                     # Server Actions
│
├── components/
│   ├── employee-list.tsx
│   ├── employee-form.tsx
│   └── employee-card.tsx
│
├── lib/
│   ├── api.ts                         # HRM API 클라이언트
│   └── validation.ts                  # Zod 스키마
│
├── Dockerfile
├── next.config.js
└── package.json
```

### 2.4 @erp/ui 패키지 구조

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   └── index.ts
│   │   └── data-grid/
│   │       └── data-grid.tsx
│   │
│   ├── tokens/
│   │   ├── colors.ts                  # 기본 색상
│   │   ├── tenant-themes.ts           # 10개 테넌트 테마
│   │   ├── typography.ts
│   │   ├── layout.ts
│   │   ├── animation.ts
│   │   ├── grid.ts
│   │   └── index.ts
│   │
│   ├── lib/
│   │   ├── utils.ts                   # cn() 유틸리티
│   │   └── theme-manager.ts           # 동적 테마 적용
│   │
│   ├── globals.css
│   └── index.ts
│
└── package.json
```

---

## 3. 구현 단계

### Phase 1: 모노레포 초기화

| 작업 | 파일 |
|------|------|
| pnpm workspace 설정 | `pnpm-workspace.yaml` |
| Turborepo 설정 | `turbo.json` |
| TypeScript 공통 설정 | `packages/config/typescript-config/` |
| ESLint 공통 설정 | `packages/config/eslint-config/` |
| Prettier 설정 | `packages/config/prettier-config/` |

### Phase 2: 디자인 시스템 (@erp/ui)

| 작업 | 파일 |
|------|------|
| 색상 토큰 | `tokens/colors.ts` |
| 10개 테넌트 테마 프리셋 | `tokens/tenant-themes.ts` |
| 타이포그래피 토큰 | `tokens/typography.ts` |
| 레이아웃 토큰 | `tokens/layout.ts` |
| 애니메이션 토큰 | `tokens/animation.ts` |
| 동적 테마 적용 함수 | `lib/theme-manager.ts` |

### Phase 3: UI 컴포넌트 (@erp/ui)

| 컴포넌트 | 파일 |
|----------|------|
| Button | `components/ui/button.tsx` |
| Input | `components/ui/input.tsx` |
| Label | `components/ui/label.tsx` |
| Card | `components/ui/card.tsx` |
| Badge | `components/ui/badge.tsx` |
| Dialog | `components/ui/dialog.tsx` |
| DropdownMenu | `components/ui/dropdown-menu.tsx` |
| DataGrid | `components/data-grid/data-grid.tsx` |

### Phase 4: Storybook

| 작업 | 파일 |
|------|------|
| Storybook 설정 | `.storybook/main.ts`, `preview.ts` |
| 색상 토큰 스토리 | `stories/Tokens/Colors.stories.tsx` |
| 컴포넌트 스토리 | `stories/Components/*.stories.tsx` |
| 접근성 테스트 | `@storybook/addon-a11y` |

### Phase 5: @erp/shared

| 작업 | 파일 |
|------|------|
| API 클라이언트 | `api/client.ts` |
| JWT 인터셉터 | `api/interceptors.ts` |
| 메뉴 구조 | `constants/menu-structure.ts` |
| 공통 타입 | `types/user.ts`, `tenant.ts` |
| 유틸리티 함수 | `utils/format.ts`, `validate.ts` |

### Phase 6: Shell 앱 기본

| 작업 | 파일 |
|------|------|
| 로그인 페이지 | `app/(auth)/login/page.tsx` |
| NextAuth 설정 | `app/api/auth/[...nextauth]/route.ts` |
| 테마 Provider | `components/providers/theme-provider.tsx` |
| 대시보드 레이아웃 | `app/(dashboard)/layout.tsx` |

### Phase 7: Shell 레이아웃

| 작업 | 파일 |
|------|------|
| Header | `components/layout/header.tsx` |
| Sidebar | `components/layout/sidebar.tsx` |
| StatusBar | `components/layout/status-bar.tsx` |
| WorkspaceTabs | `components/layout/workspace-tabs.tsx` |

### Phase 8: Shell 고급 기능

| 작업 | 파일 |
|------|------|
| 통합 검색 | `components/features/global-search.tsx` |
| AI 어시스턴트 | `components/features/ai-assistant.tsx` |
| 단축키 시스템 | `hooks/use-shortcuts.ts` |
| 서비스 로더 | `components/features/service-loader.tsx` |
| 세션 타임아웃 | `hooks/use-session-timeout.ts` |

### Phase 9: auth-web 서비스

| 작업 | 파일 |
|------|------|
| 프로젝트 설정 | `next.config.js`, `package.json` |
| 로그인 폼 | `components/login-form.tsx` |
| 2FA (OTP) | `components/otp-verification.tsx` |
| 소셜 로그인 연동 | `components/social-login.tsx` |
| Dockerfile | `Dockerfile` |

### Phase 10-15: 나머지 서비스

각 서비스별 동일한 구조로 구현

### Phase 16: 테스트

| 작업 | 도구 |
|------|------|
| 단위 테스트 | Jest + React Testing Library |
| E2E 테스트 | Playwright |
| 접근성 테스트 | axe-core, Lighthouse |

### Phase 17: 최적화

| 작업 | 방법 |
|------|------|
| 이미지 최적화 | Next.js Image |
| 코드 스플리팅 | dynamic import |
| 번들 분석 | @next/bundle-analyzer |

### Phase 18: 완료 보고서

| 작업 | 내용 |
|------|------|
| 아키텍처 문서 | Mermaid 다이어그램 |
| 구현 완료 항목 | 스크린샷 포함 |
| 테스트 결과 | 커버리지, Lighthouse 점수 |
| 배포 가이드 | Docker, Kubernetes |

---

## 4. 코딩 지침

### 4.1 마이크로서비스 독립성 (필수)

> [!IMPORTANT]
> 각 서비스는 **완전히 독립적**으로 실행 및 배포 가능해야 합니다.

**허용**:
- ✅ 공통 패키지 사용 (`@erp/ui`, `@erp/shared`)
- ✅ API를 통한 서비스 간 통신

**금지**:
- ❌ 서비스 간 직접 import (`../payroll-web/...`)
- ❌ 서비스 간 폴더 공유

### 4.2 필수 주석 형식

```typescript
/**
 * 파일명: user-service.ts
 * 패키지: @erp/hrm-web
 * 경로: services/hrm/web/lib/user-service.ts
 * 작성일: 2025-12-19
 * 
 * [파일 설명]
 * 사용자 정보 조회 및 관리 서비스
 * 
 * [주요 기능]
 * - getUserById: 사용자 ID로 상세 정보 조회
 * - updateUser: 사용자 정보 수정
 * 
 * [사용 예시]
 * const user = await getUserById('user-123');
 */
```

### 4.3 타입 안전성

```typescript
// ❌ any 사용 금지
const data: any = fetchData();

// ✅ 명시적 타입 정의
interface User {
  id: string;
  name: string;
  role: 'ADMIN' | 'USER' | 'MANAGER';
}
const data: User = await fetchData();
```

### 4.4 접근성 (필수)

```tsx
// ✅ 모든 폼 필드에 label 연결
<label htmlFor="email">이메일</label>
<input id="email" type="email" aria-describedby="email-help" />
<span id="email-help">업무용 이메일을 입력하세요</span>

// ✅ 아이콘 버튼에 aria-label
<button aria-label="삭제">
  <TrashIcon />
</button>
```

---

## 5. 검증 계획

### 5.1 자동화 테스트

```bash
# 전체 테스트
pnpm test

# 특정 패키지 테스트
pnpm --filter @erp/ui test
pnpm --filter shell test

# E2E 테스트
pnpm e2e
```

### 5.2 수동 테스트 체크리스트

#### 로그인 화면
- [ ] Tab 키만으로 모든 필드 탐색 가능
- [ ] 미승인 이메일 입력 시 오류 메시지
- [ ] 로딩 스피너 표시
- [ ] 스크린리더로 모든 필드 읽힘

#### 메인 화면
- [ ] `/` 키 → 검색 포커스
- [ ] `Ctrl+B` → 사이드바 토글
- [ ] 화살표 키로 메뉴 탐색
- [ ] 테넌트별 테마 적용 확인

#### 접근성
- [ ] Lighthouse 점수 90점 이상
- [ ] WAVE 오류 0건
- [ ] 색상 대비 4.5:1 이상

### 5.3 성능 기준

| 항목 | 기준 |
|------|------|
| FCP | 3초 이내 |
| TTI | 5초 이내 |
| Lighthouse Performance | 90점 이상 |
| 10만 건 데이터 그리드 | 60fps 유지 |

### 5.4 브라우저 호환성

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

---

## 참고 문서

- [PRD_MAIN_UI.md](./PRD_MAIN_UI.md) - 요구사항 정의
- [DESIGN_SYSTEM_RULES.md](./DESIGN_SYSTEM_RULES.md) - 디자인 시스템
- [docs/task/](./task/) - Task 파일들

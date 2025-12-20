# 공공기관 ERP SaaS 디자인 시스템 규칙

> **문서 버전**: 2.1  
> **작성일**: 2025-12-20  
> **대상 독자**: 프론트엔드 개발자, UI/UX 디자이너

---

## 목차

1. [디자인 원칙](#1-디자인-원칙)
2. [색상 시스템](#2-색상-시스템)
3. [멀티 테넌트 테마](#3-멀티-테넌트-테마)
4. [타이포그래피](#4-타이포그래피)
5. [레이아웃 시스템](#5-레이아웃-시스템)
6. [컴포넌트 규칙](#6-컴포넌트-규칙)
7. [접근성 가이드라인](#7-접근성-가이드라인)
8. [애니메이션 규칙](#8-애니메이션-규칙)
9. [아이콘 및 이미지](#9-아이콘-및-이미지)
10. [반응형 디자인](#10-반응형-디자인)
11. [Storybook 컴포넌트 카탈로그](#11-storybook-컴포넌트-카탈로그)

---

## 1. 디자인 원칙

### 1.1 핵심 가치

```
┌─────────────────────────────────────────────────────────────────┐
│                        ERP 디자인 원칙                           │
├────────────┬────────────┬────────────┬────────────┬────────────┤
│   일관성   │   효율성   │   접근성   │   확장성   │   보안     │
│동일기능    │최소클릭    │WCAG 2.1 AA │기관별테마  │시각적      │
│동일 UI     │키보드우선  │고령자배려  │모듈화      │보안피드백  │
└────────────┴────────────┴────────────┴────────────┴────────────┘
```

### 1.2 적용 우선순위

| 순위 | 원칙 | 설명 |
|:---:|------|------|
| 1 | **접근성** | 모든 사용자가 사용 가능해야 함 |
| 2 | **일관성** | 학습 비용 최소화 |
| 3 | **효율성** | 업무 생산성 향상 |
| 4 | **심미성** | 전문적이고 신뢰감 있는 UI |

---

## 2. 색상 시스템

### 2.1 색상 토큰 구조

> [!IMPORTANT]
> 모든 색상은 **하드코딩하지 않고** 반드시 CSS 변수 또는 토큰을 사용합니다.

| 카테고리 | 용도 | CSS 변수 예시 |
|----------|------|---------------|
| **Primary** | 주요 액션, 브랜드 | `var(--color-primary)` |
| **Secondary** | 보조 액션 | `var(--color-secondary)` |
| **Accent** | 강조 | `var(--color-accent)` |
| **Neutral** | 배경, 텍스트, 테두리 | `var(--color-muted)` |
| **Semantic** | 상태 표시 | `success`, `warning`, `error`, `info` |

### 2.2 Neutral 색상 팔레트

```typescript
// packages/ui/src/tokens/colors.ts

export const neutral = {
  50: '#F9FAFB',    // 가장 밝음 (배경)
  100: '#F3F4F6',
  200: '#E5E7EB',   // 테두리
  300: '#D1D5DB',
  400: '#9CA3AF',   // 비활성 텍스트
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',   // 본문 텍스트
  800: '#1F2937',
  900: '#111827',   // 가장 어두움 (제목)
} as const;
```

### 2.3 Semantic 색상

| 상태 | 배경색 (Light) | 메인 색상 | 텍스트 (Dark) |
|------|---------------|----------|---------------|
| **Success** | `#D1FAE5` | `#10B981` | `#065F46` |
| **Warning** | `#FEF3C7` | `#F59E0B` | `#92400E` |
| **Error** | `#FEE2E2` | `#EF4444` | `#991B1B` |
| **Info** | `#DBEAFE` | `#3B82F6` | `#1E40AF` |

### 2.4 사용 규칙

```tsx
// ❌ 잘못된 예: 하드코딩
<button style={{ backgroundColor: '#3B82F6' }}>저장</button>

// ✅ 올바른 예: Tailwind + CSS 변수
<button className="bg-primary text-primary-foreground">저장</button>
```

### 2.5 상태별 색상 매핑

| 상태 | 배경색 | 텍스트/아이콘 | 테두리 |
|------|--------|--------------|--------|
| 기본 | `neutral-50` | `neutral-700` | `neutral-200` |
| 호버 | `primary-50` | `primary-600` | `primary-200` |
| 선택 | `primary-100` | `primary-700` | `primary-300` |
| 비활성 | `neutral-100` | `neutral-400` | `neutral-200` |
| 오류 | `error-light` | `error-dark` | `error` |

---

## 3. 멀티 테넌트 테마

### 3.1 테마 커스터마이징 색상 (10가지)

> [!IMPORTANT]
> 각 공공기관(테넌트)은 다음 **10가지 색상**을 커스터마이징할 수 있습니다.

| # | 색상 | CSS 변수 | 용도 |
|---|------|----------|------|
| 1 | Primary | `--color-primary` | 주요 브랜드 색상 |
| 2 | Primary Foreground | `--color-primary-foreground` | Primary 위 텍스트 |
| 3 | Secondary | `--color-secondary` | 보조 색상 |
| 4 | Secondary Foreground | `--color-secondary-foreground` | Secondary 위 텍스트 |
| 5 | Accent | `--color-accent` | 강조 색상 |
| 6 | Accent Foreground | `--color-accent-foreground` | Accent 위 텍스트 |
| 7 | Muted | `--color-muted` | 비활성/배경 |
| 8 | Muted Foreground | `--color-muted-foreground` | Muted 위 텍스트 |
| 9 | Background | `--color-background` | 기본 배경 |
| 10 | Foreground | `--color-foreground` | 기본 텍스트 |

### 3.2 테마 데이터 구조

```typescript
// packages/ui/src/tokens/tenant-themes.ts

interface TenantTheme {
  tenantId: string;
  name: string;          // "서울특별시"
  domain: string;        // "seoul"
  
  colors: {
    primary: string;              // #0066CC
    primaryForeground: string;    // #FFFFFF
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    muted: string;
    mutedForeground: string;
    background: string;
    foreground: string;
  };
  
  logo: {
    url: string;
    alt: string;
  };
}
```

### 3.3 사전 정의 테마 프리셋 (10개)

| # | 기관 | Primary | Secondary | 도메인 |
|---|------|---------|-----------|--------|
| 1 | 서울특별시 | `#0066CC` | `#00A0E9` | `seoul` |
| 2 | 부산광역시 | `#003DA5` | `#00A79D` | `busan` |
| 3 | 인천광역시 | `#004EA2` | `#00B4D8` | `incheon` |
| 4 | 대구광역시 | `#E31C39` | `#00A1E0` | `daegu` |
| 5 | 광주광역시 | `#00843D` | `#F2A900` | `gwangju` |
| 6 | 대전광역시 | `#0066B3` | `#00B398` | `daejeon` |
| 7 | 울산광역시 | `#003478` | `#009FDA` | `ulsan` |
| 8 | 세종특별자치시 | `#2E6A30` | `#00A8E0` | `sejong` |
| 9 | 경기도 | `#003B73` | `#00A8A8` | `gyeonggi` |
| 10 | 강원도 | `#007A3D` | `#00B0F0` | `gangwon` |

### 3.4 동적 테마 적용

```typescript
// packages/ui/src/lib/theme-manager.ts

/**
 * CSS 변수를 사용하여 테넌트 테마를 동적으로 적용
 */
export function applyTenantTheme(theme: TenantTheme): void {
  const root = document.documentElement;
  
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVar = `--color-${toKebabCase(key)}`;
    root.style.setProperty(cssVar, hexToRgb(value));
  });
}
```

### 3.5 Tailwind 통합

```typescript
// tailwind.config.ts

export default {
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-foreground': 'rgb(var(--color-primary-foreground) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        // ... 나머지 색상
      },
    },
  },
};
```

---

## 4. 타이포그래피

### 4.1 폰트 패밀리

| 용도 | 폰트 | Fallback |
|------|------|----------|
| 본문 | **Pretendard** | system-ui, sans-serif |
| 코드/숫자 | **Fira Code** | Consolas, monospace |

### 4.2 크기 체계

> [!CAUTION]
> 본문 텍스트는 접근성을 위해 **16px 미만으로 사용하지 않습니다**.

| 클래스 | 크기 | 용도 | line-height |
|--------|------|------|-------------|
| `text-xs` | 12px | 캡션, 라벨 | 1.25 |
| `text-sm` | 14px | 보조 텍스트 | 1.35 |
| `text-base` | **16px** | 기본 본문 (최소 크기) | 1.5 |
| `text-lg` | 18px | 강조 본문 | 1.5 |
| `text-xl` | 20px | 소제목 | 1.4 |
| `text-2xl` | 24px | 제목 | 1.3 |
| `text-3xl` | 30px | 대제목 | 1.2 |

### 4.3 폰트 굵기

| 클래스 | 굵기 | 용도 |
|--------|------|------|
| `font-normal` | 400 | 기본 본문 |
| `font-medium` | 500 | 강조 본문 |
| `font-semibold` | 600 | 버튼, 라벨 |
| `font-bold` | 700 | 제목 |

---

## 5. 레이아웃 시스템

### 5.1 UI Shell 레이아웃

```
┌─────────────────────────────────────────────────────────┐
│ [Header: 64px 고정]                                      │
├────────────┬────────────────────────────────────────────┤
│ [Sidebar]  │ [Main Content]                             │
│ 240px~64px │ 유동                                        │
│ (접힘 가능)│                                             │
├────────────┴────────────────────────────────────────────┤
│ [Status Bar: 32px 고정]                                  │
└─────────────────────────────────────────────────────────┘
```

### 5.2 레이아웃 토큰

```typescript
// packages/ui/src/tokens/layout.ts

export const layout = {
  header: { height: '64px' },
  sidebar: {
    width: '240px',
    widthCollapsed: '64px',
  },
  statusBar: { height: '32px' },
  container: { maxWidth: '1400px' },
} as const;
```

### 5.3 간격 시스템

| 토큰 | 값 | 용도 |
|------|-----|------|
| `spacing-1` | 4px | 요소 내부 미세 조정 |
| `spacing-2` | 8px | 인접 요소 간 |
| `spacing-3` | 12px | 관련 요소 그룹 |
| `spacing-4` | 16px | 기본 간격 |
| `spacing-6` | 24px | 섹션 내 여백 |
| `spacing-8` | 32px | 섹션 간 여백 |
| `spacing-12` | 48px | 대섹션 간 여백 |

### 5.4 그리드 시스템

| 속성 | 값 | 설명 |
|------|-----|------|
| 컨테이너 최대 너비 | 1400px | 대형 모니터 대응 |
| 컬럼 수 | 12 | 유연한 레이아웃 |
| 거터(Gutter) | 24px | 컬럼 간 간격 |

### 5.5 반응형 브레이크포인트

| 브레이크포인트 | 값 | 설명 |
|---------------|-----|------|
| `sm` | 640px | 모바일 |
| `md` | 768px | 태블릿 |
| `lg` | 1024px | 소형 데스크톱 |
| `xl` | 1280px | 일반 데스크톱 |
| `2xl` | 1536px | 대형 모니터 |

---

## 6. 컴포넌트 규칙

### 6.1 버튼

| 변형 | 용도 | 예시 |
|------|------|------|
| **Primary** | 주요 액션 | 저장, 제출, 확인 |
| **Secondary** | 보조 액션 | 취소, 이전 |
| **Ghost** | 저강조 액션 | 더보기, 링크 |
| **Destructive** | 위험 액션 | 삭제, 초기화 |

```tsx
// 버튼 크기 규칙
<Button size="sm" />      // 32px 높이 - 테이블 내부
<Button size="default" /> // 40px 높이 - 기본
<Button size="lg" />      // 48px 높이 - 모바일/접근성
```

### 6.2 폼 컴포넌트

| 규칙 | 설명 |
|------|------|
| 라벨 필수 | 모든 입력 필드에 연결된 라벨 |
| 오류 표시 | 필드 하단에 빨간색 텍스트 + 아이콘 |
| 도움말 | 필드 하단에 회색 텍스트 |
| 필수 표시 | 라벨 옆 빨간색 * 표시 |

```tsx
<div className="space-y-2">
  <Label htmlFor="email">
    이메일 <span className="text-error">*</span>
  </Label>
  <Input 
    id="email" 
    type="email" 
    aria-describedby="email-error" 
  />
  <p id="email-error" className="text-sm text-error" role="alert">
    유효한 이메일 주소를 입력하세요.
  </p>
</div>
```

### 6.3 데이터 그리드

> [!IMPORTANT]
> 공공기관 업무 특성상 **10만 건 이상**의 데이터 처리가 필수입니다.

| 기능 | 필수 여부 | 설명 |
|------|:--------:|------|
| 가상 스크롤 | ✅ | 10만 건 이상 처리 |
| 컬럼 고정 | ✅ | 좌측 ID/이름 컬럼 |
| 필터 | ✅ | 컬럼별 필터 |
| 정렬 | ✅ | 다중 컬럼 정렬 |
| 인라인 편집 | ⭕ | 선택적 적용 |
| 행 선택 | ✅ | 체크박스, 다중 선택 |
| 키보드 네비 | ✅ | 화살표, Enter, Escape |
| 엑셀 내보내기 | ✅ | CSV, XLSX 지원 |

### 6.4 다이얼로그

| 유형 | 용도 | 닫기 방법 |
|------|------|----------|
| **Alert** | 알림, 단순 확인 | 확인 버튼 |
| **Confirm** | 사용자 선택 필요 | 확인/취소 버튼 |
| **Modal** | 복잡한 폼 | X 버튼, 배경 클릭, Escape |

> [!WARNING]
> 모달은 과도하게 사용하지 않습니다. 가능하면 **인라인 폼**을 사용합니다.

### 6.5 네비게이션

| 규칙 | 설명 |
|------|------|
| **3 Depth 제한** | 메뉴 깊이 최대 3단계 |
| 현재 위치 표시 | 활성 메뉴 하이라이트 |
| 브레드크럼 | 현재 위치 경로 표시 |
| 키보드 접근 | Tab, 화살표, Enter 지원 |

---

## 7. 접근성 가이드라인

### 7.1 필수 체크리스트

| 항목 | 기준 | 검증 방법 |
|------|------|----------|
| 키보드 접근 | 모든 인터랙션 | Tab 키로 전체 탐색 |
| 포커스 표시 | 명확한 아웃라인 | `:focus-visible` 스타일 |
| 스크린리더 | ARIA 라벨 | axe-core 검사 |
| 명도 대비 | **4.5:1 이상** | 색상 대비 도구 |
| 오류 메시지 | 텍스트 + 아이콘 | 색상만 의존 금지 |

### 7.2 ARIA 사용 패턴

```tsx
// 버튼에 로딩 상태 표시
<Button aria-busy={isLoading} aria-disabled={isLoading}>
  {isLoading ? '처리 중...' : '저장'}
</Button>

// 실시간 알림 (비긴급)
<div role="status" aria-live="polite">
  저장되었습니다.
</div>

// 에러 알림 (긴급)
<div role="alert" aria-live="assertive">
  입력값을 확인해주세요.
</div>
```

### 7.3 Skip Link

```tsx
// 페이지 상단에 추가
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
             bg-primary text-white px-4 py-2 rounded"
>
  메인 콘텐츠로 건너뛰기
</a>
```

### 7.4 모션 배려

```css
/* 애니메이션 비활성화 옵션 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. 애니메이션 규칙

### 8.1 트랜지션 시간

| 유형 | 시간 | 용도 |
|------|------|------|
| Instant | 0ms | 텍스트 변경 |
| Fast | 100ms | 버튼 호버 |
| Normal | 200ms | 메뉴 열림/닫힘 |
| Slow | 300ms | 모달 페이드 |
| Deliberate | 500ms | 페이지 전환 |

### 8.2 이징 함수

| 이름 | CSS | 용도 |
|------|-----|------|
| ease-out | `cubic-bezier(0, 0, 0.2, 1)` | 열림, 나타남 |
| ease-in | `cubic-bezier(0.4, 0, 1, 1)` | 닫힘, 사라짐 |
| ease-in-out | `cubic-bezier(0.4, 0, 0.2, 1)` | 상태 변경 |

### 8.3 토큰 정의

```typescript
// packages/ui/src/tokens/animation.ts

export const animation = {
  duration: {
    instant: '0ms',
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    deliberate: '500ms',
  },
  easing: {
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;
```

---

## 9. 아이콘 및 이미지

### 9.1 아이콘 라이브러리

- **권장**: Lucide React (`lucide-react`)
- **크기**: 16px (sm), 20px (md), 24px (lg)

### 9.2 아이콘 사용 규칙

```tsx
import { Save, Trash2, AlertCircle } from 'lucide-react';

// 버튼과 함께 사용
<Button>
  <Save className="w-4 h-4 mr-2" />
  저장
</Button>

// 접근성이 필요한 아이콘 버튼
<button aria-label="삭제">
  <Trash2 className="w-5 h-5" />
</button>
```

### 9.3 이미지 최적화

```tsx
import Image from 'next/image';

// Next.js Image 컴포넌트 사용 (필수)
<Image
  src="/logo.png"
  alt="기관 로고"
  width={200}
  height={50}
  priority  // LCP 이미지
/>
```

---

## 10. 반응형 디자인

### 10.1 브레이크포인트 전략

| 브레이크포인트 | 레이아웃 변화 |
|---------------|--------------|
| `< 640px` (sm) | 사이드바 숨김, 햄버거 메뉴 |
| `640px ~ 1024px` (md) | 사이드바 접힘 상태 |
| `> 1024px` (lg) | 사이드바 펼쳐진 상태 |

### 10.2 모바일 우선 접근

```tsx
// 모바일 우선 (작은 화면 기본, 큰 화면에서 확장)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card />
  <Card />
  <Card />
</div>
```

### 10.3 터치 영역

| 요소 | 최소 크기 | 이유 |
|------|----------|------|
| 버튼 | 44x44px | 터치 정확도 |
| 링크 | 44x44px | 터치 정확도 |
| 체크박스 | 24x24px | 정밀 조작 |

---

## 부록: 컴포넌트 상태 매트릭스

| 컴포넌트 | 기본 | 호버 | 포커스 | 활성 | 비활성 | 로딩 | 오류 |
|----------|:----:|:----:|:------:|:----:|:------:|:----:|:----:|
| Button | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - |
| Input | ✅ | ✅ | ✅ | - | ✅ | - | ✅ |
| Select | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Checkbox | ✅ | ✅ | ✅ | ✅ | ✅ | - | - |
| DataGrid | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Dialog | ✅ | - | ✅ | - | - | - | - |
| Dropdown | ✅ | ✅ | ✅ | ✅ | ✅ | - | - |

---

---

## 11. Storybook 컴포넌트 카탈로그

> [!TIP]
> 모든 UI 컴포넌트는 **Storybook**에서 시각적으로 확인하고 테스트할 수 있습니다.

### 11.1 실행 방법

```bash
pnpm storybook
# http://localhost:6006 에서 확인
```

### 11.2 구현된 컴포넌트 스토리 (12개)

| 카테고리 | 컴포넌트 | 스토리 수 | 설명 |
|----------|----------|:--------:|------|
| **기본 입력** | Button | 7 | 6가지 변형, 4가지 크기, 로딩/비활성 상태 |
| | Input | 6 | 텍스트, 비밀번호, 에러 상태 등 |
| | Label | 6 | 필수 필드, 폼 레이아웃 |
| | Select | 7 | 기본, 그룹화, 폼 예시 |
| **표시** | Badge | 4 | 상태 배지 (성공/경고/에러) |
| | Card | 4 | 카드 레이아웃, 대시보드 |
| | Table | 4 | 직원 목록, 결재 문서 테이블 |
| **오버레이** | Dialog | 4 | 폼 다이얼로그, 정보 표시 |
| | AlertDialog | 6 | 삭제 확인, 결재 제출 |
| | Popover | 5 | 설정, 필터, 알림 |
| **날짜/시간** | Calendar | 5 | DatePicker, 날짜 범위 |
| **피드백** | Toast | 7 | 성공/에러/액션 토스트 |

### 11.3 스토리 작성 규칙

자세한 내용은 [STORYBOOK_GUIDE.md](./STORYBOOK_GUIDE.md)를 참조하세요.

---

## 문서 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|----------|
| 1.0 | 2025-12-01 | 최초 작성 |
| 2.0 | 2025-12-19 | 멀티 테넌트 테마 시스템, 10가지 색상 토큰, 접근성 강화 |
| 2.1 | 2025-12-20 | Storybook 컴포넌트 카탈로그 섹션 추가 (12개 컴포넌트) |

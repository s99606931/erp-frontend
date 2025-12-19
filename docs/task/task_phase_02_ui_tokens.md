# Phase 2: @erp/ui 디자인 토큰 및 테마

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)

---

## 📌 목표

멀티 테넌트 테마 시스템을 포함한 디자인 토큰을 구축합니다.

**완료 조건**: `import { colors } from '@erp/ui/tokens'` 사용 가능

---

## ✅ 작업 목록

### 2.1 패키지 초기화

```bash
cd packages/ui
pnpm init
```

### 2.2 색상 토큰 (`src/tokens/colors.ts`)

```typescript
/**
 * ============================================================================
 * 파일명: colors.ts
 * 패키지: @erp/ui
 * ============================================================================
 * [📄 설명] 디자인 시스템 색상 토큰
 */
export const colors = {
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    // ... 900까지
  },
  primary: { 500: '#3B82F6', 600: '#2563EB' },
  success: { light: '#D1FAE5', DEFAULT: '#10B981', dark: '#065F46' },
  warning: { light: '#FEF3C7', DEFAULT: '#F59E0B', dark: '#92400E' },
  error: { light: '#FEE2E2', DEFAULT: '#EF4444', dark: '#991B1B' },
  info: { light: '#DBEAFE', DEFAULT: '#3B82F6', dark: '#1E40AF' },
} as const;
```

### 2.3 멀티 테넌트 테마 (`src/tokens/tenant-themes.ts`)

**10가지 색상 커스터마이징**:
1. Primary / PrimaryForeground
2. Secondary / SecondaryForeground
3. Accent / AccentForeground
4. Muted / MutedForeground
5. Background / Foreground

**10개 공공기관 프리셋**:
- 서울, 부산, 인천, 대구, 광주, 대전, 울산, 세종, 경기, 강원

### 2.4 동적 테마 적용 (`src/lib/theme-manager.ts`)

```typescript
export function applyTenantTheme(theme: TenantTheme): void {
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${toKebabCase(key)}`, hexToRgb(value));
  });
}
```

### 2.5 기타 토큰

- `typography.ts` - 폰트, 크기
- `layout.ts` - 헤더(64px), 사이드바(240px)
- `animation.ts` - 트랜지션 시간
- `grid.ts` - 12컬럼, 브레이크포인트

### 2.6 유틸리티 (`src/lib/utils.ts`)

```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 📊 완료 체크리스트

- [ ] 색상 토큰 5종 작성
- [ ] 10개 테넌트 테마 프리셋
- [ ] 동적 테마 적용 함수
- [ ] 모든 파일 **JSDoc 주석**
- [ ] TypeScript 타입 체크 통과

---

## ➡️ 다음 단계

[Phase 3: @erp/ui 컴포넌트](./task_phase_03_ui_components.md)

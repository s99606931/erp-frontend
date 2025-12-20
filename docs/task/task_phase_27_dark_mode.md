# Phase 27: 다크 모드

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)  
> **📋 관련 PRD**: [PRD_UX_ENHANCEMENT.md](../../.agent/docs/PRD_UX_ENHANCEMENT.md) - 섹션 11

---

## 📌 목표

사용자가 라이트/다크 모드를 전환할 수 있는 테마 시스템을 구현합니다.

**완료 조건**: 
- 테마 전환 버튼 동작
- 시스템 설정 자동 감지
- localStorage에 설정 저장

---

## 🎯 학습 목표

1. CSS 변수 기반 테마 시스템
2. next-themes 라이브러리 사용
3. 시스템 설정 감지

---

## ✅ 작업 목록

### 27.1 패키지 설치

```bash
pnpm add next-themes
```

---

### 27.2 ThemeProvider 설정

**파일 위치**: `apps/shell/providers/theme-provider.tsx`

```tsx
/**
 * ============================================================================
 * 파일명: theme-provider.tsx
 * 설명: 테마(다크모드) 제공자 컴포넌트
 * ============================================================================
 * 
 * [📄 파일 설명]
 * next-themes 라이브러리를 사용하여 테마 상태를 관리합니다.
 * 라이트/다크 모드 전환 및 시스템 설정 자동 감지를 지원합니다.
 * 
 * [🎯 주요 기능]
 * 1. 라이트/다크 모드 전환
 * 2. 시스템 설정 자동 감지 (prefers-color-scheme)
 * 3. localStorage에 설정 저장
 * 4. 깜빡임 방지 (Flash of unstyled content)
 * ============================================================================
 */

'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * 테마 제공자 컴포넌트
 * 
 * 앱의 루트에서 감싸주면 하위 모든 컴포넌트에서
 * useTheme 훅으로 테마 상태에 접근할 수 있습니다.
 * 
 * @example
 * // app/layout.tsx
 * <ThemeProvider>
 *   <html>
 *     <body>{children}</body>
 *   </html>
 * </ThemeProvider>
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      // HTML 요소에 class를 추가 (Tailwind와 호환)
      attribute="class"
      // 기본 테마: 시스템 설정 따르기
      defaultTheme="system"
      // 시스템 테마 변경 시 자동 반영
      enableSystem
      // 색상 모드 전환 시 부드러운 전환
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
```

---

### 27.3 테마 전환 버튼 생성

**파일 위치**: `apps/shell/components/features/theme-toggle.tsx`

```tsx
/**
 * ============================================================================
 * 파일명: theme-toggle.tsx
 * 설명: 테마 전환 버튼 컴포넌트
 * ============================================================================
 */

'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@erp/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@erp/ui';

/**
 * 테마 전환 버튼
 * 
 * 클릭하면 드롭다운 메뉴가 열리고,
 * 라이트/다크/시스템 중 선택할 수 있습니다.
 */
export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // 클라이언트 사이드에서만 렌더링 (SSR hydration 문제 방지)
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 마운트 전에는 빈 버튼 표시 (깜빡임 방지)
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="w-5 h-5" />
      </Button>
    );
  }
  
  // 현재 적용된 실제 테마 (system이면 실제 시스템 테마)
  const currentTheme = theme === 'system' ? systemTheme : theme;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          aria-label="테마 변경"
        >
          {/* 현재 테마에 따라 아이콘 변경 */}
          {currentTheme === 'dark' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="w-4 h-4 mr-2" />
          라이트 모드
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="w-4 h-4 mr-2" />
          다크 모드
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor className="w-4 h-4 mr-2" />
          시스템 설정
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

### 27.4 다크 모드 CSS 변수 확인

**파일 위치**: `apps/shell/app/globals.css` 또는 `packages/ui/src/globals.css`

다크 모드 CSS 변수가 정의되어 있는지 확인합니다.

```css
/* 라이트 모드 (기본) */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... 기타 색상 변수 */
}

/* 다크 모드 */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... 기타 색상 변수 */
}
```

---

### 27.5 레이아웃에 적용

**파일 수정**: `apps/shell/app/layout.tsx`

```tsx
import { ThemeProvider } from '@/providers/theme-provider';

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

> [!IMPORTANT]
> `suppressHydrationWarning`은 next-themes가 HTML 요소를 수정하면서 발생하는 
> hydration 경고를 무시하기 위해 필요합니다.

---

## 📊 완료 체크리스트

- [ ] `next-themes` 패키지 설치
- [ ] ThemeProvider 생성
- [ ] 레이아웃에 ThemeProvider 적용
- [ ] 테마 전환 버튼 생성
- [ ] 다크 모드 CSS 변수 확인
- [ ] 라이트/다크 전환 동작
- [ ] 시스템 설정 감지 동작
- [ ] 새로고침 후 설정 유지

---

## 🔧 테스트 방법

1. 테마 전환 버튼 클릭
2. "다크 모드" 선택 → 화면 어두워짐
3. "라이트 모드" 선택 → 화면 밝아짐
4. "시스템 설정" 선택 → OS 설정에 따라 변경
5. 새로고침 후 설정 유지 확인

---

## ➡️ 다음 단계

[Phase 28: 드래그 앤 드롭](./task_phase_28_drag_drop.md)

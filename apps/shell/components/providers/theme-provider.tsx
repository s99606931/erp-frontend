/**
 * ============================================================================
 * 파일명: theme-provider.tsx
 * 설명: 테마(다크모드) 제공자 컴포넌트
 * ============================================================================
 */

'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * 테마 제공자 컴포넌트
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      // HTML 요소에 class를 추가 (Tailwind와 호환: class 속성에 'dark' 추가)
      attribute="class"
      // 기본 테마: 시스템 설정 따르기
      defaultTheme="system"
      // 시스템 테마 변경 시 자동 반영
      enableSystem
      // 색상 모드 전환 시 부드러운 전환 비활성화 (깜빡임 방지)
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

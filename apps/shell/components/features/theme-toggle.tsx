/**
 * ============================================================================
 * 파일명: theme-toggle.tsx
 * 설명: 테마 전환 버튼 컴포넌트 (Simple Toggle)
 * ============================================================================
 */

'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@erp/ui/components'; // @erp/ui 대신 @erp/ui/components 시도, 아니면 @erp/ui
// DropdownMenu가 확실치 않으므로 단순 토글로 변경

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled className="text-muted-foreground/50">
        <Sun className="w-5 h-5" />
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="테마 변경"
      title={isDark ? '라이트 모드로 변경' : '다크 모드로 변경'}
    >
      {isDark ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
      <span className="sr-only">테마 변경</span>
    </Button>
  );
}

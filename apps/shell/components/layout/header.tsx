/**
 * ============================================================================
 * 파일명: header.tsx
 * 앱: shell
 * 경로: apps/shell/components/layout/header.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 */

'use client';

import { useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Bell, Search, Menu, User as UserIcon, LogOut } from 'lucide-react';
import { Button, Input } from '@erp/ui/components';
import { useLayoutStore } from '@/lib/store/layout';
// import { useTheme } from 'next-themes'; // theme-toggle 내부에서 처리하므로 여기선 제거 가능하지만, 일단 둠
import { AIButton } from '@/components/features/ai-button';
import { ThemeToggle } from '@/components/features/theme-toggle';

export function Header() {
    const { data: session } = useSession();
    const { toggleSidebar } = useLayoutStore();
    // const { theme, setTheme } = useTheme(); // ThemeToggle이 담당
    const searchInputRef = useRef<HTMLInputElement>(null);

    // 단축키 `/` 처리
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-4 shadow-sm md:px-6">
            {/* 좌측: 사이드바 토글 & 로고 */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    aria-label="사이드바 토글 (Ctrl+B)"
                    className="shrink-0"
                >
                    <Menu className="h-5 w-5" />
                </Button>

                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                        E
                    </div>
                    <span className="hidden text-lg font-bold md:inline-block">
                        공공 ERP
                    </span>
                    <span className="ml-2 hidden text-xs text-muted-foreground md:inline-block border px-2 py-0.5 rounded-full">
                        서울특별시
                    </span>
                </div>
            </div>

            {/* 중앙: 통합 검색 */}
            <div className="flex-1 max-w-md mx-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        ref={searchInputRef}
                        type="search"
                        placeholder="통합 검색... (/)"
                        className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                        aria-label="통합 검색"
                    />
                    <kbd className="pointer-events-none absolute right-2.5 top-2.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
                        /
                    </kbd>
                </div>
            </div>

            {/* 우측: 유틸리티 & 프로필 */}
            <div className="flex items-center gap-2">
                <AIButton />
                <ThemeToggle />

                <Button variant="ghost" size="icon" aria-label="알림 확인">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">알림</span>
                </Button>

                <div className="flex items-center gap-2 border-l pl-2 ml-2">
                    <div className="hidden flex-col items-end text-sm md:flex">
                        <span className="font-medium">{session?.user?.name || '사용자'}</span>
                        <span className="text-xs text-muted-foreground">행정안전국</span>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full bg-muted/50" aria-label="사용자 메뉴">
                        <UserIcon className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        aria-label="로그아웃"
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
}

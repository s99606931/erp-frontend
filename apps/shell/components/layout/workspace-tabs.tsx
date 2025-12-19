/**
 * ============================================================================
 * 파일명: workspace-tabs.tsx
 * 앱: shell
 * 경로: apps/shell/components/layout/workspace-tabs.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * 워크스페이스 탭 네비게이션입니다.
 * 열려있는 페이지들을 탭 형태로 관리하며, Ctrl+Tab으로 전환 가능합니다.
 * ============================================================================
 */

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { X, Home, GripVertical } from 'lucide-react';
import { cn } from '@erp/ui';
import { useLayoutStore } from '@/lib/store/layout';
import { Button } from '@erp/ui/components';

export function WorkspaceTabs() {
    const router = useRouter();
    const pathname = usePathname();
    const { tabs, activeTabId, setActiveTab, removeTab, addTab } = useLayoutStore();

    // 현재 경로가 변경되면 탭 추가 또는 활성화
    useEffect(() => {
        // 홈은 제외
        if (pathname === '/') return;

        // 이미 탭이 존재하는지 확인
        const existingTab = tabs.find((t) => t.url === pathname);
        if (existingTab) {
            if (activeTabId !== existingTab.id) {
                setActiveTab(existingTab.id);
            }
        } else {
            // 새 탭 추가 (타이틀은 임시로 경로명 사용, 실제로는 메뉴 구조에서 찾아야 함)
            // 간단히 경로의 마지막 부분을 타이틀로 사용
            const title = pathname.split('/').pop() || 'Unknown';
            const id = pathname; // URL을 ID로 사용
            addTab({
                id,
                title: decodeURIComponent(title).toUpperCase(),
                url: pathname,
            });
        }
    }, [pathname, tabs, activeTabId, addTab, setActiveTab]);

    // 탭 클릭 핸들러
    const handleTabClick = (url: string, id: string) => {
        setActiveTab(id);
        router.push(url);
    };

    // 탭 닫기 핸들러
    const handleCloseTab = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        removeTab(id);
        // 활성 탭이 닫히면 store에서 다음 탭을 activeTabId로 설정함
        // Router 이동은 store 구독 또는 effect에서 처리 필요하지만
        // 간단히 마지막 탭이나 홈으로 이동하는 로직을 추가
        if (activeTabId === id) {
            const remaining = tabs.filter(t => t.id !== id);
            if (remaining.length > 0) {
                const lastTab = remaining[remaining.length - 1];
                if (lastTab) router.push(lastTab.url);
            } else {
                router.push('/');
            }
        }
    };

    if (tabs.length === 0) return null;

    return (
        <div className="flex h-9 w-full items-center gap-1 border-b bg-muted/30 px-2 overflow-x-auto">
            {/* 홈 탭 (고정) */}
            <Button
                variant="ghost"
                size="sm"
                className={cn(
                    'h-7 gap-1.5 px-2 text-xs font-normal border border-transparent',
                    pathname === '/' && 'bg-background shadow-sm border-muted'
                )}
                onClick={() => router.push('/')}
            >
                <Home className="h-3.5 w-3.5" />
                <span className="sr-only">Home</span>
            </Button>

            <div className="h-4 w-px bg-border mx-1" />

            {/* 동적 탭 목록 */}
            {tabs.map((tab) => {
                const isActive = tab.id === activeTabId;
                return (
                    <div
                        key={tab.id}
                        onClick={() => handleTabClick(tab.url, tab.id)}
                        className={cn(
                            'group flex h-7 min-w-[120px] max-w-[200px] cursor-pointer items-center justify-between rounded-t-md border border-transparent px-2 text-xs transition-all hover:bg-muted',
                            isActive && 'bg-background font-medium text-foreground shadow-sm border-muted border-b-background translate-y-[1px]'
                        )}
                    >
                        <div className="flex items-center gap-1.5 truncate">
                            <GripVertical className="h-3 w-3 text-muted-foreground/30 opacity-0 group-hover:opacity-100 cursor-grab" />
                            <span className="truncate">{tab.title}</span>
                        </div>
                        <button
                            onClick={(e) => handleCloseTab(e, tab.id)}
                            className="ml-1 rounded-sm p-0.5 opacity-0 hover:bg-muted-foreground/20 group-hover:opacity-100"
                        >
                            <X className="h-3 w-3" />
                            <span className="sr-only">닫기</span>
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

/**
 * ============================================================================
 * 파일명: sidebar.tsx
 * 앱: shell
 * 경로: apps/shell/components/layout/sidebar.tsx
 * 작성일: 2025-12-20
 * 수정일: 2025-12-20 (메뉴 클릭 → 탭 생성 기능 추가)
 * ============================================================================
 *
 * [📄 파일 설명]
 * 좌측 사이드바 네비게이션입니다.
 * 메뉴 클릭 시 해당 페이지가 탭으로 열립니다.
 * ============================================================================
 */

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@erp/ui';
import { Button } from '@erp/ui/components';
import { MENU_STRUCTURE } from '@erp/shared';
import { LayoutDashboard, ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useTabStore } from '@/stores/tab-store';

// Lucide 아이콘 동적 렌더링
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Icon = (Icons as any)[name];
    if (!Icon) return <LayoutDashboard className={className} />;
    return <Icon className={className} />;
};

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { openTab } = useTabStore();

    /**
     * 메뉴 클릭 핸들러 - 탭 생성 및 페이지 이동
     */
    const handleMenuClick = (
        e: React.MouseEvent,
        menuId: string,
        menuLabel: string,
        menuPath: string,
        menuIcon?: string
    ) => {
        e.preventDefault();

        // 탭 생성
        openTab({
            id: menuId,
            title: menuLabel,
            href: menuPath,
            icon: menuIcon,
        });

        // 페이지 이동
        router.push(menuPath);
    };

    return (
        <aside
            className={cn(
                'relative flex h-full w-full flex-col border-r bg-muted/10',
                'min-w-[240px]'
            )}
        >
            {/* 상단 즐겨찾기/최근 영역 */}
            <div className="p-4 border-b">
                <h3 className="text-xs font-semibold text-muted-foreground mb-2">
                    즐겨찾기
                </h3>
                <div className="space-y-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-sm h-8 px-2">
                        <span className="truncate">⭐ 이번 달 지출 결의</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-sm h-8 px-2">
                        <span className="truncate">⭐ 부서별 예산 현황</span>
                    </Button>
                </div>
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-2">
                    {MENU_STRUCTURE.map((menu) => {
                        const menuPath = menu.path || '/dashboard';
                        const isActive = pathname.startsWith(menuPath);

                        return (
                            <li key={menu.id}>
                                <div className="space-y-1">
                                    <Link
                                        href={menuPath}
                                        onClick={(e) => handleMenuClick(e, menu.id, menu.label, menuPath, menu.icon)}
                                        className={cn(
                                            'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                                            isActive ? 'bg-accent/50 text-accent-foreground' : 'text-muted-foreground'
                                        )}
                                    >
                                        <DynamicIcon name={menu.icon || 'LayoutDashboard'} className="h-4 w-4 shrink-0" />
                                        <span className="ml-3 truncate flex-1">{menu.label}</span>
                                        {menu.children && (
                                            <ChevronDown className="h-3 w-3 text-muted-foreground/50" />
                                        )}
                                    </Link>

                                    {/* Submenu */}
                                    {menu.children && isActive && (
                                        <ul className="ml-4 space-y-1 border-l pl-2">
                                            {menu.children.map((child) => (
                                                <li key={child.id}>
                                                    <Link
                                                        href={child.path || '#'}
                                                        onClick={(e) => handleMenuClick(e, child.id, child.label, child.path || '#', child.icon)}
                                                        className={cn(
                                                            'flex h-8 w-full items-center rounded-md px-2 text-sm text-muted-foreground transition-colors hover:text-foreground',
                                                            pathname === child.path && 'bg-muted text-foreground font-medium'
                                                        )}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* 하단 버전 정보 */}
            <div className="p-4 text-xs text-muted-foreground border-t">
                <p>ERP v2.0</p>
                <p className="mt-1">© 2025 GovTech</p>
            </div>
        </aside>
    );
}

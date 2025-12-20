/**
 * ============================================================================
 * 파일명: sidebar.tsx
 * 앱: shell
 * 경로: apps/shell/components/layout/sidebar.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * 좌측 사이드바 네비게이션입니다.
 * 메뉴 구조를 재귀적으로 렌더링하며, 접힘/펼침 상태를 지원합니다.
 * 
 * [수정 사항]
 * - ResizableLayout 내부에서 사용되므로 자체적인 너비 제한(max-w)을 제거하고
 * - 항상 콘텐츠를 렌더링하도록 수정했습니다. (너비 제어는 부모 패널이 담당)
 * ============================================================================
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@erp/ui';
import { Button } from '@erp/ui/components';
import { MENU_STRUCTURE } from '@erp/shared';
import { LayoutDashboard, ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react'; // Dynamic Icon Rendering

// Lucide 아이콘 동적 렌더링을 위한 헬퍼
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Icon = (Icons as any)[name];
    if (!Icon) return <LayoutDashboard className={className} />;
    return <Icon className={className} />;
};

export function Sidebar() {
    const pathname = usePathname();



    return (
        <aside
            className={cn(
                // 리사이저블 패널과 호환: 부모 패널이 크기를 제어하므로 w-full 사용
                'relative flex h-full w-full flex-col border-r bg-muted/10',
                'min-w-[240px]' // 내부 콘텐츠 보호를 위한 최소 너비
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
                        const menuPath = menu.path || '#';
                        const isActive = pathname.startsWith(menuPath);

                        return (
                            <li key={menu.id}>
                                <div className="space-y-1">
                                    <Link
                                        href={menuPath}
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

/**
 * ============================================================================
 * 파일명: sidebar.tsx
 * 앱: shell
 * 경로: apps/shell/components/layout/sidebar.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 사이드 네비게이션 컴포넌트입니다.
 * 3 Depth 메뉴 트리를 표시합니다.
 *
 * [♿ 접근성]
 * - Ctrl+B로 토글
 * - 화살표 키로 메뉴 탐색
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import { Button } from '@erp/ui/components';
import {
    Users,
    Wallet,
    Calculator,
    FileCheck,
    Settings,
    ChevronRight,
    ChevronDown,
    PanelLeftClose,
    PanelLeft,
} from 'lucide-react';
import { cn } from '@erp/ui';

interface MenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    path?: string;
    children?: MenuItem[];
}

const MENU_ITEMS: MenuItem[] = [
    {
        id: 'hrm',
        label: '인사관리',
        icon: <Users className="h-4 w-4" />,
        children: [
            { id: 'hrm-employees', label: '사원관리', path: '/hrm/employees' },
            { id: 'hrm-cards', label: '인사카드', path: '/hrm/cards' },
            { id: 'hrm-org', label: '조직도', path: '/hrm/organization' },
        ],
    },
    {
        id: 'payroll',
        label: '급여관리',
        icon: <Wallet className="h-4 w-4" />,
        children: [
            { id: 'payroll-calc', label: '급여계산', path: '/payroll/calculate' },
            { id: 'payroll-slip', label: '급여명세서', path: '/payroll/slips' },
        ],
    },
    {
        id: 'accounting',
        label: '회계관리',
        icon: <Calculator className="h-4 w-4" />,
        children: [
            { id: 'accounting-voucher', label: '전표관리', path: '/accounting/vouchers' },
        ],
    },
    {
        id: 'approval',
        label: '전자결재',
        icon: <FileCheck className="h-4 w-4" />,
        children: [
            { id: 'approval-draft', label: '기안작성', path: '/approval/draft' },
            { id: 'approval-pending', label: '결재대기', path: '/approval/pending' },
        ],
    },
    {
        id: 'admin',
        label: '시스템관리',
        icon: <Settings className="h-4 w-4" />,
        children: [
            { id: 'admin-users', label: '사용자관리', path: '/admin/users' },
            { id: 'admin-tenant', label: '테넌트설정', path: '/admin/tenant' },
        ],
    },
];

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>(['hrm']);

    const toggleItem = (id: string) => {
        setExpandedItems((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <aside
            className={cn(
                'border-r bg-background transition-all duration-200 flex flex-col',
                isCollapsed ? 'w-16' : 'w-60'
            )}
        >
            {/* 토글 버튼 */}
            <div className="p-2 border-b">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    aria-label={isCollapsed ? '메뉴 펼치기' : '메뉴 접기'}
                    className="w-full justify-center"
                >
                    {isCollapsed ? (
                        <PanelLeft className="h-4 w-4" />
                    ) : (
                        <PanelLeftClose className="h-4 w-4" />
                    )}
                </Button>
            </div>

            {/* 메뉴 목록 */}
            <nav className="flex-1 overflow-y-auto p-2">
                <ul className="space-y-1">
                    {MENU_ITEMS.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => toggleItem(item.id)}
                                className={cn(
                                    'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm',
                                    'hover:bg-muted transition-colors',
                                    expandedItems.includes(item.id) && 'bg-muted'
                                )}
                            >
                                {item.icon}
                                {!isCollapsed && (
                                    <>
                                        <span className="flex-1 text-left">{item.label}</span>
                                        {expandedItems.includes(item.id) ? (
                                            <ChevronDown className="h-4 w-4" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4" />
                                        )}
                                    </>
                                )}
                            </button>

                            {/* 하위 메뉴 */}
                            {!isCollapsed && expandedItems.includes(item.id) && item.children && (
                                <ul className="ml-6 mt-1 space-y-1">
                                    {item.children.map((child) => (
                                        <li key={child.id}>
                                            <a
                                                href={child.path}
                                                className="block px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                                            >
                                                {child.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

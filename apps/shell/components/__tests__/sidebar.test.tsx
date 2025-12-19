/**
 * @file Sidebar 컴포넌트 통합 테스트
 * @description 사이드바 메뉴 렌더링 및 상호작용 테스트
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

// Mock next/navigation
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(() => '/dashboard'),
}));

// Mock next/link
jest.mock('next/link', () => {
    return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
        return <a href={href}>{children}</a>;
    };
});

// Mock @erp/ui
jest.mock('@erp/ui', () => ({
    cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

jest.mock('@erp/ui/components', () => ({
    Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

// Mock layout store
const mockToggleSidebar = jest.fn();
jest.mock('@/lib/store/layout', () => ({
    useLayoutStore: () => ({
        sidebarOpen: true,
        toggleSidebar: mockToggleSidebar,
    }),
}));

// Mock @erp/shared menu structure
jest.mock('@erp/shared', () => ({
    MENU_STRUCTURE: [
        {
            id: 'dashboard',
            label: '대시보드',
            path: '/dashboard',
            icon: 'LayoutDashboard',
        },
        {
            id: 'hrm',
            label: '인사관리',
            path: '/hrm',
            icon: 'Users',
            children: [
                { id: 'employees', label: '직원관리', path: '/hrm/employees' },
            ],
        },
        {
            id: 'finance',
            label: '재무회계',
            path: '/finance',
            icon: 'Calculator',
        },
    ],
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
    LayoutDashboard: ({ className }: { className?: string }) => (
        <span data-testid="icon-dashboard" className={className}>Dashboard</span>
    ),
    ChevronDown: ({ className }: { className?: string }) => (
        <span data-testid="icon-chevron" className={className}>▼</span>
    ),
    Users: ({ className }: { className?: string }) => (
        <span data-testid="icon-users" className={className}>Users</span>
    ),
    Calculator: ({ className }: { className?: string }) => (
        <span data-testid="icon-calculator" className={className}>Calculator</span>
    ),
}));

describe('Sidebar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('렌더링', () => {
        it('사이드바가 올바르게 렌더링된다', async () => {
            const { Sidebar } = await import('@/components/layout/sidebar');
            render(<Sidebar />);

            expect(screen.getByText('대시보드')).toBeInTheDocument();
            expect(screen.getByText('인사관리')).toBeInTheDocument();
            expect(screen.getByText('재무회계')).toBeInTheDocument();
        });

        it('메뉴 항목이 올바른 링크를 가진다', async () => {
            const { Sidebar } = await import('@/components/layout/sidebar');
            render(<Sidebar />);

            const dashboardLink = screen.getByText('대시보드').closest('a');
            expect(dashboardLink).toHaveAttribute('href', '/dashboard');
        });

        it('버전 정보가 표시된다', async () => {
            const { Sidebar } = await import('@/components/layout/sidebar');
            render(<Sidebar />);

            expect(screen.getByText('ERP v2.0')).toBeInTheDocument();
            expect(screen.getByText('© 2025 GovTech')).toBeInTheDocument();
        });

        it('즐겨찾기 섹션이 표시된다', async () => {
            const { Sidebar } = await import('@/components/layout/sidebar');
            render(<Sidebar />);

            expect(screen.getByText('즐겨찾기')).toBeInTheDocument();
        });
    });

    describe('상호작용', () => {
        it('Ctrl+B 단축키로 사이드바 토글이 가능하다', async () => {
            const user = userEvent.setup();
            const { Sidebar } = await import('@/components/layout/sidebar');
            render(<Sidebar />);

            await user.keyboard('{Control>}b{/Control}');

            expect(mockToggleSidebar).toHaveBeenCalled();
        });
    });

    describe('접근성', () => {
        it('사이드바가 aside 요소로 렌더링된다', async () => {
            const { Sidebar } = await import('@/components/layout/sidebar');
            const { container } = render(<Sidebar />);

            const aside = container.querySelector('aside');
            expect(aside).toBeInTheDocument();
        });

        it('네비게이션 영역이 있다', async () => {
            const { Sidebar } = await import('@/components/layout/sidebar');
            const { container } = render(<Sidebar />);

            const nav = container.querySelector('nav');
            expect(nav).toBeInTheDocument();
        });
    });
});

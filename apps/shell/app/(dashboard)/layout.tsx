/**
 * ============================================================================
 * 파일명: layout.tsx
 * 앱: shell
 * 경로: apps/shell/app/(dashboard)/layout.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 대시보드 레이아웃입니다.
 * Header, Sidebar, Main, StatusBar로 구성됩니다.
 * ============================================================================
 */

import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { StatusBar } from '@/components/layout/status-bar';
import { WorkspaceTabs } from '@/components/layout/workspace-tabs';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen flex-col overflow-hidden bg-background">
            {/* 1. 글로벌 헤더 (64px) */}
            <Header />

            {/* 2. 메인 영역 (Flex) */}
            <div className="flex flex-1 overflow-hidden">
                {/* 좌측 사이드바 */}
                <Sidebar />

                {/* 콘텐츠 영역 */}
                <main className="flex flex-1 flex-col overflow-hidden bg-muted/10 relative">
                    {/* 상단 탭 네비게이션 */}
                    <div className="flex-none">
                        <WorkspaceTabs />
                    </div>

                    {/* 실제 페이지 콘텐츠 */}
                    <div className="flex-1 overflow-auto p-4 md:p-6" id="main-content">
                        {children}
                    </div>
                </main>
            </div>

            {/* 3. 상태바 (32px) */}
            <StatusBar />
        </div>
    );
}

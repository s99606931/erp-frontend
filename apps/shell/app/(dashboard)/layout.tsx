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

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen flex-col">
            {/* 헤더 (64px 고정) */}
            <Header />

            <div className="flex flex-1 overflow-hidden">
                {/* 사이드바 (240px, 접힘 64px) */}
                <Sidebar />

                {/* 메인 콘텐츠 */}
                <main className="flex-1 overflow-auto bg-muted/30 p-6">
                    {children}
                </main>
            </div>

            {/* 상태바 (32px 고정) */}
            <StatusBar />
        </div>
    );
}

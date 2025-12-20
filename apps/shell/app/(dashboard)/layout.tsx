/**
 * ============================================================================
 * 파일명: layout.tsx
 * 앱: shell
 * 경로: apps/shell/app/(dashboard)/layout.tsx
 * 작성일: 2025-12-19
 * 수정일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * 대시보드 레이아웃입니다.
 * Header, ResizableLayout(Sidebar + Main), StatusBar로 구성됩니다.
 *
 * [🎯 주요 기능]
 * 1. 사이드바 크기 드래그로 조정 가능
 * 2. 사이드바 접기/펼치기
 * 3. 레이아웃 상태 localStorage 저장
 * ============================================================================
 */

import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { StatusBar } from '@/components/layout/status-bar';
import { TabBar } from '@/components/layout/tab-bar';
import { ResizableLayout } from '@/components/layout/resizable-layout';
import { SplitView } from '@/components/layout/split-view';
import { CommandPalette } from '@/components/features/command-palette';
import { AIPanel } from '@/components/features/ai-panel';
import { AIFAB } from '@/components/features/ai-fab';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen flex-col overflow-hidden bg-background">
            <CommandPalette />
            <AIPanel />
            <AIFAB />

            {/* 1. 글로벌 헤더 (64px) */}
            <Header />

            {/* 2. 메인 영역 - 리사이저블 레이아웃 */}
            <div className="flex flex-1 overflow-hidden">
                <ResizableLayout
                    sidebar={<Sidebar />}
                    main={
                        <main className="flex h-full flex-1 flex-col overflow-hidden bg-muted/10 relative">
                            {/* 상단 탭 네비게이션 */}
                            <div className="flex-none">
                                <TabBar />
                            </div>

                            {/* 실제 페이지 콘텐츠 */}
                            <div className="flex-1 overflow-hidden p-0" id="main-content">
                                <SplitView>
                                    {children}
                                </SplitView>
                            </div>
                        </main>
                    }

                />
            </div>

            {/* 3. 상태바 (32px) */}
            <StatusBar />
        </div>
    );
}

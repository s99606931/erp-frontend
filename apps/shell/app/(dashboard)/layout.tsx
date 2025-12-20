/**
 * ============================================================================
 * 파일명: layout.tsx
 * 앱: shell
 * 경로: apps/shell/app/(dashboard)/layout.tsx
 * 작성일: 2025-12-19
 * 수정일: 2025-12-20 (UI Polish)
 * ============================================================================
 *
 * [📄 파일 설명]
 * 대시보드 레이아웃입니다.
 * 사이드바, 메인 콘텐츠, AI 패널이 모두 리사이징 가능합니다.
 * 
 * [🎯 주요 기능]
 * - 햄버거 버튼: 사이드바만 제어
 * - AI 버튼: AI 패널만 제어
 * - 각 패널 독립적 접힘/펼침
 * ============================================================================
 */

'use client';

import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { StatusBar } from '@/components/layout/status-bar';
import { DraggableTabBar } from '@/components/layout/draggable-tab-bar';
import { SplitView } from '@/components/layout/split-view';
import { CommandPalette } from '@/components/features/command-palette';
import { AIPanelContent } from '@/components/features/ai-panel';
import { AIFAB } from '@/components/features/ai-fab';
import { ShortcutsHelp } from '@/components/features/shortcuts-help';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { useLayoutStore } from '@/lib/store/layout';
import { useAIPanelStore } from '@/stores/ai-panel-store';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@erp/ui';

// 레이아웃 상수
const SIDEBAR_DEFAULT_SIZE = 220;  // 사이드바 기본 너비 (더 좁게)
const SIDEBAR_MIN_SIZE = 180;      // 사이드바 최소 너비
const SIDEBAR_MAX_SIZE = 320;      // 사이드바 최대 너비
const AI_PANEL_DEFAULT_SIZE = 320; // AI 패널 기본 너비
const AI_PANEL_MIN_SIZE = 280;     // AI 패널 최소 너비
const AI_PANEL_MAX_SIZE = 500;     // AI 패널 최대 너비

/**
 * 대시보드 레이아웃 컴포넌트
 * 
 * 3-pane 구조: Sidebar | Main | AI Panel
 * 햄버거 → 사이드바만 제어
 * AI 버튼 → AI 패널만 제어
 */
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // 사이드바 Store (햄버거 버튼 연동)
    const { sidebarOpen, setSidebarOpen, toggleSidebar } = useLayoutStore();

    // AI 패널 Store (AI 버튼 연동)
    const { isOpen: aiPanelOpen, toggle: toggleAI, open: openAI, close: closeAI } = useAIPanelStore();

    // 로컬 접힘 상태 (드래그로 변경 시 Store와 동기화)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(!sidebarOpen);
    const [aiPanelCollapsed, setAIPanelCollapsed] = useState(!aiPanelOpen);

    // 키보드 단축키: 각 패널 독립 제어
    useKeyboardShortcuts({
        'sidebar.toggle': toggleSidebar,  // Ctrl+B: 사이드바만
        'aiPanel.toggle': toggleAI,       // Ctrl+Shift+I: AI만
        'save': () => alert('저장되었습니다 (Mock)'),
    });

    // 사이드바 Store 변경 → 로컬 상태 동기화
    useEffect(() => {
        setSidebarCollapsed(!sidebarOpen);
    }, [sidebarOpen]);

    // AI 패널 Store 변경 → 로컬 상태 동기화
    useEffect(() => {
        setAIPanelCollapsed(!aiPanelOpen);
    }, [aiPanelOpen]);

    /**
     * 패널 크기 변경 핸들러 (드래그로 접힘 감지)
     */
    const handleChange = (sizes: number[]) => {
        const sidebarSize = sizes[0] ?? 0;
        const aiPanelSize = sizes[2] ?? 0;

        // 사이드바: 드래그로 접힘 → Store 업데이트
        const newSidebarCollapsed = sidebarSize < 50;
        if (newSidebarCollapsed !== sidebarCollapsed) {
            setSidebarCollapsed(newSidebarCollapsed);
            setSidebarOpen(!newSidebarCollapsed);
        }

        // AI 패널: 드래그로 접힘 → Store 업데이트  
        const newAIPanelCollapsed = aiPanelSize < 50;
        if (newAIPanelCollapsed !== aiPanelCollapsed) {
            setAIPanelCollapsed(newAIPanelCollapsed);
            if (newAIPanelCollapsed) {
                closeAI();
            } else {
                openAI();
            }
        }
    };

    /**
     * 사이드바 펼치기 (화살표 버튼용)
     */
    const expandSidebar = () => {
        setSidebarOpen(true);
    };

    /**
     * AI 패널 펼치기 (화살표 버튼용)
     */
    const expandAIPanel = () => {
        openAI();
    };

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-background">
            <ShortcutsHelp />
            <CommandPalette />
            <AIFAB />

            {/* 글로벌 헤더 */}
            <Header />

            {/* 메인 영역 - 3-pane Allotment */}
            <div className="flex flex-1 overflow-hidden">
                <Allotment
                    onChange={handleChange}
                    proportionalLayout={false}
                    separator={false}
                >
                    {/* 사이드바 Pane */}
                    <Allotment.Pane
                        preferredSize={sidebarCollapsed ? 0 : SIDEBAR_DEFAULT_SIZE}
                        minSize={sidebarCollapsed ? 0 : SIDEBAR_MIN_SIZE}
                        maxSize={SIDEBAR_MAX_SIZE}
                        snap
                        visible={!sidebarCollapsed}
                    >
                        <div className="h-full overflow-hidden border-r border-border/40">
                            <Sidebar />
                        </div>
                    </Allotment.Pane>

                    {/* 메인 콘텐츠 Pane */}
                    <Allotment.Pane minSize={400}>
                        <div className="relative h-full overflow-hidden">
                            {/* 사이드바 펼치기 버튼 */}
                            {sidebarCollapsed && (
                                <button
                                    onClick={expandSidebar}
                                    className={cn(
                                        "absolute left-0 top-1/2 z-20 -translate-y-1/2",
                                        "flex h-12 w-5 items-center justify-center",
                                        "rounded-r-md bg-muted/60 hover:bg-accent",
                                        "transition-colors border border-l-0 border-border/30"
                                    )}
                                    aria-label="사이드바 펼치기"
                                >
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </button>
                            )}

                            <main className="flex h-full flex-col overflow-hidden">
                                {/* 탭 바 - 항상 표시 (빈 탭 시에도 영역 확보) */}
                                <div className="flex-none border-b border-border/40 bg-muted/30 min-h-[40px]">
                                    <DraggableTabBar />
                                </div>

                                {/* 페이지 콘텐츠 */}
                                <div className="flex-1 overflow-hidden" id="main-content">
                                    <SplitView>
                                        {children}
                                    </SplitView>
                                </div>
                            </main>

                            {/* AI 패널 펼치기 버튼 */}
                            {aiPanelCollapsed && (
                                <button
                                    onClick={expandAIPanel}
                                    className={cn(
                                        "absolute right-0 top-1/2 z-20 -translate-y-1/2",
                                        "flex h-12 w-5 items-center justify-center",
                                        "rounded-l-md bg-muted/60 hover:bg-accent",
                                        "transition-colors border border-r-0 border-border/30"
                                    )}
                                    aria-label="AI 패널 열기"
                                >
                                    <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                                </button>
                            )}
                        </div>
                    </Allotment.Pane>

                    {/* AI 패널 Pane */}
                    <Allotment.Pane
                        preferredSize={aiPanelCollapsed ? 0 : AI_PANEL_DEFAULT_SIZE}
                        minSize={aiPanelCollapsed ? 0 : AI_PANEL_MIN_SIZE}
                        maxSize={AI_PANEL_MAX_SIZE}
                        snap
                        visible={!aiPanelCollapsed}
                    >
                        <div className="h-full overflow-hidden border-l border-border/40">
                            <AIPanelContent />
                        </div>
                    </Allotment.Pane>
                </Allotment>
            </div>

            {/* 상태바 */}
            <StatusBar />
        </div>
    );
}

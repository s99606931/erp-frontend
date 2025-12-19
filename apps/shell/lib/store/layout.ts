/**
 * ============================================================================
 * 파일명: layout.ts
 * 앱: shell
 * 경로: apps/shell/lib/store/layout.ts
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * 레이아웃 상태 관리를 위한 Zustand Store입니다.
 * 사이드바 토글 상태와 워크스페이스 탭 상태를 관리합니다.
 * ============================================================================
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Tab {
    id: string;
    title: string;
    url: string;
    icon?: string;
    isPinned?: boolean;
}

interface LayoutState {
    // Sidebar State
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;

    // Workspace Tabs State
    tabs: Tab[];
    activeTabId: string | null;
    addTab: (tab: Tab) => void;
    removeTab: (id: string) => void;
    setActiveTab: (id: string) => void;
    reorderTabs: (tabs: Tab[]) => void;
    closeAllTabs: () => void;
    closeOtherTabs: (id: string) => void;
}

export const useLayoutStore = create<LayoutState>()(
    persist(
        (set) => ({
            // Sidebar
            sidebarOpen: true,
            toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
            setSidebarOpen: (open) => set({ sidebarOpen: open }),

            // Tabs
            tabs: [], // 초기에는 빈 탭
            activeTabId: null,

            addTab: (tab) =>
                set((state) => {
                    const exists = state.tabs.find((t) => t.id === tab.id);
                    if (exists) {
                        return { activeTabId: tab.id };
                    }
                    return {
                        tabs: [...state.tabs, tab],
                        activeTabId: tab.id,
                    };
                }),

            removeTab: (id) =>
                set((state) => {
                    const newTabs = state.tabs.filter((t) => t.id !== id);
                    const isActive = state.activeTabId === id;

                    // 닫은 탭이 활성화 상태였다면, 마지막 탭을 활성화
                    let nextActiveId = state.activeTabId;
                    if (isActive) {
                        const lastTab = newTabs.length > 0 ? newTabs[newTabs.length - 1] : undefined;
                        nextActiveId = lastTab ? lastTab.id : null;
                    }

                    return {
                        tabs: newTabs,
                        activeTabId: nextActiveId,
                    };
                }),

            setActiveTab: (id) => set({ activeTabId: id }),

            reorderTabs: (tabs) => set({ tabs }),

            closeAllTabs: () => set({ tabs: [], activeTabId: null }),

            closeOtherTabs: (id) =>
                set((state) => {
                    const targetTab = state.tabs.find((t) => t.id === id);
                    return {
                        tabs: targetTab ? [targetTab] : [],
                        activeTabId: targetTab ? targetTab.id : null,
                    };
                }),
        }),
        {
            name: 'erp-layout-storage', // 로컬 스토리지 키
            partialize: (state) => ({
                sidebarOpen: state.sidebarOpen,
                tabs: state.tabs,
                activeTabId: state.activeTabId
            }), // 저장할 상태 선택
        }
    )
);

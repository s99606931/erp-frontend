/**
 * ============================================================================
 * 파일명: tab-store.ts
 * 패키지: @erp/shell
 * 경로: apps/shell/stores/tab-store.ts
 * 작성일: 2025-12-20
 * ============================================================================
 * 
 * [📄 파일 설명]
 * 탭 상태를 관리하는 Zustand 스토어입니다.
 * 열린 탭 목록, 활성 탭, 탭 추가/삭제 기능을 제공합니다.
 * 
 * [🎯 주요 기능]
 * 1. 탭 목록 관리 (추가, 삭제, 전환)
 * 2. 활성 탭 추적
 * 3. 탭 순서 변경
 * 4. localStorage 동기화 (새로고침 시 탭 유지)
 * 
 * [📦 사용 예시]
 * ```tsx
 * const { tabs, activeTabId, openTab, closeTab } = useTabStore();
 * ```
 * ============================================================================
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 탭 정보를 나타내는 타입
 * 
 * @property id - 탭의 고유 식별자
 * @property title - 탭에 표시할 제목 (예: "예산안 작성")
 * @property href - 탭이 가리키는 URL 경로
 * @property icon - 탭에 표시할 아이콘 (선택적)
 */
export interface Tab {
  id: string;
  title: string;
  href: string;
  icon?: string;
}

/**
 * 탭 스토어의 상태와 액션을 정의하는 타입
 */
interface TabStore {
  /** 현재 열린 탭 목록 */
  tabs: Tab[];

  /** 현재 활성화된 탭의 ID */
  activeTabId: string | null;

  /**
   * 새 탭을 열거나, 이미 열린 탭으로 전환합니다
   * @param tab - 열려는 탭 정보
   */
  openTab: (tab: Tab) => void;

  /**
   * 탭을 닫습니다
   * @param tabId - 닫을 탭의 ID
   */
  closeTab: (tabId: string) => void;

  /**
   * 특정 탭을 활성화합니다
   * @param tabId - 활성화할 탭의 ID
   */
  setActiveTab: (tabId: string) => void;

  /**
   * 다음 탭으로 전환합니다 (Ctrl+Tab)
   */
  nextTab: () => void;

  /**
   * 탭 목록을 직접 설정합니다 (드래그 앤 드롭 순서 변경용)
   * @param tabs - 설정할 탭 목록
   */
  setTabs: (tabs: Tab[]) => void;

  /**
   * 이전 탭으로 전환합니다 (Ctrl+Shift+Tab)
   */
  prevTab: () => void;
}

/**
 * 탭 상태를 관리하는 Zustand 스토어
 * 
 * persist 미들웨어를 사용하여 localStorage에 탭 상태를 저장합니다.
 * 페이지를 새로고침해도 열렸던 탭이 유지됩니다.
 * 
 * @example
 * // 컴포넌트에서 사용
 * function TabBar() {
 *   const { tabs, activeTabId, openTab, closeTab } = useTabStore();
 *   return (
 *     <div>
 *       {tabs.map(tab => (
 *         <Tab key={tab.id} active={tab.id === activeTabId} />
 *       ))}
 *     </div>
 *   );
 * }
 */
export const useTabStore = create<TabStore>()(
  // persist: localStorage에 상태를 자동 저장/복원합니다
  persist(
    (set, get) => ({
      tabs: [],
      activeTabId: null,

      openTab: (tab: Tab) => {
        const { tabs } = get();

        // 이미 열린 탭인지 확인
        const existingTab = tabs.find(t => t.id === tab.id);

        if (existingTab) {
          // 이미 열려있으면 해당 탭을 활성화
          set({ activeTabId: tab.id });
        } else {
          // 새 탭이면 목록에 추가하고 활성화
          set({
            tabs: [...tabs, tab],
            activeTabId: tab.id,
          });
        }
      },

      closeTab: (tabId: string) => {
        const { tabs, activeTabId } = get();

        // 닫으려는 탭의 인덱스 찾기
        const tabIndex = tabs.findIndex(t => t.id === tabId);
        if (tabIndex === -1) return;

        // 탭 목록에서 제거
        const newTabs = tabs.filter(t => t.id !== tabId);

        // 닫은 탭이 활성 탭이었다면 다른 탭 활성화
        let newActiveTabId = activeTabId;
        if (activeTabId === tabId) {
          if (newTabs.length > 0) {
            // 다음 탭 또는 이전 탭 활성화
            // 닫힌 탭이 마지막이었다면 바로 앞 탭, 아니면 바로 뒤 탭
            // 보통 브라우저는 닫힌 탭의 오른쪽 탭이 오는데, 여기서는 인덱스 유지 또는 조정
            const newIndex = Math.min(tabIndex, newTabs.length - 1);
            // 옵셔널 체이닝으로 undefined 체크 강화
            newActiveTabId = newTabs[newIndex]?.id || null;
          } else {
            newActiveTabId = null;
          }
        }

        set({ tabs: newTabs, activeTabId: newActiveTabId });
      },

      setActiveTab: (tabId: string) => {
        set({ activeTabId: tabId });
      },

      nextTab: () => {
        const { tabs, activeTabId } = get();
        if (tabs.length === 0) return;

        const currentIndex = tabs.findIndex(t => t.id === activeTabId);
        // currentIndex가 -1이면(못 찾으면) 0번으로
        const startIndex = currentIndex === -1 ? 0 : currentIndex;

        const nextIndex = (startIndex + 1) % tabs.length;
        set({ activeTabId: tabs[nextIndex]?.id || null });
      },

      prevTab: () => {
        const { tabs, activeTabId } = get();
        if (tabs.length === 0) return;

        const currentIndex = tabs.findIndex(t => t.id === activeTabId);
        const startIndex = currentIndex === -1 ? 0 : currentIndex;

        const prevIndex = (startIndex - 1 + tabs.length) % tabs.length;
        set({ activeTabId: tabs[prevIndex]?.id || null });
      },
      setTabs: (tabs: Tab[]) => {
        set({ tabs });
      },
    }),
    {
      // localStorage에 저장할 때 사용할 키 이름
      name: 'erp-tabs',
    }
  )
);

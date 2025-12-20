# Phase 21: 탭 시스템

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)  
> **📋 관련 PRD**: [PRD_UX_ENHANCEMENT.md](../../.agent/docs/PRD_UX_ENHANCEMENT.md) - 섹션 3.1

---

## 📌 목표

VS Code처럼 여러 업무 화면을 탭으로 관리할 수 있는 시스템을 구현합니다.

**완료 조건**: 
- 새 탭 열기/닫기 동작
- 탭 클릭으로 전환
- Ctrl+Tab 단축키 동작

---

## 🎯 학습 목표

1. Zustand를 사용한 전역 상태 관리
2. 탭 UI 컴포넌트 구현
3. 키보드 단축키 연동

---

## ✅ 작업 목록

### 21.1 탭 상태 관리 Store 생성

**파일 위치**: `apps/shell/stores/tab-store.ts`

```typescript
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
            const newIndex = Math.min(tabIndex, newTabs.length - 1);
            newActiveTabId = newTabs[newIndex].id;
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
        const nextIndex = (currentIndex + 1) % tabs.length;
        set({ activeTabId: tabs[nextIndex].id });
      },
      
      prevTab: () => {
        const { tabs, activeTabId } = get();
        if (tabs.length === 0) return;
        
        const currentIndex = tabs.findIndex(t => t.id === activeTabId);
        const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        set({ activeTabId: tabs[prevIndex].id });
      },
    }),
    {
      // localStorage에 저장할 때 사용할 키 이름
      name: 'erp-tabs',
    }
  )
);
```

**확인 방법**: TypeScript 에러 없음

---

### 21.2 탭 바 컴포넌트 생성

**파일 위치**: `apps/shell/components/layout/tab-bar.tsx`

```tsx
/**
 * ============================================================================
 * 파일명: tab-bar.tsx
 * 설명: 워크스페이스 탭 바 컴포넌트
 * ============================================================================
 */

'use client';

import { useTabStore, Tab } from '@/stores/tab-store';
import { X, Plus } from 'lucide-react';
import { cn } from '@erp/ui/lib/utils';
import { useRouter } from 'next/navigation';

/**
 * 탭 바 컴포넌트
 * 
 * 열린 탭들을 가로로 나열하고, 클릭하면 해당 탭으로 전환합니다.
 * 각 탭에는 닫기 버튼이 있습니다.
 */
export function TabBar() {
  const router = useRouter();
  const { tabs, activeTabId, setActiveTab, closeTab } = useTabStore();
  
  /**
   * 탭 클릭 핸들러
   * 클릭한 탭을 활성화하고 해당 URL로 이동합니다.
   */
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.id);
    router.push(tab.href);
  };
  
  /**
   * 탭 닫기 버튼 클릭 핸들러
   * 이벤트 버블링을 막고 탭을 닫습니다.
   */
  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation(); // 부모(탭)의 클릭 이벤트 막기
    closeTab(tabId);
  };
  
  return (
    <div 
      className="flex items-center h-10 bg-muted/50 border-b border-border"
      role="tablist"
      aria-label="열린 탭 목록"
    >
      {/* 탭 목록 */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tab"
          aria-selected={tab.id === activeTabId}
          tabIndex={0}
          onClick={() => handleTabClick(tab)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleTabClick(tab);
            }
          }}
          className={cn(
            // 기본 스타일
            'flex items-center gap-2 px-4 py-2 min-w-[120px] max-w-[200px]',
            'border-r border-border cursor-pointer',
            'transition-colors duration-100',
            // 비활성 탭
            'hover:bg-muted',
            // 활성 탭
            tab.id === activeTabId && 'bg-background border-b-2 border-b-primary'
          )}
        >
          {/* 탭 제목 */}
          <span className="truncate flex-1 text-sm">
            {tab.title}
          </span>
          
          {/* 닫기 버튼 */}
          <button
            onClick={(e) => handleCloseTab(e, tab.id)}
            className="p-1 rounded hover:bg-muted-foreground/20"
            aria-label={`${tab.title} 탭 닫기`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      
      {/* 새 탭 버튼 (선택적) */}
      <button
        className="p-2 hover:bg-muted rounded"
        aria-label="새 탭 열기"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
```

**확인 방법**: 탭 바가 화면에 표시되는지 확인

---

### 21.3 키보드 단축키 훅 생성

**파일 위치**: `apps/shell/hooks/use-tab-shortcuts.ts`

```typescript
/**
 * ============================================================================
 * 파일명: use-tab-shortcuts.ts
 * 설명: 탭 관련 키보드 단축키를 처리하는 훅
 * ============================================================================
 */

'use client';

import { useEffect } from 'react';
import { useTabStore } from '@/stores/tab-store';

/**
 * 탭 단축키 훅
 * 
 * 다음 단축키를 전역으로 등록합니다:
 * - Ctrl+Tab: 다음 탭으로 전환
 * - Ctrl+Shift+Tab: 이전 탭으로 전환
 * - Ctrl+W: 현재 탭 닫기
 */
export function useTabShortcuts() {
  const { nextTab, prevTab, closeTab, activeTabId } = useTabStore();
  
  useEffect(() => {
    /**
     * 키보드 이벤트 핸들러
     * @param e - 키보드 이벤트
     */
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Tab: 다음 탭
      if (e.ctrlKey && e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        nextTab();
      }
      
      // Ctrl+Shift+Tab: 이전 탭
      if (e.ctrlKey && e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        prevTab();
      }
      
      // Ctrl+W: 탭 닫기
      if (e.ctrlKey && e.key === 'w') {
        e.preventDefault();
        if (activeTabId) {
          closeTab(activeTabId);
        }
      }
    };
    
    // 전역 이벤트 리스너 등록
    window.addEventListener('keydown', handleKeyDown);
    
    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextTab, prevTab, closeTab, activeTabId]);
}
```

**확인 방법**: Ctrl+Tab으로 탭 전환 동작

---

### 21.4 레이아웃에 통합

루트 레이아웃에서 `useTabShortcuts` 훅을 사용하고, `TabBar` 컴포넌트를 추가합니다.

---

## 📊 완료 체크리스트

- [ ] `tab-store.ts` 생성 및 모든 함수 주석 작성
- [ ] `tab-bar.tsx` 생성 및 모든 함수 주석 작성
- [ ] `use-tab-shortcuts.ts` 생성
- [ ] 탭 클릭으로 전환 동작
- [ ] Ctrl+Tab 단축키 동작
- [ ] 탭 닫기 동작
- [ ] 새로고침 후 탭 유지 확인
- [ ] TypeScript 에러 없음

---

## 🔧 테스트 방법

1. 사이드바 메뉴를 클릭하여 새 탭 열기
2. 탭을 클릭하여 전환 확인
3. Ctrl+Tab으로 다음 탭 전환
4. 탭의 X 버튼으로 닫기
5. 새로고침 후 탭 유지 확인

---

## ➡️ 다음 단계

[Phase 22: 분할 뷰](./task_phase_22_split_view.md)

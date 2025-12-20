/**
 * ============================================================================
 * 파일명: use-tab-sync.ts
 * 설명: URL과 탭 상태 동기화 훅
 * ============================================================================
 *
 * [📄 파일 설명]
 * 현재 URL(pathname)이 변경될 때 해당하는 탭을 활성화합니다.
 * 브라우저 뒤로가기/앞으로가기, 직접 URL 입력 시에도 탭 상태가 일관되게 유지됩니다.
 * ============================================================================
 */

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTabStore } from '@/stores/tab-store';

/**
 * URL과 탭 상태를 동기화하는 훅
 * 
 * - URL 변경 시 해당 URL을 가진 탭을 활성화
 * - 열린 탭이 없으면 아무 것도 하지 않음
 */
export function useTabSync() {
  const pathname = usePathname();
  const { tabs, activeTabId, setActiveTab } = useTabStore();

  useEffect(() => {
    if (!pathname || tabs.length === 0) return;

    // 현재 URL과 일치하는 탭 찾기
    const matchingTab = tabs.find(tab => {
      // 정확히 일치하거나, 하위 경로인 경우
      return tab.href === pathname || pathname.startsWith(tab.href + '/');
    });

    // 일치하는 탭이 있고, 현재 활성 탭과 다르면 활성화
    if (matchingTab && matchingTab.id !== activeTabId) {
      setActiveTab(matchingTab.id);
    }
  }, [pathname, tabs, activeTabId, setActiveTab]);
}

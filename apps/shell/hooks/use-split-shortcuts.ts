/**
 * ============================================================================
 * 파일명: use-split-shortcuts.ts
 * 패키지: @erp/shell
 * 경로: apps/shell/hooks/use-split-shortcuts.ts
 * 작성일: 2025-12-20
 * ============================================================================
 * 
 * [📄 파일 설명]
 * 분할 뷰 관련 키보드 단축키를 처리하는 커스텀 훅입니다.
 * 
 * [🎯 기능]
 * - Ctrl+\: 수평 분할 (Horizontal Split)
 * - Ctrl+Shift+\: 수직 분할 (Vertical Split)
 * - Ctrl+Shift+M: 패널 최대화 토글 (Toggle Maximize)
 * ============================================================================
 */

'use client';

import { useEffect } from 'react';
import { useSplitViewStore } from '../stores/split-view-store';

/**
 * 분할 뷰 단축키 훅
 */
export function useSplitShortcuts() {
  const {
    activePanelId,
    splitHorizontal,
    splitVertical,
    toggleMaximize
  } = useSplitViewStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+\ : 수평 분할 (key: '\' or 'Backslash')
      // 주의: 브라우저/OS에 따라 key 값이 다를 수 있음
      if (e.ctrlKey && !e.shiftKey && (e.key === '\\' || e.code === 'Backslash')) {
        e.preventDefault();
        splitHorizontal(activePanelId);
      }

      // Ctrl+Shift+\ : 수직 분할 (| 문자)
      // Shift를 누르면 '\' 키는 유색 키보드에서 '|'가 되기도 함.
      // e.key가 '|' 인지 확인
      if (e.ctrlKey && e.shiftKey && (e.key === '|' || e.key === '\\' || e.code === 'Backslash')) {
        e.preventDefault();
        splitVertical(activePanelId);
      }

      // Ctrl+Shift+M : 최대화 토글
      if (e.ctrlKey && e.shiftKey && (e.key === 'm' || e.key === 'M')) {
        e.preventDefault();
        toggleMaximize(activePanelId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePanelId, splitHorizontal, splitVertical, toggleMaximize]);
}

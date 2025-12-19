/**
 * ============================================================================
 * 파일명: use-shortcuts.ts
 * 앱: shell
 * 경로: apps/shell/hooks/use-shortcuts.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 전역 단축키 시스템을 관리하는 커스텀 훅입니다.
 *
 * [🎯 지원 단축키]
 * - Ctrl+B: 사이드바 토글
 * - Ctrl+Tab: 다음 탭으로 이동
 * - /: 검색 포커스
 * - F6: 다음 영역으로 이동
 * - Escape: 모달/패널 닫기
 * ============================================================================
 */

'use client';

import { useEffect, useCallback } from 'react';

interface ShortcutHandler {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    handler: () => void;
    description: string;
}

const shortcuts: ShortcutHandler[] = [];

/**
 * 단축키 등록 함수
 */
export function registerShortcut(shortcut: ShortcutHandler) {
    shortcuts.push(shortcut);
    return () => {
        const index = shortcuts.indexOf(shortcut);
        if (index > -1) shortcuts.splice(index, 1);
    };
}

/**
 * 전역 단축키 훅
 */
export function useShortcuts(handlers: ShortcutHandler[]) {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            // 입력 필드에서는 일부 단축키 무시
            const isInput = ['INPUT', 'TEXTAREA'].includes(
                (e.target as HTMLElement).tagName
            );

            for (const shortcut of [...shortcuts, ...handlers]) {
                const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
                const ctrlMatch = !!shortcut.ctrl === (e.ctrlKey || e.metaKey);
                const shiftMatch = !!shortcut.shift === e.shiftKey;
                const altMatch = !!shortcut.alt === e.altKey;

                if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
                    // 입력 필드에서 '/' 키는 무시
                    if (isInput && shortcut.key === '/') continue;

                    e.preventDefault();
                    shortcut.handler();
                    return;
                }
            }
        },
        [handlers]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
}

/**
 * 단축키 목록 조회
 */
export function getShortcutList(): { key: string; description: string }[] {
    return [
        { key: 'Ctrl+B', description: '사이드바 토글' },
        { key: 'Ctrl+Tab', description: '다음 탭으로 이동' },
        { key: '/', description: '검색 포커스' },
        { key: 'F6', description: '다음 영역으로 이동' },
        { key: 'Escape', description: '닫기' },
        { key: 'Ctrl+Shift+P', description: '명령 팔레트' },
    ];
}

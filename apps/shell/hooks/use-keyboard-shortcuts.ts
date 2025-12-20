/**
 * ============================================================================
 * 파일명: use-keyboard-shortcuts.ts
 * 설명: 전역 키보드 단축키를 관리하는 훅
 * ============================================================================
 */

'use client';

import { useEffect, useCallback } from 'react';
import { KEYBOARD_SHORTCUTS } from '@/config/keyboard-shortcuts';

type CommandHandler = () => void;
export type CommandHandlers = Record<string, CommandHandler>;

/**
 * 키보드 단축키 훅
 * @param handlers - 각 명령에 대한 핸들러 함수
 */
export function useKeyboardShortcuts(handlers: CommandHandlers) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // 입력 필드에서는 무시 (단, Escape나 특정 키는 예외 가능)
    // 하지만 '/' 같은 키는 입력 필드에서 무시해야 함.
    // 'ctrl+/' 같은 조합키는 입력 필드에서도 동작하도록 허용할지 결정 필요.
    // 일단 입력 필드에서는 모든 단축키 무시 (안전하게)
    if (isInputElement(e.target)) return;

    // 눌린 키 조합 확인
    const pressedKey = getKeyCombo(e);

    // 등록된 단축키 찾기
    const binding = KEYBOARD_SHORTCUTS.find(b => b.key === pressedKey);
    if (!binding) return;

    // 핸들러 실행
    const handler = handlers[binding.command];
    if (handler) {
      e.preventDefault();
      handler();
    }
  }, [handlers]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

/**
 * 눌린 키 조합을 문자열로 변환
 */
function getKeyCombo(e: KeyboardEvent): string {
  const parts: string[] = [];
  if (e.ctrlKey || e.metaKey) parts.push('ctrl');
  if (e.shiftKey) parts.push('shift');
  if (e.altKey) parts.push('alt');

  const key = e.key.toLowerCase();

  // 특수 키 이름 매핑
  const keyMap: Record<string, string> = {
    'control': '', 'shift': '', 'alt': '', 'meta': '',
    ' ': 'space', 'escape': 'esc'
  };

  const mappedKey = keyMap[key] !== undefined ? keyMap[key] : key;

  if (mappedKey) {
    if (key === '|') { // Shift+\ -> |
      // Shift 키가 눌려있으면 |가 입력될 수 있음. 
      // 하지만 getKeyCombo 로직상 shift가 이미 parts에 들어갔으므로, 
      // 키 자체는 \ 혹은 | 로 매핑해야 함.
      // 브라우저마다 e.key가 다를 수 있음.
      // 일단 | 그대로 사용.
      parts.push(mappedKey);
    } else {
      parts.push(mappedKey);
    }
  }

  return parts.join('+');
}

/**
 * 입력 요소인지 확인
 */
function isInputElement(target: EventTarget | null): boolean {
  if (!target) return false;
  const element = target as HTMLElement;
  const tagName = element.tagName?.toLowerCase();
  const isContentEditable = element.isContentEditable;
  return tagName === 'input' || tagName === 'textarea' || isContentEditable;
}

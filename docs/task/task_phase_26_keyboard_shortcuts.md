# Phase 26: 키보드 단축키

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)  
> **📋 관련 PRD**: [PRD_UX_ENHANCEMENT.md](../../.agent/docs/PRD_UX_ENHANCEMENT.md) - 섹션 8

---

## 📌 목표

VS Code처럼 다양한 키보드 단축키를 지원하는 시스템을 구현합니다.

**완료 조건**: 
- 글로벌 단축키 30개 이상 동작
- 단축키 도움말 모달

---

## ✅ 작업 목록

### 26.1 단축키 설정 파일

**파일 위치**: `apps/shell/config/keyboard-shortcuts.ts`

```typescript
/**
 * ============================================================================
 * 파일명: keyboard-shortcuts.ts
 * 설명: 키보드 단축키 설정
 * ============================================================================
 */

export interface KeyBinding {
  key: string;           // 'ctrl+shift+p'
  command: string;       // 'commandPalette.open'
  description: string;   // '커맨드 팔레트 열기'
  category: string;      // '탐색'
}

export const KEYBOARD_SHORTCUTS: KeyBinding[] = [
  // 탐색
  { key: 'ctrl+shift+p', command: 'commandPalette.open', description: '커맨드 팔레트', category: '탐색' },
  { key: '/', command: 'search.focus', description: '빠른 검색', category: '탐색' },
  { key: 'ctrl+b', command: 'sidebar.toggle', description: '사이드바 토글', category: '탐색' },
  { key: 'ctrl+,', command: 'settings.open', description: '설정', category: '탐색' },
  
  // 탭
  { key: 'ctrl+t', command: 'tab.new', description: '새 탭', category: '탭' },
  { key: 'ctrl+w', command: 'tab.close', description: '탭 닫기', category: '탭' },
  { key: 'ctrl+tab', command: 'tab.next', description: '다음 탭', category: '탭' },
  { key: 'ctrl+shift+tab', command: 'tab.prev', description: '이전 탭', category: '탭' },
  
  // AI
  { key: 'ctrl+shift+i', command: 'aiPanel.toggle', description: 'AI 패널', category: 'AI' },
  
  // 포커스
  { key: 'f6', command: 'focus.next', description: '다음 영역', category: '포커스' },
  { key: 'shift+f6', command: 'focus.prev', description: '이전 영역', category: '포커스' },
  
  // 데이터
  { key: 'ctrl+s', command: 'save', description: '저장', category: '데이터' },
  { key: 'ctrl+z', command: 'undo', description: '실행취소', category: '데이터' },
  { key: 'ctrl+y', command: 'redo', description: '다시실행', category: '데이터' },
];
```

---

### 26.2 단축키 매니저 훅

**파일 위치**: `apps/shell/hooks/use-keyboard-shortcuts.ts`

```typescript
/**
 * ============================================================================
 * 파일명: use-keyboard-shortcuts.ts
 * 설명: 전역 키보드 단축키를 관리하는 훅
 * ============================================================================
 */

'use client';

import { useEffect, useCallback } from 'react';
import { KEYBOARD_SHORTCUTS, KeyBinding } from '@/config/keyboard-shortcuts';

type CommandHandler = () => void;
type CommandHandlers = Record<string, CommandHandler>;

/**
 * 키보드 단축키 훅
 * @param handlers - 각 명령에 대한 핸들러 함수
 */
export function useKeyboardShortcuts(handlers: CommandHandlers) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // 입력 필드에서는 무시
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
  if (!['control', 'shift', 'alt', 'meta'].includes(key)) {
    parts.push(key);
  }
  
  return parts.join('+');
}

/**
 * 입력 요소인지 확인
 */
function isInputElement(target: EventTarget | null): boolean {
  const tagName = (target as HTMLElement)?.tagName?.toLowerCase();
  return tagName === 'input' || tagName === 'textarea';
}
```

---

### 26.3 단축키 도움말 모달

**파일 위치**: `apps/shell/components/features/shortcuts-help.tsx`

단축키 목록을 보여주는 모달 (Ctrl+/)

---

## 📊 완료 체크리스트

- [ ] 단축키 설정 파일 생성
- [ ] 단축키 매니저 훅 생성
- [ ] 각 명령에 핸들러 연결
- [ ] 도움말 모달 생성
- [ ] Ctrl+/ 도움말 열기 동작

---

## ➡️ 다음 단계

[Phase 27: 다크 모드](./task_phase_27_dark_mode.md)

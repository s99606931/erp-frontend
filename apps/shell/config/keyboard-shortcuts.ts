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
  { key: 'ctrl+/', command: 'help.open', description: '단축키 도움말', category: '탐색' },

  // 탭
  { key: 'ctrl+tab', command: 'tab.next', description: '다음 탭', category: '탭' },
  { key: 'ctrl+shift+tab', command: 'tab.prev', description: '이전 탭', category: '탭' },
  { key: 'ctrl+w', command: 'tab.close', description: '현재 탭 닫기', category: '탭' },

  // AI
  { key: 'ctrl+shift+i', command: 'aiPanel.toggle', description: 'AI 패널 토글', category: 'AI' },

  // 분할 뷰
  { key: 'ctrl+\\', command: 'split.horizontal', description: '수평 분할', category: '분할 뷰' },
  { key: 'ctrl+|', command: 'split.vertical', description: '수직 분할', category: '분할 뷰' },
  { key: 'ctrl+shift+m', command: 'split.maximize', description: '패널 최대화/복원', category: '분할 뷰' },
];

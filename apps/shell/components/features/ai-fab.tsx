/**
 * ============================================================================
 * 파일명: ai-fab.tsx
 * 설명: AI 플로팅 액션 버튼 (화면 우하단)
 * ============================================================================
 */

'use client';

import { Bot } from 'lucide-react';
import { useAIPanelStore } from '../../stores/ai-panel-store';

export function AIFAB() {
  const { isOpen, toggle } = useAIPanelStore();

  // 패널이 열려있으면 FAB 숨김
  if (isOpen) return null;

  return (
    <button
      onClick={toggle}
      className="fixed right-6 bottom-16 w-12 h-12 
                 rounded-full bg-primary text-primary-foreground
                 shadow-lg hover:shadow-xl
                 flex items-center justify-center
                 transition-all duration-200
                 hover:scale-110 z-50"
      aria-label="AI 어시스턴트 열기"
      title="AI Assistant (Ctrl+Shift+I)"
    >
      <Bot className="w-6 h-6" />
    </button>
  );
}

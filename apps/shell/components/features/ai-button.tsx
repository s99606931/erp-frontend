/**
 * ============================================================================
 * 파일명: ai-button.tsx
 * 설명: 헤더에 표시되는 AI 어시스턴트 버튼
 * ============================================================================
 */

'use client';

import { Bot } from 'lucide-react';
import { Button } from '@erp/ui';
import { useAIPanelStore } from '../../stores/ai-panel-store';

/**
 * AI 버튼 컴포넌트
 * 
 * 헤더 우측에 배치되며, 클릭하면 AI 패널을 열거나 닫습니다.
 */
export function AIButton() {
  const { isOpen, toggle } = useAIPanelStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={isOpen ? 'AI 패널 닫기' : 'AI 패널 열기'}
      aria-expanded={isOpen}
      className="relative"
    >
      <Bot className="w-5 h-5" />

      {/* 활성 상태 표시 점 */}
      {isOpen && (
        <span className="absolute -top-1 -right-1 w-2 h-2 
                         bg-primary rounded-full animate-pulse" />
      )}
    </Button>
  );
}

/**
 * ============================================================================
 * 파일명: chat-input.tsx
 * 설명: 채팅 메시지 입력 컴포넌트
 * ============================================================================
 */

'use client';

import { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@erp/ui';
import { useChatStore } from '@/stores/chat-store';

/**
 * 채팅 입력 컴포넌트
 */
export function ChatInput() {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addMessage, setLoading, isLoading } = useChatStore();

  /**
   * 메시지 전송 핸들러
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // 1. 사용자 메시지 추가
    addMessage({ role: 'user', content: trimmedInput });
    setInput('');

    // 2. AI 응답 대기 (Mock)
    setLoading(true);

    // 실제로는 API 호출
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 3. AI 응답 추가 (Mock)
    addMessage({
      role: 'assistant',
      content: `"${trimmedInput}"에 대한 답변입니다. (Mock 응답)\n실제 AI 연결은 다음 단계에서 진행됩니다.`
    });

    setLoading(false);

    // 포커스 유지
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={isLoading ? 'AI가 응답 중...' : '메시지 입력...'}
        disabled={isLoading}
        className="flex-1 px-3 py-2 rounded-lg border bg-background text-sm
                   focus:outline-none focus:ring-2 focus:ring-primary
                   disabled:opacity-50 transition-all shadow-sm"
      />
      <Button type="submit" size="sm" disabled={isLoading || !input.trim()} className="shrink-0">
        <Send className="w-4 h-4" />
        <span className="sr-only">전송</span>
      </Button>
    </form>
  );
}

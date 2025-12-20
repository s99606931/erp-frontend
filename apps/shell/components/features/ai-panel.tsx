/**
 * ============================================================================
 * 파일명: ai-panel.tsx
 * 설명: AI 어시스턴트 패널 (리사이징 지원)
 * ============================================================================
 *
 * [수정사항]
 * - 오버레이 방식에서 Allotment Pane 내부 콘텐츠로 변경
 * - AIPanelContent 컴포넌트 분리 (layout.tsx에서 Pane 내부에 배치)
 * ============================================================================
 */

'use client';

import { useEffect, useRef } from 'react';
import { X, Bot, Loader2 } from 'lucide-react';
import { Button } from '@erp/ui';
import { useAIPanelStore } from '../../stores/ai-panel-store';
import { useChatStore } from '../../stores/chat-store';
import { ChatMessage } from '@/components/features/chat-message';
import { ChatInput } from '@/components/features/chat-input';
import { cn } from '@erp/ui';

/**
 * AI 패널 콘텐츠 (Allotment Pane 내부용)
 * 
 * 레이아웃에서 Allotment.Pane 내부에 배치되어 
 * 드래그로 크기 조절이 가능합니다.
 */
export function AIPanelContent() {
  const { close, toggle } = useAIPanelStore();
  const { messages, isLoading } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  /**
   * 키보드 단축키 등록
   * Ctrl+Shift+I: 패널 토글
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'i' || e.key === 'I')) {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle]);

  // 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="flex flex-col h-full bg-background"
      role="complementary"
      aria-label="AI 어시스턴트"
    >
      {/* 패널 헤더 */}
      <div className="flex items-center justify-between p-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-sm">AI Assistant</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={close} className="h-7 w-7">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* 대화 영역 */}
      <div className="flex-1 p-4 overflow-y-auto bg-muted/10 scroll-smooth" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
            <div className="p-4 bg-muted/50 rounded-full">
              <Bot className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-muted-foreground font-medium">
                무엇을 도와드릴까요?
              </p>
              <p className="text-xs text-muted-foreground/50 mt-1">
                질문을 입력하시면 AI가 답변해 드립니다.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground text-xs pl-2 animate-pulse">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>답변 생성 중...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 입력 영역 */}
      <div className="p-3 border-t bg-background shrink-0">
        <ChatInput />
        <div className="mt-2 text-[10px] text-center text-muted-foreground/40">
          AI는 실수를 할 수 있습니다. 중요한 정보는 확인해 주세요.
        </div>
      </div>
    </div>
  );
}

/**
 * AI 패널 (Legacy - 오버레이 방식, 호환성 유지용)
 * 새 레이아웃에서는 AIPanelContent를 직접 사용합니다.
 */
export function AIPanel() {
  const { isOpen, close, toggle } = useAIPanelStore();
  const { messages, isLoading } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'i' || e.key === 'I')) {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  return (
    <div
      className={cn(
        'fixed top-16 right-0 bottom-8 w-[360px] z-40',
        'bg-background border-l border-border shadow-lg',
        'flex flex-col',
        'transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
      role="complementary"
      aria-label="AI 어시스턴트"
      aria-hidden={!isOpen}
    >
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-sm">AI Assistant</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={close} className="h-8 w-8">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-muted/10 scroll-smooth" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
            <div className="p-4 bg-muted/50 rounded-full">
              <Bot className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-muted-foreground font-medium">무엇을 도와드릴까요?</p>
              <p className="text-xs text-muted-foreground/50 mt-1">질문을 입력하시면 AI가 답변해 드립니다.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground text-xs pl-2 animate-pulse">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>답변 생성 중...</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-background">
        <ChatInput />
        <div className="mt-2 text-[10px] text-center text-muted-foreground/40">
          AI는 실수를 할 수 있습니다. 중요한 정보는 확인해 주세요.
        </div>
      </div>
    </div>
  );
}

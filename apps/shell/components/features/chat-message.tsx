/**
 * ============================================================================
 * 파일명: chat-message.tsx
 * 설명: 개별 채팅 메시지 컴포넌트
 * ============================================================================
 */

'use client';

import type { Message } from '@/stores/chat-store';
import { Bot, User } from 'lucide-react';
import { cn } from '@erp/ui';

interface ChatMessageProps {
  message: Message;
}

/**
 * 채팅 메시지 컴포넌트
 * 
 * 사용자 메시지는 오른쪽, AI 메시지는 왼쪽에 표시됩니다.
 */
export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      'flex gap-3 mb-4 last:mb-0',
      isUser && 'flex-row-reverse'
    )}>
      {/* 아바타 */}
      <div className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border',
        isUser ? 'bg-primary border-primary' : 'bg-background border-border'
      )}>
        {isUser ? (
          <User className="w-4 h-4 text-primary-foreground" />
        ) : (
          <Bot className="w-4 h-4 text-primary" />
        )}
      </div>

      {/* 메시지 내용 */}
      <div className={cn(
        'max-w-[80%] px-4 py-2 rounded-2xl shadow-sm text-sm break-words',
        isUser
          ? 'bg-primary text-primary-foreground rounded-tr-none'
          : 'bg-muted rounded-tl-none'
      )}>
        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>

        {/* 시간 표시 */}
        <p className={cn(
          'text-[10px] mt-1 text-right opacity-70',
        )}>
          {formatTime(new Date(message.timestamp))}
        </p>
      </div>
    </div>
  );
}

/**
 * 시간을 HH:MM 형식으로 포맷팅합니다
 */
function formatTime(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

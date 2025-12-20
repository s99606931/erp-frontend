# Phase 25: AI 대화 기능

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)  
> **📋 관련 PRD**: [PRD_UX_ENHANCEMENT.md](../../.agent/docs/PRD_UX_ENHANCEMENT.md) - 섹션 7.3~7.6

---

## 📌 목표

AI 패널에서 실제로 메시지를 주고받을 수 있는 대화 기능을 구현합니다.

**완료 조건**: 
- 메시지 입력 및 전송
- AI 응답 표시 (Mock)
- 대화 기록 스크롤

---

## 🎯 학습 목표

1. 채팅 UI 구현
2. 메시지 상태 관리
3. 스트리밍 응답 처리 (기본)

---

## ✅ 작업 목록

### 25.1 메시지 타입 및 Store 생성

**파일 위치**: `apps/shell/stores/chat-store.ts`

```typescript
/**
 * ============================================================================
 * 파일명: chat-store.ts
 * 설명: AI 대화 메시지를 관리하는 스토어
 * ============================================================================
 */

import { create } from 'zustand';

/**
 * 메시지 타입
 * 
 * @property id - 고유 식별자
 * @property role - 발신자 (user: 사용자, assistant: AI)
 * @property content - 메시지 내용
 * @property timestamp - 전송 시간
 */
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatStore {
  /** 대화 메시지 목록 */
  messages: Message[];
  
  /** AI 응답 대기 중 여부 */
  isLoading: boolean;
  
  /** 메시지 추가 */
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  
  /** 대화 초기화 */
  clearMessages: () => void;
  
  /** 로딩 상태 설정 */
  setLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,
  
  addMessage: (message) => set((state) => ({
    messages: [
      ...state.messages,
      {
        ...message,
        id: crypto.randomUUID(),
        timestamp: new Date(),
      },
    ],
  })),
  
  clearMessages: () => set({ messages: [] }),
  
  setLoading: (loading) => set({ isLoading: loading }),
}));
```

---

### 25.2 메시지 컴포넌트 생성

**파일 위치**: `apps/shell/components/features/chat-message.tsx`

```tsx
/**
 * ============================================================================
 * 파일명: chat-message.tsx
 * 설명: 개별 채팅 메시지 컴포넌트
 * ============================================================================
 */

'use client';

import { Message } from '@/stores/chat-store';
import { Bot, User } from 'lucide-react';
import { cn } from '@erp/ui/lib/utils';

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
      'flex gap-3 mb-4',
      isUser && 'flex-row-reverse'
    )}>
      {/* 아바타 */}
      <div className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
        isUser ? 'bg-primary' : 'bg-muted'
      )}>
        {isUser ? (
          <User className="w-4 h-4 text-primary-foreground" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>
      
      {/* 메시지 내용 */}
      <div className={cn(
        'max-w-[80%] px-4 py-2 rounded-lg',
        isUser 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-muted'
      )}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        
        {/* 시간 표시 */}
        <p className={cn(
          'text-xs mt-1',
          isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
        )}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}

/**
 * 시간을 HH:MM 형식으로 포맷팅합니다
 */
function formatTime(date: Date): string {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
```

---

### 25.3 채팅 입력 컴포넌트 생성

**파일 위치**: `apps/shell/components/features/chat-input.tsx`

```tsx
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
      content: `"${trimmedInput}"에 대한 답변입니다. (Mock 응답)` 
    });
    
    setLoading(false);
    inputRef.current?.focus();
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
        className="flex-1 px-3 py-2 rounded-lg border 
                   focus:outline-none focus:ring-2 focus:ring-primary
                   disabled:opacity-50"
      />
      <Button type="submit" disabled={isLoading || !input.trim()}>
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
```

---

### 25.4 AI 패널 업데이트

**파일 수정**: `apps/shell/components/features/ai-panel.tsx`

대화 영역과 입력 영역을 업데이트합니다.

```tsx
// 대화 영역
<div className="flex-1 p-4 overflow-y-auto">
  {messages.length === 0 ? (
    <p className="text-muted-foreground text-center mt-8">
      무엇을 도와드릴까요?
    </p>
  ) : (
    messages.map((message) => (
      <ChatMessage key={message.id} message={message} />
    ))
  )}
  
  {isLoading && (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>AI가 응답 중...</span>
    </div>
  )}
</div>

// 입력 영역
<div className="p-4 border-t">
  <ChatInput />
</div>
```

---

## 📊 완료 체크리스트

- [ ] 채팅 스토어 생성
- [ ] 메시지 컴포넌트 생성
- [ ] 입력 컴포넌트 생성
- [ ] AI 패널에 통합
- [ ] 메시지 전송 동작
- [ ] AI 응답 표시 (Mock)
- [ ] 로딩 상태 표시
- [ ] 자동 스크롤

---

## 🔧 테스트 방법

1. AI 패널 열기
2. 메시지 입력 후 Enter 또는 전송 버튼
3. 사용자 메시지 표시 확인
4. 로딩 스피너 표시 확인
5. AI 응답 표시 확인

---

## ➡️ 다음 단계

[Phase 26: 키보드 단축키](./task_phase_26_keyboard_shortcuts.md)

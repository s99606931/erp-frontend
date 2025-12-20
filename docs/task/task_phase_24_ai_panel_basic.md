# Phase 24: AI 패널 기본

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)  
> **📋 관련 PRD**: [PRD_UX_ENHANCEMENT.md](../../.agent/docs/PRD_UX_ENHANCEMENT.md) - 섹션 7

---

## 📌 목표

우측에 AI 어시스턴트 패널을 추가합니다. 헤더의 AI 버튼 또는 FAB(플로팅 버튼)를 클릭하면 패널이 열립니다.

**완료 조건**: 
- AI 버튼 클릭으로 패널 열기/닫기
- 패널 크기 조정 가능
- Ctrl+Shift+I 단축키 동작

---

## 🎯 학습 목표

1. 플로팅 패널 UI 구현
2. 전역 상태로 패널 열림/닫힘 관리
3. 애니메이션 적용

---

## ✅ 작업 목록

### 24.1 AI 패널 상태 Store 생성

**파일 위치**: `apps/shell/stores/ai-panel-store.ts`

```typescript
/**
 * ============================================================================
 * 파일명: ai-panel-store.ts
 * 설명: AI 패널 상태를 관리하는 Zustand 스토어
 * ============================================================================
 */

import { create } from 'zustand';

interface AIPanelStore {
  /** 패널이 열려있는지 여부 */
  isOpen: boolean;
  
  /** 패널 열기 */
  open: () => void;
  
  /** 패널 닫기 */
  close: () => void;
  
  /** 패널 토글 */
  toggle: () => void;
}

export const useAIPanelStore = create<AIPanelStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
```

---

### 24.2 AI 버튼 컴포넌트 생성

**파일 위치**: `apps/shell/components/features/ai-button.tsx`

```tsx
/**
 * ============================================================================
 * 파일명: ai-button.tsx
 * 설명: 헤더에 표시되는 AI 어시스턴트 버튼
 * ============================================================================
 */

'use client';

import { Bot } from 'lucide-react';
import { Button } from '@erp/ui';
import { useAIPanelStore } from '@/stores/ai-panel-store';

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
```

---

### 24.3 AI 패널 컴포넌트 생성

**파일 위치**: `apps/shell/components/features/ai-panel.tsx`

```tsx
/**
 * ============================================================================
 * 파일명: ai-panel.tsx
 * 설명: AI 어시스턴트 패널 (우측 사이드)
 * ============================================================================
 */

'use client';

import { useEffect } from 'react';
import { X, Bot } from 'lucide-react';
import { Button } from '@erp/ui';
import { useAIPanelStore } from '@/stores/ai-panel-store';
import { cn } from '@erp/ui/lib/utils';

/**
 * AI 패널 컴포넌트
 * 
 * 화면 우측에 슬라이드 인/아웃 되는 패널입니다.
 * 사용자와 AI가 대화할 수 있는 인터페이스를 제공합니다.
 */
export function AIPanel() {
  const { isOpen, close, toggle } = useAIPanelStore();
  
  /**
   * 키보드 단축키 등록
   * Ctrl+Shift+I: 패널 토글
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        toggle();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle]);
  
  return (
    <div
      className={cn(
        // 기본 스타일
        'fixed top-16 right-0 bottom-0 w-[360px]',
        'bg-background border-l border-border shadow-lg',
        'flex flex-col',
        // 애니메이션
        'transition-transform duration-300 ease-in-out',
        // 열림/닫힘 상태에 따른 위치
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
      role="complementary"
      aria-label="AI 어시스턴트"
      aria-hidden={!isOpen}
    >
      {/* 패널 헤더 */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">AI 어시스턴트</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={close}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      {/* 대화 영역 (Phase 25에서 구현) */}
      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-muted-foreground text-center mt-8">
          무엇을 도와드릴까요?
        </p>
      </div>
      
      {/* 입력 영역 (Phase 25에서 구현) */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="메시지 입력..."
            className="flex-1 px-3 py-2 rounded-lg border 
                       focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button>전송</Button>
        </div>
      </div>
    </div>
  );
}
```

---

### 24.4 FAB (플로팅 버튼) 생성

**파일 위치**: `apps/shell/components/features/ai-fab.tsx`

```tsx
/**
 * ============================================================================
 * 파일명: ai-fab.tsx
 * 설명: AI 플로팅 액션 버튼 (화면 우하단)
 * ============================================================================
 */

'use client';

import { Bot } from 'lucide-react';
import { useAIPanelStore } from '@/stores/ai-panel-store';

export function AIFAB() {
  const { isOpen, toggle } = useAIPanelStore();
  
  // 패널이 열려있으면 FAB 숨김
  if (isOpen) return null;
  
  return (
    <button
      onClick={toggle}
      className="fixed right-6 bottom-6 w-14 h-14 
                 rounded-full bg-primary text-primary-foreground
                 shadow-lg hover:shadow-xl
                 flex items-center justify-center
                 transition-all duration-200
                 hover:scale-110"
      aria-label="AI 어시스턴트 열기"
    >
      <Bot className="w-6 h-6" />
    </button>
  );
}
```

---

## 📊 완료 체크리스트

- [ ] AI 패널 스토어 생성
- [ ] AI 버튼 컴포넌트 생성
- [ ] AI 패널 컴포넌트 생성
- [ ] FAB 버튼 생성
- [ ] 패널 열기/닫기 동작
- [ ] Ctrl+Shift+I 단축키 동작
- [ ] 슬라이드 애니메이션 동작

---

## 🔧 테스트 방법

1. 헤더의 AI 버튼 클릭 → 패널 열림
2. X 버튼 클릭 → 패널 닫힘
3. FAB 버튼 클릭 → 패널 열림
4. Ctrl+Shift+I → 패널 토글

---

## ➡️ 다음 단계

[Phase 25: AI 대화 기능](./task_phase_25_ai_chat.md)

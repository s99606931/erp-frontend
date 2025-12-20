# Phase 22: 분할 뷰

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)  
> **📋 관련 PRD**: [PRD_UX_ENHANCEMENT.md](../../.agent/docs/PRD_UX_ENHANCEMENT.md) - 섹션 3.2

---

## 📌 목표

VS Code처럼 화면을 여러 패널로 분할하여 동시에 여러 콘텐츠를 볼 수 있는 기능을 구현합니다.

**완료 조건**: 
- Ctrl+\ 수평 분할 동작
- Ctrl+Shift+\ 수직 분할 동작
- 패널 최대화/복원 동작

---

## 🎯 학습 목표

1. 중첩 ResizablePanel 구현
2. 분할 상태 관리
3. 재귀적 레이아웃 렌더링

---

## ✅ 작업 목록

### 22.1 분할 상태 Store 생성

**파일 위치**: `apps/shell/stores/split-view-store.ts`

```typescript
/**
 * ============================================================================
 * 파일명: split-view-store.ts
 * 패키지: @erp/shell
 * 경로: apps/shell/stores/split-view-store.ts
 * 작성일: 2025-12-20
 * ============================================================================
 * 
 * [📄 파일 설명]
 * 분할 뷰 상태를 관리하는 Zustand 스토어입니다.
 * 화면을 수평/수직으로 분할하고, 각 패널의 상태를 추적합니다.
 * 
 * [🎯 주요 기능]
 * 1. 수평 분할 (좌우)
 * 2. 수직 분할 (상하)
 * 3. 패널 닫기
 * 4. 패널 최대화/복원
 * 
 * [📦 사용 예시]
 * ```tsx
 * const { splitHorizontal, splitVertical, closePanel } = useSplitViewStore();
 * ```
 * ============================================================================
 */

import { create } from 'zustand';

/**
 * 패널 노드 타입
 * 
 * 분할 레이아웃은 트리 구조로 관리됩니다.
 * - 'leaf': 실제 콘텐츠를 표시하는 말단 노드
 * - 'horizontal': 좌우로 분할된 노드
 * - 'vertical': 상하로 분할된 노드
 */
export type PanelNode = 
  | { type: 'leaf'; id: string; tabId: string | null }
  | { type: 'horizontal'; id: string; children: [PanelNode, PanelNode] }
  | { type: 'vertical'; id: string; children: [PanelNode, PanelNode] };

interface SplitViewStore {
  /** 루트 패널 노드 */
  root: PanelNode;
  
  /** 현재 활성 패널 ID */
  activePanelId: string;
  
  /** 최대화된 패널 ID (null이면 최대화 없음) */
  maximizedPanelId: string | null;
  
  /**
   * 패널을 수평으로 분할합니다 (좌우)
   * @param panelId - 분할할 패널의 ID
   */
  splitHorizontal: (panelId: string) => void;
  
  /**
   * 패널을 수직으로 분할합니다 (상하)
   * @param panelId - 분할할 패널의 ID
   */
  splitVertical: (panelId: string) => void;
  
  /**
   * 패널을 닫습니다
   * @param panelId - 닫을 패널의 ID
   */
  closePanel: (panelId: string) => void;
  
  /**
   * 패널을 최대화하거나 복원합니다
   * @param panelId - 토글할 패널의 ID
   */
  toggleMaximize: (panelId: string) => void;
  
  /**
   * 활성 패널을 설정합니다
   * @param panelId - 활성화할 패널의 ID
   */
  setActivePanel: (panelId: string) => void;
}

/**
 * 고유 ID 생성 함수
 */
function generateId(): string {
  return `panel-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const useSplitViewStore = create<SplitViewStore>((set, get) => ({
  // 초기 상태: 단일 패널
  root: { type: 'leaf', id: 'main', tabId: null },
  activePanelId: 'main',
  maximizedPanelId: null,
  
  splitHorizontal: (panelId: string) => {
    set((state) => ({
      root: splitNode(state.root, panelId, 'horizontal'),
    }));
  },
  
  splitVertical: (panelId: string) => {
    set((state) => ({
      root: splitNode(state.root, panelId, 'vertical'),
    }));
  },
  
  closePanel: (panelId: string) => {
    set((state) => ({
      root: removeNode(state.root, panelId) || state.root,
    }));
  },
  
  toggleMaximize: (panelId: string) => {
    set((state) => ({
      maximizedPanelId: state.maximizedPanelId === panelId ? null : panelId,
    }));
  },
  
  setActivePanel: (panelId: string) => {
    set({ activePanelId: panelId });
  },
}));

/**
 * 패널 노드를 분할합니다 (재귀적)
 * 
 * @param node - 현재 노드
 * @param targetId - 분할할 대상 패널 ID
 * @param direction - 분할 방향 ('horizontal' 또는 'vertical')
 * @returns 새로운 노드 트리
 */
function splitNode(
  node: PanelNode,
  targetId: string,
  direction: 'horizontal' | 'vertical'
): PanelNode {
  // 대상 노드를 찾았을 때
  if (node.type === 'leaf' && node.id === targetId) {
    const newLeaf: PanelNode = { type: 'leaf', id: generateId(), tabId: null };
    return {
      type: direction,
      id: generateId(),
      children: [node, newLeaf],
    };
  }
  
  // 분기 노드라면 자식들을 재귀적으로 탐색
  if (node.type !== 'leaf') {
    return {
      ...node,
      children: [
        splitNode(node.children[0], targetId, direction),
        splitNode(node.children[1], targetId, direction),
      ],
    };
  }
  
  return node;
}

/**
 * 패널 노드를 제거합니다 (재귀적)
 * 
 * @param node - 현재 노드
 * @param targetId - 제거할 대상 패널 ID
 * @returns 새로운 노드 트리 또는 null
 */
function removeNode(node: PanelNode, targetId: string): PanelNode | null {
  if (node.type === 'leaf') {
    return node.id === targetId ? null : node;
  }
  
  const [left, right] = node.children;
  
  if (left.type === 'leaf' && left.id === targetId) {
    return right;
  }
  if (right.type === 'leaf' && right.id === targetId) {
    return left;
  }
  
  const newLeft = removeNode(left, targetId);
  const newRight = removeNode(right, targetId);
  
  if (!newLeft) return newRight;
  if (!newRight) return newLeft;
  
  return { ...node, children: [newLeft, newRight] };
}
```

**확인 방법**: TypeScript 에러 없음

---

### 22.2 분할 뷰 컴포넌트 생성

**파일 위치**: `apps/shell/components/layout/split-view.tsx`

```tsx
/**
 * ============================================================================
 * 파일명: split-view.tsx
 * 설명: 분할 뷰 레이아웃 컴포넌트 (재귀적 렌더링)
 * ============================================================================
 */

'use client';

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { PanelNode, useSplitViewStore } from '@/stores/split-view-store';
import { cn } from '@erp/ui/lib/utils';

/**
 * 패널 노드를 재귀적으로 렌더링합니다
 */
function renderPanel(node: PanelNode): React.ReactNode {
  // 말단 노드: 실제 콘텐츠 영역
  if (node.type === 'leaf') {
    return (
      <Panel key={node.id} id={node.id} minSize={20}>
        <PanelContent panelId={node.id} tabId={node.tabId} />
      </Panel>
    );
  }
  
  // 분기 노드: 중첩된 PanelGroup
  const direction = node.type === 'horizontal' ? 'horizontal' : 'vertical';
  
  return (
    <Panel key={node.id} id={node.id}>
      <PanelGroup direction={direction}>
        {renderPanel(node.children[0])}
        <PanelResizeHandle className={cn(
          'transition-colors',
          direction === 'horizontal' 
            ? 'w-1 cursor-col-resize hover:bg-primary/50' 
            : 'h-1 cursor-row-resize hover:bg-primary/50'
        )} />
        {renderPanel(node.children[1])}
      </PanelGroup>
    </Panel>
  );
}

/**
 * 분할 뷰 컴포넌트
 */
export function SplitView() {
  const { root, maximizedPanelId } = useSplitViewStore();
  
  // 최대화된 패널이 있으면 해당 패널만 표시
  if (maximizedPanelId) {
    return (
      <div className="w-full h-full">
        <PanelContent panelId={maximizedPanelId} tabId={null} />
      </div>
    );
  }
  
  return (
    <PanelGroup direction="horizontal" className="h-full">
      {renderPanel(root)}
    </PanelGroup>
  );
}

/**
 * 개별 패널의 콘텐츠 영역
 */
function PanelContent({ panelId, tabId }: { panelId: string; tabId: string | null }) {
  const { activePanelId, setActivePanel } = useSplitViewStore();
  const isActive = panelId === activePanelId;
  
  return (
    <div 
      className={cn(
        'w-full h-full bg-background border',
        isActive && 'border-primary'
      )}
      onClick={() => setActivePanel(panelId)}
    >
      {/* 실제 콘텐츠는 탭 상태에 따라 렌더링 */}
      <div className="p-4">
        <p className="text-muted-foreground">패널 {panelId}</p>
        <p className="text-sm">클릭하여 활성화</p>
      </div>
    </div>
  );
}
```

---

### 22.3 분할 단축키 훅

**파일 위치**: `apps/shell/hooks/use-split-shortcuts.ts`

```typescript
/**
 * ============================================================================
 * 파일명: use-split-shortcuts.ts
 * 설명: 분할 뷰 관련 키보드 단축키
 * ============================================================================
 */

'use client';

import { useEffect } from 'react';
import { useSplitViewStore } from '@/stores/split-view-store';

/**
 * 분할 뷰 단축키 훅
 * 
 * - Ctrl+\: 수평 분할
 * - Ctrl+Shift+\: 수직 분할
 * - Ctrl+Shift+M: 패널 최대화 토글
 */
export function useSplitShortcuts() {
  const { 
    activePanelId, 
    splitHorizontal, 
    splitVertical, 
    toggleMaximize 
  } = useSplitViewStore();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+\ : 수평 분할
      if (e.ctrlKey && e.key === '\\' && !e.shiftKey) {
        e.preventDefault();
        splitHorizontal(activePanelId);
      }
      
      // Ctrl+Shift+\ : 수직 분할
      if (e.ctrlKey && e.shiftKey && e.key === '|') {
        e.preventDefault();
        splitVertical(activePanelId);
      }
      
      // Ctrl+Shift+M : 최대화 토글
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        toggleMaximize(activePanelId);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePanelId, splitHorizontal, splitVertical, toggleMaximize]);
}
```

---

## 📊 완료 체크리스트

- [ ] 분할 뷰 스토어 생성
- [ ] 분할 뷰 컴포넌트 생성
- [ ] 재귀적 렌더링 동작
- [ ] Ctrl+\ 수평 분할 동작
- [ ] Ctrl+Shift+\ 수직 분할 동작
- [ ] Ctrl+Shift+M 최대화 동작
- [ ] 패널 클릭 시 활성화 표시
- [ ] 모든 함수에 JSDoc 주석

---

## 🔧 테스트 방법

1. 메인 콘텐츠 영역에서 Ctrl+\ 누르기
2. 화면이 좌우로 분할되는지 확인
3. 분할된 패널 중 하나 클릭 후 다시 Ctrl+\
4. 중첩 분할 확인
5. Ctrl+Shift+M 으로 최대화/복원 확인

---

## ➡️ 다음 단계

[Phase 23: 커맨드 팔레트](./task_phase_23_command_palette.md)

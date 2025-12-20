/**
 * ============================================================================
 * 파일명: split-view.tsx
 * 패키지: @erp/shell
 * 경로: apps/shell/components/layout/split-view.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * 분할 뷰 레이아웃 컴포넌트입니다.
 * SplitViewStore의 상태(PanelNode 트리)를 순회하며 
 * 재귀적으로 Group(PanelGroup)과 Panel을 렌더링합니다.
 * ============================================================================
 */

'use client';

import { Panel, Group, Separator } from 'react-resizable-panels';
import { type PanelNode, useSplitViewStore } from '../../stores/split-view-store';
import { useSplitShortcuts } from '../../hooks/use-split-shortcuts';
import { cn } from '@erp/ui';

/**
 * 분할 뷰 메인 컴포넌트
 * 
 * @param children - 초기 메인 패널에 표시할 콘텐츠 (Next.js 페이지 등)
 */
export function SplitView({ children }: { children?: React.ReactNode }) {
  // 단축키 활성화
  useSplitShortcuts();

  const { root, maximizedPanelId } = useSplitViewStore();

  // 최대화된 패널이 있으면 해당 패널만 표시
  if (maximizedPanelId) {
    return (
      <div className="w-full h-full">
        {maximizedPanelId === 'main' && children ? (
          children
        ) : (
          <PanelContent panelId={maximizedPanelId} tabId={null} />
        )}
      </div>
    );
  }

  return (
    <Group orientation="horizontal" className="h-full" id="split-view-root">
      <RecursivePanel node={root} initialChildren={children} />
    </Group>
  );
}

/**
 * 재귀 렌더링 컴포넌트 (Props로 children 전달)
 */
function RecursivePanel({ node, initialChildren }: { node: PanelNode, initialChildren?: React.ReactNode }) {
  if (node.type === 'leaf') {
    // ID가 'main'인 리프 노드에만 실제 children을 렌더링
    if (node.id === 'main' && initialChildren) {
      return (
        <Panel key={node.id} id={node.id} minSize={20}>
          <div className="h-full w-full overflow-auto bg-background" onClick={() => useSplitViewStore.getState().setActivePanel(node.id)}>
            {initialChildren}
          </div>
        </Panel>
      )
    }

    return (
      <Panel key={node.id} id={node.id} minSize={20}>
        <PanelContent panelId={node.id} tabId={node.tabId} />
      </Panel>
    );
  }

  // PanelNode type은 'horizontal' | 'vertical'
  // react-resizable-panels orientation은 'horizontal' | 'vertical'
  const orientation = node.type === 'horizontal' ? 'horizontal' : 'vertical';

  return (
    <Group orientation={orientation}>
      <RecursivePanel node={node.children[0]} initialChildren={initialChildren} />

      <Separator className={cn(
        'transition-colors relative flex items-center justify-center bg-border z-10',
        orientation === 'horizontal'
          ? 'w-2 -mx-1 cursor-col-resize hover:bg-primary/50'
          : 'h-2 -my-1 cursor-row-resize hover:bg-primary/50'
      )}>
        <div className={cn(
          "bg-muted-foreground/30 rounded-full",
          orientation === 'horizontal' ? "h-8 w-1" : "w-8 h-1"
        )} />
      </Separator>

      <RecursivePanel node={node.children[1]} initialChildren={initialChildren} />
    </Group>
  );
}

/**
 * 개별 패널의 콘텐츠 영역 (Placeholder)
 */
function PanelContent({ panelId, tabId }: { panelId: string; tabId: string | null }) {
  const { activePanelId, setActivePanel } = useSplitViewStore();
  const isActive = panelId === activePanelId;

  return (
    <div
      className={cn(
        'w-full h-full bg-background/50 flex flex-col items-center justify-center border-2 border-dashed transition-colors',
        isActive ? 'border-primary bg-primary/5' : 'border-border'
      )}
      onClick={() => setActivePanel(panelId)}
    >
      <div className="text-center p-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">Panel {panelId.slice(-4)}</h3>
        <p className="text-sm text-muted-foreground">
          {isActive ? "Active Panel" : "Click to activate"}
        </p>
        <p className="text-xs text-muted-foreground/50 mt-1">
          Tab: {tabId || 'None'}
        </p>
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * 파일명: split-view.tsx
 * 패키지: @erp/shell
 * 경로: apps/shell/components/layout/split-view.tsx
 * 작성일: 2025-12-20
 * 수정일: 2025-12-20 (Allotment 리팩토링)
 * ============================================================================
 *
 * [📄 파일 설명]
 * 분할 뷰 레이아웃 컴포넌트입니다.
 * SplitViewStore의 상태(PanelNode 트리)를 순회하며 
 * 재귀적으로 Allotment 패널을 렌더링합니다.
 *
 * [🔗 의존성]
 * - allotment v1.x (VS Code 패널 시스템)
 * ============================================================================
 */

'use client';

import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
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
    <div className="h-full w-full">
      <RecursivePanel node={root} initialChildren={children} />
    </div>
  );
}

/**
 * 재귀 렌더링 컴포넌트 (Allotment 기반)
 */
function RecursivePanel({ node, initialChildren }: { node: PanelNode, initialChildren?: React.ReactNode }) {
  if (node.type === 'leaf') {
    // ID가 'main'인 리프 노드에만 실제 children을 렌더링
    if (node.id === 'main' && initialChildren) {
      return (
        <div className="h-full w-full overflow-auto bg-background" onClick={() => useSplitViewStore.getState().setActivePanel(node.id)}>
          {initialChildren}
        </div>
      );
    }

    return <PanelContent panelId={node.id} tabId={node.tabId} />;
  }

  // PanelNode type은 'horizontal' | 'vertical'
  // Allotment: vertical={true} → 세로 분할 (위/아래), vertical={false} → 가로 분할 (좌/우)
  // PanelNode 'horizontal' → 가로로 배치 (좌/우) → Allotment vertical={false}
  // PanelNode 'vertical' → 세로로 배치 (위/아래) → Allotment vertical={true}
  const isVertical = node.type === 'vertical';

  return (
    <Allotment vertical={isVertical}>
      <Allotment.Pane minSize={100}>
        <RecursivePanel node={node.children[0]} initialChildren={initialChildren} />
      </Allotment.Pane>
      <Allotment.Pane minSize={100}>
        <RecursivePanel node={node.children[1]} initialChildren={initialChildren} />
      </Allotment.Pane>
    </Allotment>
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

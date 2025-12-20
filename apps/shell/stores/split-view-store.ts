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

export const useSplitViewStore = create<SplitViewStore>((set) => ({
  // 초기 상태: 단일 패널 (메인)
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
    set((state) => {
      // 닫은 후 남은 노드가 없으면(모두 닫힘) 기본 상태로 복구해야 함?
      // 여기서는 최소 1개는 유지된다고 가정하거나, removeNode 로직에 의존
      const newRoot = removeNode(state.root, panelId);
      return {
        root: newRoot || { type: 'leaf', id: 'main', tabId: null }, // 모두 닫히면 초기화
      };
    });
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
      children: [node, newLeaf], // 기존 노드 유지 + 새 노드 추가
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
 * @returns 새로운 노드 트리 또는 null (해당 노드가 제거됨)
 */
function removeNode(node: PanelNode, targetId: string): PanelNode | null {
  if (node.type === 'leaf') {
    return node.id === targetId ? null : node;
  }

  const [left, right] = node.children;

  // 자식 중 하나가 리프이고 제거 대상이라면, 남은 자식을 반환 (구조 단순화)
  if (left.type === 'leaf' && left.id === targetId) {
    return right;
  }
  if (right.type === 'leaf' && right.id === targetId) {
    return left;
  }

  // 재귀적 제거
  const newLeft = removeNode(left, targetId);
  const newRight = removeNode(right, targetId);

  // 한쪽 자식이 사라지면 남은 자식만 반환 (분기 노드 제거)
  if (!newLeft) return newRight;
  if (!newRight) return newLeft;

  // 둘 다 남아있으면 구조 유지
  return { ...node, children: [newLeft, newRight] };
}

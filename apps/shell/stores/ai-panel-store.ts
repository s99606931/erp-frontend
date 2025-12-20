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

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
        id: Math.random().toString(36).substring(7), // Simple ID generation
        timestamp: new Date(),
      },
    ],
  })),

  clearMessages: () => set({ messages: [] }),

  setLoading: (loading) => set({ isLoading: loading }),
}));

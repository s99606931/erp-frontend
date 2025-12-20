/**
 * ============================================================================
 * 파일명: animation.ts
 * 설명: 애니메이션 관련 디자인 토큰
 * ============================================================================
 */

/**
 * 애니메이션 지속 시간 (밀리초)
 */
export const duration = {
  /** 즉시 (텍스트 변경) */
  instant: 0,
  /** 빠름 (버튼 호버) */
  fast: 100,
  /** 보통 (메뉴 열림/닫힘) */
  normal: 200,
  /** 느림 (모달 페이드) */
  slow: 300,
  /** 의도적 (페이지 전환) */
  deliberate: 500,
} as const;

/**
 * 이징 함수 (CSS cubic-bezier)
 */
export const easing = {
  /** 열림, 나타남 */
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  /** 닫힘, 사라짐 */
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  /** 상태 변경 */
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** 부드러운 스프링 */
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

/**
 * framer-motion용 트랜지션 프리셋
 */
export const transition = {
  fast: { duration: 0.1, ease: [0, 0, 0.2, 1] },
  normal: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  slow: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  spring: { type: 'spring', stiffness: 300, damping: 20 },
} as const;

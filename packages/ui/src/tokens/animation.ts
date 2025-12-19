/**
 * ============================================================================
 * 파일명: animation.ts
 * 패키지: @erp/ui
 * 경로: packages/ui/src/tokens/animation.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 애니메이션 토큰 (트랜지션 시간, 이징 함수)
 *
 * [♿ 접근성]
 * prefers-reduced-motion 미디어 쿼리 대응 필수
 * ============================================================================
 */

export const animation = {
    duration: {
        instant: '0ms',
        fast: '100ms',
        normal: '200ms',
        slow: '300ms',
        deliberate: '500ms',
    },

    easing: {
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        linear: 'linear',
    },
} as const;

export type Animation = typeof animation;

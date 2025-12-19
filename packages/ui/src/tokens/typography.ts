/**
 * ============================================================================
 * 파일명: typography.ts
 * 패키지: @erp/ui
 * 경로: packages/ui/src/tokens/typography.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 타이포그래피 토큰 (폰트, 크기, 굵기, 행간)
 *
 * [♿ 접근성]
 * 본문 텍스트는 최소 16px (text-base) 이상 사용
 * ============================================================================
 */

export const typography = {
    fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'Consolas', 'Monaco', 'monospace'],
    },

    fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
    },

    fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },

    lineHeight: {
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
    },

    letterSpacing: {
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
    },
} as const;

export type Typography = typeof typography;

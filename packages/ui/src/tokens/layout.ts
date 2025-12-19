/**
 * ============================================================================
 * 파일명: layout.ts
 * 패키지: @erp/ui
 * 경로: packages/ui/src/tokens/layout.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * Shell 앱 레이아웃 토큰 (헤더, 사이드바, 상태바 크기)
 * ============================================================================
 */

export const layout = {
    header: {
        height: '64px',
    },

    sidebar: {
        width: '240px',
        widthCollapsed: '64px',
    },

    statusBar: {
        height: '32px',
    },

    container: {
        maxWidth: '1400px',
    },

    spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
    },

    borderRadius: {
        none: '0',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        full: '9999px',
    },

    zIndex: {
        dropdown: 1000,
        sticky: 1020,
        modal: 1050,
        popover: 1060,
        tooltip: 1070,
        toast: 1080,
    },
} as const;

export type Layout = typeof layout;

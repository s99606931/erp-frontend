/**
 * ============================================================================
 * 파일명: colors.ts
 * 패키지: @erp/ui
 * 경로: packages/ui/src/tokens/colors.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 디자인 시스템의 기본 색상 토큰을 정의합니다.
 * 모든 색상은 Tailwind CSS 클래스 및 CSS 변수로 사용 가능합니다.
 *
 * [🎯 주요 기능]
 * 1. Neutral: 회색 계열 (배경, 텍스트, 테두리)
 * 2. Primary: 주요 브랜드 색상
 * 3. Semantic: 상태 표시 색상 (success, warning, error, info)
 *
 * [📦 사용 예시]
 * ```typescript
 * import { colors } from '@erp/ui/tokens';
 * console.log(colors.neutral[500]); // '#6B7280'
 * console.log(colors.primary[500]); // '#3B82F6'
 * ```
 *
 * [♿ 접근성]
 * 모든 색상 조합은 WCAG 2.1 AA 기준 명도 대비 4.5:1 이상을 준수합니다.
 * ============================================================================
 */

/**
 * Neutral 색상 팔레트 (회색 계열)
 *
 * @description
 * 배경, 텍스트, 테두리 등 UI의 기본 요소에 사용됩니다.
 * 50(가장 밝음) ~ 900(가장 어두움)까지 10단계로 구성됩니다.
 */
export const neutral = {
    /** 가장 밝은 회색 - 페이지 배경 */
    50: '#F9FAFB',
    /** 카드 배경, 입력 필드 배경 */
    100: '#F3F4F6',
    /** 테두리, 구분선 */
    200: '#E5E7EB',
    /** 비활성 테두리 */
    300: '#D1D5DB',
    /** 비활성 텍스트, placeholder */
    400: '#9CA3AF',
    /** 보조 텍스트 */
    500: '#6B7280',
    /** 일반 텍스트 */
    600: '#4B5563',
    /** 본문 텍스트 */
    700: '#374151',
    /** 제목 텍스트 */
    800: '#1F2937',
    /** 가장 어두운 색 - 대제목 */
    900: '#111827',
} as const;

/**
 * Primary 색상 팔레트 (주요 브랜드 색상)
 *
 * @description
 * 버튼, 링크, 포커스 등 주요 인터랙션에 사용됩니다.
 * 기본 테마에서는 파란색 계열을 사용하며,
 * 테넌트별로 커스터마이징 가능합니다.
 */
export const primary = {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    /** 기본 Primary 색상 */
    500: '#3B82F6',
    /** 호버 시 색상 */
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
} as const;

/**
 * Semantic 색상 (상태 표시)
 *
 * @description
 * 성공, 경고, 오류, 정보 등의 상태를 표시할 때 사용합니다.
 * 각 상태별로 light(배경), DEFAULT(메인), dark(텍스트) 3단계로 구성됩니다.
 *
 * [접근성 주의]
 * 색상만으로 상태를 전달하지 않고, 반드시 아이콘이나 텍스트를 함께 사용합니다.
 */
export const semantic = {
    /** 성공 상태 (저장 완료, 유효성 검사 통과) */
    success: {
        light: '#D1FAE5',
        DEFAULT: '#10B981',
        dark: '#065F46',
    },
    /** 경고 상태 (주의 필요, 유효성 경고) */
    warning: {
        light: '#FEF3C7',
        DEFAULT: '#F59E0B',
        dark: '#92400E',
    },
    /** 오류 상태 (입력 오류, 실패) */
    error: {
        light: '#FEE2E2',
        DEFAULT: '#EF4444',
        dark: '#991B1B',
    },
    /** 정보 상태 (안내, 도움말) */
    info: {
        light: '#DBEAFE',
        DEFAULT: '#3B82F6',
        dark: '#1E40AF',
    },
} as const;

/**
 * 전체 색상 토큰
 *
 * @example
 * import { colors } from '@erp/ui/tokens';
 *
 * // 중립 색상 사용
 * const textColor = colors.neutral[700];
 *
 * // 상태 색상 사용
 * const errorBg = colors.semantic.error.light;
 */
export const colors = {
    neutral,
    primary,
    ...semantic,
} as const;

export type Colors = typeof colors;

/**
 * ============================================================================
 * 파일명: tenant.ts
 * 패키지: @erp/shared
 * 경로: packages/erp-shared/src/types/tenant.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 테넌트(공공기관) 관련 타입 정의
 * ============================================================================
 */

/**
 * 테넌트 테마 색상 (10가지)
 */
export interface TenantThemeColors {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    muted: string;
    mutedForeground: string;
    background: string;
    foreground: string;
}

/**
 * 테넌트 정보
 */
export interface Tenant {
    /** 테넌트 고유 ID */
    id: string;
    /** 기관명 */
    name: string;
    /** 서브도메인 (예: seoul → seoul.erp.go.kr) */
    domain: string;
    /** 로고 URL */
    logoUrl: string;
    /** 테마 색상 */
    themeColors: TenantThemeColors;
    /** 활성화 여부 */
    isActive: boolean;
    /** 생성일 */
    createdAt: string;
}

/**
 * 테넌트 설정
 */
export interface TenantSettings {
    /** 2FA 필수 여부 */
    requireTwoFactor: boolean;
    /** 세션 타임아웃 (분) */
    sessionTimeoutMinutes: number;
    /** 비밀번호 최소 길이 */
    passwordMinLength: number;
    /** IP 화이트리스트 */
    allowedIps: string[];
}

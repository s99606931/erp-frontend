/**
 * 테넌트(조직/공공기관) 도메인 관련 타입 정의
 */

export enum TenantType {
    PUBLIC = 'PUBLIC', // 공공기관
    PRIVATE = 'PRIVATE', // 민간기업 (혹시 모를 확장)
}

export interface TenantTheme {
    primaryColor: string;
    secondaryColor?: string;
    logoUrl?: string;
    darkMode?: boolean;
}

export interface TenantConfig {
    maxUsers?: number;
    features?: string[]; // 활성화된 기능 목록 (e.g., ['HRM', 'FINANCE'])
    securityLevel?: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface Tenant {
    id: string;
    name: string; // 기관명
    code: string; // 기관 식별 코드 (도메인 prefix 등)
    type: TenantType;
    domain?: string; // 커스텀 도메인
    theme: TenantTheme;
    config: TenantConfig;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

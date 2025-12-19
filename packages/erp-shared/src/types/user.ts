/**
 * ============================================================================
 * 파일명: user.ts
 * 패키지: @erp/shared
 * 경로: packages/erp-shared/src/types/user.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 사용자 관련 타입 정의
 * ============================================================================
 */

/**
 * 사용자 역할
 */
export type UserRole = 'ADMIN' | 'MANAGER' | 'USER' | 'AUDITOR';

/**
 * 사용자 상태
 */
export type UserStatus = 'ACTIVE' | 'DORMANT' | 'SUSPENDED' | 'DELETED';

/**
 * 사용자 기본 정보
 */
export interface User {
    /** 사용자 고유 ID (UUID) */
    id: string;
    /** 이메일 (로그인 ID) */
    email: string;
    /** 사용자 이름 */
    name: string;
    /** 사용자 역할 */
    role: UserRole;
    /** 소속 테넌트 ID */
    tenantId: string;
    /** 부서 ID */
    departmentId?: string;
    /** 부서명 */
    departmentName?: string;
    /** 직급 */
    position?: string;
    /** 프로필 이미지 URL */
    profileImage?: string;
    /** 계정 상태 */
    status: UserStatus;
    /** 2FA 활성화 여부 */
    twoFactorEnabled: boolean;
    /** 마지막 로그인 시간 */
    lastLoginAt?: string;
    /** 생성일 */
    createdAt: string;
    /** 수정일 */
    updatedAt: string;
}

/**
 * 로그인 응답
 */
export interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
    requiresTwoFactor: boolean;
}

/**
 * 사용자 생성 요청
 */
export interface CreateUserRequest {
    email: string;
    name: string;
    role: UserRole;
    departmentId?: string;
    position?: string;
}

/**
 * 사용자 도메인 관련 타입 정의
 */

export enum UserRole {
    SUPER_ADMIN = 'SUPER_ADMIN', // 시스템 전체 관리자
    TENANT_ADMIN = 'TENANT_ADMIN', // 테넌트(기관) 관리자
    MANAGER = 'MANAGER', // 부서/팀 관리자
    USER = 'USER', // 일반 사용자
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SUSPENDED = 'SUSPENDED',
    PENDING = 'PENDING', // 가입 승인 대기
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    status: UserStatus;
    tenantId?: string; // Super Admin은 없을 수 있음
    departmentId?: string;
    phoneNumber?: string;
    avatarUrl?: string;
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

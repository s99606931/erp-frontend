/**
 * 공통 응답 및 페이지네이션 타입 정의
 */

// API 공통 응답 구조
export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    error?: {
        code: string;
        details?: any;
    };
    timestamp: string;
}

// 페이지네이션 요청 파라미터
export interface PaginationParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
}

// 페이지네이션 응답 메타데이터
export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

// 페이지네이션된 목록 응답
export interface PaginatedResponse<T> {
    items: T[];
    meta: PaginationMeta;
}

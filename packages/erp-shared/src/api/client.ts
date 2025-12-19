/**
 * ============================================================================
 * 파일명: client.ts
 * 패키지: @erp/shared
 * 경로: packages/erp-shared/src/api/client.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * Axios 기반 HTTP 클라이언트입니다.
 * 모든 마이크로서비스에서 API 호출 시 이 클라이언트를 사용합니다.
 *
 * [🎯 주요 기능]
 * 1. 기본 URL 설정 (환경 변수)
 * 2. 타임아웃 설정 (30초)
 * 3. JWT 토큰 자동 첨부 (인터셉터)
 * 4. 에러 응답 표준화
 *
 * [📦 사용 예시]
 * ```typescript
 * import { apiClient } from '@erp/shared/api';
 *
 * const response = await apiClient.get('/users');
 * const user = await apiClient.post('/users', { name: '홍길동' });
 * ```
 * ============================================================================
 */

import axios, { type AxiosInstance, type AxiosError } from 'axios';

/**
 * API 에러 응답 타입
 */
export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, string>;
}

/**
 * Axios 인스턴스 생성
 *
 * @description
 * - baseURL: 환경 변수 NEXT_PUBLIC_API_URL에서 읽음
 * - timeout: 30초 (30000ms)
 * - headers: JSON 형식
 */
export const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * 요청 인터셉터: JWT 토큰 자동 첨부
 *
 * @description
 * 모든 API 요청에 Authorization 헤더를 자동으로 추가합니다.
 * 로컬 스토리지에서 access_token을 읽어 Bearer 토큰으로 설정합니다.
 */
apiClient.interceptors.request.use(
    (config) => {
        // 브라우저 환경에서만 실행
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * 응답 인터셉터: 에러 처리
 *
 * @description
 * - 401 Unauthorized: 토큰 만료 → 로그인 페이지로 리다이렉트
 * - 403 Forbidden: 권한 없음 메시지
 * - 500 Server Error: 서버 오류 메시지
 */
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiError>) => {
        const status = error.response?.status;

        if (status === 401) {
            // 토큰 만료 - 로그인 페이지로 이동
            if (typeof window !== 'undefined') {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login?expired=true';
            }
        }

        // 표준화된 에러 응답 반환
        const apiError: ApiError = {
            code: error.response?.data?.code || 'UNKNOWN_ERROR',
            message: error.response?.data?.message || '알 수 없는 오류가 발생했습니다.',
            details: error.response?.data?.details,
        };

        return Promise.reject(apiError);
    }
);

export default apiClient;

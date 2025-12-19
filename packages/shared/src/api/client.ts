import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

// 환경 변수에서 기본 URL을 가져옴 (없으면 로컬호스트)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 브라우저 환경에서만 실행
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            // 401 Unauthorized 처리
            if (error.response.status === 401) {
                if (typeof window !== 'undefined') {
                    // 토큰 제거 및 로그인 페이지로 리다이렉트
                    localStorage.removeItem('access_token');
                    // window.location.href = '/auth/login'; // 순환 참조 방지를 위해 앱 레벨에서 처리 권장
                    // 대신 이벤트를 발생시키거나 에러를 그대로 던져서 앱이 처리하게 함
                }
            }
        }
        return Promise.reject(error);
    }
);

/**
 * ============================================================================
 * 파일명: page.tsx
 * 앱: shell
 * 경로: apps/shell/app/(auth)/login/page.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 로그인 페이지입니다.
 * 사전 승인된 이메일만 로그인 가능합니다.
 *
 * [🎯 주요 기능]
 * 1. 이메일/비밀번호 입력
 * 2. 실시간 유효성 검사
 * 3. 소셜 로그인 버튼 (네이버, 카카오, 구글)
 * 4. 로딩 상태 및 오류 메시지
 *
 * [♿ 접근성]
 * - Tab 키로 모든 필드 탐색 가능
 * - 오류 메시지는 aria-live로 스크린리더 알림
 * ============================================================================
 */

import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
            <div className="w-full max-w-md">
                {/* 로고 및 제목 */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary-foreground">ERP</span>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">
                        공공기관 ERP SaaS
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        업무 효율을 높이는 통합 관리 시스템
                    </p>
                </div>

                {/* 로그인 폼 */}
                <LoginForm />
            </div>
        </div>
    );
}

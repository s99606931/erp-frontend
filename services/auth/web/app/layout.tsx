/**
 * ============================================================================
 * 파일명: layout.tsx
 * 서비스: auth-web
 * 경로: services/auth/web/app/layout.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * auth-web 서비스의 루트 레이아웃입니다.
 * 이 서비스는 독립적으로 배포 가능합니다.
 *
 * [🐳 독립 배포]
 * Port: 3001
 * Docker: erp/auth-web:latest
 * ============================================================================
 */

import type { Metadata } from 'next';
import '@erp/ui/globals.css';
import './globals.css';

export const metadata: Metadata = {
    title: '로그인 - 공공기관 ERP',
    description: '공공기관 ERP 시스템 로그인',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className="min-h-screen bg-background font-sans antialiased">
                {children}
            </body>
        </html>
    );
}

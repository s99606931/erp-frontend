/**
 * ============================================================================
 * 파일명: layout.tsx
 * 서비스: payroll-web (급여관리)
 * 경로: services/payroll/web/app/layout.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * payroll-web 마이크로서비스의 루트 레이아웃입니다.
 *
 * [🐳 독립 배포]
 * Port: 3011
 * Docker: erp/payroll-web:latest
 * ============================================================================
 */

import type { Metadata } from 'next';
import '@erp/ui/globals.css';

export const metadata: Metadata = {
    title: '급여관리 - 공공기관 ERP',
    description: '공공기관 ERP 급여관리 시스템',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className="min-h-screen bg-background font-sans antialiased">
                <div className="p-6">{children}</div>
            </body>
        </html>
    );
}

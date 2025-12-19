/**
 * ============================================================================
 * 파일명: layout.tsx
 * 앱: shell
 * 경로: apps/shell/app/layout.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * Shell 앱의 루트 레이아웃입니다.
 * 모든 페이지가 이 레이아웃을 상속합니다.
 * ============================================================================
 */

import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { TokenSyncer } from '@/components/auth/token-syncer';
import '@erp/ui/globals.css';
import './globals.css';

export const metadata: Metadata = {
    title: '공공기관 ERP SaaS',
    description: '공공기관을 위한 통합 ERP 시스템',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body className="min-h-screen bg-background font-sans antialiased">
                <Providers>
                    <TokenSyncer />
                    {children}
                </Providers>
            </body>
        </html>
    );
}

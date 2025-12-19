/**
 * ============================================================================
 * 파일명: page.tsx
 * 서비스: auth-web
 * 경로: services/auth/web/app/page.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 */

import { redirect } from 'next/navigation';

export default function Home() {
    redirect('/login');
}

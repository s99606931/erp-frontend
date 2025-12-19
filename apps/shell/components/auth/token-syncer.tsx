'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

/**
 * NextAuth 세션의 Access Token을 localStorage와 동기화합니다.
 * 이를 통해 @erp/shared/api/client가 토큰을 사용할 수 있게 합니다.
 */
export function TokenSyncer() {
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.accessToken) {
            localStorage.setItem('access_token', session.accessToken);
        } else {
            // 세션이 없거나 만료되면 토큰 제거 (선택 사항 - 로그아웃 시 처리됨)
            // localStorage.removeItem('access_token');
        }
    }, [session]);

    return null;
}

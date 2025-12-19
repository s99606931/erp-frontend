/**
 * ============================================================================
 * 파일명: use-session-timeout.ts
 * 앱: shell
 * 경로: apps/shell/hooks/use-session-timeout.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 세션 타임아웃을 관리하는 커스텀 훅입니다.
 * 30분 무활동 시 자동 로그아웃됩니다.
 *
 * [🔒 2025년 공공기관 보안 규정]
 * - 30분 무활동 시 자동 로그아웃
 * - 5분 전 경고 알림
 * ============================================================================
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

interface SessionTimeoutOptions {
    /** 타임아웃 시간 (분) */
    timeoutMinutes?: number;
    /** 경고 시간 (분 전) */
    warningMinutes?: number;
    /** 로그아웃 콜백 */
    onLogout?: () => void;
    /** 경고 콜백 */
    onWarning?: (remainingMinutes: number) => void;
}

export function useSessionTimeout({
    timeoutMinutes = 30,
    warningMinutes = 5,
    onLogout,
    onWarning,
}: SessionTimeoutOptions = {}) {
    const [remainingTime, setRemainingTime] = useState(timeoutMinutes * 60); // 초
    const [isWarningShown, setIsWarningShown] = useState(false);

    // 타이머 리셋
    const resetTimer = useCallback(() => {
        setRemainingTime(timeoutMinutes * 60);
        setIsWarningShown(false);
    }, [timeoutMinutes]);

    // 사용자 활동 감지
    useEffect(() => {
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];

        const handleActivity = () => {
            resetTimer();
        };

        events.forEach((event) => {
            document.addEventListener(event, handleActivity);
        });

        return () => {
            events.forEach((event) => {
                document.removeEventListener(event, handleActivity);
            });
        };
    }, [resetTimer]);

    // 타이머 카운트다운
    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prev) => {
                const newTime = prev - 1;

                // 경고 시간 도달
                if (newTime === warningMinutes * 60 && !isWarningShown) {
                    setIsWarningShown(true);
                    onWarning?.(warningMinutes);
                }

                // 타임아웃
                if (newTime <= 0) {
                    onLogout?.();
                    // 로그인 페이지로 리다이렉트
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('access_token');
                        window.location.href = '/login?timeout=true';
                    }
                    return 0;
                }

                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [warningMinutes, isWarningShown, onWarning, onLogout]);

    return {
        /** 남은 시간 (초) */
        remainingTime,
        /** 남은 시간 (분) */
        remainingMinutes: Math.ceil(remainingTime / 60),
        /** 타이머 리셋 */
        resetTimer,
        /** 경고 표시 여부 */
        isWarningShown,
    };
}

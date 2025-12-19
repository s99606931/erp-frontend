/**
 * ============================================================================
 * 파일명: status-bar.tsx
 * 앱: shell
 * 경로: apps/shell/components/layout/status-bar.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * 하단 상태바 컴포넌트입니다.
 * 접속자 정보, 시스템 상태, 세션 타이머를 표시합니다.
 * ============================================================================
 */

'use client';

import { useEffect, useState } from 'react';
import { Wifi, Clock } from 'lucide-react';
import { useSession } from 'next-auth/react';

export function StatusBar() {
    const { data: session } = useSession();
    const [timeLeft, setTimeLeft] = useState(1800); // 30분 (초 단위)

    // 세션 타이머 (단순 카운트다운)
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <footer className="flex h-8 w-full items-center justify-between border-t bg-muted/50 px-4 text-[11px] text-muted-foreground select-none">
            {/* 좌측: 사용자 정보 */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>온라인</span>
                </div>
                <span>|</span>
                <span>{session?.user?.name || '게스트'} (행정안전국)</span>
                <span>|</span>
                <span>접속 IP: 10.20.12.114 (사내망)</span>
            </div>

            {/* 우측: 시스템 상태 & 타이머 */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 hover:text-foreground cursor-help" title="시스템 상태 양호">
                    <Wifi className="h-3 w-3" />
                    <span>시스템 상태: 정상</span>
                </div>

                {/* 세션 연장 버튼 기능은 추후 구현 */}
                <div className={`flex items-center gap-1.5 font-mono ${timeLeft < 300 ? 'text-red-500 font-bold' : ''}`}>
                    <Clock className="h-3 w-3" />
                    <span>세션 만료: {formatTime(timeLeft)}</span>
                    <button className="underline hover:text-primary ml-1">연장</button>
                </div>
            </div>
        </footer>
    );
}

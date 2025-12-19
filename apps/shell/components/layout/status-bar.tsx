/**
 * ============================================================================
 * 파일명: status-bar.tsx
 * 앱: shell
 * 경로: apps/shell/components/layout/status-bar.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 하단 상태바 컴포넌트입니다.
 * 사용자 정보, 시스템 상태, 세션 타이머를 표시합니다.
 * ============================================================================
 */

'use client';

import { useState, useEffect } from 'react';
import { Clock, User, Circle } from 'lucide-react';

export function StatusBar() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [sessionRemaining, setSessionRemaining] = useState(30); // 분

    // 시간 업데이트
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <footer className="h-8 border-t bg-muted/50 flex items-center justify-between px-4 text-xs text-muted-foreground">
            {/* 좌측: 사용자 정보 */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>홍길동 (인사팀)</span>
                </div>
                <div className="flex items-center gap-1">
                    <Circle className="h-2 w-2 fill-success text-success" />
                    <span>접속 중</span>
                </div>
            </div>

            {/* 우측: 시간 및 세션 */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>세션 만료: {sessionRemaining}분</span>
                </div>
                <span>{formatTime(currentTime)}</span>
            </div>
        </footer>
    );
}

/**
 * ============================================================================
 * 파일명: header.tsx
 * 앱: shell
 * 경로: apps/shell/components/layout/header.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 글로벌 헤더 컴포넌트입니다.
 * 로고, 검색바, 알림, 프로필을 표시합니다.
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import { Button, Input } from '@erp/ui/components';
import { Search, Bell, Star, User, ChevronDown } from 'lucide-react';

export function Header() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <header className="h-16 border-b bg-background flex items-center px-4 gap-4">
            {/* 로고 */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-foreground">ERP</span>
                </div>
                <span className="font-semibold text-lg hidden md:block">공공기관 ERP</span>
            </div>

            {/* 통합 검색 */}
            <div className="flex-1 max-w-xl mx-auto">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="메뉴, 문서, 데이터 검색... (/ 키로 빠른 검색)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-full"
                        aria-label="통합 검색"
                    />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
                        /
                    </kbd>
                </div>
            </div>

            {/* 우측 메뉴 */}
            <div className="flex items-center gap-2">
                {/* 즐겨찾기 */}
                <Button variant="ghost" size="icon" aria-label="즐겨찾기">
                    <Star className="h-5 w-5" />
                </Button>

                {/* 알림 */}
                <Button variant="ghost" size="icon" aria-label="알림" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                        3
                    </span>
                </Button>

                {/* 사용자 프로필 */}
                <Button variant="ghost" className="flex items-center gap-2" aria-label="사용자 메뉴">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <User className="h-4 w-4" />
                    </div>
                    <span className="hidden md:block text-sm">홍길동</span>
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </div>
        </header>
    );
}

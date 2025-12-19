/**
 * ============================================================================
 * 파일명: global-search.tsx
 * 앱: shell
 * 경로: apps/shell/components/features/global-search.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 통합 검색 컴포넌트입니다.
 * 메뉴, 문서, 데이터를 실시간으로 검색합니다.
 *
 * [♿ 접근성]
 * - '/' 키로 빠른 검색 포커스
 * - 화살표 키로 결과 탐색
 * - Escape로 닫기
 * ============================================================================
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Input, Card } from '@erp/ui/components';
import { Search, FileText, Menu, Database, Clock, X } from 'lucide-react';
import { cn } from '@erp/ui';

interface SearchResult {
    id: string;
    type: 'menu' | 'document' | 'data';
    title: string;
    path: string;
    icon: React.ReactNode;
}

// 모의 검색 결과
const MOCK_RESULTS: SearchResult[] = [
    { id: '1', type: 'menu', title: '사원관리', path: '/hrm/employees', icon: <Menu className="h-4 w-4" /> },
    { id: '2', type: 'menu', title: '급여명세서', path: '/payroll/slips', icon: <Menu className="h-4 w-4" /> },
    { id: '3', type: 'document', title: '2024년 급여대장', path: '/documents/123', icon: <FileText className="h-4 w-4" /> },
    { id: '4', type: 'data', title: '홍길동 (인사팀)', path: '/hrm/employees/1', icon: <Database className="h-4 w-4" /> },
];

export function GlobalSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [recentSearches, setRecentSearches] = useState<string[]>(['사원', '급여']);
    const inputRef = useRef<HTMLInputElement>(null);

    // '/' 키로 검색창 열기
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '/' && !isOpen && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // 검색창 열리면 포커스
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // 검색 실행 (디바운스)
    useEffect(() => {
        if (query.length > 0) {
            const filtered = MOCK_RESULTS.filter((r) =>
                r.title.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
            setSelectedIndex(0);
        } else {
            setResults([]);
        }
    }, [query]);

    // 키보드 네비게이션
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && results[selectedIndex]) {
            window.location.href = results[selectedIndex].path;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="container max-w-2xl mx-auto pt-20">
                <Card className="overflow-hidden">
                    {/* 검색 입력 */}
                    <div className="flex items-center border-b p-4">
                        <Search className="h-5 w-5 text-muted-foreground mr-3" />
                        <Input
                            ref={inputRef}
                            type="search"
                            placeholder="메뉴, 문서, 데이터 검색..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="border-0 focus-visible:ring-0 text-lg"
                            aria-label="통합 검색"
                        />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-muted rounded"
                            aria-label="닫기"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* 검색 결과 */}
                    <div className="max-h-96 overflow-y-auto">
                        {query.length === 0 ? (
                            // 최근 검색어
                            <div className="p-4">
                                <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    최근 검색
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {recentSearches.map((search) => (
                                        <button
                                            key={search}
                                            onClick={() => setQuery(search)}
                                            className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-muted/80"
                                        >
                                            {search}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : results.length > 0 ? (
                            <ul role="listbox">
                                {results.map((result, index) => (
                                    <li
                                        key={result.id}
                                        role="option"
                                        aria-selected={index === selectedIndex}
                                        className={cn(
                                            'flex items-center gap-3 px-4 py-3 cursor-pointer',
                                            index === selectedIndex ? 'bg-muted' : 'hover:bg-muted/50'
                                        )}
                                        onClick={() => (window.location.href = result.path)}
                                    >
                                        <div className="p-2 rounded bg-muted">{result.icon}</div>
                                        <div>
                                            <p className="font-medium">{result.title}</p>
                                            <p className="text-sm text-muted-foreground">{result.path}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-8 text-center text-muted-foreground">
                                검색 결과가 없습니다.
                            </div>
                        )}
                    </div>

                    {/* 단축키 안내 */}
                    <div className="border-t p-2 flex justify-center gap-4 text-xs text-muted-foreground">
                        <span>↑↓ 이동</span>
                        <span>Enter 선택</span>
                        <span>Esc 닫기</span>
                    </div>
                </Card>
            </div>
        </div>
    );
}

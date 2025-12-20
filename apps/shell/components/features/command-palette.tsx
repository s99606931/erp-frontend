/**
 * ============================================================================
 * 파일명: command-palette.tsx
 * 패키지: @erp/shell
 * 경로: apps/shell/components/features/command-palette.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 * 
 * [📄 파일 설명]
 * 커맨드 팔레트 컴포넌트입니다.
 * Ctrl+Shift+P를 누르면 화면 중앙에 검색창이 나타나고,
 * 메뉴나 명령어를 검색하여 빠르게 실행할 수 있습니다.
 * 
 * [🎯 주요 기능]
 * 1. 전역 단축키로 열기 (Ctrl+Shift+P)
 * 2. 퍼지 검색 (fuzzy search)
 * 3. 키보드 네비게이션 (화살표, Enter, Escape)
 * 4. 카테고리별 그룹화
 * ============================================================================
 */

'use client';

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import {
  FileText, Users, DollarSign, Calendar, Settings, Search
} from 'lucide-react';

/**
 * 메뉴 항목 타입
 */
interface MenuItem {
  id: string;
  title: string;
  href: string;
  category: string;
  icon?: React.ReactNode;
}

/**
 * 검색 가능한 메뉴 목록
 * 실제 프로젝트에서는 API나 설정에서 가져올 수 있습니다.
 */
const MENU_ITEMS: MenuItem[] = [
  { id: '1', title: '대시보드', href: '/dashboard', category: '홈', icon: <FileText className="w-4 h-4" /> },
  { id: '2', title: '인사카드 조회', href: '/hrm/employees', category: '인사관리', icon: <Users className="w-4 h-4" /> },
  { id: '3', title: '직원 등록', href: '/hrm/employees/new', category: '인사관리', icon: <Users className="w-4 h-4" /> },
  { id: '4', title: '급여명세서', href: '/payroll/statements', category: '급여관리', icon: <DollarSign className="w-4 h-4" /> },
  { id: '5', title: '예산 집행 현황', href: '/budget/execution', category: '예산관리', icon: <Calendar className="w-4 h-4" /> },
  { id: '6', title: '설정', href: '/settings', category: '설정', icon: <Settings className="w-4 h-4" /> },
];

/**
 * 커맨드 팔레트 컴포넌트
 */
export function CommandPalette() {
  // 팔레트 열림 상태
  const [open, setOpen] = useState(false);
  const router = useRouter();

  /**
   * 전역 키보드 단축키 등록
   * Ctrl+Shift+P 또는 Cmd+Shift+P로 열기
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+P (Windows) 또는 Cmd+Shift+P (Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        setOpen(prev => !prev);
      }

      // '/' 키로도 열기 (메인 콘텐츠에서만)
      if (e.key === '/' && !isInputFocused()) {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  /**
   * 메뉴 항목 선택 핸들러
   */
  const handleSelect = (item: MenuItem) => {
    setOpen(false);
    router.push(item.href);
  };

  // 열려있지 않으면 렌더링하지 않음
  if (!open) return null;

  return (
    <>
      {/* 오버레이 배경 */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity"
        onClick={() => setOpen(false)}
      />

      {/* 커맨드 팔레트 */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <Command
          className="rounded-xl border bg-popover text-popover-foreground overflow-hidden"
          // Escape 키로 닫기
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
          label="Command Palette"
        >
          {/* 검색 입력 */}
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="w-4 h-4 mr-2 shrink-0 opacity-50" />
            <Command.Input
              placeholder="메뉴 또는 명령 검색..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              autoFocus
            />
          </div>

          {/* 검색 결과 목록 */}
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              검색 결과가 없습니다
            </Command.Empty>

            {/* 카테고리별 그룹 */}
            {Object.entries(groupByCategory(MENU_ITEMS)).map(([category, items]) => (
              <Command.Group key={category} heading={category} className="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
                {items.map(item => (
                  <Command.Item
                    key={item.id}
                    value={`${item.title} ${item.category}`}
                    onSelect={() => handleSelect(item)}
                    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <span className="mr-2 flex h-4 w-4 items-center justify-center">
                      {item.icon}
                    </span>
                    <span>{item.title}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      </div>
    </>
  );
}

/**
 * 메뉴 항목을 카테고리별로 그룹화합니다
 */
function groupByCategory(items: MenuItem[]): Record<string, MenuItem[]> {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category]!.push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);
}

/**
 * 현재 입력 필드에 포커스가 있는지 확인합니다
 */
function isInputFocused(): boolean {
  if (typeof document === 'undefined') return false;
  const activeElement = document.activeElement;
  if (!activeElement) return false;
  const tagName = activeElement.tagName.toLowerCase();
  return tagName === 'input' || tagName === 'textarea' || (activeElement as HTMLElement)?.isContentEditable;
}

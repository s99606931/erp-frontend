# Phase 23: 커맨드 팔레트

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)  
> **📋 관련 PRD**: [PRD_UX_ENHANCEMENT.md](../../.agent/docs/PRD_UX_ENHANCEMENT.md) - 섹션 6

---

## 📌 목표

VS Code의 `Ctrl + Shift + P`처럼 모든 메뉴와 명령을 검색하고 실행할 수 있는 커맨드 팔레트를 구현합니다.

**완료 조건**: 
- Ctrl+Shift+P로 커맨드 팔레트 열기
- 메뉴 검색 및 선택
- Enter로 실행

---

## 🎯 학습 목표

1. `cmdk` 라이브러리 사용법
2. 검색 필터링 구현
3. 키보드 네비게이션

---

## ✅ 작업 목록

### 23.1 패키지 설치

```bash
pnpm add cmdk
```

---

### 23.2 CommandPalette 컴포넌트 생성

**파일 위치**: `apps/shell/components/features/command-palette.tsx`

```tsx
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
 * 
 * [📦 사용 예시]
 * ```tsx
 * // 레이아웃에 추가
 * <CommandPalette />
 * ```
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
  { id: '1', title: '대시보드', href: '/dashboard', category: '홈', icon: <FileText /> },
  { id: '2', title: '인사카드 조회', href: '/hrm/employees', category: '인사관리', icon: <Users /> },
  { id: '3', title: '직원 등록', href: '/hrm/employees/new', category: '인사관리', icon: <Users /> },
  { id: '4', title: '급여명세서', href: '/payroll/statements', category: '급여관리', icon: <DollarSign /> },
  { id: '5', title: '예산 집행 현황', href: '/budget/execution', category: '예산관리', icon: <Calendar /> },
  { id: '6', title: '설정', href: '/settings', category: '설정', icon: <Settings /> },
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
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
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
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setOpen(false)}
      />
      
      {/* 커맨드 팔레트 */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg">
        <Command 
          className="rounded-lg border shadow-2xl bg-background"
          // Escape 키로 닫기
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
        >
          {/* 검색 입력 */}
          <div className="flex items-center border-b px-3">
            <Search className="w-4 h-4 mr-2 text-muted-foreground" />
            <Command.Input 
              placeholder="메뉴 또는 명령 검색..." 
              className="flex-1 h-12 bg-transparent outline-none"
              autoFocus
            />
          </div>
          
          {/* 검색 결과 목록 */}
          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-muted-foreground">
              검색 결과가 없습니다
            </Command.Empty>
            
            {/* 카테고리별 그룹 */}
            {Object.entries(groupByCategory(MENU_ITEMS)).map(([category, items]) => (
              <Command.Group key={category} heading={category}>
                {items.map(item => (
                  <Command.Item
                    key={item.id}
                    value={`${item.title} ${item.category}`}
                    onSelect={() => handleSelect(item)}
                    className="flex items-center gap-2 px-2 py-2 rounded cursor-pointer
                               aria-selected:bg-primary/10"
                  >
                    {item.icon}
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
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);
}

/**
 * 현재 입력 필드에 포커스가 있는지 확인합니다
 */
function isInputFocused(): boolean {
  const activeElement = document.activeElement;
  const tagName = activeElement?.tagName.toLowerCase();
  return tagName === 'input' || tagName === 'textarea';
}
```

---

## 📊 완료 체크리스트

- [ ] `cmdk` 패키지 설치
- [ ] `CommandPalette` 컴포넌트 생성
- [ ] Ctrl+Shift+P로 열기 동작
- [ ] 메뉴 검색 동작
- [ ] Enter로 메뉴 이동 동작
- [ ] Escape로 닫기 동작
- [ ] 모든 함수에 JSDoc 주석

---

## 🔧 테스트 방법

1. `Ctrl+Shift+P` 누르기 → 커맨드 팔레트 열림
2. "인사" 입력 → 인사관리 메뉴 필터링
3. 화살표 키로 선택 → Enter로 이동
4. Escape 또는 배경 클릭 → 닫힘

---

## ➡️ 다음 단계

[Phase 24: AI 패널 기본](./task_phase_24_ai_panel_basic.md)

/**
 * ============================================================================
 * 파일명: tab-bar.tsx
 * 패키지: @erp/shell
 * 경로: apps/shell/components/layout/tab-bar.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 * 
 * [📄 파일 설명]
 * 워크스페이스 탭 바 컴포넌트입니다.
 * 열린 탭들을 가로로 나열하고, 클릭하면 해당 탭으로 전환합니다.
 * Zustand 스토어(useTabStore)와 연동되어 상태를 관리합니다.
 * 
 * [🎯 주요 기능]
 * 1. 열린 탭 목록 표시 (가로 스크롤)
 * 2. 현재 경로(URL)와 탭 상태 동기화
 * 3. 탭 클릭 시 페이지 이동
 * 4. 탭 닫기 및 자동 라우팅
 * ============================================================================
 */

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { X, Home, GripVertical } from 'lucide-react';
import { cn } from '@erp/ui';
import { useTabStore, type Tab } from '@/stores/tab-store';
import { Button } from '@erp/ui/components';
import { useTabShortcuts } from '@/hooks/use-tab-shortcuts';

/**
 * 탭 바 컴포넌트
 */
export function TabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { tabs, activeTabId, openTab, setActiveTab, closeTab } = useTabStore();

  // 키보드 단축키 활성화
  useTabShortcuts();

  // 1. URL 변경 감지 -> 탭 동기화
  // 오직 URL이 변경되었을 때만 실행되어 탭 상태를 맞춥니다.
  // 반대 방향 (탭 상태 변경 -> URL 이동)은 사용자 이벤트(클릭, 닫기)에서 처리합니다.
  useEffect(() => {
    // 홈('/')은 탭으로 관리하지 않음
    if (pathname === '/') {
      setActiveTab(''); // 활성 탭 없음 (홈)
      return;
    }

    // 현재 URL에 해당하는 탭이 있는지 확인
    const existingTab = tabs.find(t => t.href === pathname);

    if (existingTab) {
      // 이미 있으면 활성화 (중복 호출 방지)
      if (activeTabId !== existingTab.id) {
        setActiveTab(existingTab.id);
      }
    } else {
      // 없으면 새 탭 추가
      const segments = pathname.split('/').filter(Boolean);
      const lastSegment = segments.pop() || 'Unknown';
      const title = decodeURIComponent(lastSegment).charAt(0).toUpperCase() + decodeURIComponent(lastSegment).slice(1);

      const newTab: Tab = {
        id: pathname, // URL을 ID로 사용
        title: title,
        href: pathname,
      };

      openTab(newTab);
    }
  }, [pathname, tabs, activeTabId, openTab, setActiveTab]);

  /**
   * 탭 클릭 핸들러
   */
  const handleTabClick = (tab: Tab) => {
    if (tab.id !== activeTabId) {
      // 스토어 업데이트
      setActiveTab(tab.id);
      // URL 이동 (이후 위 useEffect가 다시 실행되지만 activeTabId가 이미 맞으므로 루프 없음)
      router.push(tab.href);
    }
  };

  /**
   * 탭 닫기 핸들러
   */
  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation(); // 탭 클릭 이벤트 전파 방지

    // 닫으려는 탭이 활성 탭인지 확인
    const isClosingActive = tabId === activeTabId;
    const tabIndex = tabs.findIndex(t => t.id === tabId);

    // 탭 닫기 (스토어 상태 업데이트)
    closeTab(tabId);

    // 활성 탭을 닫은 경우, 다음으로 이동할 곳을 결정하여 라우팅
    if (isClosingActive) {
      const remainingTabs = tabs.filter(t => t.id !== tabId);

      if (remainingTabs.length > 0) {
        // 다음으로 활성화될 탭 찾기 (스토어의 로직과 맞춰줌)
        const nextIndex = Math.min(tabIndex, remainingTabs.length - 1);
        const nextTab = remainingTabs[nextIndex];

        if (nextTab) {
          router.push(nextTab.href);
        }
      } else {
        // 남은 탭이 없으면 홈으로 이동
        router.push('/');
      }
    }
  };

  return (
    <div
      className="flex h-10 w-full items-center gap-1 border-b bg-muted/40 px-2 overflow-x-auto"
      role="tablist"
      aria-label="워크스페이스 탭"
    >
      {/* 홈 버튼 (고정) */}
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'h-8 px-2 text-muted-foreground hover:text-foreground',
          pathname === '/' && 'bg-background text-foreground shadow-sm'
        )}
        onClick={() => router.push('/')}
        aria-label="홈으로 이동"
      >
        <Home className="h-4 w-4" />
      </Button>

      <div className="mx-1 h-4 w-px bg-border/50" />

      {/* 탭 목록 */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tab"
          aria-selected={tab.id === activeTabId}
          aria-label={`${tab.title} 탭`}
          tabIndex={0}
          onClick={() => handleTabClick(tab)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleTabClick(tab);
            }
          }}
          className={cn(
            // 기본 스타일
            'group flex h-8 min-w-[120px] max-w-[200px] cursor-pointer items-center justify-between',
            'rounded-t-md border border-b-0 border-transparent px-3 text-xs',
            'transition-all duration-150',
            // 비활성 탭
            'text-muted-foreground hover:bg-muted/80 hover:text-foreground',
            // 활성 탭
            tab.id === activeTabId && [
              'bg-background text-foreground font-medium',
              'shadow-[0_-1px_2px_rgba(0,0,0,0.05)]', // 상단 미세 그림자
              'border-border', // 테두리 추가
              'relative z-10', // 다른 요소보다 위로
              'translate-y-[1px] pb-[1px]', // 하단 테두리 가리기 (탭 느낌)
            ]
          )}
        >
          {/* 드래그 핸들 & 제목 */}
          <div className="flex items-center gap-2 truncate flex-1">
            <GripVertical className={cn(
              "h-3 w-3 text-muted-foreground/30 opacity-0 transition-opacity",
              "group-hover:opacity-100 cursor-grab active:cursor-grabbing"
            )} />
            <span className="truncate">{tab.title}</span>
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={(e) => handleCloseTab(e, tab.id)}
            className={cn(
              "ml-1 rounded-sm p-0.5 opacity-0 transition-all",
              "hover:bg-muted-foreground/20 hover:text-foreground",
              "group-hover:opacity-100", // 탭에 마우스 올리면 표시
              tab.id === activeTabId && "opacity-100" // 활성 탭은 항상 표시 (혹은 선택사항)
            )}
            aria-label="탭 닫기"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}

      {/* 탭이 없을 때 안내 문구 (선택적) */}
      {tabs.length === 0 && pathname !== '/' && (
        <div className="ml-2 text-xs text-muted-foreground/50 hidden sm:block">
          {/* 탭을 열어 업무를 시작하세요 */}
        </div>
      )}
    </div>
  );
}

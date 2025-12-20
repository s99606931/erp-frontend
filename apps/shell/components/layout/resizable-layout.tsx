/**
 * ============================================================================
 * 파일명: resizable-layout.tsx
 * 패키지: @erp/shell
 * 경로: apps/shell/components/layout/resizable-layout.tsx
 * 작성일: 2025-12-20
 * 수정일: 2025-12-20 (UX Enhancement - Store 연동)
 * ============================================================================
 *
 * [📄 파일 설명]
 * VS Code 스타일의 리사이저블 패널 레이아웃입니다.
 * `allotment` 라이브러리를 사용하며, LayoutStore와 연동됩니다.
 *
 * [🎯 주요 기능]
 * 1. 사이드바 너비 드래그로 조정
 * 2. 스냅 기능 (최소 크기 이하로 드래그 시 자동 접힘)
 * 3. 햄버거 메뉴 버튼과 연동 (Store 상태 동기화)
 * 4. 복구 버튼으로 사이드바 펼치기
 * ============================================================================
 */

'use client';

import { Allotment } from 'allotment';
import type { AllotmentHandle } from 'allotment';
import 'allotment/dist/style.css';
import { type ReactNode, useState, useRef, useCallback, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@erp/ui';
import { useLayoutStore } from '@/lib/store/layout';

/**
 * ResizableLayout 컴포넌트의 Props 타입
 */
interface ResizableLayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
  defaultSidebarSize?: number;
  minSidebarSize?: number;
  maxSidebarSize?: number;
}

/**
 * Allotment 기반 리사이저블 레이아웃 컴포넌트
 * LayoutStore와 연동하여 햄버거 메뉴 버튼 제어 가능
 */
export function ResizableLayout({
  sidebar,
  main,
  defaultSidebarSize = 250,
  minSidebarSize = 200,
  maxSidebarSize = 500,
}: ResizableLayoutProps) {
  // Store 상태 구독
  const { sidebarOpen, setSidebarOpen } = useLayoutStore();

  // 로컬 접힘 상태 (드래그로 접혔는지 추적)
  const [isCollapsed, setIsCollapsed] = useState(!sidebarOpen);

  // Allotment ref for programmatic control
  const allotmentRef = useRef<AllotmentHandle>(null);

  /**
   * Store 상태 변경 시 Allotment 동기화
   * 햄버거 버튼 클릭 → Store 변경 → 여기서 Allotment 제어
   */
  useEffect(() => {
    if (sidebarOpen && isCollapsed) {
      // 펼치기
      allotmentRef.current?.resize([defaultSidebarSize]);
      setIsCollapsed(false);
    } else if (!sidebarOpen && !isCollapsed) {
      // 접기
      allotmentRef.current?.resize([0]);
      setIsCollapsed(true);
    }
  }, [sidebarOpen, isCollapsed, defaultSidebarSize]);

  /**
   * 사이드바 펼치기 (복구 버튼용)
   */
  const expandSidebar = useCallback(() => {
    allotmentRef.current?.resize([defaultSidebarSize]);
    setIsCollapsed(false);
    setSidebarOpen(true);
  }, [defaultSidebarSize, setSidebarOpen]);

  /**
   * 패널 크기 변경 핸들러 (접힘 상태 감지 및 Store 동기화)
   */
  const handleChange = useCallback((sizes: number[]) => {
    const sidebarSize = sizes[0] ?? 0;
    const collapsed = sidebarSize < 50;

    setIsCollapsed(collapsed);
    // Store와 동기화 (드래그로 접힘 상태 변경 시)
    if (collapsed !== !sidebarOpen) {
      setSidebarOpen(!collapsed);
    }

    // 쿠키 저장 (SSR 복원용)
    if (typeof document !== 'undefined' && !collapsed) {
      document.cookie = `allotment:sidebar=${sidebarSize}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, [sidebarOpen, setSidebarOpen]);

  // 쿠키에서 저장된 크기 복원
  const [initialSize, setInitialSize] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/allotment:sidebar=(\d+)/);
      if (match) {
        const savedSize = parseInt(match[1] ?? '0', 10);
        setInitialSize(savedSize > 50 ? savedSize : defaultSidebarSize);
      } else {
        setInitialSize(defaultSidebarSize);
      }
      // Store 상태와 동기화
      setIsCollapsed(!sidebarOpen);
    }
  }, [defaultSidebarSize, sidebarOpen]);

  // SSR 대응
  if (initialSize === undefined) {
    return (
      <div className="flex h-full">
        <div style={{ width: defaultSidebarSize }}>{sidebar}</div>
        <div className="flex-1">{main}</div>
      </div>
    );
  }

  return (
    <Allotment
      ref={allotmentRef}
      onChange={handleChange}
      proportionalLayout={false}
    >
      {/* 사이드바 Pane */}
      <Allotment.Pane
        preferredSize={sidebarOpen ? initialSize : 0}
        minSize={isCollapsed ? 0 : minSidebarSize}
        maxSize={maxSidebarSize}
        snap
      >
        <div className={cn(
          'h-full overflow-hidden transition-opacity duration-150',
          isCollapsed && 'opacity-0 pointer-events-none'
        )}>
          {sidebar}
        </div>
      </Allotment.Pane>

      {/* 메인 Pane */}
      <Allotment.Pane>
        <div className="relative h-full overflow-hidden">
          {/* 사이드바 접힘 시 펼치기 버튼 */}
          {isCollapsed && (
            <button
              onClick={expandSidebar}
              className={cn(
                'absolute left-0 top-1/2 z-10 -translate-y-1/2',
                'flex h-8 w-4 items-center justify-center',
                'rounded-r-md bg-muted/80 hover:bg-primary/20',
                'transition-colors duration-150 shadow-sm border-y border-r'
              )}
              aria-label="사이드바 펼치기"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
          {main}
        </div>
      </Allotment.Pane>
    </Allotment>
  );
}

/**
 * ============================================================================
 * 파일명: resizable-layout.tsx
 * 패키지: @erp/shell
 * 경로: apps/shell/components/layout/resizable-layout.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * 리사이저블 패널 레이아웃 컴포넌트입니다.
 * VS Code처럼 사이드바와 메인 콘텐츠 영역의 크기를
 * 마우스 드래그로 조정할 수 있습니다.
 *
 * [🎯 주요 기능]
 * 1. 사이드바 너비 드래그로 조정
 * 2. 패널 크기 Cookie에 저장/복원 (SSR 지원)
 * 3. 최소/최대 크기 제한
 * 4. 키보드 접근성 지원
 * 5. 사이드바 접기/펼치기
 *
 * [🔗 의존성]
 * - react-resizable-panels v4.x
 * ============================================================================
 */

'use client';

import {
  Group,
  Panel,
  Separator,
  usePanelRef,
  type PanelSize,
} from 'react-resizable-panels';
import { type ReactNode, useState, useCallback } from 'react';
import { GripVertical, ChevronRight } from 'lucide-react';
import { cn } from '@erp/ui';

/**
 * ResizableLayout 컴포넌트의 Props 타입
 *
 * @property sidebar - 사이드바에 표시할 콘텐츠
 * @property main - 메인 영역에 표시할 콘텐츠
 * @property defaultSidebarSize - 사이드바 기본 크기 (%, 기본값: 20)
 * @property minSidebarSize - 사이드바 최소 크기 (%, 기본값: 15)
 * @property maxSidebarSize - 사이드바 최대 크기 (%, 기본값: 45)
 * @property defaultLayout - 쿠키에서 복원된 초기 레이아웃 배열
 */
interface ResizableLayoutProps {
  /** 사이드바에 표시할 콘텐츠 */
  sidebar: ReactNode;
  /** 메인 영역에 표시할 콘텐츠 */
  main: ReactNode;
  /** 사이드바 기본 크기 (%, 기본값: 20) */
  defaultSidebarSize?: number;
  /** 사이드바 최소 크기 (%, 기본값: 15) */
  minSidebarSize?: number;
  /** 사이드바 최대 크기 (%, 기본값: 45) */
  maxSidebarSize?: number;
  /** 서버에서 전달받은 초기 레이아웃 (쿠키 값) */
  defaultLayout?: number[] | undefined;
}

/**
 * 리사이저블 레이아웃 컴포넌트
 */
export function ResizableLayout({
  sidebar,
  main,
  // 기본값 설정
  defaultSidebarSize = 20,
  minSidebarSize = 15,
  maxSidebarSize = 45,
  defaultLayout,
}: ResizableLayoutProps) {
  // 사이드바 접힘 상태 관리
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 사이드바 패널 ref
  const sidebarPanelRef = usePanelRef();

  /**
   * 사이드바 토글 핸들러
   */
  const toggleSidebar = useCallback(() => {
    const panel = sidebarPanelRef.current;
    if (!panel) return;

    if (isCollapsed) {
      panel.expand();
    } else {
      panel.collapse();
    }
  }, [isCollapsed, sidebarPanelRef]);

  /**
   * 패널 크기 변경 핸들러 (접힘 상태 감지 및 쿠키 저장)
   * PanelGroup의 onLayout이 v4 Group에서 지원되지 않을 수 있어 여기서 처리
   */
  const handleSidebarResize = useCallback((panelSize: PanelSize, _id?: string | number) => {
    const size = panelSize.asPercentage;
    setIsCollapsed(size < 1);

    // 쿠키 저장 (SSR 복원용)
    const layout = [size, 100 - size];

    // 쿠키 설정: 1년 유효
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(layout)}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  // 초기 사이드바 크기 계산 및 안전 장치
  // 배열 인덱스 접근 안전성 확보 (Optional Chaining & Nullish Coalescing)
  let initialSidebarSize = defaultLayout?.[0] ?? defaultSidebarSize;

  // 저장된 값이 최소 크기보다 작지만 0(접힘)은아닌 경우 (애매하게 작아진 상태 복원 방지)
  // 1% ~ minSidebarSize 사이의 값은 minSidebarSize로 강제 보정
  if (initialSidebarSize > 1 && initialSidebarSize < minSidebarSize) {
    initialSidebarSize = minSidebarSize;
  }

  return (
    <Group
      orientation="horizontal"
      className="h-full"
    >
      {/* 사이드바 패널 */}
      <Panel
        panelRef={sidebarPanelRef}
        defaultSize={initialSidebarSize}
        minSize={minSidebarSize}
        maxSize={maxSidebarSize}
        collapsible={true}
        collapsedSize={0}
        onResize={handleSidebarResize}
        id="sidebar"
        className={cn(
          'transition-[flex] duration-200 ease-out',
          isCollapsed && 'flex-none'
        )}
      >
        <div className="h-full overflow-hidden">{sidebar}</div>
      </Panel>

      {/* 리사이즈 핸들 */}
      <Separator
        className={cn(
          'relative flex w-2 items-center justify-center',
          'bg-border',
          'hover:bg-primary/50',
          'data-[resize-handle-active]:bg-primary',
          'transition-colors duration-150',
          'cursor-col-resize'
        )}
        id="sidebar-resize-handle"
      >
        <div
          className={cn(
            'absolute rounded bg-muted-foreground/30 p-0.5',
            'opacity-50 group-hover:opacity-100',
            'transition-opacity duration-150'
          )}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </Separator>

      {/* 메인 패널 */}
      <Panel
        id="main"
        defaultSize={defaultLayout ? defaultLayout[1] : undefined}
      >
        <div className="relative h-full overflow-hidden">
          {isCollapsed && (
            <button
              onClick={toggleSidebar}
              className={cn(
                'absolute left-0 top-1/2 z-10 -translate-y-1/2',
                'flex h-6 w-3 items-center justify-center',
                'rounded-r-md bg-border/80',
                'hover:bg-primary/30',
                'transition-colors duration-150'
              )}
              aria-label="사이드바 펼치기"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          {main}
        </div>
      </Panel>
    </Group>
  );
}

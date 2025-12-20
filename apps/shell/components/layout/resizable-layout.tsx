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
 * 2. 패널 크기 localStorage에 저장/복원 (autoSaveId)
 * 3. 최소/최대 크기 제한
 * 4. 키보드 접근성 지원
 * 5. 사이드바 접기/펼치기
 *
 * [📦 사용 예시]
 * ```tsx
 * <ResizableLayout
 *   sidebar={<Sidebar />}
 *   main={<MainContent />}
 * />
 * ```
 *
 * [🔗 의존성]
 * - react-resizable-panels v4.x: 리사이저블 패널 라이브러리
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
 * @property defaultSidebarSize - 사이드바 기본 크기 (%, 기본값: 15)
 * @property minSidebarSize - 사이드바 최소 크기 (%, 기본값: 10)
 * @property maxSidebarSize - 사이드바 최대 크기 (%, 기본값: 30)
 */
interface ResizableLayoutProps {
  /** 사이드바에 표시할 콘텐츠 */
  sidebar: ReactNode;
  /** 메인 영역에 표시할 콘텐츠 */
  main: ReactNode;
  /** 사이드바 기본 크기 (%, 기본값: 15) */
  defaultSidebarSize?: number;
  /** 사이드바 최소 크기 (%, 기본값: 10) */
  minSidebarSize?: number;
  /** 사이드바 최대 크기 (%, 기본값: 30) */
  maxSidebarSize?: number;
}

/**
 * 리사이저블 레이아웃 컴포넌트
 *
 * 사이드바와 메인 콘텐츠 사이에 드래그 가능한 핸들을 제공합니다.
 * 사용자가 드래그하면 패널 크기가 조정되고, localStorage에 저장됩니다.
 *
 * @example
 * // 기본 사용법
 * <ResizableLayout
 *   sidebar={<Sidebar />}
 *   main={<MainContent />}
 * />
 *
 * // 커스텀 사이드바 크기
 * <ResizableLayout
 *   sidebar={<Sidebar />}
 *   main={<MainContent />}
 *   defaultSidebarSize={20}
 * />
 */
export function ResizableLayout({
  sidebar,
  main,
  defaultSidebarSize = 15,
  minSidebarSize = 10,
  maxSidebarSize = 30,
}: ResizableLayoutProps) {
  // 사이드바 접힘 상태 관리
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 사이드바 패널 ref (프로그래밍적 제어용)
  // v4에서는 usePanelRef 훅 사용
  const sidebarPanelRef = usePanelRef();

  /**
   * 사이드바 토글 핸들러
   * 접혀있으면 펼치고, 펼쳐져 있으면 접습니다.
   */
  const toggleSidebar = useCallback(() => {
    const panel = sidebarPanelRef.current;
    if (!panel) return;

    if (isCollapsed) {
      // 펼치기: 기본 크기로 복원
      panel.expand();
    } else {
      // 접기: 0%로 축소
      panel.collapse();
    }
  }, [isCollapsed, sidebarPanelRef]);

  /**
   * 패널 크기 변경 핸들러
   * v4에서는 PanelSize는 { asPercentage: number; inPixels: number } 객체입니다.
   * 크기가 1% 미만이면 접힌 것으로 간주
   */
  const handleSidebarResize = useCallback((panelSize: PanelSize, _id?: string | number) => {
    // PanelSize 객체에서 퍼센트 값 추출
    const size = panelSize.asPercentage;
    setIsCollapsed(size < 1);
  }, []);

  return (
    <Group
      orientation="horizontal"
      // id: localStorage에 레이아웃 상태를 저장할 키
      // 같은 키를 사용하면 페이지 새로고침 후에도 크기가 유지됩니다
      id="erp-main-layout"
      className="h-full"
    >
      {/*
        사이드바 패널
        - defaultSize: 초기 크기 (숫자 = %, 문자열 = "200px")
        - minSize: 최소 크기
        - maxSize: 최대 크기
        - collapsible: true면 완전히 접을 수 있음
        - collapsedSize: 접혔을 때 크기
      */}
      <Panel
        panelRef={sidebarPanelRef}
        defaultSize={defaultSidebarSize}
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
        {/* 사이드바 콘텐츠 */}
        <div className="h-full overflow-hidden">{sidebar}</div>
      </Panel>

      {/*
        리사이즈 핸들 (Separator)
        - 이 영역을 드래그하면 패널 크기가 변경됩니다
        - 호버 시 시각적 피드백 제공
        - w-2 (8px)로 드래그 영역 확대
      */}
      <Separator
        className={cn(
          // 기본 스타일 - 더 넓은 핸들 (8px)
          'relative flex w-2 items-center justify-center',
          'bg-border',
          // 호버 시 - 더 밝은 primary 색상
          'hover:bg-primary/50',
          // 드래그 중 - 강조
          'data-[resize-handle-active]:bg-primary',
          // 트랜지션
          'transition-colors duration-150',
          // 커서
          'cursor-col-resize'
        )}
        id="sidebar-resize-handle"
      >
        {/* 드래그 핸들 아이콘 (항상 표시) */}
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

      {/*
        메인 콘텐츠 패널
        - 사이드바를 제외한 나머지 공간을 차지합니다
      */}
      <Panel id="main">
        <div className="relative h-full overflow-hidden">
          {/* 사이드바 토글 버튼 (사이드바가 접혔을 때 표시) */}
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

          {/* 메인 콘텐츠 */}
          {main}
        </div>
      </Panel>
    </Group>
  );
}

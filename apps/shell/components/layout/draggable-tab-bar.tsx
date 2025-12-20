/**
 * ============================================================================
 * 파일명: draggable-tab-bar.tsx
 * 패키지: @erp/shell
 * 경로: apps/shell/components/layout/draggable-tab-bar.tsx
 * 작성일: 2025-12-20
 * 수정일: 2025-12-20 (UI Polish - 항상 표시)
 * ============================================================================
 *
 * [📄 파일 설명]
 * 탭을 드래그 앤 드롭으로 순서를 변경할 수 있는 탭 바 컴포넌트입니다.
 * 탭이 없어도 영역이 표시되어 UI 일관성을 유지합니다.
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTabStore } from '@/stores/tab-store';
import type { Tab } from '@/stores/tab-store';
import { useTabSync } from '@/hooks/use-tab-sync';
import { X, Plus } from 'lucide-react';
import { cn } from '@erp/ui/lib/utils';
import { useRouter } from 'next/navigation';

/**
 * 드래그 가능한 탭 바 컴포넌트
 */
export function DraggableTabBar() {
  const { tabs, activeTabId, setActiveTab, closeTab, setTabs } = useTabStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const router = useRouter();

  // URL 변경 시 탭 상태 동기화
  useTabSync();

  // 드래그 센서 설정
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tabs.findIndex(t => t.id === active.id);
      const newIndex = tabs.findIndex(t => t.id === over.id);
      const newTabs = arrayMove(tabs, oldIndex, newIndex);
      setTabs(newTabs);
    }

    setActiveId(null);
  };

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.id);
    router.push(tab.href);
  };

  const activeTab = tabs.find(t => t.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="flex items-center h-10 overflow-x-auto scrollbar-hide"
        role="tablist"
      >
        {tabs.length === 0 ? (
          // 탭이 없을 때 안내 메시지
          <div className="flex items-center h-full px-4 text-xs text-muted-foreground/60">
            <Plus className="w-3 h-3 mr-1.5" />
            <span>메뉴를 클릭하여 탭을 열어보세요</span>
          </div>
        ) : (
          <SortableContext
            items={tabs.map(t => t.id)}
            strategy={horizontalListSortingStrategy}
          >
            {tabs.map((tab) => (
              <SortableTab
                key={tab.id}
                tab={tab}
                isActive={tab.id === activeTabId}
                onActivate={() => handleTabClick(tab)}
                onClose={() => closeTab(tab.id)}
              />
            ))}
          </SortableContext>
        )}
      </div>

      {/* 드래그 오버레이 */}
      <DragOverlay>
        {activeTab ? (
          <div className="px-4 py-2 bg-background border rounded shadow-lg flex items-center gap-2 opacity-90 text-sm">
            <span className="font-medium">{activeTab.title}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

/**
 * 개별 드래그 가능한 탭
 */
interface SortableTabProps {
  tab: Tab;
  isActive: boolean;
  onActivate: () => void;
  onClose: () => void;
}

function SortableTab({ tab, isActive, onActivate, onClose }: SortableTabProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tab.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 10 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      role="tab"
      aria-selected={isActive}
      tabIndex={0}
      onClick={onActivate}
      className={cn(
        'group flex items-center gap-2 px-3 py-2 min-w-[100px] max-w-[180px] h-full',
        'border-r border-border/30 cursor-grab active:cursor-grabbing select-none',
        'transition-colors text-xs',
        isActive
          ? 'bg-background text-foreground font-medium border-b-2 border-b-primary'
          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
      )}
    >
      <span className="truncate flex-1">{tab.title}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className={cn(
          "p-0.5 rounded-sm opacity-0 group-hover:opacity-100 hover:bg-foreground/10 transition-opacity",
          isActive && "opacity-60"
        )}
        aria-label={`${tab.title} 탭 닫기`}
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

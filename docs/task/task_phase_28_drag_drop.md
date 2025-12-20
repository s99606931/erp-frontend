# Phase 28: 드래그 앤 드롭

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)  
> **📋 관련 PRD**: [PRD_UX_ENHANCEMENT.md](../../.agent/docs/PRD_UX_ENHANCEMENT.md) - 섹션 5

---

## 📌 목표

`@dnd-kit` 라이브러리를 사용하여 탭, 카드, 테이블 행 등을 드래그 앤 드롭할 수 있는 기능을 구현합니다.

**완료 조건**: 
- 탭을 드래그하여 순서 변경
- 드래그 시 시각적 피드백 표시
- 키보드 대안 제공

---

## 🎯 학습 목표

1. @dnd-kit 라이브러리 사용법
2. 드래그 피드백 UI 구현
3. 접근성 있는 드래그 앤 드롭

---

## ✅ 작업 목록

### 28.1 패키지 설치

```bash
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

---

### 28.2 드래그 가능한 탭 바 구현

**파일 위치**: `apps/shell/components/layout/draggable-tab-bar.tsx`

```tsx
/**
 * ============================================================================
 * 파일명: draggable-tab-bar.tsx
 * 패키지: @erp/shell
 * 경로: apps/shell/components/layout/draggable-tab-bar.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 * 
 * [📄 파일 설명]
 * 탭을 드래그 앤 드롭으로 순서를 변경할 수 있는 탭 바 컴포넌트입니다.
 * @dnd-kit 라이브러리를 사용하여 구현합니다.
 * 
 * [🎯 주요 기능]
 * 1. 탭 드래그로 순서 변경
 * 2. 드래그 중 시각적 피드백 (반투명 고스트)
 * 3. 드롭 영역 하이라이트
 * 4. 키보드 대안 (Space로 선택, 화살표로 이동)
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
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTabStore, Tab } from '@/stores/tab-store';
import { X } from 'lucide-react';
import { cn } from '@erp/ui/lib/utils';

/**
 * 드래그 가능한 탭 바 컴포넌트
 */
export function DraggableTabBar() {
  const { tabs, activeTabId, setActiveTab, closeTab } = useTabStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  
  // 드래그 센서 설정
  const sensors = useSensors(
    // 마우스/터치 드래그
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px 이상 움직여야 드래그 시작
      },
    }),
    // 키보드 드래그 (접근성)
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  /**
   * 드래그 시작 핸들러
   */
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };
  
  /**
   * 드래그 종료 핸들러
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      // 탭 순서 변경 로직
      const oldIndex = tabs.findIndex(t => t.id === active.id);
      const newIndex = tabs.findIndex(t => t.id === over.id);
      
      // 스토어 업데이트 (실제 구현 필요)
      const newTabs = arrayMove(tabs, oldIndex, newIndex);
      // useTabStore.setState({ tabs: newTabs });
    }
    
    setActiveId(null);
  };
  
  // 현재 드래그 중인 탭
  const activeTab = tabs.find(t => t.id === activeId);
  
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div 
        className="flex items-center h-10 bg-muted/50 border-b"
        role="tablist"
      >
        <SortableContext
          items={tabs.map(t => t.id)}
          strategy={horizontalListSortingStrategy}
        >
          {tabs.map((tab) => (
            <SortableTab
              key={tab.id}
              tab={tab}
              isActive={tab.id === activeTabId}
              onActivate={() => setActiveTab(tab.id)}
              onClose={() => closeTab(tab.id)}
            />
          ))}
        </SortableContext>
      </div>
      
      {/* 드래그 오버레이 (고스트 이미지) */}
      <DragOverlay>
        {activeTab ? (
          <div className="px-4 py-2 bg-primary/10 border rounded shadow-lg">
            {activeTab.title}
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
    // 드래그 중에는 반투명
    opacity: isDragging ? 0.5 : 1,
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
        'flex items-center gap-2 px-4 py-2 min-w-[120px] max-w-[200px]',
        'border-r cursor-grab active:cursor-grabbing',
        'transition-colors',
        isActive && 'bg-background border-b-2 border-b-primary'
      )}
    >
      <span className="truncate flex-1 text-sm">{tab.title}</span>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="p-1 rounded hover:bg-muted-foreground/20"
        aria-label={`${tab.title} 탭 닫기`}
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
```

---

### 28.3 드래그 피드백 스타일

**파일 추가**: `apps/shell/app/globals.css`

```css
/* 드래그 중인 요소 */
[data-dragging="true"] {
  opacity: 0.5;
  cursor: grabbing;
}

/* 드롭 영역 하이라이트 */
[data-drop-target="true"] {
  background-color: hsl(var(--primary) / 0.1);
  border: 2px dashed hsl(var(--primary));
}

/* 드래그 오버레이 */
.drag-overlay {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  cursor: grabbing;
}
```

---

## 📊 완료 체크리스트

- [ ] `@dnd-kit` 패키지 설치
- [ ] DndContext 설정
- [ ] SortableContext 설정
- [ ] useSortable 훅 사용
- [ ] 탭 드래그로 순서 변경 동작
- [ ] 드래그 오버레이 표시
- [ ] 키보드 센서 동작 (접근성)
- [ ] JSDoc 주석 작성

---

## 🔧 테스트 방법

1. 탭을 마우스로 드래그
2. 다른 탭 위치로 드롭
3. 순서가 변경되는지 확인
4. Tab 키로 탭 포커스 → Space → 화살표로 이동 (키보드)

---

## ⚠️ 접근성 주의사항

> [!CAUTION]
> 드래그 앤 드롭은 반드시 **키보드 대안**을 제공해야 합니다.

| 동작 | 키보드 대안 |
|------|------------|
| 항목 선택 | Space |
| 이동 | 화살표 키 |
| 확정 | Enter |
| 취소 | Escape |

---

## ➡️ 다음 단계

[Phase 29: 마이크로 애니메이션](./task_phase_29_animations.md)

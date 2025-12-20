# Phase 20: 리사이저블 패널 기반

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)  
> **📋 관련 PRD**: [PRD_UX_ENHANCEMENT.md](../../.agent/docs/PRD_UX_ENHANCEMENT.md) - 섹션 4

---

## 📌 목표

`react-resizable-panels` 라이브러리를 사용하여 VS Code처럼 패널 크기 조정이 가능한 레이아웃을 구현합니다.

**완료 조건**: 사이드바와 메인 콘텐츠 사이의 크기를 드래그로 조정 가능

---

## 🎯 학습 목표

이 Task를 완료하면 다음을 배울 수 있습니다:

1. `react-resizable-panels` 라이브러리 사용법
2. 레이아웃 상태 관리 (localStorage 저장)
3. 접근성 있는 리사이저 구현

---

## ✅ 작업 목록

### 20.1 패키지 설치

```bash
# apps/shell 디렉토리에서 실행
pnpm add react-resizable-panels
```

**확인 방법**: `package.json`에 의존성 추가 확인

---

### 20.2 ResizableLayout 컴포넌트 생성

**파일 위치**: `apps/shell/components/layout/resizable-layout.tsx`

```tsx
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
 * 2. 패널 크기 localStorage에 저장/복원
 * 3. 최소/최대 크기 제한
 * 4. 키보드 접근성 지원
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
 * - react-resizable-panels: 리사이저블 패널 라이브러리
 * ============================================================================
 */

'use client';

import { 
  Panel, 
  PanelGroup, 
  PanelResizeHandle 
} from 'react-resizable-panels';
import { ReactNode } from 'react';

/**
 * ResizableLayout 컴포넌트의 Props 타입
 * 
 * @property sidebar - 사이드바에 표시할 콘텐츠
 * @property main - 메인 영역에 표시할 콘텐츠
 * @property defaultSidebarSize - 사이드바 기본 크기 (%, 기본값: 15)
 */
interface ResizableLayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
  defaultSidebarSize?: number;
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
}: ResizableLayoutProps) {
  return (
    <PanelGroup
      direction="horizontal"
      // autoSaveId: localStorage에 레이아웃 상태를 저장할 키
      // 같은 키를 사용하면 페이지 새로고침 후에도 크기가 유지됩니다
      autoSaveId="erp-layout"
    >
      {/* 
        사이드바 패널
        - defaultSize: 초기 크기 (%)
        - minSize: 최소 크기 (%)
        - maxSize: 최대 크기 (%)
        - collapsible: true면 완전히 접을 수 있음
      */}
      <Panel 
        defaultSize={defaultSidebarSize}
        minSize={10}
        maxSize={30}
        collapsible={true}
        id="sidebar"
      >
        {sidebar}
      </Panel>

      {/* 
        리사이즈 핸들
        - 이 영역을 드래그하면 패널 크기가 변경됩니다
        - className으로 스타일을 지정할 수 있습니다
      */}
      <PanelResizeHandle 
        className="w-1 bg-border hover:bg-primary/50 
                   transition-colors duration-150 
                   cursor-col-resize"
        // 접근성: 스크린리더가 이 요소를 인식할 수 있도록 함
        id="sidebar-resize-handle"
      />

      {/* 
        메인 콘텐츠 패널
        - 사이드바를 제외한 나머지 공간을 차지합니다
      */}
      <Panel id="main">
        {main}
      </Panel>
    </PanelGroup>
  );
}
```

**확인 방법**: 파일 생성 확인, TypeScript 에러 없음

---

### 20.3 글로벌 CSS 스타일 추가

**파일 위치**: `apps/shell/app/globals.css`에 추가

```css
/* 
 * ============================================================================
 * 리사이저블 패널 스타일
 * react-resizable-panels 라이브러리의 핸들 스타일을 정의합니다.
 * ============================================================================
 */

/* 리사이즈 핸들 기본 스타일 */
[data-panel-resize-handle-id] {
  /* 기본 너비: 4px */
  width: 4px;
  /* 투명 배경 */
  background: transparent;
  /* 커서를 좌우 리사이즈로 변경 */
  cursor: col-resize;
  /* 부드러운 전환 효과 */
  transition: background-color 150ms ease;
}

/* 핸들에 마우스 올렸을 때 */
[data-panel-resize-handle-id]:hover {
  background: hsl(var(--primary) / 0.5);
}

/* 핸들을 드래그 중일 때 */
[data-panel-resize-handle-id][data-resize-handle-active] {
  background: hsl(var(--primary));
}

/* 세로 방향 핸들 */
[data-panel-resize-handle-id][data-panel-group-direction="vertical"] {
  width: auto;
  height: 4px;
  cursor: row-resize;
}
```

**확인 방법**: 핸들 호버 시 색상 변경 확인

---

### 20.4 레이아웃에 적용

**파일 위치**: `apps/shell/app/layout.tsx` 또는 `apps/shell/app/(main)/layout.tsx`

기존 레이아웃을 `ResizableLayout`으로 감싸주세요.

**확인 방법**: 
1. `pnpm dev`로 개발 서버 실행
2. 브라우저에서 사이드바와 메인 영역 사이의 경계를 드래그
3. 크기가 조정되는지 확인

---

### 20.5 Storybook 스토리 작성

**파일 위치**: `apps/shell/stories/layout/ResizableLayout.stories.tsx`

```tsx
/**
 * ============================================================================
 * 파일명: ResizableLayout.stories.tsx
 * 설명: ResizableLayout 컴포넌트의 Storybook 스토리
 * ============================================================================
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ResizableLayout } from '../../components/layout/resizable-layout';

const meta: Meta<typeof ResizableLayout> = {
  title: 'Layout/ResizableLayout',
  component: ResizableLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ResizableLayout>;

/**
 * 기본 리사이저블 레이아웃
 * 사이드바와 메인 영역의 경계를 드래그해보세요.
 */
export const Default: Story = {
  args: {
    sidebar: (
      <div className="h-full bg-muted p-4">
        <h2 className="font-bold">사이드바</h2>
        <p>이 영역의 크기를 조정해보세요</p>
      </div>
    ),
    main: (
      <div className="h-full bg-background p-4">
        <h2 className="font-bold">메인 콘텐츠</h2>
        <p>메인 콘텐츠 영역입니다</p>
      </div>
    ),
  },
};
```

**확인 방법**: `pnpm storybook`으로 확인

---

## 📊 완료 체크리스트

- [ ] `react-resizable-panels` 패키지 설치
- [ ] `ResizableLayout` 컴포넌트 생성
- [ ] 모든 함수에 JSDoc 주석 작성
- [ ] 파일 헤더 주석 작성
- [ ] CSS 스타일 추가
- [ ] 레이아웃에 적용
- [ ] 드래그로 크기 조정 동작 확인
- [ ] 새로고침 후 크기 유지 확인 (localStorage)
- [ ] Storybook 스토리 작성
- [ ] TypeScript 에러 없음 (`pnpm typecheck`)

---

## 🔧 테스트 방법

```bash
# 1. 개발 서버 실행
pnpm dev

# 2. 브라우저에서 http://localhost:3000 접속

# 3. 사이드바와 메인 영역 사이의 경계를 드래그

# 4. 새로고침 후에도 크기가 유지되는지 확인

# 5. Storybook에서 확인
pnpm storybook
```

---

## ⚠️ 주의사항

1. **SSR 에러**: `'use client'` 지시문을 파일 최상단에 추가해야 합니다
2. **localStorage**: 서버 사이드에서는 접근 불가능하므로 클라이언트 컴포넌트로 만들어야 합니다

---

## ➡️ 다음 단계

[Phase 21: 탭 시스템](./task_phase_21_tab_system.md)

/**
 * ============================================================================
 * 파일명: ResizableLayout.stories.tsx
 * 패키지: @erp/shell
 * 경로: apps/shell/stories/layout/ResizableLayout.stories.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * ResizableLayout 컴포넌트의 Storybook 스토리입니다.
 * 사이드바와 메인 콘텐츠 사이의 크기 조정을 시각적으로 테스트합니다.
 * ============================================================================
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ResizableLayout } from '../../components/layout/resizable-layout';

/**
 * 리사이저블 레이아웃 스토리 메타데이터
 *
 * VS Code처럼 패널 크기를 드래그로 조정할 수 있는 레이아웃입니다.
 * 사이드바와 메인 콘텐츠 사이의 경계를 드래그해보세요.
 */
const meta: Meta<typeof ResizableLayout> = {
  title: 'Layout/ResizableLayout',
  component: ResizableLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## ResizableLayout 컴포넌트

VS Code처럼 사이드바와 메인 콘텐츠 사이의 크기를 드래그로 조정할 수 있습니다.

### 주요 기능
- 🖱️ 드래그로 크기 조정
- 💾 크기 localStorage에 자동 저장
- 📐 최소/최대 크기 제한
- ⌨️ 키보드 접근성 지원
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="h-screen w-full bg-background">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ResizableLayout>;

/**
 * 기본 리사이저블 레이아웃
 *
 * 사이드바와 메인 영역의 경계(파란 선)를 드래그해보세요.
 */
export const Default: Story = {
  args: {
    sidebar: (
      <div className="h-full bg-muted p-4">
        <h2 className="font-bold text-lg mb-4">사이드바</h2>
        <p className="text-sm text-muted-foreground">
          이 영역의 크기를 조정해보세요.
          경계선을 드래그하면 너비가 변경됩니다.
        </p>
        <ul className="mt-4 space-y-2">
          <li className="p-2 rounded hover:bg-muted-foreground/10">대시보드</li>
          <li className="p-2 rounded hover:bg-muted-foreground/10">인사관리</li>
          <li className="p-2 rounded hover:bg-muted-foreground/10">예산관리</li>
          <li className="p-2 rounded hover:bg-muted-foreground/10">설정</li>
        </ul>
      </div>
    ),
    main: (
      <div className="h-full bg-background p-6">
        <h1 className="text-2xl font-bold mb-4">메인 콘텐츠</h1>
        <p className="text-muted-foreground">
          메인 콘텐츠 영역입니다. 사이드바 크기를 조정하면 이 영역의 너비가 자동으로 변경됩니다.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold">카드 1</h3>
            <p className="text-sm text-muted-foreground">콘텐츠 예시</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold">카드 2</h3>
            <p className="text-sm text-muted-foreground">콘텐츠 예시</p>
          </div>
        </div>
      </div>
    ),
    defaultSidebarSize: 20,
    minSidebarSize: 10,
    maxSidebarSize: 40,
  },
};

/**
 * 좁은 사이드바
 *
 * 기본 크기가 작은 사이드바 예시입니다.
 */
export const NarrowSidebar: Story = {
  args: {
    sidebar: (
      <div className="h-full bg-muted p-2 flex flex-col items-center">
        <div className="w-10 h-10 bg-primary/20 rounded-lg mb-4" />
        <div className="w-10 h-10 hover:bg-muted-foreground/10 rounded-lg mb-2" />
        <div className="w-10 h-10 hover:bg-muted-foreground/10 rounded-lg mb-2" />
        <div className="w-10 h-10 hover:bg-muted-foreground/10 rounded-lg mb-2" />
      </div>
    ),
    main: (
      <div className="h-full bg-background p-6">
        <h1 className="text-2xl font-bold">넓은 메인 영역</h1>
      </div>
    ),
    defaultSidebarSize: 5,
    minSidebarSize: 3,
    maxSidebarSize: 20,
  },
};

/**
 * 넓은 사이드바
 *
 * 사이드바에 많은 콘텐츠가 있을 때의 예시입니다.
 */
export const WideSidebar: Story = {
  args: {
    sidebar: (
      <div className="h-full bg-muted p-4">
        <h2 className="font-bold text-lg mb-4">프로젝트 탐색기</h2>
        <div className="space-y-1 text-sm">
          <div className="p-2 bg-primary/10 rounded">📁 src</div>
          <div className="p-2 pl-6 hover:bg-muted-foreground/10 rounded">📁 components</div>
          <div className="p-2 pl-10 hover:bg-muted-foreground/10 rounded">📄 Button.tsx</div>
          <div className="p-2 pl-10 hover:bg-muted-foreground/10 rounded">📄 Input.tsx</div>
          <div className="p-2 pl-6 hover:bg-muted-foreground/10 rounded">📁 hooks</div>
          <div className="p-2 pl-6 hover:bg-muted-foreground/10 rounded">📁 lib</div>
        </div>
      </div>
    ),

    main: (
      <div className="h-full bg-background p-6">
        <h1 className="text-2xl font-bold">코드 에디터 영역</h1>
      </div>
    ),

    defaultSidebarSize: 250,
    minSidebarSize: 200,
    maxSidebarSize: 450,
  },
};

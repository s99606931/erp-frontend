/**
 * ============================================================================
 * 파일명: Button.stories.tsx
 * 경로: apps/shell/stories/ui/Button.stories.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * @erp/ui 패키지의 Button 컴포넌트에 대한 Storybook 스토리입니다.
 * 다양한 변형(variant), 크기(size), 상태를 시각적으로 확인할 수 있습니다.
 *
 * [🎯 스토리 목록]
 * 1. Default - 기본 버튼
 * 2. AllVariants - 모든 변형 비교
 * 3. AllSizes - 모든 크기 비교
 * 4. Loading - 로딩 상태
 * 5. Disabled - 비활성 상태
 * 6. WithIcon - 아이콘 포함
 * ============================================================================
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@erp/ui';
import { Plus, Trash2, Download, ChevronRight } from 'lucide-react';

/**
 * Button 컴포넌트 메타 정보
 * 
 * @description
 * Storybook에서 Button 컴포넌트를 어떻게 표시하고 
 * 어떤 컨트롤을 제공할지 정의합니다.
 */
const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 버튼 컴포넌트

공공기관 ERP 시스템의 기본 버튼 컴포넌트입니다.

### 특징
- **6가지 변형**: default, secondary, destructive, outline, ghost, link
- **4가지 크기**: sm, default, lg, icon
- **로딩 상태**: 스피너와 함께 비활성화
- **접근성**: ARIA 속성 완벽 지원
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      description: '버튼의 시각적 스타일',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon'],
      description: '버튼 크기',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: '로딩 상태 (스피너 표시)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    asChild: {
      control: 'boolean',
      description: '자식 요소를 버튼으로 렌더링',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 버튼
 * 
 * 가장 일반적인 형태의 버튼입니다.
 * 주요 액션(저장, 확인, 제출)에 사용합니다.
 */
export const Default: Story = {
  args: {
    children: '버튼',
    variant: 'default',
    size: 'default',
  },
};

/**
 * 모든 변형 비교
 * 
 * 6가지 버튼 변형을 한눈에 비교할 수 있습니다.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '각 변형은 다른 용도에 사용됩니다: default(주요 액션), secondary(보조 액션), destructive(삭제), outline(테두리), ghost(배경 없음), link(링크 스타일).',
      },
    },
  },
};

/**
 * 모든 크기 비교
 * 
 * 4가지 버튼 크기를 한눈에 비교할 수 있습니다.
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="아이콘 버튼">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'sm(32px)은 테이블 내부, default(40px)은 일반, lg(48px)은 모바일/접근성, icon은 아이콘 전용 버튼에 사용합니다.',
      },
    },
  },
};

/**
 * 로딩 상태
 * 
 * 버튼이 로딩 중일 때 스피너가 표시됩니다.
 * API 호출 등 비동기 작업 시 사용합니다.
 */
export const Loading: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button isLoading>저장 중...</Button>
      <Button variant="secondary" isLoading>처리 중...</Button>
      <Button variant="outline" isLoading>로딩...</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'isLoading 속성을 true로 설정하면 스피너가 표시되고 버튼이 비활성화됩니다.',
      },
    },
  },
};

/**
 * 비활성 상태
 * 
 * 버튼이 비활성화되면 클릭할 수 없고 시각적으로 흐리게 표시됩니다.
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button disabled>비활성</Button>
      <Button variant="secondary" disabled>비활성</Button>
      <Button variant="destructive" disabled>비활성</Button>
      <Button variant="outline" disabled>비활성</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'disabled 속성을 true로 설정하면 버튼이 비활성화됩니다. 투명도 50%로 표시됩니다.',
      },
    },
  },
};

/**
 * 아이콘 포함 버튼
 * 
 * 텍스트와 아이콘을 함께 사용하는 버튼입니다.
 */
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button>
        <Plus className="h-4 w-4" />
        추가
      </Button>
      <Button variant="destructive">
        <Trash2 className="h-4 w-4" />
        삭제
      </Button>
      <Button variant="outline">
        <Download className="h-4 w-4" />
        다운로드
      </Button>
      <Button variant="ghost">
        다음
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'lucide-react 아이콘을 버튼과 함께 사용할 수 있습니다. gap-2 클래스로 간격이 자동 적용됩니다.',
      },
    },
  },
};

/**
 * 전체 너비 버튼
 * 
 * 모바일이나 모달에서 전체 너비로 사용하는 버튼입니다.
 */
export const FullWidth: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Button className="w-full">로그인</Button>
      <Button variant="outline" className="w-full">회원가입</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'className에 w-full을 추가하면 전체 너비 버튼이 됩니다.',
      },
    },
  },
};

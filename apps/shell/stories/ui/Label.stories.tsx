/**
 * ============================================================================
 * 파일명: Label.stories.tsx
 * 경로: apps/shell/stories/ui/Label.stories.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * @erp/ui 패키지의 Label 컴포넌트에 대한 Storybook 스토리입니다.
 * 폼 필드 레이블의 다양한 상태를 시각적으로 확인할 수 있습니다.
 *
 * [🎯 스토리 목록]
 * 1. Default - 기본 레이블
 * 2. Required - 필수 필드 레이블
 * 3. WithInput - Input과 함께 사용
 * 4. FormLayout - 폼 레이아웃 예시
 * ============================================================================
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label, Input } from '@erp/ui';

/**
 * Label 컴포넌트 메타 정보
 *
 * @description
 * 폼 필드의 레이블 컴포넌트입니다.
 * 필수 필드 표시와 접근성을 지원합니다.
 */
const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 레이블 컴포넌트

폼 필드의 레이블 컴포넌트입니다.

### 특징
- **필수 필드 표시**: required 속성으로 빨간 별표 표시
- **접근성**: htmlFor로 입력 필드와 연결, 스크린리더 지원
- **비활성 상태 연동**: 연결된 입력 필드가 비활성화되면 레이블도 흐려짐
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: 'boolean',
      description: '필수 필드 여부 (빨간 * 표시)',
    },
    htmlFor: {
      control: 'text',
      description: '연결할 입력 필드의 ID',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 레이블
 *
 * 가장 일반적인 형태의 레이블입니다.
 */
export const Default: Story = {
  args: {
    children: '이메일',
  },
};

/**
 * 필수 필드 레이블
 *
 * required 속성을 사용하면 빨간색 별표(*)가 표시됩니다.
 */
export const Required: Story = {
  args: {
    children: '이름',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'required 속성을 true로 설정하면 레이블 옆에 빨간색 별표(*)가 표시됩니다. 스크린리더에서는 "(필수 입력)"으로 읽힙니다.',
      },
    },
  },
};

/**
 * Input과 함께 사용
 *
 * Label과 Input을 함께 사용하는 예시입니다.
 */
export const WithInput: Story = {
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="email">이메일</Label>
      <Input type="email" id="email" placeholder="name@example.com" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'htmlFor 속성으로 Input의 id와 연결하면 레이블 클릭 시 입력 필드에 포커스됩니다.',
      },
    },
  },
};

/**
 * 필수/선택 필드 조합
 *
 * 필수 필드와 선택 필드를 함께 사용하는 예시입니다.
 */
export const RequiredAndOptional: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div className="grid gap-1.5">
        <Label htmlFor="name" required>이름</Label>
        <Input id="name" placeholder="홍길동" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="phone" required>연락처</Label>
        <Input id="phone" placeholder="010-1234-5678" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">이메일 (선택)</Label>
        <Input id="email" placeholder="name@example.com" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '필수 필드와 선택 필드를 구분하여 사용자에게 명확한 안내를 제공합니다.',
      },
    },
  },
};

/**
 * 비활성화된 입력 필드와 레이블
 *
 * 연결된 입력 필드가 비활성화되면 레이블도 흐려집니다.
 */
export const DisabledField: Story = {
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="disabled-input" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        비활성 필드
      </Label>
      <Input id="disabled-input" disabled placeholder="수정 불가" className="peer" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'peer 클래스를 사용하여 입력 필드의 상태에 따라 레이블 스타일을 변경할 수 있습니다.',
      },
    },
  },
};

/**
 * 폼 레이아웃 예시
 *
 * 실제 폼에서 사용하는 레이아웃 예시입니다.
 */
export const FormLayout: Story = {
  render: () => (
    <form className="w-96 space-y-6 rounded-lg border p-6">
      <h3 className="text-lg font-semibold">직원 정보 등록</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="empName" required>이름</Label>
          <Input id="empName" placeholder="홍길동" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="empId" required>사번</Label>
          <Input id="empId" placeholder="EMP001" />
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="department" required>부서</Label>
        <Input id="department" placeholder="개발팀" />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="notes">비고</Label>
        <Input id="notes" placeholder="추가 정보 입력" />
      </div>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 폼에서 Label과 Input을 조합하여 사용하는 예시입니다.',
      },
    },
  },
};

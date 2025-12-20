/**
 * ============================================================================
 * 파일명: Input.stories.tsx
 * 경로: apps/shell/stories/ui/Input.stories.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * @erp/ui 패키지의 Input 컴포넌트에 대한 Storybook 스토리입니다.
 * 다양한 타입, 상태, 사용 사례를 시각적으로 확인할 수 있습니다.
 * ============================================================================
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input, Label } from '@erp/ui';

/**
 * Input 컴포넌트 메타 정보
 */
const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 입력 필드 컴포넌트

공공기관 ERP 시스템의 기본 텍스트 입력 필드입니다.

### 특징
- **다양한 타입 지원**: text, email, password, number 등
- **오류 상태**: hasError 속성으로 빨간색 테두리 표시
- **접근성**: aria-invalid, aria-describedby 완벽 지원
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: '입력 필드 타입',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    hasError: {
      control: 'boolean',
      description: '오류 상태 (빨간색 테두리)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 입력 필드
 */
export const Default: Story = {
  args: {
    type: 'text',
    placeholder: '텍스트를 입력하세요',
  },
};

/**
 * 다양한 입력 타입
 */
export const AllTypes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">텍스트</label>
        <Input type="text" placeholder="이름을 입력하세요" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">이메일</label>
        <Input type="email" placeholder="email@example.com" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">비밀번호</label>
        <Input type="password" placeholder="비밀번호 입력" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">숫자</label>
        <Input type="number" placeholder="0" />
      </div>
    </div>
  ),
};

/**
 * 오류 상태
 */
export const WithError: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">이메일</label>
        <Input
          type="email"
          hasError
          defaultValue="invalid-email"
          aria-describedby="email-error"
        />
        <p id="email-error" className="text-sm text-red-500 mt-1">
          올바른 이메일 형식이 아닙니다.
        </p>
      </div>
    </div>
  ),
};

/**
 * 비활성 상태
 */
export const Disabled: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Input type="text" disabled placeholder="비활성화된 입력 필드" />
      <Input type="text" disabled defaultValue="읽기 전용 값" />
    </div>
  ),
};

/**
 * 라벨과 함께 사용
 */
export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">이름 *</Label>
        <Input id="name" type="text" placeholder="홍길동" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" placeholder="email@example.com" />
      </div>
    </div>
  ),
};

/**
 * ============================================================================
 * 파일명: Badge.stories.tsx
 * 경로: apps/shell/stories/ui/Badge.stories.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * @erp/ui 패키지의 Badge 컴포넌트에 대한 Storybook 스토리입니다.
 * 상태를 나타내는 배지의 다양한 변형을 시각적으로 확인할 수 있습니다.
 *
 * [🎯 스토리 목록]
 * 1. Default - 기본 배지
 * 2. AllVariants - 모든 변형 비교
 * 3. StatusBadges - 상태 표시 배지
 * 4. WithIcon - 아이콘 포함 배지
 * ============================================================================
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from '@erp/ui';
import { Check, Clock, AlertCircle, X } from 'lucide-react';

/**
 * Badge 컴포넌트 메타 정보
 *
 * @description
 * 상태 표시용 배지 컴포넌트입니다.
 * 승인 상태, 진행 상태 등을 시각적으로 표시합니다.
 */
const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 배지 컴포넌트

공공기관 ERP 시스템의 상태 표시용 배지 컴포넌트입니다.

### 특징
- **6가지 변형**: default, secondary, success, warning, error, outline
- **작은 크기**: 테이블이나 카드 내에서 상태 표시에 적합
- **접근성**: 색상만으로 정보를 전달하지 않고 텍스트 포함
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'warning', 'error', 'outline'],
      description: '배지의 시각적 스타일',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 배지
 *
 * 가장 일반적인 형태의 배지입니다.
 */
export const Default: Story = {
  args: {
    children: '배지',
    variant: 'default',
  },
};

/**
 * 모든 변형 비교
 *
 * 6가지 배지 변형을 한눈에 비교할 수 있습니다.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge variant="default">기본</Badge>
      <Badge variant="secondary">보조</Badge>
      <Badge variant="success">성공</Badge>
      <Badge variant="warning">경고</Badge>
      <Badge variant="error">에러</Badge>
      <Badge variant="outline">아웃라인</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '각 변형은 다른 상태를 나타냅니다: default(일반), secondary(보조), success(성공/승인), warning(주의/대기), error(오류/반려), outline(테두리만).',
      },
    },
  },
};

/**
 * 상태 표시 배지
 *
 * ERP 시스템에서 자주 사용하는 상태 배지 예시입니다.
 */
export const StatusBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-muted-foreground">결재 상태:</span>
        <Badge variant="success">승인됨</Badge>
        <Badge variant="warning">대기중</Badge>
        <Badge variant="error">반려됨</Badge>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-muted-foreground">프로젝트:</span>
        <Badge variant="default">진행중</Badge>
        <Badge variant="secondary">예정</Badge>
        <Badge variant="success">완료</Badge>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-muted-foreground">우선순위:</span>
        <Badge variant="error">긴급</Badge>
        <Badge variant="warning">높음</Badge>
        <Badge variant="default">보통</Badge>
        <Badge variant="secondary">낮음</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ERP 시스템에서 결재 상태, 프로젝트 상태, 우선순위 등을 표시하는 실제 사용 예시입니다.',
      },
    },
  },
};

/**
 * 아이콘 포함 배지
 *
 * 아이콘과 함께 사용하는 배지입니다.
 */
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge variant="success" className="gap-1">
        <Check className="h-3 w-3" />
        승인됨
      </Badge>
      <Badge variant="warning" className="gap-1">
        <Clock className="h-3 w-3" />
        대기중
      </Badge>
      <Badge variant="error" className="gap-1">
        <X className="h-3 w-3" />
        반려됨
      </Badge>
      <Badge variant="outline" className="gap-1">
        <AlertCircle className="h-3 w-3" />
        검토필요
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'lucide-react 아이콘을 배지와 함께 사용하면 상태를 더 직관적으로 표현할 수 있습니다.',
      },
    },
  },
};

/**
 * ============================================================================
 * 파일명: Select.stories.tsx
 * 경로: apps/shell/stories/ui/Select.stories.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * @erp/ui 패키지의 Select 컴포넌트에 대한 Storybook 스토리입니다.
 * 드롭다운 선택 컴포넌트의 다양한 형태를 시각적으로 확인할 수 있습니다.
 *
 * [🎯 스토리 목록]
 * 1. Default - 기본 셀렉트
 * 2. WithGroups - 그룹화된 옵션
 * 3. FormExample - 폼에서 사용
 * ============================================================================
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
  Label,
} from '@erp/ui';

/**
 * Select 컴포넌트 메타 정보
 *
 * @description
 * 드롭다운 선택 컴포넌트입니다.
 * 여러 옵션 중 하나를 선택할 때 사용합니다.
 */
const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 셀렉트 컴포넌트

드롭다운 선택 컴포넌트입니다.

### 구성 요소
- **Select**: 루트 컴포넌트
- **SelectTrigger**: 드롭다운을 여는 버튼
- **SelectValue**: 선택된 값 표시
- **SelectContent**: 드롭다운 내용
- **SelectGroup**: 옵션 그룹
- **SelectLabel**: 그룹 레이블
- **SelectItem**: 개별 옵션
- **SelectSeparator**: 구분선

### 특징
- **키보드 네비게이션**: 화살표 키로 탐색
- **검색**: 타이핑으로 옵션 검색
- **그룹화**: 관련 옵션을 그룹으로 묶기
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 셀렉트
 *
 * 가장 기본적인 셀렉트 형태입니다.
 */
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="부서 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dev">개발팀</SelectItem>
        <SelectItem value="plan">기획팀</SelectItem>
        <SelectItem value="hr">인사팀</SelectItem>
        <SelectItem value="sales">영업팀</SelectItem>
        <SelectItem value="finance">재무팀</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * 기본값 설정
 *
 * 기본 선택 값이 있는 셀렉트입니다.
 */
export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="dev">
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="부서 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dev">개발팀</SelectItem>
        <SelectItem value="plan">기획팀</SelectItem>
        <SelectItem value="hr">인사팀</SelectItem>
        <SelectItem value="sales">영업팀</SelectItem>
        <SelectItem value="finance">재무팀</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'defaultValue 속성으로 초기 선택 값을 설정할 수 있습니다.',
      },
    },
  },
};

/**
 * 그룹화된 옵션
 *
 * SelectGroup과 SelectLabel로 옵션을 그룹화합니다.
 */
export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="담당자 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>개발팀</SelectLabel>
          <SelectItem value="hong">홍길동 (과장)</SelectItem>
          <SelectItem value="kim">김철수 (대리)</SelectItem>
          <SelectItem value="lee">이영희 (사원)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>기획팀</SelectLabel>
          <SelectItem value="park">박민수 (차장)</SelectItem>
          <SelectItem value="choi">최지영 (대리)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>인사팀</SelectLabel>
          <SelectItem value="jung">정수민 (과장)</SelectItem>
          <SelectItem value="kang">강동원 (사원)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'SelectGroup으로 관련 옵션을 그룹화하고 SelectLabel로 그룹 이름을 표시합니다.',
      },
    },
  },
};

/**
 * 비활성화 상태
 *
 * 셀렉트 또는 개별 옵션을 비활성화합니다.
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">전체 비활성화</p>
        <Select disabled>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="선택 불가" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">옵션 1</SelectItem>
            <SelectItem value="2">옵션 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">특정 옵션 비활성화</p>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="결재 상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">대기</SelectItem>
            <SelectItem value="approved">승인</SelectItem>
            <SelectItem value="rejected" disabled>반려 (선택 불가)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select에 disabled를 추가하면 전체가, SelectItem에 추가하면 해당 옵션만 비활성화됩니다.',
      },
    },
  },
};

/**
 * 폼에서 사용
 *
 * Label과 함께 폼에서 사용하는 예시입니다.
 */
export const FormExample: Story = {
  render: () => (
    <div className="w-[400px] space-y-6 rounded-lg border p-6">
      <h3 className="text-lg font-semibold">결재 설정</h3>

      <div className="grid gap-2">
        <Label htmlFor="priority">우선순위</Label>
        <Select>
          <SelectTrigger id="priority">
            <SelectValue placeholder="우선순위 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="urgent">긴급</SelectItem>
            <SelectItem value="high">높음</SelectItem>
            <SelectItem value="normal">보통</SelectItem>
            <SelectItem value="low">낮음</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="approver">결재자</Label>
        <Select>
          <SelectTrigger id="approver">
            <SelectValue placeholder="결재자 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>팀장</SelectLabel>
              <SelectItem value="manager1">홍길동 팀장</SelectItem>
              <SelectItem value="manager2">김철수 팀장</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>부장</SelectLabel>
              <SelectItem value="director1">이영희 부장</SelectItem>
              <SelectItem value="director2">박민수 부장</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="category">문서 유형</Label>
        <Select defaultValue="expense">
          <SelectTrigger id="category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expense">지출 결의</SelectItem>
            <SelectItem value="vacation">휴가 신청</SelectItem>
            <SelectItem value="purchase">구매 요청</SelectItem>
            <SelectItem value="report">보고서</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label 컴포넌트와 함께 폼에서 사용하는 실제 예시입니다.',
      },
    },
  },
};

/**
 * 다양한 너비
 *
 * 다양한 너비의 셀렉트 예시입니다.
 */
export const DifferentWidths: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">작은 (w-[120px])</p>
        <Select>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">활성</SelectItem>
            <SelectItem value="inactive">비활성</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">중간 (w-[200px])</p>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="부서 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dev">개발팀</SelectItem>
            <SelectItem value="hr">인사팀</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">전체 (w-full)</p>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="담당자를 선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hong">홍길동 (개발팀 과장)</SelectItem>
            <SelectItem value="kim">김철수 (기획팀 대리)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'SelectTrigger의 className으로 다양한 너비를 설정할 수 있습니다.',
      },
    },
  },
};

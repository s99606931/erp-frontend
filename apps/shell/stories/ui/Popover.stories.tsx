/**
 * ============================================================================
 * 파일명: Popover.stories.tsx
 * 경로: apps/shell/stories/ui/Popover.stories.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * @erp/ui 패키지의 Popover 컴포넌트에 대한 Storybook 스토리입니다.
 * 팝오버(플로팅 패널)의 다양한 형태를 시각적으로 확인할 수 있습니다.
 *
 * [🎯 스토리 목록]
 * 1. Default - 기본 팝오버
 * 2. WithForm - 폼 포함 팝오버
 * 3. Positions - 다양한 위치
 * ============================================================================
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Input,
  Label,
} from '@erp/ui';
import { Settings, Info, Bell, Filter } from 'lucide-react';

/**
 * Popover 컴포넌트 메타 정보
 *
 * @description
 * 팝오버(플로팅 패널) 컴포넌트입니다.
 * 트리거 요소 근처에 추가 정보나 컨트롤을 표시합니다.
 */
const meta: Meta<typeof Popover> = {
  title: 'UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 팝오버 컴포넌트

트리거 요소 근처에 플로팅 패널을 표시하는 컴포넌트입니다.

### 구성 요소
- **Popover**: 루트 컴포넌트
- **PopoverTrigger**: 팝오버를 여는 트리거
- **PopoverContent**: 팝오버 내용

### 특징
- **위치 조정**: align, side 속성으로 위치 지정
- **자동 위치 조정**: 화면 밖으로 나가면 자동 조정
- **포커스 관리**: 열릴 때 포커스 이동, 닫힐 때 복원

### Dialog와의 차이점
- Popover: 작은 정보/컨트롤 표시, 오버레이 없음
- Dialog: 중요한 작업, 모달 오버레이
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 팝오버
 *
 * 가장 기본적인 팝오버 형태입니다.
 */
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">팝오버 열기</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">알림</h4>
            <p className="text-sm text-muted-foreground">
              팝오버 내용입니다. 추가 정보나 간단한 컨트롤을 표시할 수 있습니다.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * 아이콘 트리거
 *
 * 아이콘 버튼으로 팝오버를 열 수 있습니다.
 */
export const IconTrigger: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <Info className="h-4 w-4" />
            <span className="sr-only">정보 보기</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <p className="text-sm">
            이 기능은 결재 문서의 상태를 확인하고 관리하는 데 사용됩니다.
          </p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">알림</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium">알림 (3)</h4>
            <div className="space-y-2 text-sm">
              <div className="rounded-lg border p-2">
                <p className="font-medium">결재 요청</p>
                <p className="text-muted-foreground">새로운 결재 문서가 도착했습니다.</p>
              </div>
              <div className="rounded-lg border p-2">
                <p className="font-medium">일정 알림</p>
                <p className="text-muted-foreground">오후 2시 회의가 있습니다.</p>
              </div>
              <div className="rounded-lg border p-2">
                <p className="font-medium">시스템 공지</p>
                <p className="text-muted-foreground">금일 18시 서버 점검 예정</p>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '아이콘 버튼을 트리거로 사용하여 간결한 UI를 만들 수 있습니다.',
      },
    },
  },
};

/**
 * 설정 폼 팝오버
 *
 * 간단한 설정 폼을 포함한 팝오버입니다.
 */
export const SettingsForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          설정
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">테이블 설정</h4>
            <p className="text-sm text-muted-foreground">
              테이블 표시 옵션을 설정합니다.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="rows">행 수</Label>
              <Input
                id="rows"
                defaultValue="10"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="page">페이지</Label>
              <Input
                id="page"
                defaultValue="1"
                className="col-span-2 h-8"
              />
            </div>
          </div>
          <Button size="sm">적용</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: '테이블 설정 등 간단한 폼을 팝오버에 포함할 수 있습니다.',
      },
    },
  },
};

/**
 * 필터 팝오버
 *
 * 필터 옵션을 제공하는 팝오버입니다.
 */
export const FilterPopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          필터
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">필터 조건</h4>
            <p className="text-sm text-muted-foreground">
              검색 조건을 설정합니다.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="status">상태</Label>
              <Input id="status" placeholder="전체" className="h-8" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="dept">부서</Label>
              <Input id="dept" placeholder="전체" className="h-8" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="date">기간</Label>
              <Input id="date" placeholder="최근 1개월" className="h-8" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">초기화</Button>
            <Button size="sm">적용</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: '데이터 필터링 옵션을 제공하는 팝오버 예시입니다.',
      },
    },
  },
};

/**
 * 다양한 위치
 *
 * align과 side 속성으로 팝오버 위치를 조정합니다.
 */
export const Positions: Story = {
  render: () => (
    <div className="flex gap-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">상단</Button>
        </PopoverTrigger>
        <PopoverContent side="top" className="w-48">
          <p className="text-sm">side=&quot;top&quot;</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">하단</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" className="w-48">
          <p className="text-sm">side=&quot;bottom&quot; (기본값)</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">좌측</Button>
        </PopoverTrigger>
        <PopoverContent side="left" className="w-48">
          <p className="text-sm">side=&quot;left&quot;</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">우측</Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="w-48">
          <p className="text-sm">side=&quot;right&quot;</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'side 속성으로 팝오버의 표시 위치를 지정할 수 있습니다. 기본값은 "bottom"입니다.',
      },
    },
  },
};

/**
 * ============================================================================
 * 파일명: Calendar.stories.tsx
 * 경로: apps/shell/stories/ui/Calendar.stories.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * @erp/ui 패키지의 Calendar 컴포넌트에 대한 Storybook 스토리입니다.
 * 날짜 선택 캘린더의 다양한 형태를 시각적으로 확인할 수 있습니다.
 *
 * [🎯 스토리 목록]
 * 1. Default - 기본 캘린더
 * 2. WithSelected - 선택된 날짜
 * 3. DateRange - 날짜 범위 선택
 * 4. DatePicker - 날짜 선택기 (팝오버)
 * ============================================================================
 */

import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Calendar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@erp/ui';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * Calendar 컴포넌트 메타 정보
 *
 * @description
 * 날짜 선택 캘린더 컴포넌트입니다.
 * react-day-picker 기반으로 구현되었습니다.
 */
const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 캘린더 컴포넌트

날짜 선택용 캘린더 컴포넌트입니다.

### 특징
- **react-day-picker 기반**: 다양한 날짜 선택 모드 지원
- **단일 선택**: 하나의 날짜 선택
- **범위 선택**: 시작일-종료일 범위 선택
- **다중 선택**: 여러 날짜 선택
- **외부 날짜 표시**: 이전/다음 달 날짜 표시

### 사용 시 주의사항
- 날짜 포맷팅은 date-fns 라이브러리 사용 권장
- 한국어 로케일은 date-fns/locale의 ko 사용
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

/**
 * 기본 캘린더
 *
 * 가장 기본적인 캘린더 형태입니다.
 */
export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    );
  },
};

/**
 * 오늘 날짜 표시
 *
 * 오늘 날짜가 강조 표시됩니다.
 */
export const WithToday: Story = {
  render: () => (
    <Calendar
      mode="single"
      className="rounded-md border"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: '오늘 날짜는 자동으로 강조 표시됩니다.',
      },
    },
  },
};

/**
 * 날짜 선택기 (DatePicker)
 *
 * Popover와 함께 사용하는 날짜 선택기입니다.
 */
export const DatePicker: Story = {
  render: function DatePickerStory() {
    const [date, setDate] = React.useState<Date>();

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[240px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP', { locale: ko }) : '날짜 선택'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover 컴포넌트와 함께 사용하여 날짜 선택기를 만들 수 있습니다.',
      },
    },
  },
};

/**
 * 비활성화된 날짜
 *
 * 특정 조건의 날짜를 선택 불가하게 만듭니다.
 */
export const DisabledDates: Story = {
  render: function DisabledDatesStory() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    // 오늘 이전 날짜 비활성화
    const disabledDays = { before: new Date() };

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          오늘 이전 날짜는 선택할 수 없습니다.
        </p>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabledDays}
          className="rounded-md border"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'disabled 속성으로 특정 날짜를 선택 불가하게 만들 수 있습니다.',
      },
    },
  },
};

/**
 * 기간 입력 폼
 *
 * 시작일과 종료일을 입력받는 폼 예시입니다.
 */
export const DateRangeForm: Story = {
  render: function DateRangeFormStory() {
    const [startDate, setStartDate] = React.useState<Date>();
    const [endDate, setEndDate] = React.useState<Date>();

    return (
      <div className="w-[400px] space-y-4 rounded-lg border p-4">
        <h4 className="font-medium">휴가 신청</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">시작일</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, 'yyyy-MM-dd') : '시작일'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">종료일</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, 'yyyy-MM-dd') : '종료일'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={startDate ? { before: startDate } : undefined}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {startDate && endDate && (
          <p className="text-sm text-muted-foreground">
            선택 기간: {format(startDate, 'yyyy-MM-dd')} ~ {format(endDate, 'yyyy-MM-dd')}
            ({Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1}일)
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '시작일과 종료일을 각각 선택하는 실제 폼 예시입니다. 종료일은 시작일 이후만 선택 가능합니다.',
      },
    },
  },
};

/**
 * 외부 날짜 숨기기
 *
 * 현재 달 외의 날짜를 숨깁니다.
 */
export const HideOutsideDays: Story = {
  render: function HideOutsideDaysStory() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={false}
        className="rounded-md border"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'showOutsideDays={false}로 이전/다음 달 날짜를 숨길 수 있습니다.',
      },
    },
  },
};

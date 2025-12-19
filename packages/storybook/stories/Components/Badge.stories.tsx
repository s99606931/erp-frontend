/**
 * ============================================================================
 * 파일명: Badge.stories.tsx
 * 패키지: @erp/storybook
 * 경로: packages/storybook/stories/Components/Badge.stories.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * Badge 컴포넌트 스토리입니다.
 * 상태, 카테고리, 태그 표시에 사용됩니다.
 * ============================================================================
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@erp/ui/components';
import { Check, X, Clock, AlertTriangle } from 'lucide-react';

const meta: Meta<typeof Badge> = {
    title: 'Components/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
## Badge 컴포넌트

상태, 카테고리, 태그 등을 표시하는 작은 인라인 레이블입니다.

### 사용 가이드라인

| Variant | 용도 | 예시 |
|---------|------|------|
| **default** | 일반 정보 | 카테고리, 태그 |
| **secondary** | 보조 정보 | 비활성 상태 |
| **destructive** | 위험/오류 | 삭제됨, 오류 |
| **outline** | 최소 강조 | 필터 태그 |
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'secondary', 'destructive', 'outline'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
        children: '기본',
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
        </div>
    ),
};

export const StatusBadges: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    <Check className="w-3 h-3 mr-1" />
                    승인됨
                </Badge>
                <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                    <X className="w-3 h-3 mr-1" />
                    반려됨
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                    <Clock className="w-3 h-3 mr-1" />
                    대기중
                </Badge>
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    주의
                </Badge>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '상태를 나타내는 뱃지 예시입니다.',
            },
        },
    },
};

export const WithCount: Story = {
    render: () => (
        <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
                <span>알림</span>
                <Badge variant="destructive" className="rounded-full px-2">
                    5
                </Badge>
            </div>
            <div className="flex items-center gap-2">
                <span>메시지</span>
                <Badge className="rounded-full px-2">
                    12
                </Badge>
            </div>
            <div className="flex items-center gap-2">
                <span>결재</span>
                <Badge variant="secondary" className="rounded-full px-2">
                    3
                </Badge>
            </div>
        </div>
    ),
};

/**
 * ============================================================================
 * 파일명: Label.stories.tsx
 * 패키지: @erp/storybook
 * 경로: packages/storybook/stories/Components/Label.stories.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * Label 컴포넌트 스토리입니다.
 * 폼 필드의 레이블을 표시합니다.
 *
 * [♿ 접근성]
 * - 반드시 htmlFor로 입력 필드와 연결
 * - 필수 필드 표시
 * ============================================================================
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Label, Input } from '@erp/ui/components';

const meta: Meta<typeof Label> = {
    title: 'Components/Label',
    component: Label,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
## Label 컴포넌트

폼 필드의 레이블을 표시하는 컴포넌트입니다.

### 접근성 필수 사항

**모든 입력 필드에는 Label이 필수입니다.**

\`\`\`tsx
// ❌ 잘못된 예
<Input placeholder="이름" />

// ✅ 올바른 예
<Label htmlFor="name">이름</Label>
<Input id="name" placeholder="이름" />
\`\`\`

### 필수 필드 표시

\`\`\`tsx
<Label htmlFor="email">
  이메일 <span className="text-red-500">*</span>
  <span className="sr-only">(필수)</span>
</Label>
\`\`\`
        `,
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
    render: () => (
        <div className="space-y-2">
            <Label htmlFor="demo">레이블</Label>
            <Input id="demo" placeholder="입력하세요" />
        </div>
    ),
};

export const Required: Story = {
    render: () => (
        <div className="space-y-2">
            <Label htmlFor="required-demo">
                이메일 <span className="text-red-500">*</span>
                <span className="sr-only">(필수)</span>
            </Label>
            <Input
                id="required-demo"
                type="email"
                required
                aria-required="true"
                placeholder="hong@seoul.go.kr"
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '필수 필드를 나타내는 레이블입니다. `sr-only` 클래스로 스크린리더에게도 필수임을 알립니다.',
            },
        },
    },
};

export const WithHelpText: Story = {
    render: () => (
        <div className="space-y-2">
            <Label htmlFor="help-demo">비밀번호</Label>
            <Input
                id="help-demo"
                type="password"
                placeholder="••••••••"
                aria-describedby="password-help"
            />
            <p id="password-help" className="text-sm text-gray-500">
                최소 10자 이상, 대소문자 + 숫자 + 특수문자 포함
            </p>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '도움말 텍스트와 함께 사용하는 레이블입니다.',
            },
        },
    },
};

export const FormExample: Story = {
    render: () => (
        <div className="w-80 space-y-4">
            <div className="space-y-2">
                <Label htmlFor="form-name">
                    이름 <span className="text-red-500">*</span>
                </Label>
                <Input id="form-name" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="form-email">
                    이메일 <span className="text-red-500">*</span>
                </Label>
                <Input id="form-email" type="email" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="form-phone">전화번호</Label>
                <Input id="form-phone" type="tel" />
                <p className="text-xs text-gray-500">선택 사항</p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '실제 폼에서 레이블을 사용하는 예시입니다.',
            },
        },
    },
};

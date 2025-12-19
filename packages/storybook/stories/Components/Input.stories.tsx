/**
 * ============================================================================
 * 파일명: Input.stories.tsx
 * 패키지: @erp/storybook
 * 경로: packages/storybook/stories/Components/Input.stories.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * Input 컴포넌트 스토리입니다.
 * 다양한 입력 유형과 상태를 시연합니다.
 *
 * [🎯 주요 기능]
 * 1. 다양한 입력 타입: text, email, password, number, search
 * 2. 오류 상태 표시
 * 3. 비활성 상태
 * 4. Label 연결
 *
 * [♿ 접근성]
 * - 모든 입력 필드에 label 연결 필수
 * - 오류 메시지 aria-describedby로 연결
 * - aria-invalid로 오류 상태 전달
 * ============================================================================
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input, Label, Button } from '@erp/ui/components';
import { Search, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Storybook 메타 설정
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
## Input 컴포넌트

공공기관 ERP 시스템의 기본 입력 필드 컴포넌트입니다.

### 접근성 필수 사항

1. **모든 입력 필드에 Label 연결**
   \`\`\`tsx
   <Label htmlFor="email">이메일</Label>
   <Input id="email" type="email" />
   \`\`\`

2. **오류 메시지는 aria-describedby로 연결**
   \`\`\`tsx
   <Input id="email" aria-describedby="email-error" hasError />
   <p id="email-error" role="alert">유효한 이메일을 입력하세요</p>
   \`\`\`

3. **필수 필드 표시**
   \`\`\`tsx
   <Label htmlFor="name">
     이름 <span className="text-error">*</span>
   </Label>
   <Input id="name" required aria-required="true" />
   \`\`\`
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'search', 'tel'],
            description: '입력 타입',
        },
        hasError: {
            control: 'boolean',
            description: '오류 상태',
        },
        disabled: {
            control: 'boolean',
            description: '비활성 상태',
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder 텍스트',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

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
 * Label과 함께 사용
 */
export const WithLabel: Story = {
    render: () => (
        <div className="w-80 space-y-2">
            <Label htmlFor="name">
                이름 <span className="text-red-500">*</span>
            </Label>
            <Input
                id="name"
                type="text"
                placeholder="홍길동"
                required
                aria-required="true"
            />
            <p className="text-sm text-gray-500">
                실명을 입력하세요
            </p>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Label과 도움말 텍스트를 함께 사용하는 기본 패턴입니다.',
            },
        },
    },
};

/**
 * 다양한 입력 타입
 */
export const InputTypes: Story = {
    render: () => (
        <div className="w-80 space-y-4">
            <div className="space-y-2">
                <Label htmlFor="text-input">텍스트</Label>
                <Input id="text-input" type="text" placeholder="일반 텍스트" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email-input">이메일</Label>
                <Input id="email-input" type="email" placeholder="hong@seoul.go.kr" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password-input">비밀번호</Label>
                <Input id="password-input" type="password" placeholder="••••••••" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="number-input">숫자</Label>
                <Input id="number-input" type="number" placeholder="12345" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="tel-input">전화번호</Label>
                <Input id="tel-input" type="tel" placeholder="010-1234-5678" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="search-input">검색</Label>
                <Input id="search-input" type="search" placeholder="검색어 입력..." />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '다양한 입력 타입을 보여줍니다.',
            },
        },
    },
};

/**
 * 오류 상태
 */
export const ErrorState: Story = {
    render: () => (
        <div className="w-80 space-y-2">
            <Label htmlFor="email-error">
                이메일 <span className="text-red-500">*</span>
            </Label>
            <Input
                id="email-error"
                type="email"
                placeholder="hong@seoul.go.kr"
                hasError
                aria-describedby="email-error-msg"
                defaultValue="invalid-email"
            />
            <p
                id="email-error-msg"
                className="text-sm text-red-500 flex items-center gap-1"
                role="alert"
            >
                <AlertCircle className="h-4 w-4" />
                유효한 이메일 주소를 입력하세요
            </p>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '오류 상태의 입력 필드입니다. 빨간색 테두리와 오류 메시지가 표시됩니다.',
            },
        },
    },
};

/**
 * 비활성 상태
 */
export const Disabled: Story = {
    render: () => (
        <div className="w-80 space-y-2">
            <Label htmlFor="disabled-input" className="text-gray-400">
                비활성 필드
            </Label>
            <Input
                id="disabled-input"
                type="text"
                disabled
                value="수정 불가"
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '비활성 상태의 입력 필드입니다.',
            },
        },
    },
};

/**
 * 아이콘과 함께
 */
export const WithIcon: Story = {
    render: () => (
        <div className="w-80 space-y-4">
            {/* 검색 입력 */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    type="search"
                    placeholder="검색..."
                    className="pl-10"
                    aria-label="검색"
                />
            </div>

            {/* 이메일 입력 */}
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    type="email"
                    placeholder="이메일 주소"
                    className="pl-10"
                    aria-label="이메일"
                />
            </div>

            {/* 비밀번호 입력 */}
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    type="password"
                    placeholder="비밀번호"
                    className="pl-10"
                    aria-label="비밀번호"
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label="비밀번호 표시"
                >
                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '아이콘과 함께 사용하는 입력 필드입니다.',
            },
        },
    },
};

/**
 * 실제 사용 예시 - 로그인 폼
 */
export const LoginForm: Story = {
    render: () => (
        <div className="w-96 p-6 bg-white rounded-lg shadow-lg border">
            <h2 className="text-xl font-bold mb-6 text-gray-900">로그인</h2>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                    <Label htmlFor="login-email">
                        이메일 <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            id="login-email"
                            type="email"
                            placeholder="hong@seoul.go.kr"
                            className="pl-10"
                            required
                        />
                    </div>
                    <p id="email-help" className="text-xs text-gray-500">
                        사전 승인된 업무용 이메일을 입력하세요
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="login-password">
                        비밀번호 <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            id="login-password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            required
                        />
                    </div>
                </div>

                <Button type="submit" className="w-full">
                    로그인
                </Button>

                <p className="text-center text-sm text-gray-500">
                    <a href="#" className="text-blue-600 hover:underline">
                        비밀번호를 잊으셨나요?
                    </a>
                </p>
            </form>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '실제 로그인 폼에서의 사용 예시입니다.',
            },
        },
    },
};

/**
 * 접근성 테스트용
 */
export const AccessibilityTest: Story = {
    render: () => (
        <div className="w-80 space-y-4">
            <p className="text-sm text-gray-600">
                Tab 키로 필드 간 이동해 보세요. 포커스 링이 명확하게 표시됩니다.
            </p>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="a11y-name">이름</Label>
                    <Input id="a11y-name" type="text" placeholder="이름" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="a11y-email">이메일</Label>
                    <Input id="a11y-email" type="email" placeholder="이메일" />
                </div>

                <Button type="button">제출</Button>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '키보드 접근성을 테스트할 수 있는 스토리입니다.',
            },
        },
    },
};

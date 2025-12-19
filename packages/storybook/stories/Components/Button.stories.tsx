/**
 * ============================================================================
 * 파일명: Button.stories.tsx
 * 패키지: @erp/storybook
 * 경로: packages/storybook/stories/Components/Button.stories.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * Button 컴포넌트 스토리입니다.
 * 모든 변형(variant)과 크기(size), 상태를 시연합니다.
 *
 * [🎯 주요 기능]
 * 1. 6가지 Variant: default, secondary, destructive, outline, ghost, link
 * 2. 4가지 Size: sm, default, lg, icon
 * 3. 로딩 상태
 * 4. 비활성 상태
 * 5. 아이콘 버튼
 *
 * [♿ 접근성]
 * - 모든 버튼에 키보드 접근 가능
 * - 포커스 링 표시
 * - 아이콘 버튼에 aria-label 필수
 * ============================================================================
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@erp/ui/components';
import {
    Save,
    Trash2,
    Plus,
    Download,
    Send,
    Mail,
    ChevronRight,
    Settings,
    Search
} from 'lucide-react';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Storybook 메타 설정
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
## Button 컴포넌트

공공기관 ERP 시스템의 기본 버튼 컴포넌트입니다.

### 사용 가이드라인

| Variant | 용도 | 예시 |
|---------|------|------|
| **default** | 주요 액션 | 저장, 제출, 확인 |
| **secondary** | 보조 액션 | 취소, 이전 |
| **destructive** | 위험한 액션 | 삭제, 초기화 |
| **outline** | 덜 강조된 액션 | 더보기, 옵션 |
| **ghost** | 최소 강조 | 아이콘 버튼 |
| **link** | 링크 스타일 | 내비게이션 |

### 크기 가이드라인

| Size | 높이 | 용도 |
|------|------|------|
| **sm** | 32px | 테이블 내부, 밀집된 UI |
| **default** | 40px | 일반 사용 |
| **lg** | 48px | 모바일, 접근성 강화 |
| **icon** | 40x40px | 아이콘 전용 |

### 접근성

- 모든 버튼은 키보드로 접근 가능합니다 (Tab, Enter, Space)
- 아이콘 버튼에는 반드시 \`aria-label\`을 추가하세요
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
            description: '버튼 스타일 변형',
        },
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg', 'icon'],
            description: '버튼 크기',
        },
        isLoading: {
            control: 'boolean',
            description: '로딩 상태',
        },
        disabled: {
            control: 'boolean',
            description: '비활성 상태',
        },
        children: {
            control: 'text',
            description: '버튼 텍스트',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * 기본 버튼
 */
export const Default: Story = {
    args: {
        children: '저장',
        variant: 'default',
        size: 'default',
    },
};

/**
 * 모든 Variant
 */
export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 items-center">
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
                story: '6가지 버튼 스타일 변형을 모두 확인할 수 있습니다.',
            },
        },
    },
};

/**
 * 모든 크기
 */
export const AllSizes: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 items-end">
            <Button size="sm">Small (32px)</Button>
            <Button size="default">Default (40px)</Button>
            <Button size="lg">Large (48px)</Button>
            <Button size="icon" aria-label="설정">
                <Settings className="h-4 w-4" />
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '4가지 버튼 크기를 모두 확인할 수 있습니다.',
            },
        },
    },
};

/**
 * 아이콘과 함께
 */
export const WithIcons: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Button>
                <Save className="h-4 w-4" />
                저장
            </Button>
            <Button variant="destructive">
                <Trash2 className="h-4 w-4" />
                삭제
            </Button>
            <Button variant="secondary">
                <Download className="h-4 w-4" />
                다운로드
            </Button>
            <Button variant="outline">
                <Plus className="h-4 w-4" />
                추가
            </Button>
            <Button variant="ghost">
                더보기
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '아이콘과 텍스트를 함께 사용하는 버튼입니다.',
            },
        },
    },
};

/**
 * 아이콘 전용 버튼
 */
export const IconOnly: Story = {
    render: () => (
        <div className="flex gap-4">
            <Button size="icon" variant="default" aria-label="검색">
                <Search className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" aria-label="설정">
                <Settings className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" aria-label="메일 보내기">
                <Mail className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" aria-label="삭제">
                <Trash2 className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="destructive" aria-label="삭제">
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '아이콘 전용 버튼입니다. **반드시 `aria-label`을 추가**해야 합니다.',
            },
        },
    },
};

/**
 * 로딩 상태
 */
export const Loading: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Button isLoading>저장 중...</Button>
            <Button variant="secondary" isLoading>처리 중...</Button>
            <Button variant="destructive" isLoading>삭제 중...</Button>
            <Button variant="outline" isLoading>로딩 중...</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '로딩 상태의 버튼입니다. 클릭이 비활성화되고 스피너가 표시됩니다.',
            },
        },
    },
};

/**
 * 비활성 상태
 */
export const Disabled: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Button disabled>비활성</Button>
            <Button variant="secondary" disabled>비활성</Button>
            <Button variant="destructive" disabled>비활성</Button>
            <Button variant="outline" disabled>비활성</Button>
            <Button variant="ghost" disabled>비활성</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '비활성 상태의 버튼입니다.',
            },
        },
    },
};

/**
 * 실제 사용 예시 - 폼 액션
 */
export const FormActions: Story = {
    render: () => (
        <div className="p-6 bg-gray-50 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">사원 정보 등록</h3>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="이름"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="email"
                    placeholder="이메일"
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="flex gap-2 mt-6">
                <Button variant="secondary" className="flex-1">취소</Button>
                <Button className="flex-1">
                    <Save className="h-4 w-4" />
                    저장
                </Button>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '폼에서 버튼을 사용하는 실제 예시입니다.',
            },
        },
    },
};

/**
 * 접근성 테스트용
 */
export const AccessibilityTest: Story = {
    render: () => (
        <div className="space-y-4">
            <p className="text-sm text-gray-600">
                Tab 키로 버튼 간 이동, Enter/Space로 클릭해 보세요.
            </p>
            <div className="flex gap-4">
                <Button>첫 번째</Button>
                <Button variant="secondary">두 번째</Button>
                <Button variant="outline">세 번째</Button>
                <Button size="icon" aria-label="설정">
                    <Settings className="h-4 w-4" />
                </Button>
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

/**
 * ============================================================================
 * 파일명: KeyboardNavigation.stories.tsx
 * 패키지: @erp/storybook
 * 경로: packages/storybook/stories/Accessibility/KeyboardNavigation.stories.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 키보드 네비게이션 접근성 테스트 스토리입니다.
 * 마우스 없이 모든 기능을 사용할 수 있는지 테스트합니다.
 *
 * [♿ 접근성]
 * - Tab: 다음 포커스 가능 요소로 이동
 * - Shift+Tab: 이전 요소로 이동
 * - Enter/Space: 버튼/링크 활성화
 * - Escape: 모달/드롭다운 닫기
 * - Arrow: 메뉴/리스트 탐색
 * ============================================================================
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Input, Label, Card, CardHeader, CardTitle, CardContent, Badge } from '@erp/ui/components';

const KeyboardNavigationDemo: React.FC = () => {
    const [focusedElement, setFocusedElement] = useState<string>('');
    const [actionLog, setActionLog] = useState<string[]>([]);

    const logAction = (action: string) => {
        setActionLog((prev) => [...prev.slice(-4), action]);
    };

    return (
        <div className="max-w-2xl mx-auto p-8">
            {/* 설명 */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h2 className="text-lg font-bold text-blue-900 mb-2">
                    ⌨️ 키보드 네비게이션 테스트
                </h2>
                <ul className="text-blue-800 text-sm space-y-1">
                    <li>• <kbd className="px-1 py-0.5 bg-blue-100 rounded text-xs">Tab</kbd> 키로 요소 간 이동</li>
                    <li>• <kbd className="px-1 py-0.5 bg-blue-100 rounded text-xs">Shift</kbd> + <kbd className="px-1 py-0.5 bg-blue-100 rounded text-xs">Tab</kbd> 으로 역방향 이동</li>
                    <li>• <kbd className="px-1 py-0.5 bg-blue-100 rounded text-xs">Enter</kbd> 또는 <kbd className="px-1 py-0.5 bg-blue-100 rounded text-xs">Space</kbd> 로 버튼 클릭</li>
                    <li>• 포커스 링이 명확하게 보이는지 확인</li>
                </ul>
            </div>

            {/* 현재 포커스 표시 */}
            <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                <span className="text-sm text-gray-600">현재 포커스: </span>
                <Badge variant="secondary">{focusedElement || '없음'}</Badge>
            </div>

            {/* 테스트 폼 */}
            <Card>
                <CardHeader>
                    <CardTitle>사용자 정보 입력</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* 이름 필드 */}
                    <div className="space-y-2">
                        <Label htmlFor="kb-name">이름</Label>
                        <Input
                            id="kb-name"
                            placeholder="이름을 입력하세요"
                            onFocus={() => setFocusedElement('이름 입력 필드')}
                            onBlur={() => setFocusedElement('')}
                        />
                    </div>

                    {/* 이메일 필드 */}
                    <div className="space-y-2">
                        <Label htmlFor="kb-email">이메일</Label>
                        <Input
                            id="kb-email"
                            type="email"
                            placeholder="이메일을 입력하세요"
                            onFocus={() => setFocusedElement('이메일 입력 필드')}
                            onBlur={() => setFocusedElement('')}
                        />
                    </div>

                    {/* 버튼 그룹 */}
                    <div className="flex gap-2 pt-4">
                        <Button
                            variant="outline"
                            onFocus={() => setFocusedElement('취소 버튼')}
                            onBlur={() => setFocusedElement('')}
                            onClick={() => logAction('취소 버튼 클릭됨')}
                        >
                            취소
                        </Button>
                        <Button
                            variant="secondary"
                            onFocus={() => setFocusedElement('초기화 버튼')}
                            onBlur={() => setFocusedElement('')}
                            onClick={() => logAction('초기화 버튼 클릭됨')}
                        >
                            초기화
                        </Button>
                        <Button
                            onFocus={() => setFocusedElement('저장 버튼')}
                            onBlur={() => setFocusedElement('')}
                            onClick={() => logAction('저장 버튼 클릭됨')}
                        >
                            저장
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* 액션 로그 */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">액션 로그</h3>
                {actionLog.length === 0 ? (
                    <p className="text-sm text-gray-500">버튼을 클릭하면 여기에 로그가 표시됩니다.</p>
                ) : (
                    <ul className="text-sm text-gray-600 space-y-1">
                        {actionLog.map((log, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">{i + 1}.</span>
                                {log}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 추가 테스트 요소 */}
            <div className="mt-8 grid grid-cols-3 gap-4">
                {['첫 번째', '두 번째', '세 번째'].map((label, i) => (
                    <Button
                        key={i}
                        variant={i === 1 ? 'secondary' : 'outline'}
                        onFocus={() => setFocusedElement(`${label} 버튼`)}
                        onBlur={() => setFocusedElement('')}
                        onClick={() => logAction(`${label} 버튼 클릭됨`)}
                    >
                        {label}
                    </Button>
                ))}
            </div>

            {/* 스킵 링크 데모 */}
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="text-sm font-bold text-yellow-900 mb-2">Skip Link 구현 예시</h3>
                <p className="text-sm text-yellow-800 mb-3">
                    아래 버튼에 포커스하면 Skip Link가 나타납니다.
                </p>
                <div className="relative">
                    <a
                        href="#main-content"
                        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 
                       bg-blue-600 text-white px-4 py-2 rounded z-50"
                        onFocus={() => setFocusedElement('Skip Link')}
                    >
                        메인 콘텐츠로 건너뛰기
                    </a>
                    <Button
                        variant="ghost"
                        className="w-full"
                        onFocus={() => setFocusedElement('건너뛰기 데모 버튼')}
                    >
                        이 버튼 앞에서 Tab을 누르면 Skip Link가 나타납니다
                    </Button>
                </div>
            </div>
        </div>
    );
};

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Storybook 메타 설정
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
const meta: Meta<typeof KeyboardNavigationDemo> = {
    title: 'Accessibility/KeyboardNavigation',
    component: KeyboardNavigationDemo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
## 키보드 네비게이션 테스트

공공기관 웹사이트는 **마우스 없이도 모든 기능을 사용**할 수 있어야 합니다.

### 필수 지원 키

| 키 | 동작 |
|-----|------|
| Tab | 다음 포커스 가능 요소로 이동 |
| Shift+Tab | 이전 요소로 이동 |
| Enter | 버튼/링크 활성화 |
| Space | 버튼 활성화, 체크박스 토글 |
| Escape | 모달/드롭다운 닫기 |
| Arrow | 메뉴/리스트 항목 탐색 |

### 포커스 표시

- 모든 포커스 가능 요소에 **명확한 포커스 링** 필수
- 최소 2px, 색상 대비 3:1 이상
- \`:focus-visible\` 사용 권장

### Skip Link

페이지 상단에 "메인 콘텐츠로 건너뛰기" 링크를 추가하여
스크린리더 사용자가 반복 네비게이션을 건너뛸 수 있게 합니다.
        `,
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KeyboardNavigationDemo>;

export const Default: Story = {};

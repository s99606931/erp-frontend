/**
 * ============================================================================
 * 파일명: Spacing.stories.tsx
 * 패키지: @erp/storybook
 * 경로: packages/storybook/stories/Tokens/Spacing.stories.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 간격(Spacing) 토큰 스토리입니다.
 * @erp/ui 패키지의 간격, 레이아웃 시스템을 시각적으로 표시합니다.
 *
 * [🎯 주요 기능]
 * 1. 간격 스케일 (1~12)
 * 2. 레이아웃 고정 크기 (Header, Sidebar, StatusBar)
 * 3. 그리드 시스템
 * 4. 반응형 브레이크포인트
 *
 * [♿ 접근성]
 * - 터치 타겟 44x44px 이상 권장
 * - 충분한 요소 간 간격
 * ============================================================================
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { layout, grid } from '@erp/ui/tokens';

/**
 * 간격 블록 컴포넌트
 */
interface SpacingBlockProps {
    name: string;
    size: string;
    description?: string;
}

const SpacingBlock: React.FC<SpacingBlockProps> = ({ name, size, description }) => {
    const numSize = parseInt(size);

    return (
        <div className="flex items-center gap-4 py-2">
            <div className="w-20 text-sm font-mono text-gray-500">
                spacing-{name}
            </div>
            <div className="w-16 text-right text-sm text-gray-400">
                {size}
            </div>
            <div className="flex-1">
                <div
                    className="spacing-block"
                    style={{
                        width: size,
                        height: '24px',
                    }}
                />
            </div>
            {description && (
                <div className="text-sm text-gray-500 w-48">{description}</div>
            )}
        </div>
    );
};

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 메인 간격 토큰 컴포넌트
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
const SpacingTokens: React.FC = () => {
    return (
        <div className="story-container">
            {/* 헤더 섹션 */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    📏 간격 시스템
                </h1>
                <p className="text-lg text-gray-600">
                    공공기관 ERP SaaS 디자인 시스템의 간격(Spacing) 가이드입니다.
                    <br />
                    일관된 간격으로 <strong>시각적 조화</strong>를 유지합니다.
                </p>
            </div>

            {/* 기본 간격 스케일 */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">기본 간격 스케일</h2>
                <p className="text-gray-600 mb-4">
                    4px 단위의 배수로 구성된 간격 시스템입니다.
                    Tailwind CSS의 기본 스케일과 호환됩니다.
                </p>

                <div className="bg-gray-50 p-6 rounded-lg">
                    <SpacingBlock name="1" size="4px" description="미세 조정" />
                    <SpacingBlock name="2" size="8px" description="인접 요소 간" />
                    <SpacingBlock name="3" size="12px" description="관련 요소 그룹" />
                    <SpacingBlock name="4" size="16px" description="기본 간격" />
                    <SpacingBlock name="6" size="24px" description="섹션 내 여백" />
                    <SpacingBlock name="8" size="32px" description="섹션 간 여백" />
                    <SpacingBlock name="12" size="48px" description="대섹션 간 여백" />
                </div>
            </section>

            {/* 레이아웃 고정 크기 */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">레이아웃 고정 크기</h2>
                <p className="text-gray-600 mb-4">
                    Shell 앱의 핵심 레이아웃 요소들의 고정 크기입니다.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Header */}
                    <div className="bg-white border rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-2">Header</div>
                        <div className="flex items-center gap-3">
                            <div
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center text-white text-sm"
                                style={{ height: layout.header.height }}
                            >
                                64px
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            고정 높이 64px, 항상 상단 고정
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="bg-white border rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-2">Sidebar</div>
                        <div className="flex gap-2">
                            <div
                                className="bg-gradient-to-b from-gray-700 to-gray-800 rounded flex items-center justify-center text-white text-xs"
                                style={{
                                    width: layout.sidebar.width,
                                    height: '120px'
                                }}
                            >
                                {layout.sidebar.width} (펼침)
                            </div>
                            <div
                                className="bg-gradient-to-b from-gray-500 to-gray-600 rounded flex items-center justify-center text-white text-xs"
                                style={{
                                    width: layout.sidebar.widthCollapsed,
                                    height: '120px'
                                }}
                            >
                                {layout.sidebar.widthCollapsed}
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            펼침: 240px / 접힘: 64px
                        </div>
                    </div>

                    {/* Status Bar */}
                    <div className="bg-white border rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-2">Status Bar</div>
                        <div
                            className="w-full bg-gradient-to-r from-gray-800 to-gray-900 rounded flex items-center justify-center text-white text-sm"
                            style={{ height: layout.statusBar.height }}
                        >
                            32px
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            고정 높이 32px, 항상 하단 고정
                        </div>
                    </div>

                    {/* Container */}
                    <div className="bg-white border rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-2">Container 최대 너비</div>
                        <div className="text-2xl font-bold text-gray-900">
                            {layout.container.maxWidth}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            대형 모니터에서 컨텐츠 영역 제한
                        </div>
                    </div>
                </div>
            </section>

            {/* 그리드 시스템 */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">그리드 시스템</h2>
                <p className="text-gray-600 mb-4">
                    12 컬럼 그리드 시스템으로 유연한 레이아웃을 구성합니다.
                </p>

                <div className="bg-white border rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-12 gap-2">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-blue-100 text-blue-800 text-center py-2 rounded text-xs font-mono"
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="p-3 bg-gray-50 rounded">
                        <div className="text-gray-500">컬럼 수</div>
                        <div className="font-bold">{grid.columns}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                        <div className="text-gray-500">거터(Gutter)</div>
                        <div className="font-bold">{grid.gutter}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                        <div className="text-gray-500">마진</div>
                        <div className="font-bold">24px</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                        <div className="text-gray-500">최대 너비</div>
                        <div className="font-bold">{layout.container.maxWidth}</div>
                    </div>
                </div>
            </section>

            {/* 반응형 브레이크포인트 */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">반응형 브레이크포인트</h2>
                <p className="text-gray-600 mb-4">
                    Tailwind CSS 기본 브레이크포인트를 사용합니다.
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">브레이크포인트</th>
                                <th className="px-4 py-2 text-left">최소 너비</th>
                                <th className="px-4 py-2 text-left">디바이스</th>
                                <th className="px-4 py-2 text-left">레이아웃 변화</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="px-4 py-2 font-mono">sm</td>
                                <td className="px-4 py-2">640px</td>
                                <td className="px-4 py-2">모바일</td>
                                <td className="px-4 py-2">사이드바 숨김, 햄버거 메뉴</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2 font-mono">md</td>
                                <td className="px-4 py-2">768px</td>
                                <td className="px-4 py-2">태블릿</td>
                                <td className="px-4 py-2">사이드바 접힘 상태</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2 font-mono">lg</td>
                                <td className="px-4 py-2">1024px</td>
                                <td className="px-4 py-2">소형 데스크톱</td>
                                <td className="px-4 py-2">사이드바 펼침 상태</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2 font-mono">xl</td>
                                <td className="px-4 py-2">1280px</td>
                                <td className="px-4 py-2">일반 데스크톱</td>
                                <td className="px-4 py-2">전체 레이아웃</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-mono">2xl</td>
                                <td className="px-4 py-2">1536px</td>
                                <td className="px-4 py-2">대형 모니터</td>
                                <td className="px-4 py-2">최대 너비 제한 적용</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 접근성 가이드 */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-2">
                    ♿ 간격 접근성 가이드
                </h3>
                <ul className="text-blue-800 space-y-1">
                    <li>• <strong>터치 타겟</strong>: 버튼, 링크 최소 44x44px</li>
                    <li>• <strong>간격</strong>: 인터랙티브 요소 간 최소 8px</li>
                    <li>• <strong>포커스 영역</strong>: 포커스 아웃라인에 충분한 공간 확보</li>
                </ul>
            </div>
        </div>
    );
};

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Storybook 메타 설정
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
const meta: Meta<typeof SpacingTokens> = {
    title: 'Tokens/Spacing',
    component: SpacingTokens,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
## 간격 시스템

4px 단위의 일관된 간격 시스템으로 시각적 조화를 유지합니다.

### 사용 예시

\`\`\`tsx
// 간격 클래스 사용
<div className="p-4 mb-6 gap-2">
  <Button className="mr-2">저장</Button>
  <Button>취소</Button>
</div>
\`\`\`
        `,
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpacingTokens>;

export const Default: Story = {};

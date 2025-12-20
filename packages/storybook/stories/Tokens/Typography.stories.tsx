/**
 * ============================================================================
 * 파일명: Typography.stories.tsx
 * 패키지: @erp/storybook
 * 경로: packages/storybook/stories/Tokens/Typography.stories.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 타이포그래피 토큰 스토리입니다.
 * @erp/ui 패키지의 폰트 스타일, 크기, 굵기를 시각적으로 표시합니다.
 *
 * [🎯 주요 기능]
 * 1. 폰트 크기 스케일 (xs ~ 3xl)
 * 2. 폰트 굵기 (normal ~ bold)
 * 3. 행간 설정
 * 4. 실제 사용 예시
 *
 * [♿ 접근성]
 * - 본문 텍스트 최소 16px 권장
 * - 적절한 행간으로 가독성 확보
 * ============================================================================
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { typography } from '@erp/ui/tokens';

/**
 * 타이포그래피 샘플 컴포넌트
 */
interface TypeSampleProps {
    name: string;
    size: string;
    lineHeight: string | number;
    weight?: string;
    description?: string;
}

const TypeSample: React.FC<TypeSampleProps> = ({
    name,
    size,
    lineHeight,
    weight = '400',
    description
}) => (
    <div className="typography-sample">
        <div className="flex items-baseline gap-4 mb-2">
            <span className="text-sm font-mono text-gray-500 w-24">{name}</span>
            <span className="text-xs text-gray-400">
                {size} / {lineHeight} / {weight}
            </span>
        </div>
        <p
            style={{
                fontSize: size,
                lineHeight: lineHeight,
                fontWeight: weight
            }}
            className="text-gray-900"
        >
            공공기관 ERP SaaS 시스템
        </p>
        {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
    </div>
);

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 메인 타이포그래피 토큰 컴포넌트
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
const TypographyTokens: React.FC = () => {
    return (
        <div className="story-container">
            {/* 헤더 섹션 */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    📝 타이포그래피 시스템
                </h1>
                <p className="text-lg text-gray-600">
                    공공기관 ERP SaaS 디자인 시스템의 타이포그래피 가이드입니다.
                    <br />
                    <strong>Pretendard</strong> 폰트를 기본으로 사용하며,
                    접근성을 위해 <strong>본문 최소 16px</strong>을 유지합니다.
                </p>
            </div>

            {/* 폰트 패밀리 */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">폰트 패밀리</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500 mb-2">본문용</div>
                        <div
                            className="text-2xl font-semibold"
                            style={{ fontFamily: typography.fontFamily.sans.join(', ') }}
                        >
                            Pretendard
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                            {typography.fontFamily.sans.join(', ')}
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500 mb-2">코드/숫자용</div>
                        <div
                            className="text-2xl font-semibold"
                            style={{ fontFamily: typography.fontFamily.mono.join(', ') }}
                        >
                            Fira Code
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                            {typography.fontFamily.mono.join(', ')}
                        </div>
                    </div>
                </div>
            </section>

            {/* 폰트 크기 스케일 */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">폰트 크기 스케일</h2>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                    <p className="text-yellow-800 text-sm">
                        ⚠️ <strong>접근성 주의</strong>: 본문 텍스트는 16px(text-base) 미만으로 사용하지 마세요.
                        <br />
                        &nbsp;&nbsp;&nbsp;12px(text-xs), 14px(text-sm)은 캡션, 라벨 등 보조 텍스트에만 사용합니다.
                    </p>
                </div>

                <TypeSample
                    name="text-3xl"
                    size={typography.fontSize['3xl']}
                    lineHeight={typography.lineHeight.tight}
                    weight="700"
                    description="대제목 - 페이지 타이틀에 사용"
                />
                <TypeSample
                    name="text-2xl"
                    size={typography.fontSize['2xl']}
                    lineHeight={typography.lineHeight.tight}
                    weight="700"
                    description="제목 - 섹션 타이틀에 사용"
                />
                <TypeSample
                    name="text-xl"
                    size={typography.fontSize.xl}
                    lineHeight={typography.lineHeight.snug}
                    weight="600"
                    description="소제목 - 카드 헤더 등에 사용"
                />
                <TypeSample
                    name="text-lg"
                    size={typography.fontSize.lg}
                    lineHeight={typography.lineHeight.normal}
                    weight="500"
                    description="강조 본문"
                />
                <TypeSample
                    name="text-base"
                    size={typography.fontSize.base}
                    lineHeight={typography.lineHeight.normal}
                    weight="400"
                    description="기본 본문 (최소 크기) ✅"
                />
                <TypeSample
                    name="text-sm"
                    size={typography.fontSize.sm}
                    lineHeight={typography.lineHeight.normal}
                    weight="400"
                    description="보조 텍스트 - 도움말, 설명에 사용"
                />
                <TypeSample
                    name="text-xs"
                    size={typography.fontSize.xs}
                    lineHeight={typography.lineHeight.normal}
                    weight="400"
                    description="캡션 - 라벨, 메타 정보에 사용"
                />
            </section>

            {/* 폰트 굵기 */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">폰트 굵기</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(typography.fontWeight).map(([name, weight]) => (
                        <div key={name} className="p-4 bg-gray-50 rounded-lg">
                            <div
                                className="text-xl mb-2"
                                style={{ fontWeight: weight }}
                            >
                                가나다라 ABC 123
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>font-{name}</span>
                                <span className="font-mono">{weight}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 행간 */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">행간 (Line Height)</h2>
                <div className="space-y-6">
                    {Object.entries(typography.lineHeight).map(([name, value]) => (
                        <div key={name} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="text-sm font-mono text-gray-500 w-20">
                                    leading-{name}
                                </span>
                                <span className="text-xs text-gray-400">{value}</span>
                            </div>
                            <p
                                className="text-base text-gray-700 max-w-2xl"
                                style={{ lineHeight: value }}
                            >
                                공공기관 ERP SaaS 시스템은 VS Code 수준의 생산성을 제공합니다.
                                Micro Frontend 아키텍처를 채택하여 각 서비스를 독립적으로 개발하고 배포할 수 있습니다.
                                멀티 테넌트 시스템으로 10개 공공기관의 개별 테마를 지원합니다.
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 실제 사용 예시 */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    📋 실제 사용 예시
                </h2>
                <div className="bg-white border rounded-lg p-8 shadow-sm">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        사원 정보 관리
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        인사관리 시스템의 사원 정보를 조회하고 관리합니다.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                기본 정보
                            </h2>
                            <p className="text-base text-gray-700 leading-relaxed">
                                사원의 기본 인적 사항을 입력하고 관리합니다.
                                이름, 생년월일, 연락처, 주소 등의 정보가 포함됩니다.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded">
                            <label className="text-sm font-medium text-gray-700">
                                이메일 <span className="text-red-500">*</span>
                            </label>
                            <p className="text-xs text-gray-500 mt-1">
                                업무용 이메일 주소를 입력하세요 (예: hong@seoul.go.kr)
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 접근성 가이드 */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-2">
                    ♿ 타이포그래피 접근성 가이드
                </h3>
                <ul className="text-blue-800 space-y-1">
                    <li>• <strong>최소 폰트 크기</strong>: 본문 16px, 라벨/캡션 12px</li>
                    <li>• <strong>행간</strong>: 본문은 1.5배 이상 권장 (leading-normal 이상)</li>
                    <li>• <strong>단락 너비</strong>: 한 줄에 60자 이하 권장</li>
                    <li>• <strong>대비</strong>: 본문 텍스트와 배경 4.5:1 이상</li>
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
const meta: Meta<typeof TypographyTokens> = {
    title: 'Tokens/Typography',
    component: TypographyTokens,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
## 타이포그래피 시스템

공공기관 ERP의 타이포그래피는 **가독성**과 **접근성**을 최우선으로 합니다.

### 주요 원칙

1. **Pretendard 폰트** - 한글 가독성이 뛰어난 현대적 폰트
2. **최소 16px** - 접근성을 위한 본문 최소 크기
3. **충분한 행간** - 1.5배 이상의 행간으로 가독성 확보
        `,
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TypographyTokens>;

export const Default: Story = {};

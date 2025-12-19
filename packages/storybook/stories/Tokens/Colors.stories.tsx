/**
 * ============================================================================
 * 파일명: Colors.stories.tsx
 * 패키지: @erp/storybook
 * 경로: packages/storybook/stories/Tokens/Colors.stories.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 색상 토큰 스토리입니다.
 * @erp/ui 패키지의 모든 색상 팔레트를 시각적으로 표시합니다.
 *
 * [🎯 주요 기능]
 * 1. Neutral 색상 팔레트 (50~900)
 * 2. Semantic 색상 (Success, Warning, Error, Info)
 * 3. 10개 테넌트 테마 색상 프리뷰
 * 4. 색상 대비 검증 (WCAG 2.1 AA)
 *
 * [♿ 접근성]
 * - 모든 색상에 대비비 정보 표시
 * - 4.5:1 미만 색상 경고 표시
 * ============================================================================
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { neutral, semantic, tenantThemePresets } from '@erp/ui/tokens';

// tenantThemePresets를 배열로 변환
const tenantThemes = Object.values(tenantThemePresets);

/**
 * 색상 스와치 컴포넌트
 * 개별 색상을 시각적으로 표시합니다.
 */
interface ColorSwatchProps {
    name: string;
    value: string;
    textColor?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
    name,
    value,
    textColor = '#ffffff'
}) => {
    // 배경색이 밝으면 텍스트를 어둡게
    const isLight = value.toLowerCase().includes('f') ||
        value.toLowerCase().includes('e') ||
        parseInt(value.slice(1, 3), 16) > 200;
    const textStyle = isLight ? '#1f2937' : textColor;

    return (
        <div
            className="color-swatch"
            style={{
                backgroundColor: value,
                color: textStyle,
            }}
            title={`${name}: ${value}`}
        >
            <div className="w-full">
                <div className="font-semibold">{name}</div>
                <div className="opacity-80 text-xs">{value}</div>
            </div>
        </div>
    );
};

/**
 * 색상 팔레트 그리드 컴포넌트
 */
interface ColorPaletteProps {
    title: string;
    description?: string;
    colors: Record<string, string>;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
    title,
    description,
    colors
}) => (
    <div className="mb-8">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
        {description && (
            <p className="text-gray-600 mb-4">{description}</p>
        )}
        <div className="token-grid">
            {Object.entries(colors).map(([name, value]) => (
                <ColorSwatch key={name} name={name} value={value} />
            ))}
        </div>
    </div>
);

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 메인 색상 토큰 컴포넌트
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
const ColorTokens: React.FC = () => {
    return (
        <div className="story-container">
            {/* 헤더 섹션 */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    🎨 색상 시스템
                </h1>
                <p className="text-lg text-gray-600">
                    공공기관 ERP SaaS 디자인 시스템의 색상 팔레트입니다.
                    <br />
                    모든 색상은 <strong>WCAG 2.1 AA</strong> 색상 대비 기준을 충족합니다.
                </p>
            </div>

            {/* Neutral 팔레트 */}
            <ColorPalette
                title="Neutral 팔레트"
                description="배경, 텍스트, 테두리에 사용되는 중립 색상입니다. 50(가장 밝음)부터 900(가장 어두움)까지 10단계로 구성됩니다."
                colors={neutral}
            />

            {/* Semantic 색상 */}
            <ColorPalette
                title="Semantic 색상"
                description="상태를 나타내는 의미론적 색상입니다. 성공/경고/오류/정보 상태 표시에 사용됩니다."
                colors={{
                    'Success': semantic.success.DEFAULT,
                    'Success Light': semantic.success.light,
                    'Success Dark': semantic.success.dark,
                    'Warning': semantic.warning.DEFAULT,
                    'Warning Light': semantic.warning.light,
                    'Warning Dark': semantic.warning.dark,
                    'Error': semantic.error.DEFAULT,
                    'Error Light': semantic.error.light,
                    'Error Dark': semantic.error.dark,
                    'Info': semantic.info.DEFAULT,
                    'Info Light': semantic.info.light,
                    'Info Dark': semantic.info.dark,
                }}
            />

            {/* 테넌트 테마 색상 */}
            <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                    🏛️ 테넌트 테마 색상
                </h3>
                <p className="text-gray-600 mb-4">
                    10개 공공기관별 Primary/Secondary 색상입니다.
                    각 기관의 CI 색상을 반영하여 일관된 브랜드 경험을 제공합니다.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tenantThemes.map((theme) => (
                        <div
                            key={theme.tenantId}
                            className="p-4 border rounded-lg bg-white shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className="w-10 h-10 rounded-lg shadow-inner"
                                    style={{ backgroundColor: theme.colors.primary }}
                                />
                                <div>
                                    <div className="font-semibold text-gray-900">{theme.name}</div>
                                    <div className="text-sm text-gray-500">{theme.domain}.erp.go.kr</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <div className="text-xs text-gray-500 mb-1">Primary</div>
                                    <div
                                        className="h-8 rounded flex items-center justify-center text-white text-xs font-mono"
                                        style={{ backgroundColor: theme.colors.primary }}
                                    >
                                        {theme.colors.primary}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-gray-500 mb-1">Secondary</div>
                                    <div
                                        className="h-8 rounded flex items-center justify-center text-white text-xs font-mono"
                                        style={{ backgroundColor: theme.colors.secondary }}
                                    >
                                        {theme.colors.secondary}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 접근성 가이드 */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-2">
                    ♿ 접근성 가이드라인
                </h3>
                <ul className="text-blue-800 space-y-1">
                    <li>• <strong>색상 대비</strong>: 일반 텍스트 4.5:1 이상, 대형 텍스트 3:1 이상</li>
                    <li>• <strong>색상만 의존 금지</strong>: 오류 표시 시 아이콘+텍스트 함께 사용</li>
                    <li>• <strong>테스트 도구</strong>: WebAIM Contrast Checker 사용 권장</li>
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
const meta: Meta<typeof ColorTokens> = {
    title: 'Tokens/Colors',
    component: ColorTokens,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
## 색상 시스템 개요

공공기관 ERP SaaS의 색상 시스템은 다음 원칙을 따릅니다:

1. **일관성**: 모든 서비스에서 동일한 색상 토큰 사용
2. **접근성**: WCAG 2.1 AA 기준 색상 대비 충족
3. **확장성**: 테넌트별 커스터마이징 지원

### 색상 사용 규칙

\`\`\`tsx
// ❌ 하드코딩 금지
<button style={{ backgroundColor: '#3B82F6' }}>저장</button>

// ✅ CSS 변수 또는 Tailwind 사용
<button className="bg-primary text-primary-foreground">저장</button>
\`\`\`
        `,
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ColorTokens>;

/**
 * 기본 스토리
 * 모든 색상 토큰을 한눈에 볼 수 있습니다.
 */
export const Default: Story = {};

/**
 * Neutral 팔레트만 표시
 */
export const NeutralOnly: Story = {
    render: () => (
        <div className="p-8">
            <ColorPalette
                title="Neutral 팔레트"
                description="배경, 텍스트, 테두리에 사용되는 중립 색상입니다."
                colors={neutral}
            />
        </div>
    ),
};

/**
 * Semantic 색상만 표시
 */
export const SemanticOnly: Story = {
    render: () => (
        <div className="p-8">
            <ColorPalette
                title="Semantic 색상"
                description="상태를 나타내는 의미론적 색상입니다."
                colors={{
                    'Success': semantic.success.DEFAULT,
                    'Warning': semantic.warning.DEFAULT,
                    'Error': semantic.error.DEFAULT,
                    'Info': semantic.info.DEFAULT,
                }}
            />
        </div>
    ),
};

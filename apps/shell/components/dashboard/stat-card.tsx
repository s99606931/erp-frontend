/**
 * ============================================================================
 * 파일명: stat-card.tsx
 * 앱: shell
 * 경로: apps/shell/components/dashboard/stat-card.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 * 
 * [📄 파일 설명]
 * 대시보드에서 숫자로 된 통계 지표를 표시하는 카드 컴포넌트입니다.
 * 
 * [🎯 주요 기능]
 * 1. 제목, 값, 변동률 표시
 * 2. 변동률에 따른 색상 변경 (양수: 초록/success, 음수: 빨강/error)
 * 3. 커스텀 아이콘 지원 (JSX 엘리먼트 또는 컴포넌트 클래스)
 * 
 * [💡 초급자를 위한 정보]
 * - React.ElementType: 아이콘 컴포넌트를 직접 전달받을 때 사용하는 타입입니다.
 * - @erp/ui/components: 공용 UI 라이브러리에서 카드 레이아웃을 가져와 사용합니다.
 * ============================================================================
 */

import React from 'react';
import { Card, CardContent } from '@erp/ui/components';

/**
 * @interface StatCardProps
 * @description StatCard 컴포넌트의 속성 정의
 */
interface StatCardProps {
    /** 표시할 지표의 제목 (예: "총 사원수") */
    title: string;
    /** 실제 값 (숫자 또는 문자열) */
    value: string | number;
    /** 지표에 대한 추가 상세 설명 */
    description?: string;
    /** 변동률 문자열 (예: "+15%") */
    change?: string;
    /** 표시할 아이콘 (Lucide 아이콘 또는 커스텀 SVG) */
    icon: React.ElementType | React.ReactNode;
    /** 그래프 트렌드 데이터 (상향/하향 여부) */
    trend?: {
        /** 변동 폭 (숫자) */
        value: number;
        /** 양수(증가) 여부 */
        isPositive: boolean;
    };
}

/**
 * @component StatCard
 * @description 대시보드의 개별 통계 지표를 시각적으로 보여주는 카드형 컴포넌트입니다.
 */
export function StatCard({ title, value, description, change, icon: Icon, trend }: StatCardProps) {
    // 1. 변동률이 양수인지 음수인지 판단합니다.
    const isPositive = change ? change.startsWith('+') : trend?.isPositive;

    // 2. 화면에 보여줄 변동률 텍스트를 생성합니다.
    const changeValue = change || (trend ? `${trend.isPositive ? '+' : '-'}${trend.value}%` : null);

    /**
     * @function renderIcon
     * @description 아이콘의 타입에 따라 올바른 방식으로 렌더링합니다.
     */
    const renderIcon = () => {
        // 이미 렌더링된 JSX 엘리먼트(예: <Icon />)인 경우 그대로 반환
        if (React.isValidElement(Icon)) return Icon;

        // 컴포넌트 클래스(예: Users)인 경우 <Icon /> 형태로 렌더링하며 스타일을 추가
        const IconComponent = Icon as React.ElementType;
        return <IconComponent className="h-5 w-5" />;
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    {/* 왼쪽: 아이콘 영역 */}
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {renderIcon()}
                    </div>

                    {/* 오른쪽: 변동률 표시 (값이 있을 때만 렌더링) */}
                    {changeValue && (
                        <span
                            className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-error'}`}
                            aria-label={`변동률: ${changeValue}`} // 시각 장애인을 위한 스크린 리더 설명 추가
                        >
                            {changeValue}
                        </span>
                    )}
                </div>

                {/* 하단: 타이틀 및 메인 수치 */}
                <div className="mt-4">
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                    {/* 상세 설명이 있는 경우에만 표시 */}
                    {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
                </div>
            </CardContent>
        </Card>
    );
}

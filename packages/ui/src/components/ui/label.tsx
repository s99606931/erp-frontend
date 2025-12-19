/**
 * ============================================================================
 * 파일명: label.tsx
 * 패키지: @erp/ui
 * 경로: packages/ui/src/components/ui/label.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 폼 필드 레이블 컴포넌트입니다.
 * 필수 필드 표시와 스크린리더 지원을 제공합니다.
 *
 * [♿ 접근성]
 * - htmlFor로 입력 필드와 연결 필수
 * - 필수 필드는 sr-only로 스크린리더에 "(필수)" 안내
 * ============================================================================
 */

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const labelVariants = cva(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

/**
 * Label 컴포넌트 Props
 */
export interface LabelProps
    extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
    /**
     * 필수 필드 여부
     * true일 때 빨간색 * 표시
     */
    required?: boolean;
}

/**
 * Label 컴포넌트
 *
 * @component
 * @description
 * 폼 필드의 레이블 컴포넌트입니다.
 *
 * @example
 * // 기본 사용
 * <Label htmlFor="email">이메일</Label>
 * <Input id="email" />
 *
 * @example
 * // 필수 필드
 * <Label htmlFor="name" required>이름</Label>
 * <Input id="name" required />
 */
const Label = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    LabelProps
>(({ className, required, children, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants(), className)}
        {...props}
    >
        {children}
        {required && (
            <>
                <span className="ml-1 text-error" aria-hidden="true">
                    *
                </span>
                <span className="sr-only">(필수 입력)</span>
            </>
        )}
    </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

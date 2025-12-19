/**
 * ============================================================================
 * 파일명: badge.tsx
 * 패키지: @erp/ui
 * 경로: packages/ui/src/components/ui/badge.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 상태 표시용 배지 컴포넌트입니다.
 * ============================================================================
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-primary text-primary-foreground',
                secondary: 'border-transparent bg-secondary text-secondary-foreground',
                success: 'border-transparent bg-success text-success-foreground',
                warning: 'border-transparent bg-warning text-warning-foreground',
                error: 'border-transparent bg-error text-error-foreground',
                outline: 'text-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

/**
 * Badge 컴포넌트
 *
 * @example
 * <Badge variant="success">승인됨</Badge>
 * <Badge variant="warning">대기중</Badge>
 * <Badge variant="error">반려됨</Badge>
 */
function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };

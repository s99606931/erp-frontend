/**
 * ============================================================================
 * 파일명: button.tsx
 * 패키지: @erp/ui
 * 경로: packages/ui/src/components/ui/button.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 재사용 가능한 버튼 컴포넌트입니다.
 * 다양한 변형(variant)과 크기(size)를 지원합니다.
 *
 * [🎯 주요 기능]
 * 1. Variant: primary, secondary, ghost, destructive, outline
 * 2. Size: sm (32px), default (40px), lg (48px)
 * 3. 로딩 상태 지원 (aria-busy)
 * 4. 비활성 상태 지원 (aria-disabled)
 *
 * [♿ 접근성]
 * - 포커스 시 명확한 아웃라인 (ring-2)
 * - 스크린리더 지원 (aria-label, aria-busy)
 * - 키보드 접근 (Enter, Space로 클릭)
 * ============================================================================
 */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * 버튼 스타일 변형 정의
 *
 * @description
 * CVA (Class Variance Authority)를 사용하여
 * 버튼의 다양한 스타일 변형을 정의합니다.
 */
const buttonVariants = cva(
    // 기본 스타일 (모든 버튼에 적용)
    [
        'inline-flex items-center justify-center gap-2',
        'whitespace-nowrap rounded-md text-sm font-medium',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
    ],
    {
        variants: {
            /**
             * variant: 버튼의 시각적 스타일
             */
            variant: {
                /** 주요 액션 (저장, 확인, 제출) */
                default:
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                /** 보조 액션 (취소, 이전) */
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                /** 위험한 액션 (삭제, 초기화) */
                destructive:
                    'bg-error text-error-foreground hover:bg-error/90',
                /** 테두리만 있는 버튼 */
                outline:
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                /** 배경 없는 버튼 (더보기, 링크) */
                ghost:
                    'hover:bg-accent hover:text-accent-foreground',
                /** 링크 스타일 버튼 */
                link:
                    'text-primary underline-offset-4 hover:underline',
            },
            /**
             * size: 버튼 크기
             */
            size: {
                /** 작은 버튼 (32px) - 테이블 내부 등 */
                sm: 'h-8 px-3 text-xs',
                /** 기본 버튼 (40px) */
                default: 'h-10 px-4 py-2',
                /** 큰 버튼 (48px) - 모바일, 접근성 */
                lg: 'h-12 px-8 text-base',
                /** 아이콘 전용 버튼 */
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

/**
 * 버튼 컴포넌트 Props
 */
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    /**
     * 로딩 상태
     * true일 때 로딩 스피너 표시 및 클릭 비활성
     */
    isLoading?: boolean;
    /**
     * 자식 요소를 버튼으로 렌더링
     * Link 컴포넌트 등과 함께 사용
     */
    asChild?: boolean;
}

/**
 * Button 컴포넌트
 *
 * @component
 * @description
 * 공공기관 ERP 시스템의 기본 버튼 컴포넌트입니다.
 * 접근성을 완벽하게 지원하며, 다양한 변형과 크기를 제공합니다.
 *
 * @example
 * // 기본 사용
 * <Button>저장</Button>
 *
 * @example
 * // 변형 및 크기 지정
 * <Button variant="destructive" size="lg">삭제</Button>
 *
 * @example
 * // 로딩 상태
 * <Button isLoading>처리 중...</Button>
 *
 * @example
 * // 아이콘 버튼
 * <Button variant="ghost" size="icon" aria-label="삭제">
 *   <TrashIcon />
 * </Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, isLoading, asChild = false, children, disabled, ...props }, ref) => {
        // asChild가 true면 Slot 사용 (자식 요소가 버튼 역할)
        const Comp = asChild ? Slot : 'button';

        // asChild가 true일 때는 children만 전달 (Slot은 단일 자식만 허용)
        // asChild가 false일 때는 로딩 스피너 + children 함께 렌더링
        if (asChild) {
            return (
                <Comp
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref}
                    aria-busy={isLoading}
                    aria-disabled={disabled || isLoading}
                    {...props}
                >
                    {children}
                </Comp>
            );
        }

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={disabled || isLoading}
                aria-busy={isLoading}
                aria-disabled={disabled || isLoading}
                {...props}
            >
                {/* 로딩 상태일 때 스피너 표시 */}
                {isLoading && (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                )}
                {children}
            </Comp>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

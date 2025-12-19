/**
 * ============================================================================
 * 파일명: input.tsx
 * 패키지: @erp/ui
 * 경로: packages/ui/src/components/ui/input.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 텍스트 입력 필드 컴포넌트입니다.
 * 다양한 타입(text, email, password)과 상태를 지원합니다.
 *
 * [♿ 접근성]
 * - aria-describedby로 도움말/에러 메시지 연결
 * - aria-invalid로 오류 상태 전달
 * - 포커스 시 명확한 아웃라인
 * ============================================================================
 */

import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Input 컴포넌트 Props
 */
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    /**
     * 오류 상태
     * true일 때 빨간색 테두리 표시
     */
    hasError?: boolean;
}

/**
 * Input 컴포넌트
 *
 * @component
 * @description
 * 공공기관 ERP 시스템의 기본 입력 필드 컴포넌트입니다.
 *
 * @example
 * // 기본 사용
 * <Input type="text" placeholder="이름을 입력하세요" />
 *
 * @example
 * // 오류 상태
 * <Input
 *   type="email"
 *   hasError={!!errors.email}
 *   aria-describedby="email-error"
 * />
 *
 * @example
 * // 비밀번호 필드
 * <Input type="password" autoComplete="current-password" />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, hasError, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    // 기본 스타일
                    'flex h-10 w-full rounded-md border bg-background px-3 py-2',
                    'text-sm placeholder:text-muted-foreground',
                    // 포커스 스타일
                    'focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-ring focus-visible:ring-offset-2',
                    // 비활성 스타일
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    // 오류 상태
                    hasError
                        ? 'border-error focus-visible:ring-error'
                        : 'border-input',
                    className
                )}
                ref={ref}
                aria-invalid={hasError}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

export { Input };

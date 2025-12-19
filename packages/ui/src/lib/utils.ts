/**
 * ============================================================================
 * 파일명: utils.ts
 * 패키지: @erp/ui
 * 경로: packages/ui/src/lib/utils.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * TailwindCSS 클래스 병합 유틸리티
 *
 * [📦 사용 예시]
 * ```typescript
 * cn('px-4 py-2', 'bg-primary', { 'text-white': isActive })
 * ```
 * ============================================================================
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * TailwindCSS 클래스 병합 함수
 *
 * @description
 * clsx로 조건부 클래스를 처리하고,
 * twMerge로 중복 Tailwind 클래스를 제거합니다.
 *
 * @param inputs - 병합할 클래스 목록
 * @returns 병합된 클래스 문자열
 *
 * @example
 * cn('px-4', 'py-2') // "px-4 py-2"
 * cn('px-4 px-2')    // "px-2" (마지막 것만 유지)
 * cn('px-4', { 'bg-primary': isActive })
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

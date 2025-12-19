/**
 * ============================================================================
 * 파일명: validate.ts
 * 패키지: @erp/shared
 * 경로: packages/shared/src/utils/validate.ts
 * 작성일: 2025-12-20
 * 작성자: ERP Frontend Team
 * ============================================================================
 * 
 * [📄 파일 설명]
 * Zod를 사용한 공통 유효성 검사 스키마 모음입니다.
 * React Hook Form 등에서 재사용할 수 있습니다.
 * 
 * [🎯 주요 기능]
 * 1. 이메일, 비밀번호 등 공통 필드 검증 규칙
 * 2. 로그인, 회원가입 관련 스키마
 * ============================================================================
 */

import { z } from 'zod';

/**
 * 공통 비밀번호 검증 규칙
 * - 최소 8자 이상
 * - 영문, 숫자, 특수문자 포함 권장 (현재는 길이만 체크)
 */
export const passwordRules = z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .max(100, '비밀번호가 너무 깁니다.');

/**
 * 공통 이메일 검증 규칙
 * 공공기관 도메인 제한 등이 필요할 경우 여기서 확장 가능
 */
export const emailRules = z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.');

/**
 * 로그인 폼 스키마
 */
export const loginSchema = z.object({
    email: emailRules,
    password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

// 타입 추론 export
export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * 사용자 등록/수정 스키마
 */
export const userSchema = z.object({
    email: emailRules,
    name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다.'),
    password: z.string().optional(), // 수정 시 선택
    role: z.enum(['SUPER_ADMIN', 'TENANT_ADMIN', 'MANAGER', 'USER']),
    status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING']),
    phoneNumber: z.string().optional(),
    departmentId: z.string().optional(),
});

export type UserFormData = z.infer<typeof userSchema>;

/**
 * 사업자등록번호 유효성 검사 (간이 알고리즘)
 * @param bn - 사업자번호 문자열 (하이픈 제거)
 */
export function isValidBusinessNumber(bn: string): boolean {
    const numberMap = bn.replace(/-/gi, '').split('').map(function (d) {
        return parseInt(d, 10);
    });

    if (numberMap.length === 10) {
        const keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5];
        let chk = 0;

        keyArr.forEach(function (d, i) {
            chk += d * numberMap[i]!;
        });

        chk += parseInt(String((keyArr[8]! * numberMap[8]!) / 10), 10);
        return Math.floor(numberMap[9]!) === ((10 - (chk % 10)) % 10);
    }

    return false;
}

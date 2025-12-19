/**
 * ============================================================================
 * 파일명: validate.ts
 * 패키지: @erp/shared
 * 경로: packages/erp-shared/src/utils/validate.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * Zod 스키마 기반 유효성 검사 함수
 * ============================================================================
 */

import { z } from 'zod';

/**
 * 이메일 스키마
 */
export const emailSchema = z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('유효한 이메일 주소를 입력해주세요.');

/**
 * 비밀번호 스키마 (2025년 공공기관 보안 규정)
 *
 * @description
 * - 최소 10자 이상
 * - 대문자 포함
 * - 소문자 포함
 * - 숫자 포함
 * - 특수문자 포함
 */
export const passwordSchema = z
    .string()
    .min(10, '비밀번호는 10자 이상이어야 합니다.')
    .regex(/[a-z]/, '소문자를 포함해야 합니다.')
    .regex(/[A-Z]/, '대문자를 포함해야 합니다.')
    .regex(/[0-9]/, '숫자를 포함해야 합니다.')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, '특수문자를 포함해야 합니다.');

/**
 * 전화번호 스키마
 */
export const phoneSchema = z
    .string()
    .regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '유효한 전화번호를 입력해주세요.');

/**
 * 로그인 폼 스키마
 */
export const loginFormSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

/**
 * 회원가입 폼 스키마
 */
export const signupFormSchema = z
    .object({
        email: emailSchema,
        name: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword'],
    });

export type SignupFormData = z.infer<typeof signupFormSchema>;

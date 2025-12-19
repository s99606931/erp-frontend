/**
 * ============================================================================
 * 파일명: page.tsx
 * 서비스: auth-web
 * 경로: services/auth/web/app/(auth)/login/page.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 사전 승인 이메일 기반 로그인 페이지입니다.
 *
 * [🔐 보안 사항]
 * - 사전 승인된 이메일만 로그인 가능 (회원가입 없음)
 * - 비밀번호 정책: 10자 이상, 대소문자+숫자+특수문자
 * - 소셜 로그인 연동 (네이버, 카카오, 구글)
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Button,
    Input,
    Label,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@erp/ui/components';
import { Loader2, Mail, Lock, AlertCircle } from 'lucide-react';

// 유효성 검사 스키마
const loginSchema = z.object({
    email: z
        .string()
        .min(1, '이메일을 입력해주세요.')
        .email('유효한 이메일 주소를 입력해주세요.'),
    password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setServerError('');

        try {
            // 1. 사전 승인 이메일 확인
            const checkResponse = await fetch('/api/auth/check-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: data.email }),
            });

            if (!checkResponse.ok) {
                throw new Error('승인되지 않은 이메일입니다. 관리자에게 문의하세요.');
            }

            // 2. 로그인 요청
            const loginResponse = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await loginResponse.json();

            if (!loginResponse.ok) {
                throw new Error(result.message || '로그인에 실패했습니다.');
            }

            // 3. 2FA 필요 시 2FA 페이지로 이동
            if (result.requiresTwoFactor) {
                window.location.href = `/2fa?token=${result.tempToken}`;
                return;
            }

            // 4. 로그인 성공 → 대시보드로 이동
            localStorage.setItem('access_token', result.accessToken);
            window.location.href = 'http://localhost:3000/';
        } catch (error) {
            setServerError(error instanceof Error ? error.message : '로그인에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
            <div className="w-full max-w-md">
                {/* 로고 */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                        <span className="text-3xl font-bold text-primary-foreground">ERP</span>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">공공기관 ERP</h1>
                    <p className="text-muted-foreground mt-2">업무 효율을 높이는 통합 관리 시스템</p>
                </div>

                <Card className="shadow-xl">
                    <CardHeader className="text-center">
                        <CardTitle>로그인</CardTitle>
                        <CardDescription>
                            사전 승인된 이메일로 로그인하세요
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            {/* 서버 오류 메시지 */}
                            {serverError && (
                                <div
                                    role="alert"
                                    aria-live="assertive"
                                    className="flex items-center gap-2 p-3 rounded-lg bg-error/10 text-error text-sm"
                                >
                                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                    {serverError}
                                </div>
                            )}

                            {/* 이메일 */}
                            <div className="space-y-2">
                                <Label htmlFor="email" required>이메일</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="example@gov.go.kr"
                                        className="pl-10"
                                        hasError={!!errors.email}
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                        autoComplete="email"
                                        {...register('email')}
                                    />
                                </div>
                                {errors.email && (
                                    <p id="email-error" className="text-sm text-error">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* 비밀번호 */}
                            <div className="space-y-2">
                                <Label htmlFor="password" required>비밀번호</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="비밀번호를 입력하세요"
                                        className="pl-10"
                                        hasError={!!errors.password}
                                        aria-describedby={errors.password ? 'password-error' : undefined}
                                        autoComplete="current-password"
                                        {...register('password')}
                                    />
                                </div>
                                {errors.password && (
                                    <p id="password-error" className="text-sm text-error">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </CardContent>

                        <CardFooter className="flex-col gap-4">
                            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        로그인 중...
                                    </>
                                ) : (
                                    '로그인'
                                )}
                            </Button>

                            {/* 구분선 */}
                            <div className="relative w-full">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground">소셜 로그인</span>
                                </div>
                            </div>

                            {/* 소셜 로그인 버튼 */}
                            <div className="grid grid-cols-3 gap-3 w-full">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    className="bg-[#03C75A] hover:bg-[#02B350] text-white border-0"
                                    aria-label="네이버로 로그인"
                                >
                                    <span className="font-bold text-lg">N</span>
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    className="bg-[#FEE500] hover:bg-[#FDD800] text-[#3C1E1E] border-0"
                                    aria-label="카카오로 로그인"
                                >
                                    <span className="font-bold text-lg">K</span>
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    className="bg-white hover:bg-gray-50 border"
                                    aria-label="구글로 로그인"
                                >
                                    <span className="font-bold text-lg text-[#4285F4]">G</span>
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>

                <p className="text-center text-sm text-muted-foreground mt-6">
                    © 2025 공공기관 ERP. All rights reserved.
                </p>
            </div>
        </div>
    );
}

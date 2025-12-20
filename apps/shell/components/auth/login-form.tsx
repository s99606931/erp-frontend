/**
 * ============================================================================
 * 파일명: login-form.tsx
 * 앱: shell
 * 경로: apps/shell/components/auth/login-form.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 로그인 폼 컴포넌트입니다.
 * React Hook Form + Zod로 유효성 검사를 수행합니다.
 *
 * [♿ 접근성]
 * - 모든 입력 필드에 label 연결
 * - 오류 메시지는 role="alert"로 스크린리더 알림
 * - Enter 키로 폼 제출 가능
 * ============================================================================
 */


'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { Button, Input, Label, Card, CardHeader, CardTitle, CardContent, CardFooter } from '@erp/ui/components';
import { Loader2, Mail, Lock, AlertCircle } from 'lucide-react';
import { loginSchema, type LoginFormData } from '@erp/shared';

export function LoginForm() {
    const [globalError, setGlobalError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: 'admin@test.com', // [DEV] auth.ts MOCK_USERS 참조
            password: 'password123', // [DEV] auth.ts MOCK_USERS 참조
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        setGlobalError('');
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                setGlobalError('이메일 또는 비밀번호가 올바르지 않습니다.');
            } else {
                // 로그인 성공 시 대시보드로 이동
                window.location.href = '/';
            }
        } catch {
            setGlobalError('로그인 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center">로그인</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    {/* 전역 오류 메시지 */}
                    {globalError && (
                        <div
                            role="alert"
                            aria-live="assertive"
                            className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm"
                        >
                            <AlertCircle className="h-4 w-4" />
                            {globalError}
                        </div>
                    )}

                    {/* 이메일 입력 */}
                    <div className="space-y-2">
                        <Label htmlFor="email">이메일</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@gov.go.kr"
                                className="pl-10"
                                autoComplete="email"
                                aria-invalid={!!errors.email}
                                {...register('email')}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-destructive">{errors.email.message}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            사전 승인된 이메일만 로그인 가능합니다
                        </p>
                    </div>

                    {/* 비밀번호 입력 */}
                    <div className="space-y-2">
                        <Label htmlFor="password">비밀번호</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="비밀번호"
                                className="pl-10"
                                autoComplete="current-password"
                                aria-invalid={!!errors.password}
                                {...register('password')}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-xs text-destructive">{errors.password.message}</p>
                        )}
                    </div>

                    {/* 비밀번호 찾기 */}
                    <div className="text-right">
                        <a
                            href="/forgot-password"
                            className="text-sm text-primary hover:underline"
                        >
                            비밀번호를 잊으셨나요?
                        </a>
                    </div>
                </CardContent>

                <CardFooter className="flex-col gap-4">
                    {/* 로그인 버튼 */}
                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isLoading}
                    >
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
                            <span className="bg-background px-2 text-muted-foreground">
                                또는
                            </span>
                        </div>
                    </div>

                    {/* 소셜 로그인 */}
                    <div className="grid grid-cols-3 gap-2 w-full">
                        <Button type="button" variant="outline" size="lg" aria-label="네이버로 로그인">
                            <span className="text-[#03C75A] font-bold">N</span>
                        </Button>
                        <Button type="button" variant="outline" size="lg" aria-label="카카오로 로그인">
                            <span className="text-[#FEE500] font-bold bg-[#3C1E1E] px-1 rounded">K</span>
                        </Button>
                        <Button type="button" variant="outline" size="lg" aria-label="구글로 로그인">
                            <span className="font-bold text-[#4285F4]">G</span>
                        </Button>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
}

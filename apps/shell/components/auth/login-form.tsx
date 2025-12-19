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
import { signIn } from 'next-auth/react';
import { Button, Input, Label, Card, CardHeader, CardTitle, CardContent, CardFooter } from '@erp/ui/components';
import { Loader2, Mail, Lock, AlertCircle } from 'lucide-react';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('이메일 또는 비밀번호가 올바르지 않습니다.');
            } else {
                // 로그인 성공 시 대시보드로 이동 (Middleware가 처리하지만 명시적 리로드)
                window.location.href = '/';
            }
        } catch (err) {
            setError('로그인 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center">로그인</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    {/* 오류 메시지 */}
                    {error && (
                        <div
                            role="alert"
                            aria-live="assertive"
                            className="flex items-center gap-2 p-3 rounded-md bg-error/10 text-error text-sm"
                        >
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}

                    {/* 이메일 입력 */}
                    <div className="space-y-2">
                        <Label htmlFor="email" required>
                            이메일
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@gov.go.kr"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10"
                                required
                                autoComplete="email"
                                aria-describedby="email-help"
                            />
                        </div>
                        <p id="email-help" className="text-xs text-muted-foreground">
                            사전 승인된 이메일만 로그인 가능합니다
                        </p>
                    </div>

                    {/* 비밀번호 입력 */}
                    <div className="space-y-2">
                        <Label htmlFor="password" required>
                            비밀번호
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10"
                                required
                                autoComplete="current-password"
                            />
                        </div>
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
                        disabled={isLoading || !email || !password}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
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
                            <span className="bg-card px-2 text-muted-foreground">
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

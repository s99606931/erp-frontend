/**
 * ============================================================================
 * 파일명: page.tsx
 * 서비스: auth-web
 * 경로: services/auth/web/app/(auth)/2fa/page.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 2단계 인증 (OTP) 페이지입니다.
 *
 * [🔐 2FA 흐름]
 * 1. 로그인 성공 후 2FA 활성화 사용자는 이 페이지로 이동
 * 2. 인증 앱(Google Authenticator)에서 6자리 코드 입력
 * 3. 코드 검증 성공 시 최종 로그인 완료
 * ============================================================================
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@erp/ui/components';
import { Shield, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@erp/ui';

export default function TwoFactorPage() {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // 첫 번째 입력창에 자동 포커스
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    // 입력 처리
    const handleChange = (index: number, value: string) => {
        // 숫자만 허용
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1); // 한 글자만
        setCode(newCode);

        // 다음 칸으로 이동
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // 6자리 모두 입력 시 자동 제출
        if (newCode.every((c) => c) && index === 5) {
            handleSubmit(newCode.join(''));
        }
    };

    // 백스페이스 처리
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // 붙여넣기 처리
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newCode = [...code];
        for (let i = 0; i < pastedData.length; i++) {
            newCode[i] = pastedData[i];
        }
        setCode(newCode);

        // 마지막 입력칸으로 포커스
        inputRefs.current[Math.min(pastedData.length, 5)]?.focus();

        // 6자리면 자동 제출
        if (pastedData.length === 6) {
            handleSubmit(pastedData);
        }
    };

    // 2FA 검증 제출
    const handleSubmit = async (otpCode: string) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/verify-2fa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: otpCode }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || '인증에 실패했습니다.');
            }

            // 로그인 성공
            localStorage.setItem('access_token', result.accessToken);
            window.location.href = 'http://localhost:3000/';
        } catch (err) {
            setError(err instanceof Error ? err.message : '인증에 실패했습니다.');
            setCode(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>2단계 인증</CardTitle>
                    <CardDescription>
                        인증 앱에 표시된 6자리 코드를 입력하세요
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* 오류 메시지 */}
                    {error && (
                        <div
                            role="alert"
                            aria-live="assertive"
                            className="flex items-center gap-2 p-3 rounded-lg bg-error/10 text-error text-sm"
                        >
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* OTP 입력 */}
                    <div className="flex justify-center gap-2" onPaste={handlePaste}>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className={cn(
                                    'w-12 h-14 text-center text-2xl font-bold rounded-lg border',
                                    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
                                    'transition-all duration-200',
                                    error ? 'border-error' : 'border-input'
                                )}
                                aria-label={`${index + 1}번째 숫자`}
                                disabled={isLoading}
                            />
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="flex-col gap-4">
                    <Button
                        onClick={() => handleSubmit(code.join(''))}
                        className="w-full"
                        size="lg"
                        disabled={isLoading || code.some((c) => !c)}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                확인 중...
                            </>
                        ) : (
                            '확인'
                        )}
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                        인증 앱이 없으신가요?{' '}
                        <a href="#" className="text-primary hover:underline">
                            다른 방법으로 인증하기
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

/**
 * ============================================================================
 * 파일명: service-loader.tsx
 * 앱: shell
 * 경로: apps/shell/components/features/service-loader.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 마이크로 프론트엔드 서비스를 로드하는 컴포넌트입니다.
 * iframe 방식으로 각 서비스를 독립적으로 로드합니다.
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface ServiceLoaderProps {
    /** 서비스 이름 */
    serviceName: string;
    /** 서비스 포트 */
    port: number;
    /** 서비스 경로 */
    path?: string;
}

/**
 * 마이크로서비스 포트 매핑
 */
export const SERVICE_PORTS = {
    auth: 3001,
    tenant: 3002,
    user: 3003,
    hrm: 3010,
    payroll: 3011,
    budget: 3012,
    attendance: 3013,
    accounting: 3014,
    asset: 3015,
    inventory: 3016,
    approval: 3017,
    vehicle: 3018,
    report: 3019,
} as const;

export function ServiceLoader({ serviceName, port, path = '' }: ServiceLoaderProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const serviceUrl = `http://localhost:${port}${path}`;

    return (
        <div className="relative w-full h-full">
            {/* 로딩 상태 */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                    <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                        <p className="mt-2 text-muted-foreground">
                            {serviceName} 서비스 로딩 중...
                        </p>
                    </div>
                </div>
            )}

            {/* 오류 상태 */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                    <div className="text-center">
                        <p className="text-error font-medium">서비스 연결 실패</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {serviceName} 서비스를 불러올 수 없습니다.
                        </p>
                        <button
                            onClick={() => {
                                setHasError(false);
                                setIsLoading(true);
                            }}
                            className="mt-4 text-sm text-primary hover:underline"
                        >
                            다시 시도
                        </button>
                    </div>
                </div>
            )}

            {/* 서비스 iframe */}
            <iframe
                src={serviceUrl}
                title={`${serviceName} 서비스`}
                className="w-full h-full border-0"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
        </div>
    );
}

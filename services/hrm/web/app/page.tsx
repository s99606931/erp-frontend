/**
 * ============================================================================
 * 파일명: page.tsx
 * 서비스: hrm-web (인사관리)
 * 경로: services/hrm/web/app/page.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 인사관리 메인 페이지 (대시보드)
 * ============================================================================
 */

import { Card, CardHeader, CardTitle, CardContent } from '@erp/ui/components';
import { Users, UserPlus, FileText, Building } from 'lucide-react';
import Link from 'next/link';

export default function HRMHomePage() {
    return (
        <div className="space-y-6">
            {/* 페이지 제목 */}
            <div>
                <h1 className="text-2xl font-bold">인사관리</h1>
                <p className="text-muted-foreground">직원 정보 및 조직 관리</p>
            </div>

            {/* 빠른 메뉴 */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <QuickMenu
                    href="/employees"
                    icon={<Users className="h-6 w-6" />}
                    title="사원관리"
                    description="사원 목록 및 정보 관리"
                />
                <QuickMenu
                    href="/employees/create"
                    icon={<UserPlus className="h-6 w-6" />}
                    title="사원등록"
                    description="신규 사원 등록"
                />
                <QuickMenu
                    href="/cards"
                    icon={<FileText className="h-6 w-6" />}
                    title="인사카드"
                    description="인사카드 조회/출력"
                />
                <QuickMenu
                    href="/organization"
                    icon={<Building className="h-6 w-6" />}
                    title="조직도"
                    description="조직 구조 관리"
                />
            </div>

            {/* 통계 */}
            <div className="grid gap-4 md:grid-cols-3">
                <StatCard title="총 직원" value="1,234" suffix="명" />
                <StatCard title="이번 달 입사" value="12" suffix="명" />
                <StatCard title="이번 달 퇴사" value="3" suffix="명" />
            </div>
        </div>
    );
}

function QuickMenu({
    href,
    icon,
    title,
    description,
}: {
    href: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <Link href={href}>
            <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            {icon}
                        </div>
                        <div>
                            <h3 className="font-medium">{title}</h3>
                            <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

function StatCard({
    title,
    value,
    suffix,
}: {
    title: string;
    value: string;
    suffix: string;
}) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">
                    {value}
                    <span className="text-lg font-normal text-muted-foreground ml-1">
                        {suffix}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

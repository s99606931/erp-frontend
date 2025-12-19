/**
 * ============================================================================
 * 파일명: page.tsx
 * 앱: shell
 * 경로: apps/shell/app/(dashboard)/page.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 대시보드 홈 페이지입니다.
 * 주요 통계와 최근 활동을 표시합니다.
 * ============================================================================
 */

import { Card, CardHeader, CardTitle, CardContent } from '@erp/ui/components';
import { Users, FileCheck, Wallet, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* 페이지 제목 */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">대시보드</h1>
                <p className="text-muted-foreground">공공기관 ERP 시스템에 오신 것을 환영합니다.</p>
            </div>

            {/* 통계 카드 */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="총 직원"
                    value="1,234"
                    change="+12%"
                    icon={<Users className="h-5 w-5" />}
                />
                <StatCard
                    title="결재 대기"
                    value="23"
                    change="-5%"
                    icon={<FileCheck className="h-5 w-5" />}
                />
                <StatCard
                    title="이번 달 급여"
                    value="₩2.3억"
                    change="+3%"
                    icon={<Wallet className="h-5 w-5" />}
                />
                <StatCard
                    title="예산 집행률"
                    value="67%"
                    change="+8%"
                    icon={<TrendingUp className="h-5 w-5" />}
                />
            </div>

            {/* 최근 활동 */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>최근 결재 문서</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            <ActivityItem title="출장 신청서" status="대기" time="10분 전" />
                            <ActivityItem title="휴가 신청서" status="승인" time="1시간 전" />
                            <ActivityItem title="지출 결의서" status="승인" time="3시간 전" />
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>공지사항</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            <NoticeItem title="2025년 연말정산 안내" date="12월 15일" />
                            <NoticeItem title="시스템 점검 안내" date="12월 10일" />
                            <NoticeItem title="복무규정 개정 안내" date="12월 5일" />
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// 통계 카드 컴포넌트
function StatCard({
    title,
    value,
    change,
    icon,
}: {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
}) {
    const isPositive = change.startsWith('+');

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {icon}
                    </div>
                    <span
                        className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-error'
                            }`}
                    >
                        {change}
                    </span>
                </div>
                <div className="mt-4">
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}

// 활동 아이템 컴포넌트
function ActivityItem({
    title,
    status,
    time,
}: {
    title: string;
    status: string;
    time: string;
}) {
    const statusColor = status === '승인' ? 'text-success' : 'text-warning';

    return (
        <li className="flex items-center justify-between">
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{time}</p>
            </div>
            <span className={`text-sm font-medium ${statusColor}`}>{status}</span>
        </li>
    );
}

// 공지 아이템 컴포넌트
function NoticeItem({ title, date }: { title: string; date: string }) {
    return (
        <li className="flex items-center justify-between">
            <p className="font-medium">{title}</p>
            <span className="text-sm text-muted-foreground">{date}</span>
        </li>
    );
}

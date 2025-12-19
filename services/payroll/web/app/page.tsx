/**
 * ============================================================================
 * 파일명: page.tsx
 * 서비스: payroll-web (급여관리)
 * 경로: services/payroll/web/app/page.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 급여관리 메인 페이지 (대시보드)
 * ============================================================================
 */

import { Card, CardHeader, CardTitle, CardContent } from '@erp/ui/components';
import { Wallet, Calculator, FileText, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function PayrollHomePage() {
    return (
        <div className="space-y-6">
            {/* 페이지 제목 */}
            <div>
                <h1 className="text-2xl font-bold">급여관리</h1>
                <p className="text-muted-foreground">급여 계산 및 명세서 관리</p>
            </div>

            {/* 빠른 메뉴 */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <QuickMenu
                    href="/calculate"
                    icon={<Calculator className="h-6 w-6" />}
                    title="급여계산"
                    description="월별 급여 계산"
                />
                <QuickMenu
                    href="/slips"
                    icon={<FileText className="h-6 w-6" />}
                    title="급여명세서"
                    description="명세서 조회/출력"
                />
                <QuickMenu
                    href="/tax"
                    icon={<Wallet className="h-6 w-6" />}
                    title="연말정산"
                    description="연말정산 자료 관리"
                />
                <QuickMenu
                    href="/history"
                    icon={<Calendar className="h-6 w-6" />}
                    title="지급내역"
                    description="급여 지급 이력"
                />
            </div>

            {/* 이번 달 급여 현황 */}
            <Card>
                <CardHeader>
                    <CardTitle>2025년 12월 급여 현황</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                        <StatItem label="총 지급액" value="₩234,567,890" />
                        <StatItem label="기본급" value="₩180,000,000" />
                        <StatItem label="수당" value="₩54,567,890" />
                        <StatItem label="공제액" value="₩45,678,901" />
                    </div>
                </CardContent>
            </Card>

            {/* 최근 급여 명세서 */}
            <Card>
                <CardHeader>
                    <CardTitle>최근 급여 명세서</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="px-4 py-3 text-left text-sm font-medium">사원명</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">부서</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium">기본급</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium">수당</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium">공제</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium">실지급액</th>
                                </tr>
                            </thead>
                            <tbody>
                                <PayrollRow name="홍길동" dept="인사팀" base={4500000} allowance={500000} deduction={450000} />
                                <PayrollRow name="김철수" dept="인사팀" base={3500000} allowance={300000} deduction={350000} />
                                <PayrollRow name="이영희" dept="재무팀" base={4000000} allowance={400000} deduction={400000} />
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
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

function StatItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="text-center p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-xl font-bold mt-1">{value}</p>
        </div>
    );
}

function PayrollRow({
    name,
    dept,
    base,
    allowance,
    deduction,
}: {
    name: string;
    dept: string;
    base: number;
    allowance: number;
    deduction: number;
}) {
    const net = base + allowance - deduction;
    const format = (n: number) => new Intl.NumberFormat('ko-KR').format(n);

    return (
        <tr className="border-b hover:bg-muted/30">
            <td className="px-4 py-3 font-medium">{name}</td>
            <td className="px-4 py-3">{dept}</td>
            <td className="px-4 py-3 text-right">₩{format(base)}</td>
            <td className="px-4 py-3 text-right text-success">₩{format(allowance)}</td>
            <td className="px-4 py-3 text-right text-error">₩{format(deduction)}</td>
            <td className="px-4 py-3 text-right font-bold">₩{format(net)}</td>
        </tr>
    );
}

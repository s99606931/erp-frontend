/**
 * ============================================================================
 * 파일명: page.tsx
 * 서비스: hrm-web (인사관리)
 * 경로: services/hrm/web/app/employees/[id]/page.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 사원 상세 정보 페이지 (인사카드)
 * ============================================================================
 */

import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@erp/ui/components';
import { ArrowLeft, Edit, Printer, Mail, Phone, Building, Calendar } from 'lucide-react';
import Link from 'next/link';

// 모의 데이터
const EMPLOYEE = {
    id: '1',
    name: '홍길동',
    department: '인사팀',
    position: '팀장',
    email: 'hong@gov.go.kr',
    phone: '010-1234-5678',
    hireDate: '2020-03-15',
    status: 'active',
    address: '서울시 종로구 세종대로 209',
    birthDate: '1985-05-20',
};

export default function EmployeeDetailPage({
    params: _params,
}: {
    params: { id: string };
}) {
    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/employees">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">{EMPLOYEE.name}</h1>
                        <p className="text-muted-foreground">
                            {EMPLOYEE.department} | {EMPLOYEE.position}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Printer className="h-4 w-4 mr-2" />
                        인쇄
                    </Button>
                    <Button>
                        <Edit className="h-4 w-4 mr-2" />
                        수정
                    </Button>
                </div>
            </div>

            {/* 기본 정보 */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>기본 정보</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <InfoRow icon={<Mail />} label="이메일" value={EMPLOYEE.email} />
                        <InfoRow icon={<Phone />} label="전화번호" value={EMPLOYEE.phone} />
                        <InfoRow icon={<Building />} label="주소" value={EMPLOYEE.address} />
                        <InfoRow icon={<Calendar />} label="생년월일" value={EMPLOYEE.birthDate} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>인사 정보</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <InfoRow icon={<Building />} label="부서" value={EMPLOYEE.department} />
                        <InfoRow icon={<Building />} label="직급" value={EMPLOYEE.position} />
                        <InfoRow icon={<Calendar />} label="입사일" value={EMPLOYEE.hireDate} />
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">상태</span>
                            <Badge variant="success">재직</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 경력/학력 탭 (placeholder) */}
            <Card>
                <CardHeader>
                    <CardTitle>경력 사항</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center py-8">
                        경력 정보가 없습니다.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

function InfoRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <div className="text-muted-foreground">{icon}</div>
            <div className="flex-1">
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
        </div>
    );
}

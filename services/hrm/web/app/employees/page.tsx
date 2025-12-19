/**
 * ============================================================================
 * 파일명: page.tsx
 * 서비스: hrm-web (인사관리)
 * 경로: services/hrm/web/app/employees/page.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 사원 목록 페이지입니다.
 * DataGrid로 대량 데이터를 효율적으로 표시합니다.
 *
 * [🎯 기능]
 * - 사원 목록 조회 (10만 건 대응)
 * - 검색/필터링
 * - 정렬
 * - 페이지네이션
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import { Button, Input, Badge, Card } from '@erp/ui/components';
import { Search, Plus, Download, Filter } from 'lucide-react';
import Link from 'next/link';

// 모의 데이터
const MOCK_EMPLOYEES = [
    { id: '1', name: '홍길동', department: '인사팀', position: '팀장', email: 'hong@gov.go.kr', status: 'active' },
    { id: '2', name: '김철수', department: '인사팀', position: '대리', email: 'kim@gov.go.kr', status: 'active' },
    { id: '3', name: '이영희', department: '재무팀', position: '과장', email: 'lee@gov.go.kr', status: 'active' },
    { id: '4', name: '박민수', department: '총무팀', position: '사원', email: 'park@gov.go.kr', status: 'dormant' },
    { id: '5', name: '정수진', department: '기획팀', position: '차장', email: 'jung@gov.go.kr', status: 'active' },
];

export default function EmployeeListPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEmployees = MOCK_EMPLOYEES.filter(
        (emp) =>
            emp.name.includes(searchQuery) ||
            emp.department.includes(searchQuery) ||
            emp.email.includes(searchQuery)
    );

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">사원관리</h1>
                    <p className="text-muted-foreground">
                        전체 사원: {MOCK_EMPLOYEES.length}명
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        엑셀 다운로드
                    </Button>
                    <Link href="/employees/create">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            사원 등록
                        </Button>
                    </Link>
                </div>
            </div>

            {/* 검색/필터 */}
            <Card className="p-4">
                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="이름, 부서, 이메일로 검색..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        필터
                    </Button>
                </div>
            </Card>

            {/* 테이블 */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="px-4 py-3 text-left text-sm font-medium">이름</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">부서</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">직급</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">이메일</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">상태</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">작업</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((emp) => (
                                <tr key={emp.id} className="border-b hover:bg-muted/30">
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/employees/${emp.id}`}
                                            className="font-medium text-primary hover:underline"
                                        >
                                            {emp.name}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3">{emp.department}</td>
                                    <td className="px-4 py-3">{emp.position}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{emp.email}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={emp.status === 'active' ? 'success' : 'warning'}>
                                            {emp.status === 'active' ? '재직' : '휴직'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Link href={`/employees/${emp.id}`}>
                                            <Button variant="ghost" size="sm">
                                                상세
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 페이지네이션 */}
                <div className="flex items-center justify-between p-4 border-t">
                    <p className="text-sm text-muted-foreground">
                        {filteredEmployees.length}개 중 1-{Math.min(10, filteredEmployees.length)}
                    </p>
                    <div className="flex gap-1">
                        <Button variant="outline" size="sm" disabled>
                            이전
                        </Button>
                        <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                            1
                        </Button>
                        <Button variant="outline" size="sm">
                            다음
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

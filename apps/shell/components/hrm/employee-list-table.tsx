'use client';

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@erp/ui';
import { Button, Badge } from '@erp/ui/components';
import { type Employee, EmploymentType, UserStatus } from '@erp/shared';
import { format } from 'date-fns';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface EmployeeListTableProps {
    employees: Employee[];
    isLoading?: boolean;
    onDelete?: (id: string) => void;
}

export function EmployeeListTable({ employees, isLoading, onDelete }: EmployeeListTableProps) {
    const [deleteId, setDeleteId] = useState<string | null>(null);

    if (isLoading) {
        return <div className="p-8 text-center">목록을 불러오는 중...</div>;
    }

    if (employees.length === 0) {
        return <div className="p-8 text-center text-muted-foreground">등록된 사원이 없습니다.</div>;
    }

    const handleConfirmDelete = () => {
        if (deleteId && onDelete) {
            onDelete(deleteId);
            setDeleteId(null);
        }
    };

    return (
        <div className="rounded-md border">
            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>이름</TableHead>
                            <TableHead>직급/직책</TableHead>
                            <TableHead>부서</TableHead>
                            <TableHead>고용형태</TableHead>
                            <TableHead>이메일</TableHead>
                            <TableHead>입사일</TableHead>
                            <TableHead>상태</TableHead>
                            <TableHead className="text-right">관리</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((emp) => (
                            <TableRow key={emp.id}>
                                <TableCell>
                                    <div className="font-medium">{emp.name}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">{emp.grade}</Badge>
                                        {emp.position && <span className="text-sm text-muted-foreground">{emp.position}</span>}
                                    </div>
                                </TableCell>
                                <TableCell>{emp.departmentName || '-'}</TableCell>
                                <TableCell>
                                    <EmploymentBadge type={emp.employmentType} />
                                </TableCell>
                                <TableCell>{emp.email}</TableCell>
                                <TableCell>
                                    {format(new Date(emp.joinDate), 'yyyy-MM-dd')}
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={emp.status} />
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" aria-label="수정" asChild>
                                            <Link href={`/hrm/employees/${emp.id}`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                aria-label="삭제"
                                                onClick={() => setDeleteId(emp.id)}
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </AlertDialogTrigger>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
                        <AlertDialogDescription>
                            이 작업은 되돌릴 수 없습니다. 사원 정보가 영구적으로 삭제됩니다.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>취소</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            삭제
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

function EmploymentBadge({ type }: { type: EmploymentType }) {
    switch (type) {
        case EmploymentType.REGULAR:
            return <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">정규직</Badge>;
        case EmploymentType.CONTRACT:
            return <Badge variant="outline" className="text-orange-600 border-orange-600">계약직</Badge>;
        case EmploymentType.INTERN:
            return <Badge variant="secondary">인턴</Badge>;
        case EmploymentType.DISPATCH:
            return <Badge variant="outline" className="text-gray-500">파견직</Badge>;
        default:
            return <Badge>{type}</Badge>;
    }
}

function StatusBadge({ status }: { status: UserStatus }) {
    switch (status) {
        case UserStatus.ACTIVE:
            return <Badge className="bg-green-500 hover:bg-green-600">재직</Badge>;
        case UserStatus.INACTIVE:
            return <Badge variant="secondary">휴직</Badge>; // 의미상 매핑
        case UserStatus.PENDING:
            return <Badge variant="outline" className="text-orange-500 border-orange-500">대기</Badge>;
        case UserStatus.SUSPENDED:
            return <Badge variant="error">퇴사</Badge>; // 의미상 매핑
        default:
            return <Badge>{status}</Badge>;
    }
}

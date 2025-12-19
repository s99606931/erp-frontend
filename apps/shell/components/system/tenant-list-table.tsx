'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@erp/ui';
import { Button, Badge } from '@erp/ui/components';
import { type Tenant } from '@erp/shared';
import { format } from 'date-fns';
import { Edit, Trash2 } from 'lucide-react';

interface TenantListTableProps {
    tenants: Tenant[];
    isLoading?: boolean;
}

export function TenantListTable({ tenants, isLoading }: TenantListTableProps) {
    if (isLoading) {
        return <div className="p-8 text-center">목록을 불러오는 중...</div>;
    }

    if (tenants.length === 0) {
        return <div className="p-8 text-center text-muted-foreground">등록된 기관이 없습니다.</div>;
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>기관명</TableHead>
                        <TableHead>코드</TableHead>
                        <TableHead>유형</TableHead>
                        <TableHead>도메인</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>생성일</TableHead>
                        <TableHead className="text-right">관리</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tenants.map((tenant) => (
                        <TableRow key={tenant.id}>
                            <TableCell className="font-medium">{tenant.name}</TableCell>
                            <TableCell>{tenant.code}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{tenant.type}</Badge>
                            </TableCell>
                            <TableCell>{tenant.domain || '-'}</TableCell>
                            <TableCell>
                                {tenant.isActive ? (
                                    <Badge className="bg-green-500 hover:bg-green-600">활성</Badge>
                                ) : (
                                    <Badge variant="secondary">비활성</Badge>
                                )}
                            </TableCell>
                            <TableCell>
                                {format(new Date(tenant.createdAt), 'yyyy-MM-dd')}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" aria-label="수정">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" aria-label="삭제">
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

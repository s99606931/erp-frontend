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
import { type Ledger, LedgerStatus, LedgerType } from '@erp/shared';
import { format } from 'date-fns';
import { FileText } from 'lucide-react';
import Link from 'next/link';

interface LedgerListTableProps {
    ledgers: Ledger[];
    isLoading?: boolean;
}

export function LedgerListTable({ ledgers, isLoading }: LedgerListTableProps) {
    if (isLoading) {
        return <div className="p-8 text-center">목록을 불러오는 중...</div>;
    }

    if (ledgers.length === 0) {
        return <div className="p-8 text-center text-muted-foreground">등록된 전표가 없습니다.</div>;
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>일자</TableHead>
                        <TableHead>전표번호</TableHead>
                        <TableHead>유형</TableHead>
                        <TableHead>적요</TableHead>
                        <TableHead className="text-right">금액</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead className="text-right">관리</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ledgers.map((ledger) => (
                        <TableRow key={ledger.id}>
                            <TableCell>
                                {format(new Date(ledger.transactionDate), 'yyyy-MM-dd')}
                            </TableCell>
                            <TableCell className="font-mono text-xs">{ledger.id}</TableCell>
                            <TableCell>
                                <TypeBadge type={ledger.type} />
                            </TableCell>
                            <TableCell className="max-w-[300px] truncate" title={ledger.description}>
                                {ledger.description}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                                {ledger.totalAmount.toLocaleString()}원
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={ledger.status} />
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/finance/ledgers/${ledger.id}`}>
                                        <FileText className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function TypeBadge({ type }: { type: LedgerType }) {
    switch (type) {
        case LedgerType.REVENUE:
            return <Badge variant="outline" className="text-blue-600 border-blue-600">입금</Badge>;
        case LedgerType.EXPENSE:
            return <Badge variant="outline" className="text-red-600 border-red-600">출금</Badge>;
        case LedgerType.TRANSFER:
            return <Badge variant="outline">대체</Badge>;
        default:
            return <Badge>{type}</Badge>;
    }
}

function StatusBadge({ status }: { status: LedgerStatus }) {
    switch (status) {
        case LedgerStatus.APPROVED:
            return <Badge className="bg-green-500 hover:bg-green-600">승인</Badge>;
        case LedgerStatus.PENDING:
            return <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">승인대기</Badge>;
        case LedgerStatus.DRAFT:
            return <Badge variant="outline" className="text-gray-500">작성중</Badge>;
            return <Badge variant="error">반려</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
}

'use client';

import { useEffect, useState } from 'react';
import { LedgerListTable } from '@/components/finance/ledger-list-table';
import { Button } from '@erp/ui/components';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import type { Ledger } from '@erp/shared';

export default function LedgerPage() {
    const [ledgers, setLedgers] = useState<Ledger[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchLedgers();
    }, []);

    const fetchLedgers = async () => {
        try {
            const res = await fetch('/api/finance/ledgers');
            if (res.ok) {
                const data = await res.json();
                setLedgers(data);
            }
        } catch (error) {
            console.error('Failed to fetch ledgers', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">전표 관리</h1>
                    <p className="text-muted-foreground">
                        회계 전표 조회 및 작성, 승인 요청을 관리합니다.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/finance/ledgers/new">
                        <Plus className="mr-2 h-4 w-4" />
                        전표 작성
                    </Link>
                </Button>
            </div>

            <LedgerListTable ledgers={ledgers} isLoading={isLoading} />
        </div>
    );
}

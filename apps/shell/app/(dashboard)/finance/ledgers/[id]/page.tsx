'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { LedgerForm } from '@/components/finance/ledger-form';
import type { Ledger } from '@erp/shared';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function LedgerEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [ledger, setLedger] = useState<Ledger | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLedger = async () => {
            try {
                const res = await fetch(`/api/finance/ledgers/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setLedger(data);
                } else {
                    alert('전표 정보를 불러오지 못했습니다.');
                    router.push('/finance/ledgers');
                }
            } catch (error) {
                console.error(error);
                alert('오류가 발생했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLedger();
    }, [id, router]);

    const handleSubmit = async (data: any) => {
        try {
            const res = await fetch(`/api/finance/ledgers/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push('/finance/ledgers');
                router.refresh();
            } else {
                alert('수정 실패');
            }
        } catch (error) {
            console.error(error);
            alert('오류가 발생했습니다.');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!ledger) return null;

    return (
        <div className="p-6 space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">전표 수정</h1>
                <p className="text-muted-foreground">전표 번호: {ledger.id}</p>
            </div>

            <div className="p-6 border rounded-lg bg-card">
                <LedgerForm
                    onSubmit={handleSubmit}
                    defaultValues={{
                        ...ledger,
                        transactionDate: format(new Date(ledger.transactionDate), 'yyyy-MM-dd'),
                    }}
                    isEditing
                />
            </div>
        </div>
    );
}

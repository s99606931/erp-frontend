'use client';

import { LedgerForm } from '@/components/finance/ledger-form';
import { useRouter } from 'next/navigation';

export default function LedgerCreatePage() {
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        try {
            const res = await fetch('/api/finance/ledgers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push('/finance/ledgers');
                router.refresh();
            } else {
                alert('전표 생성 실패');
            }
        } catch (error) {
            console.error('Failed to create ledger', error);
            alert('오류가 발생했습니다.');
        }
    };

    return (
        <div className="p-6 space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">전표 작성</h1>
                <p className="text-muted-foreground">
                    새로운 회계 전표를 작성합니다. 차변과 대변의 합계가 일치해야 저장할 수 있습니다.
                </p>
            </div>

            <div className="p-6 border rounded-lg bg-card">
                <LedgerForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

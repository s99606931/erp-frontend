
import { NextResponse } from 'next/server';
import { type Ledger, LedgerStatus } from '@erp/shared';
import { MOCK_LEDGERS } from '@/lib/mock/finance';

export async function GET() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json(MOCK_LEDGERS);
}

export async function POST(req: Request) {
    const body = await req.json();
    const newLedger: Ledger = {
        id: `l-${Date.now()}`,
        tenantId: 't-1',
        ...body,
        transactionDate: new Date(body.transactionDate),
        createdAt: new Date(),
        updatedAt: new Date(),
        status: LedgerStatus.DRAFT, // 기본값
    };
    MOCK_LEDGERS.push(newLedger);
    return NextResponse.json(newLedger, { status: 201 });
}

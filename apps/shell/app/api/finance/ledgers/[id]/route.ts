import { NextResponse } from 'next/server';
import { MOCK_LEDGERS } from '@/lib/mock/finance';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const ledger = MOCK_LEDGERS.find((l) => l.id === id);

    if (!ledger) {
        return new NextResponse('Ledger not found', { status: 404 });
    }

    return NextResponse.json(ledger);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const index = MOCK_LEDGERS.findIndex((l) => l.id === id);

    if (index === -1) {
        return new NextResponse('Ledger not found', { status: 404 });
    }

    MOCK_LEDGERS[index] = {
        ...MOCK_LEDGERS[index],
        ...body,
        transactionDate: new Date(body.transactionDate),
        updatedAt: new Date(),
    };

    return NextResponse.json(MOCK_LEDGERS[index]);
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const index = MOCK_LEDGERS.findIndex((l) => l.id === id);

    if (index === -1) {
        return new NextResponse('Ledger not found', { status: 404 });
    }

    MOCK_LEDGERS.splice(index, 1);
    return new NextResponse(null, { status: 204 });
}

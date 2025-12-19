
import { NextResponse } from 'next/server';
import { MOCK_EMPLOYEES } from '@/lib/mock/hrm';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const employee = MOCK_EMPLOYEES.find((emp) => emp.id === id);

    if (!employee) {
        return new NextResponse('Employee not found', { status: 404 });
    }

    return NextResponse.json(employee);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const index = MOCK_EMPLOYEES.findIndex((emp) => emp.id === id);

    if (index === -1) {
        return new NextResponse('Employee not found', { status: 404 });
    }

    MOCK_EMPLOYEES[index] = {
        ...MOCK_EMPLOYEES[index],
        ...body,
        joinDate: new Date(body.joinDate),
        updatedAt: new Date(),
    };

    return NextResponse.json(MOCK_EMPLOYEES[index]);
}

import { NextResponse } from 'next/server';
import { type Employee } from '@erp/shared';
import { MOCK_EMPLOYEES } from '@/lib/mock/hrm';

export async function GET() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json(MOCK_EMPLOYEES);
}

export async function POST(req: Request) {
    const body = await req.json();
    const newEmployee: Employee = {
        id: `emp-${Date.now()}`,
        tenantId: 't-1', // Mock Tenant ID
        ...body,
        joinDate: new Date(body.joinDate),
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    MOCK_EMPLOYEES.push(newEmployee);
    return NextResponse.json(newEmployee, { status: 201 });
}

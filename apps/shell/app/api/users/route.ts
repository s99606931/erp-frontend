
import { NextResponse } from 'next/server';
import { type User, UserRole, UserStatus } from '@erp/shared';

const MOCK_USERS: User[] = [
    {
        id: 'u-1',
        email: 'admin@gov.go.kr',
        name: '김공무',
        role: UserRole.SUPER_ADMIN,
        status: UserStatus.ACTIVE,
        departmentId: 'dept-1',
        phoneNumber: '010-1234-5678',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'u-2',
        email: 'manager@gov.go.kr',
        name: '이과장',
        role: UserRole.MANAGER,
        status: UserStatus.ACTIVE,
        departmentId: 'dept-1',
        phoneNumber: '010-2222-3333',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'u-3',
        email: 'user@gov.go.kr',
        name: '박주무',
        role: UserRole.USER,
        status: UserStatus.PENDING,
        departmentId: 'dept-2',
        phoneNumber: '010-4444-5555',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

// ... (GET code)

export async function POST(req: Request) {
    const body = await req.json();
    const newUser: User = {
        id: `u-${Date.now()}`,
        ...body,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    MOCK_USERS.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
}

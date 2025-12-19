
import { NextResponse } from 'next/server';
import { type Tenant, TenantType } from '@erp/shared';

const MOCK_TENANTS: Tenant[] = [
    {
        id: 't-1',
        name: '대한민국 정부',
        code: 'GOV',
        type: TenantType.PUBLIC,
        domain: 'gov.kr',
        theme: {
            primaryColor: '#0055aa',
            secondaryColor: '#ffffff',
            darkMode: false,
        },
        config: {
            maxUsers: 1000,
            features: ['HRM', 'FINANCE', 'PROJECT'],
        },
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 't-2',
        name: '서울시청',
        code: 'SEOUL',
        type: TenantType.PUBLIC,
        domain: 'seoul.go.kr',
        theme: {
            primaryColor: '#F58220', // Seoul Orange
            secondaryColor: '#ffffff',
            darkMode: false,
        },
        config: {
            maxUsers: 500,
            features: ['HRM'],
        },
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export async function GET() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json(MOCK_TENANTS);
}

export async function POST(req: Request) {
    const body = await req.json();
    const newTenant: Tenant = {
        id: `t-${Date.now()}`,
        ...body,
        theme: {
            primaryColor: '#000000',
            ...body.theme
        },
        config: {
            maxUsers: 100,
            ...body.config
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    MOCK_TENANTS.push(newTenant);
    return NextResponse.json(newTenant, { status: 201 });
}

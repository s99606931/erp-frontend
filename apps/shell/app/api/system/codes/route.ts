
import { NextResponse } from 'next/server';
import { type CommonCodeGroup, type CommonCode } from '@erp/shared';
import { MOCK_CODE_GROUPS, MOCK_CODES } from '@/lib/mock/common-codes';

// GET: 코드 그룹 또는 특정 그룹의 코드 목록 반환
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const groupCode = searchParams.get('groupCode');
    const type = searchParams.get('type'); // 'groups' or 'codes'

    await new Promise((resolve) => setTimeout(resolve, 300));

    if (type === 'groups') {
        return NextResponse.json(MOCK_CODE_GROUPS);
    }

    if (groupCode) {
        const codes = MOCK_CODES.filter(c => c.groupCode === groupCode);
        return NextResponse.json(codes);
    }

    // 기본: 모든 코드 반환
    return NextResponse.json(MOCK_CODES);
}

// POST: 새 코드 그룹 또는 코드 추가
export async function POST(req: Request) {
    const body = await req.json();
    const isGroup = body.isGroup;

    if (isGroup) {
        const newGroup: CommonCodeGroup = {
            id: `grp-${Date.now()}`,
            tenantId: 't-1',
            ...body,
            isActive: true,
            isSystem: false,
            sortOrder: MOCK_CODE_GROUPS.length + 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        MOCK_CODE_GROUPS.push(newGroup);
        return NextResponse.json(newGroup, { status: 201 });
    } else {
        const newCode: CommonCode = {
            id: `code-${Date.now()}`,
            tenantId: 't-1',
            ...body,
            isActive: true,
            sortOrder: MOCK_CODES.filter(c => c.groupCode === body.groupCode).length + 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        MOCK_CODES.push(newCode);
        return NextResponse.json(newCode, { status: 201 });
    }
}

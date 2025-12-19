
import { NextResponse } from 'next/server';
import { type Project, ProjectStatus } from '@erp/shared';
import { MOCK_PROJECTS } from '@/lib/mock/pms';

export async function GET() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json(MOCK_PROJECTS);
}

export async function POST(req: Request) {
    const body = await req.json();
    const newProject: Project = {
        id: `p-${Date.now()}`,
        tenantId: 't-1',
        ...body,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        createdAt: new Date(),
        updatedAt: new Date(),
        status: ProjectStatus.PLANNING, // 기본값
        progress: 0,
    };
    MOCK_PROJECTS.push(newProject);
    return NextResponse.json(newProject, { status: 201 });
}

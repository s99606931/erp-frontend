
import { NextResponse } from 'next/server';
import { MOCK_PROJECTS } from '@/lib/mock/pms';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const project = MOCK_PROJECTS.find((p) => p.id === id);

    if (!project) {
        return new NextResponse('Project not found', { status: 404 });
    }

    return NextResponse.json(project);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const index = MOCK_PROJECTS.findIndex((p) => p.id === id);

    if (index === -1) {
        return new NextResponse('Project not found', { status: 404 });
    }

    MOCK_PROJECTS[index] = {
        ...MOCK_PROJECTS[index],
        ...body,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        updatedAt: new Date(),
    };

    return NextResponse.json(MOCK_PROJECTS[index]);
}

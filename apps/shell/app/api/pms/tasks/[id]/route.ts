
import { NextResponse } from 'next/server';
import { MOCK_TASKS } from '@/lib/mock/tasks';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const task = MOCK_TASKS.find((t) => t.id === id);

    if (!task) {
        return new NextResponse('Task not found', { status: 404 });
    }

    return NextResponse.json(task);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const index = MOCK_TASKS.findIndex((t) => t.id === id);

    if (index === -1) {
        return new NextResponse('Task not found', { status: 404 });
    }

    MOCK_TASKS[index] = {
        ...MOCK_TASKS[index],
        ...body,
        dueDate: body.dueDate ? new Date(body.dueDate) : MOCK_TASKS[index]?.dueDate,
        updatedAt: new Date(),
    };

    return NextResponse.json(MOCK_TASKS[index]);
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const index = MOCK_TASKS.findIndex((t) => t.id === id);

    if (index === -1) {
        return new NextResponse('Task not found', { status: 404 });
    }

    MOCK_TASKS.splice(index, 1);
    return new NextResponse(null, { status: 204 });
}

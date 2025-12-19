
import { NextResponse } from 'next/server';
import { type Task, TaskStatus } from '@erp/shared';
import { MOCK_TASKS } from '@/lib/mock/tasks';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    await new Promise((resolve) => setTimeout(resolve, 300));

    let result = MOCK_TASKS;
    if (projectId) {
        result = MOCK_TASKS.filter(t => t.projectId === projectId);
    }

    return NextResponse.json(result);
}

export async function POST(req: Request) {
    const body = await req.json();
    const newTask: Task = {
        id: `task-${Date.now()}`,
        tenantId: 't-1',
        ...body,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: TaskStatus.TODO,
    };
    MOCK_TASKS.push(newTask);
    return NextResponse.json(newTask, { status: 201 });
}

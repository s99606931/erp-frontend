'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { TaskForm } from '@/components/pms/task-form';
import type { Task } from '@erp/shared';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function TaskEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [task, setTask] = useState<Task | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await fetch(`/api/pms/tasks/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setTask(data);
                } else {
                    alert('태스크 정보를 불러오지 못했습니다.');
                    router.push('/pms/tasks');
                }
            } catch (error) {
                console.error(error);
                alert('오류가 발생했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTask();
    }, [id, router]);

    const handleSubmit = async (data: any) => {
        try {
            const res = await fetch(`/api/pms/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push('/pms/tasks');
                router.refresh();
            } else {
                alert('수정 실패');
            }
        } catch (error) {
            console.error(error);
            alert('오류가 발생했습니다.');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!task) return null;

    return (
        <div className="p-6 space-y-6 max-w-2xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">태스크 수정</h1>
                <p className="text-muted-foreground">{task.title}</p>
            </div>

            <div className="p-6 border rounded-lg bg-card">
                <TaskForm
                    onSubmit={handleSubmit}
                    defaultValues={{
                        ...task,
                        dueDate: task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '',
                    }}
                    isEditing
                />
            </div>
        </div>
    );
}

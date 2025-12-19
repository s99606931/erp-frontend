'use client';

import { useEffect, useState } from 'react';
import { TaskListTable } from '@/components/pms/task-list-table';
import { Button } from '@erp/ui/components';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import type { Task } from '@erp/shared';

export default function TaskPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await fetch('/api/pms/tasks');
            if (res.ok) {
                const data = await res.json();
                setTasks(data);
            }
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('이 태스크를 삭제하시겠습니까?')) return;

        try {
            const res = await fetch(`/api/pms/tasks/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setTasks(tasks.filter(t => t.id !== id));
            } else {
                alert('삭제 실패');
            }
        } catch (error) {
            console.error('Failed to delete task', error);
            alert('오류가 발생했습니다.');
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">태스크 관리</h1>
                    <p className="text-muted-foreground">
                        프로젝트 내 개별 업무를 관리합니다.
                    </p>
                </div>
                <Link href="/pms/tasks/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        태스크 추가
                    </Button>
                </Link>
            </div>

            <TaskListTable tasks={tasks} isLoading={isLoading} onDelete={handleDelete} />
        </div>
    );
}

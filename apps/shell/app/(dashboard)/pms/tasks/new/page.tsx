'use client';

import { TaskForm } from '@/components/pms/task-form';
import { useRouter } from 'next/navigation';

export default function TaskCreatePage() {
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        try {
            const res = await fetch('/api/pms/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push('/pms/tasks');
                router.refresh();
            } else {
                alert('태스크 생성 실패');
            }
        } catch (error) {
            console.error('Failed to create task', error);
            alert('오류가 발생했습니다.');
        }
    };

    return (
        <div className="p-6 space-y-6 max-w-2xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">태스크 추가</h1>
                <p className="text-muted-foreground">
                    프로젝트에 새로운 업무를 추가합니다.
                </p>
            </div>

            <div className="p-6 border rounded-lg bg-card">
                <TaskForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

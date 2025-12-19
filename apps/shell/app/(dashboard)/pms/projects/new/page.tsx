'use client';

import { ProjectForm } from '@/components/pms/project-form';
import { useRouter } from 'next/navigation';

export default function ProjectCreatePage() {
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        try {
            const res = await fetch('/api/pms/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push('/pms/projects');
                router.refresh();
            } else {
                alert('프로젝트 생성 실패');
            }
        } catch (error) {
            console.error('Failed to create project', error);
            alert('오류가 발생했습니다.');
        }
    };

    return (
        <div className="p-6 space-y-6 max-w-3xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">프로젝트 생성</h1>
                <p className="text-muted-foreground">
                    새로운 프로젝트를 계획하고 등록합니다.
                </p>
            </div>

            <div className="p-6 border rounded-lg bg-card">
                <ProjectForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

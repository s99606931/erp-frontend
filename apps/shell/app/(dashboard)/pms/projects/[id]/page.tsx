'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectForm } from '@/components/pms/project-form';
import type { Project } from '@erp/shared';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function ProjectEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/pms/projects/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProject(data);
                } else {
                    alert('프로젝트 정보를 불러오지 못했습니다.');
                    router.push('/pms/projects');
                }
            } catch (error) {
                console.error(error);
                alert('오류가 발생했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [id, router]);

    const handleSubmit = async (data: any) => {
        try {
            const res = await fetch(`/api/pms/projects/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push('/pms/projects');
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

    if (!project) return null;

    return (
        <div className="p-6 space-y-6 max-w-3xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">프로젝트 수정</h1>
                <p className="text-muted-foreground">{project.name}</p>
            </div>

            <div className="p-6 border rounded-lg bg-card">
                <ProjectForm
                    onSubmit={handleSubmit}
                    defaultValues={{
                        ...project,
                        startDate: format(new Date(project.startDate), 'yyyy-MM-dd'),
                        endDate: format(new Date(project.endDate), 'yyyy-MM-dd'),
                    }}
                    isEditing
                />
            </div>
        </div>
    );
}

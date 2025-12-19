'use client';

import { useEffect, useState } from 'react';
import { ProjectListTable } from '@/components/pms/project-list-table';
import { ProjectKanbanBoard } from '@/components/pms/project-kanban-board';
import { Button } from '@erp/ui/components';
import { Plus, LayoutGrid, List as ListIcon } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@erp/shared';

export default function ProjectPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/pms/projects');
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (error) {
            console.error('Failed to fetch projects', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">프로젝트 관리</h1>
                    <p className="text-muted-foreground">
                        전체 프로젝트 진행 현황을 조회하고 관리합니다.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="border rounded-md p-1 flex items-center bg-muted/50">
                        <Button
                            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setViewMode('list')}
                            title="리스트 뷰"
                        >
                            <ListIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === 'kanban' ? 'secondary' : 'ghost'}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setViewMode('kanban')}
                            title="칸반 보드"
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                    </div>
                    <Link href="/pms/projects/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            프로젝트 생성
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                {viewMode === 'list' ? (
                    <ProjectListTable projects={projects} isLoading={isLoading} />
                ) : (
                    <ProjectKanbanBoard projects={projects} isLoading={isLoading} />
                )}
            </div>
        </div>
    );
}

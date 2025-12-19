'use client';

import { cn } from '@erp/ui';
import { Badge } from '@erp/ui/components';
import type { Project } from '@erp/shared';
import Link from 'next/link';

interface ProjectSummaryProps {
    projects: Project[];
    className?: string;
}

export function ProjectSummary({ projects, className }: ProjectSummaryProps) {
    const activeProjects = projects.filter(p => p.status === 'ACTIVE');
    const planningProjects = projects.filter(p => p.status === 'PLANNING');

    return (
        <div className={cn("p-6 rounded-lg border bg-card shadow-sm", className)}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">진행 중인 프로젝트</h3>
                <Link href="/pms/projects" className="text-sm text-primary hover:underline">
                    전체 보기
                </Link>
            </div>

            {activeProjects.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                    진행 중인 프로젝트가 없습니다.
                </p>
            ) : (
                <div className="space-y-3">
                    {activeProjects.slice(0, 5).map((project) => (
                        <Link key={project.id} href={`/pms/projects/${project.id}`}>
                            <div className="p-3 rounded-md border hover:bg-muted/50 transition-colors cursor-pointer">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{project.name}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            PM: {project.managerName || '미지정'}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-sm font-medium">{project.progress}%</span>
                                        <div className="h-1.5 w-16 bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all"
                                                style={{ width: `${project.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm">
                <span className="text-muted-foreground">계획 중</span>
                <Badge variant="outline">{planningProjects.length}개</Badge>
            </div>
        </div>
    );
}

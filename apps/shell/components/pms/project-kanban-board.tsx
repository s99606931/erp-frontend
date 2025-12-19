'use client';

import { type Project, ProjectStatus, ProjectPriority } from '@erp/shared';
import { Badge } from '@erp/ui/components';
import { format } from 'date-fns';
import Link from 'next/link';

interface ProjectKanbanBoardProps {
    projects: Project[];
    isLoading?: boolean;
}

const COLUMNS = [
    { id: ProjectStatus.PLANNING, title: '계획 (Planning)' },
    { id: ProjectStatus.ACTIVE, title: '진행중 (Active)' },
    { id: ProjectStatus.COMPLETED, title: '완료 (Completed)' },
    { id: ProjectStatus.ON_HOLD, title: '보류 (On Hold)' },
];

export function ProjectKanbanBoard({ projects, isLoading }: ProjectKanbanBoardProps) {
    if (isLoading) {
        return <div className="p-8 text-center">보드를 불러오는 중...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full min-h-[500px]">
            {COLUMNS.map((column) => {
                const columnProjects = projects.filter(p => p.status === column.id);

                return (
                    <div key={column.id} className="flex flex-col gap-3 p-3 bg-muted/30 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-sm text-muted-foreground">{column.title}</h3>
                            <Badge variant="secondary" className="text-xs">{columnProjects.length}</Badge>
                        </div>

                        <div className="flex flex-col gap-3">
                            {columnProjects.map(project => (
                                <Link key={project.id} href={`/pms/projects/${project.id}`}>
                                    <div className="p-3 bg-card border rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer space-y-3">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-medium text-sm line-clamp-2">{project.name}</h4>
                                            <PriorityDot priority={project.priority} />
                                        </div>

                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {project.description || '설명 없음'}
                                        </p>

                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>{project.managerName}</span>
                                            <span>{format(new Date(project.endDate), 'MM.dd')} 마감</span>
                                        </div>

                                        <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                                            <div
                                                className="bg-primary h-full"
                                                style={{ width: `${project.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function PriorityDot({ priority }: { priority: ProjectPriority }) {
    let colorClass = "bg-gray-300";
    if (priority === ProjectPriority.URGENT) colorClass = "bg-red-600 animate-pulse";
    else if (priority === ProjectPriority.HIGH) colorClass = "bg-orange-500";
    else if (priority === ProjectPriority.MEDIUM) colorClass = "bg-yellow-500";
    else if (priority === ProjectPriority.LOW) colorClass = "bg-green-500";

    return (
        <div className={`w-2 h-2 rounded-full ${colorClass}`} title={`우선순위: ${priority}`} />
    );
}

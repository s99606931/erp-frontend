'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@erp/ui';
import { Button, Badge } from '@erp/ui/components';
import { type Project, ProjectStatus, ProjectPriority } from '@erp/shared';
import { format } from 'date-fns';
import { Edit } from 'lucide-react';
import Link from 'next/link';

interface ProjectListTableProps {
    projects: Project[];
    isLoading?: boolean;
}

export function ProjectListTable({ projects, isLoading }: ProjectListTableProps) {
    if (isLoading) {
        return <div className="p-8 text-center">목록을 불러오는 중...</div>;
    }

    if (projects.length === 0) {
        return <div className="p-8 text-center text-muted-foreground">등록된 프로젝트가 없습니다.</div>;
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>프로젝트명</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>중요도</TableHead>
                        <TableHead>PM</TableHead>
                        <TableHead>기간</TableHead>
                        <TableHead className="text-right">진행률</TableHead>
                        <TableHead className="text-right">관리</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell className="font-medium">{project.name}</TableCell>
                            <TableCell>
                                <StatusBadge status={project.status} />
                            </TableCell>
                            <TableCell>
                                <PriorityBadge priority={project.priority} />
                            </TableCell>
                            <TableCell>{project.managerName || '-'}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                {format(new Date(project.startDate), 'yyyy-MM-dd')} ~ {format(new Date(project.endDate), 'yyyy-MM-dd')}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <span className="text-xs text-muted-foreground">{project.progress}%</span>
                                    <div className="h-2 w-16 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary"
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/pms/projects/${project.id}`}>
                                        <Edit className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
    switch (status) {
        case ProjectStatus.PLANNING:
            return <Badge variant="outline" className="text-blue-500 border-blue-500">계획</Badge>;
        case ProjectStatus.ACTIVE:
            return <Badge className="bg-green-500 hover:bg-green-600">진행중</Badge>;
        case ProjectStatus.COMPLETED:
            return <Badge variant="secondary">완료</Badge>;
        case ProjectStatus.ON_HOLD:
            return <Badge variant="outline" className="text-orange-500 border-orange-500">보류</Badge>;
        case ProjectStatus.CANCELLED:
            return <Badge variant="error">취소</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
}

function PriorityBadge({ priority }: { priority: ProjectPriority }) {
    switch (priority) {
        case ProjectPriority.URGENT:
            return <Badge variant="error" className="animate-pulse">긴급</Badge>;
        case ProjectPriority.HIGH:
            return <Badge variant="outline" className="text-red-600 border-red-600 font-bold">높음</Badge>;
        case ProjectPriority.MEDIUM:
            return <Badge variant="outline" className="text-yellow-600 border-yellow-600">중간</Badge>;
        case ProjectPriority.LOW:
            return <Badge variant="outline" className="text-gray-500">낮음</Badge>;
        default:
            return <Badge>{priority}</Badge>;
    }
}

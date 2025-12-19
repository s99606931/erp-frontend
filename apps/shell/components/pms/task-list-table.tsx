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
import { type Task, TaskStatus, ProjectPriority } from '@erp/shared';
import { format } from 'date-fns';
import { Edit, Trash2, Clock } from 'lucide-react';
import Link from 'next/link';

interface TaskListTableProps {
    tasks: Task[];
    isLoading?: boolean;
    onDelete?: (id: string) => void;
}

export function TaskListTable({ tasks, isLoading, onDelete }: TaskListTableProps) {
    if (isLoading) {
        return <div className="p-8 text-center">태스크를 불러오는 중...</div>;
    }

    if (tasks.length === 0) {
        return <div className="p-8 text-center text-muted-foreground">등록된 태스크가 없습니다.</div>;
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>태스크</TableHead>
                        <TableHead>프로젝트</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>중요도</TableHead>
                        <TableHead>담당자</TableHead>
                        <TableHead>마감일</TableHead>
                        <TableHead className="text-right">작업시간</TableHead>
                        <TableHead className="text-right">관리</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell className="font-medium max-w-[200px] truncate" title={task.title}>
                                {task.title}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                {task.projectName || '-'}
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={task.status} />
                            </TableCell>
                            <TableCell>
                                <PriorityBadge priority={task.priority} />
                            </TableCell>
                            <TableCell>{task.assigneeName || '-'}</TableCell>
                            <TableCell className="text-sm">
                                {task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '-'}
                            </TableCell>
                            <TableCell className="text-right text-sm">
                                {task.actualHours !== undefined ? (
                                    <span className="flex items-center justify-end gap-1">
                                        <Clock className="h-3 w-3" />
                                        {task.actualHours}h / {task.estimatedHours || '?'}h
                                    </span>
                                ) : (
                                    task.estimatedHours ? `${task.estimatedHours}h` : '-'
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                    <Button variant="ghost" size="icon" asChild>
                                        <Link href={`/pms/tasks/${task.id}`}>
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    {onDelete && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onDelete(task.id)}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function StatusBadge({ status }: { status: TaskStatus }) {
    switch (status) {
        case TaskStatus.TODO:
            return <Badge variant="outline" className="text-gray-500">할 일</Badge>;
        case TaskStatus.IN_PROGRESS:
            return <Badge className="bg-blue-500 hover:bg-blue-600">진행 중</Badge>;
        case TaskStatus.IN_REVIEW:
            return <Badge className="bg-purple-500 hover:bg-purple-600">검토 중</Badge>;
        case TaskStatus.DONE:
            return <Badge className="bg-green-500 hover:bg-green-600">완료</Badge>;
        case TaskStatus.BLOCKED:
            return <Badge variant="error">블로킹</Badge>;
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

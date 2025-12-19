'use client';

import { useForm, Controller } from 'react-hook-form';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Calendar,
} from '@erp/ui';
import { Button, Input, Label } from '@erp/ui/components';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@erp/ui';
import { TaskStatus, ProjectPriority } from '@erp/shared';
import { useState } from 'react';

// Form에서 사용할 타입 정의
interface TaskFormData {
    title: string;
    description: string;
    projectId: string;
    status: TaskStatus;
    priority: ProjectPriority;
    assigneeName: string;
    dueDate: string;
    estimatedHours: number;
}

interface TaskFormProps {
    defaultValues?: Partial<TaskFormData>;
    isEditing?: boolean;
    onSubmit: (data: any) => Promise<void>;
}

export function TaskForm({ defaultValues, isEditing = false, onSubmit }: TaskFormProps) {
    const [submitting, setSubmitting] = useState(false);

    const { register, control, handleSubmit } = useForm<TaskFormData>({
        defaultValues: {
            title: '',
            description: '',
            projectId: '',
            status: TaskStatus.TODO,
            priority: ProjectPriority.MEDIUM,
            assigneeName: '',
            dueDate: '',
            estimatedHours: 0,
            ...defaultValues,
        },
    });

    const handleFormSubmit = async (data: TaskFormData) => {
        setSubmitting(true);
        try {
            await onSubmit(data);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 태스크명 */}
                <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="title">태스크명 <span className="text-destructive">*</span></Label>
                    <Input
                        id="title"
                        placeholder="태스크 제목을 입력하세요"
                        {...register('title', { required: true })}
                    />
                </div>

                {/* 프로젝트 선택 */}
                <div className="space-y-2">
                    <Label>프로젝트 <span className="text-destructive">*</span></Label>
                    <Controller
                        control={control}
                        name="projectId"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="프로젝트 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="p-1">ERP 시스템 고도화</SelectItem>
                                    <SelectItem value="p-2">신규 마케팅 캠페인</SelectItem>
                                    <SelectItem value="p-3">글로벌 시장 조사</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                {/* 담당자 */}
                <div className="space-y-2">
                    <Label htmlFor="assigneeName">담당자</Label>
                    <Input
                        id="assigneeName"
                        placeholder="담당자 이름"
                        {...register('assigneeName')}
                    />
                </div>

                {/* 상태 */}
                <div className="space-y-2">
                    <Label>상태 <span className="text-destructive">*</span></Label>
                    <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="상태 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TODO">할 일</SelectItem>
                                    <SelectItem value="IN_PROGRESS">진행 중</SelectItem>
                                    <SelectItem value="IN_REVIEW">검토 중</SelectItem>
                                    <SelectItem value="DONE">완료</SelectItem>
                                    <SelectItem value="BLOCKED">블로킹</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                {/* 중요도 */}
                <div className="space-y-2">
                    <Label>중요도 <span className="text-destructive">*</span></Label>
                    <Controller
                        control={control}
                        name="priority"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="중요도 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="LOW">낮음</SelectItem>
                                    <SelectItem value="MEDIUM">중간</SelectItem>
                                    <SelectItem value="HIGH">높음</SelectItem>
                                    <SelectItem value="URGENT">긴급</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                {/* 마감일 */}
                <div className="space-y-2 flex flex-col">
                    <Label>마감일</Label>
                    <Controller
                        control={control}
                        name="dueDate"
                        render={({ field }) => (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value ? (
                                            format(new Date(field.value), "PPP", { locale: ko })
                                        ) : (
                                            <span>마감일 선택</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value ? new Date(field.value) : undefined}
                                        onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                </div>

                {/* 예상 소요시간 */}
                <div className="space-y-2">
                    <Label htmlFor="estimatedHours">예상 소요시간 (시간)</Label>
                    <Input
                        id="estimatedHours"
                        type="number"
                        min="0"
                        placeholder="0"
                        {...register('estimatedHours')}
                    />
                </div>

                {/* 설명 */}
                <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="description">설명</Label>
                    <textarea
                        id="description"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="태스크 상세 설명"
                        {...register('description')}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                    취소
                </Button>
                <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEditing ? '수정 저장' : '태스크 추가'}
                </Button>
            </div>
        </form>
    );
}

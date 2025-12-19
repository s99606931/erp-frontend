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
import { Button, Input, Label } from '@erp/ui/components'; // Textarea might need to be added or used from Input
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@erp/ui';
import { ProjectStatus, ProjectPriority } from '@erp/shared';
import { useState } from 'react';

// Textarea 컴포넌트가 @erp/ui에 없으므로 임시 단순 구현 (또는 Input 사용)
function SimpleTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...props}
        />
    );
}

interface ProjectFormData {
    name: string;
    description: string;
    status: ProjectStatus;
    priority: ProjectPriority;
    startDate: string;
    endDate: string;
    managerName: string;
    budget: number;
    progress: number;
}

interface ProjectFormProps {
    defaultValues?: Partial<ProjectFormData>;
    isEditing?: boolean;
    onSubmit: (data: any) => Promise<void>;
}

export function ProjectForm({ defaultValues, isEditing = false, onSubmit }: ProjectFormProps) {
    const [submitting, setSubmitting] = useState(false);

    const { register, control, handleSubmit } = useForm<ProjectFormData>({
        defaultValues: {
            name: '',
            description: '',
            status: ProjectStatus.PLANNING,
            priority: ProjectPriority.MEDIUM,
            startDate: format(new Date(), 'yyyy-MM-dd'),
            endDate: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
            managerName: '',
            budget: 0,
            progress: 0,
            ...defaultValues,
        },
    });

    const handleFormSubmit = async (data: ProjectFormData) => {
        setSubmitting(true);
        try {
            await onSubmit(data);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 프로젝트명 */}
                <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="name">프로젝트명 <span className="text-destructive">*</span></Label>
                    <Input
                        id="name"
                        placeholder="프로젝트 이름을 입력하세요"
                        {...register('name', { required: true })}
                    />
                </div>

                {/* 기간 (Start ~ End) */}
                <div className="space-y-2 flex flex-col">
                    <Label>시작일 <span className="text-destructive">*</span></Label>
                    <Controller
                        control={control}
                        name="startDate"
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
                                            <span>날짜를 선택하세요</span>
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

                <div className="space-y-2 flex flex-col">
                    <Label>종료일 <span className="text-destructive">*</span></Label>
                    <Controller
                        control={control}
                        name="endDate"
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
                                            <span>날짜를 선택하세요</span>
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
                                    <SelectItem value="PLANNING">계획 (Planning)</SelectItem>
                                    <SelectItem value="ACTIVE">진행중 (Active)</SelectItem>
                                    <SelectItem value="COMPLETED">완료 (Completed)</SelectItem>
                                    <SelectItem value="ON_HOLD">보류 (On Hold)</SelectItem>
                                    <SelectItem value="CANCELLED">취소 (Cancelled)</SelectItem>
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

                {/* PM 이름 */}
                <div className="space-y-2">
                    <Label htmlFor="managerName">담당자(PM)</Label>
                    <Input
                        id="managerName"
                        placeholder="이름 입력"
                        {...register('managerName')}
                    />
                </div>

                {/* 예산 */}
                <div className="space-y-2">
                    <Label htmlFor="budget">예산 (원)</Label>
                    <Input
                        id="budget"
                        type="number"
                        placeholder="0"
                        {...register('budget')}
                    />
                </div>

                {/* 진행률 */}
                <div className="space-y-2">
                    <Label htmlFor="progress">진행률 (%)</Label>
                    <Input
                        id="progress"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0"
                        {...register('progress')}
                    />
                </div>

                {/* 설명 */}
                <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="description">설명</Label>
                    <SimpleTextarea
                        id="description"
                        placeholder="프로젝트 상세 설명"
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
                    {isEditing ? '수정 저장' : '프로젝트 생성'}
                </Button>
            </div>
        </form>
    );
}

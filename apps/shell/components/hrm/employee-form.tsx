'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema, type EmployeeFormData } from '@erp/shared';
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

interface EmployeeFormProps {
    onSubmit: (data: EmployeeFormData) => Promise<void>;
    defaultValues?: Partial<EmployeeFormData>;
    isEditing?: boolean;
}

export function EmployeeForm({
    onSubmit,
    defaultValues,
    isEditing = false,
}: EmployeeFormProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            name: '',
            email: '',
            phoneNumber: '',
            departmentId: '',
            position: '',
            grade: 'L1',
            employmentType: 'REGULAR',
            joinDate: format(new Date(), 'yyyy-MM-dd'),
            status: 'ACTIVE',
            ...defaultValues,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 이름 */}
                <div className="space-y-2">
                    <Label htmlFor="name">이름 <span className="text-destructive">*</span></Label>
                    <Input
                        id="name"
                        placeholder="홍길동"
                        {...register('name')}
                        className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && (
                        <p className="text-xs text-destructive">{errors.name.message as string}</p>
                    )}
                </div>

                {/* 이메일 */}
                <div className="space-y-2">
                    <Label htmlFor="email">이메일 <span className="text-destructive">*</span></Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="hong@gov.kr"
                        {...register('email')}
                        className={errors.email ? 'border-destructive' : ''}
                        disabled={isEditing}
                    />
                    {errors.email && (
                        <p className="text-xs text-destructive">{errors.email.message as string}</p>
                    )}
                </div>

                {/* 연락처 */}
                <div className="space-y-2">
                    <Label htmlFor="phoneNumber">연락처</Label>
                    <Input
                        id="phoneNumber"
                        placeholder="010-1234-5678"
                        {...register('phoneNumber')}
                    />
                </div>

                {/* 부서 (Mock) */}
                <div className="space-y-2">
                    <Label htmlFor="departmentId">부서</Label>
                    <Controller
                        control={control}
                        name="departmentId"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="부서 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dept-1">인사팀</SelectItem>
                                    <SelectItem value="dept-2">개발팀</SelectItem>
                                    <SelectItem value="dept-3">마케팅팀</SelectItem>
                                    <SelectItem value="dept-4">재무팀</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                {/* 입사일 */}
                <div className="space-y-2 flex flex-col">
                    <Label>입사일 <span className="text-destructive">*</span></Label>
                    <Controller
                        control={control}
                        name="joinDate"
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
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                    {errors.joinDate && (
                        <p className="text-xs text-destructive">{errors.joinDate.message as string}</p>
                    )}
                </div>

                {/* 직급 */}
                <div className="space-y-2">
                    <Label htmlFor="grade">직급 <span className="text-destructive">*</span></Label>
                    <Controller
                        control={control}
                        name="grade"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="직급 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="L1">사원 (L1)</SelectItem>
                                    <SelectItem value="L2">대리 (L2)</SelectItem>
                                    <SelectItem value="L3">과장 (L3)</SelectItem>
                                    <SelectItem value="L4">차장 (L4)</SelectItem>
                                    <SelectItem value="L5">부장 (L5)</SelectItem>
                                    <SelectItem value="EX">임원 (EX)</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                {/* 고용형태 */}
                <div className="space-y-2">
                    <Label htmlFor="employmentType">고용형태 <span className="text-destructive">*</span></Label>
                    <Controller
                        control={control}
                        name="employmentType"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="고용형태 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="REGULAR">정규직</SelectItem>
                                    <SelectItem value="CONTRACT">계약직</SelectItem>
                                    <SelectItem value="INTERN">인턴</SelectItem>
                                    <SelectItem value="DISPATCH">파견직</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                {/* 직책 (Optional) */}
                <div className="space-y-2">
                    <Label htmlFor="position">직책</Label>
                    <Input
                        id="position"
                        placeholder="예: 팀장, 본부장"
                        {...register('position')}
                    />
                </div>

                {/* 상태 */}
                <div className="space-y-2">
                    <Label htmlFor="status">상태 <span className="text-destructive">*</span></Label>
                    <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="상태 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ACTIVE">재직</SelectItem>
                                    <SelectItem value="INACTIVE">휴직</SelectItem>
                                    <SelectItem value="PENDING">대기</SelectItem>
                                    <SelectItem value="SUSPENDED">퇴사</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                    취소
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEditing ? '수정 저장' : '사원 등록'}
                </Button>
            </div>
        </form>
    );
}

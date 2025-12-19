'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tenantSchema, type TenantFormData } from '@erp/shared';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@erp/ui';
import { Button, Input, Label } from '@erp/ui/components';
import { Loader2 } from 'lucide-react';

interface TenantFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: TenantFormData) => Promise<void>;
    defaultValues?: Partial<TenantFormData>;
    isEditing?: boolean;
}

export function TenantFormModal({
    open,
    onOpenChange,
    onSubmit,
    defaultValues,
    isEditing = false,
}: TenantFormModalProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(tenantSchema),
        defaultValues: {
            name: '',
            code: '',
            type: 'PUBLIC',
            domain: '',
            isActive: true,
            ...defaultValues,
        },
    });

    const handleFormSubmit = async (data: TenantFormData) => {
        await onSubmit(data);
        reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? '기관 정보 수정' : '새 기관 등록'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="grid gap-4 py-4">
                        {/* 기관명 */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                기관명
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="name"
                                    placeholder="예: 서울시청"
                                    {...register('name')}
                                    className={errors.name ? 'border-destructive' : ''}
                                />
                                {errors.name && (
                                    <p className="text-xs text-destructive mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* 기관 코드 */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="code" className="text-right">
                                식별 코드
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="code"
                                    placeholder="예: SEOUL"
                                    {...register('code')}
                                    disabled={isEditing}
                                    className={errors.code ? 'border-destructive' : ''}
                                />
                                {errors.code && (
                                    <p className="text-xs text-destructive mt-1">
                                        {errors.code.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* 유형 */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                유형
                            </Label>
                            <div className="col-span-3">
                                <Controller
                                    control={control}
                                    name="type"
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="유형 선택" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="PUBLIC">공공기관</SelectItem>
                                                <SelectItem value="PRIVATE">민간기업</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        {/* 도메인 */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="domain" className="text-right">
                                도메인
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="domain"
                                    placeholder="seoul.go.kr (선택)"
                                    {...register('domain')}
                                />
                            </div>
                        </div>

                        {/* 상태 */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="isActive" className="text-right">
                                상태
                            </Label>
                            <div className="col-span-3">
                                <Controller
                                    control={control}
                                    name="isActive"
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={(val) => field.onChange(val === 'true')}
                                            defaultValue={field.value ? 'true' : 'false'}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="상태 선택" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">활성</SelectItem>
                                                <SelectItem value="false">비활성</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            저장
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

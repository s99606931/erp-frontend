import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, type UserFormData } from '@erp/shared';
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

interface UserFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: UserFormData) => Promise<void>;
    defaultValues?: Partial<UserFormData>;
    isEditing?: boolean;
}

export function UserFormModal({
    open,
    onOpenChange,
    onSubmit,
    defaultValues,
    isEditing = false,
}: UserFormModalProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: '',
            name: '',
            role: 'USER',
            status: 'PENDING',
            departmentId: '',
            phoneNumber: '',
            ...defaultValues,
        },
    });

    const handleFormSubmit = async (data: UserFormData) => {
        await onSubmit(data);
        reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? '사용자 정보 수정' : '새 사용자 추가'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="grid gap-4 py-4">
                        {/* 이름 */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                이름
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="name"
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

                        {/* 이메일 */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                이메일
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    disabled={isEditing}
                                    className={errors.email ? 'border-destructive' : ''}
                                />
                                {errors.email && (
                                    <p className="text-xs text-destructive mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* 비밀번호 (생성 시 필수, 수정 시 선택) */}
                        {!isEditing && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="password" className="text-right">
                                    비밀번호
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="password"
                                        type="password"
                                        {...register('password')}
                                        className={errors.password ? 'border-destructive' : ''}
                                    />
                                </div>
                            </div>
                        )}

                        {/* 권한 */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">
                                권한
                            </Label>
                            <div className="col-span-3">
                                <Controller
                                    control={control}
                                    name="role"
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="권한 선택" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="USER">일반 사용자</SelectItem>
                                                <SelectItem value="MANAGER">부서 관리자</SelectItem>
                                                <SelectItem value="TENANT_ADMIN">기관 관리자</SelectItem>
                                                <SelectItem value="SUPER_ADMIN">시스템 관리자</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        {/* 상태 */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                상태
                            </Label>
                            <div className="col-span-3">
                                <Controller
                                    control={control}
                                    name="status"
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="상태 선택" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ACTIVE">활성</SelectItem>
                                                <SelectItem value="INACTIVE">비활성</SelectItem>
                                                <SelectItem value="PENDING">대기</SelectItem>
                                                <SelectItem value="SUSPENDED">정지</SelectItem>
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

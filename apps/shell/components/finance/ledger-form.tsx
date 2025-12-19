'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
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
import { CalendarIcon, Loader2, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@erp/ui';
import { LedgerType, LedgerStatus } from '@erp/shared';
import { MOCK_ACCOUNTS } from '@/lib/mock/finance';
import { useState } from 'react';

// Form에서 사용할 타입 정의
interface LedgerFormData {
    transactionDate: string;
    description: string;
    type: LedgerType;
    status: LedgerStatus;
    lines: {
        accountCode: string;
        description: string;
        debitAmount: number;
        creditAmount: number;
    }[];
}

interface LedgerFormProps {
    defaultValues?: Partial<LedgerFormData>;
    isEditing?: boolean;
    onSubmit: (data: any) => Promise<void>;
}

export function LedgerForm({ defaultValues, isEditing = false, onSubmit }: LedgerFormProps) {
    // const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const { register, control, handleSubmit, watch } = useForm<LedgerFormData>({
        defaultValues: {
            transactionDate: format(new Date(), 'yyyy-MM-dd'),
            description: '',
            type: LedgerType.EXPENSE,
            status: LedgerStatus.DRAFT,
            lines: [
                { accountCode: '', description: '', debitAmount: 0, creditAmount: 0 },
                { accountCode: '', description: '', debitAmount: 0, creditAmount: 0 },
            ],
            ...defaultValues,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'lines',
    });

    // 차변/대변 합계 계산
    const lines = watch('lines');
    const totalDebit = lines.reduce((sum, line) => sum + Number(line.debitAmount || 0), 0);
    const totalCredit = lines.reduce((sum, line) => sum + Number(line.creditAmount || 0), 0);
    const isBalanced = totalDebit === totalCredit;

    const handleFormSubmit = async (data: LedgerFormData) => {
        if (!isBalanced) {
            alert('차변과 대변의 합계가 일치하지 않습니다.');
            return;
        }

        // 계정과목명 매핑
        const processedLines = data.lines.map(line => {
            const account = MOCK_ACCOUNTS.find(acc => acc.code === line.accountCode);
            return {
                ...line,
                accountName: account ? account.name : 'Unknown',
            };
        });

        const payload = {
            ...data,
            totalAmount: totalDebit,
            lines: processedLines,
        };

        setSubmitting(true);
        try {
            await onSubmit(payload);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 거래일자 */}
                <div className="space-y-2 flex flex-col">
                    <Label>거래일자 <span className="text-destructive">*</span></Label>
                    <Controller
                        control={control}
                        name="transactionDate"
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

                {/* 전표유형 */}
                <div className="space-y-2">
                    <Label>전표유형 <span className="text-destructive">*</span></Label>
                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="유형 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="REVENUE">입금 전표</SelectItem>
                                    <SelectItem value="EXPENSE">출금 전표</SelectItem>
                                    <SelectItem value="TRANSFER">대체 전표</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                {/* 적요 */}
                <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="description">적요 <span className="text-destructive">*</span></Label>
                    <Input
                        id="description"
                        placeholder="전표에 대한 설명을 입력하세요 (예: 12월 식대 지출)"
                        {...register('description', { required: true })}
                    />
                </div>
            </div>

            {/* 상세 항목 (Lines) */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">전표 상세</h3>
                    <Button type="button" variant="outline" size="sm" onClick={() => append({ accountCode: '', description: '', debitAmount: 0, creditAmount: 0 })}>
                        <Plus className="mr-2 h-4 w-4" />
                        행 추가
                    </Button>
                </div>

                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">계정과목</TableHead>
                                <TableHead>적요 (상세)</TableHead>
                                <TableHead className="w-[150px]">차변 (Debit)</TableHead>
                                <TableHead className="w-[150px]">대변 (Credit)</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fields.map((field, index) => (
                                <TableRow key={field.id}>
                                    <TableCell>
                                        <Controller
                                            control={control}
                                            name={`lines.${index}.accountCode`}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="계정과목 선택" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {MOCK_ACCOUNTS.map((acc) => (
                                                            <SelectItem key={acc.code} value={acc.code}>
                                                                [{acc.code}] {acc.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            {...register(`lines.${index}.description`)}
                                            placeholder="상세 적요"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            {...register(`lines.${index}.debitAmount`)}
                                            className="text-right"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            {...register(`lines.${index}.creditAmount`)}
                                            className="text-right"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => remove(index)}
                                            disabled={fields.length <= 2}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* 합계 검증 */}
                <div className="flex justify-end gap-8 p-4 bg-muted/50 rounded-md">
                    <div className="flex gap-4 items-center">
                        <span className="text-sm font-medium">차변 합계:</span>
                        <span className="text-lg font-bold">{totalDebit.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <span className="text-sm font-medium">대변 합계:</span>
                        <span className="text-lg font-bold">{totalCredit.toLocaleString()}</span>
                    </div>
                    <div className={cn("flex items-center gap-2 font-medium", isBalanced ? "text-green-600" : "text-destructive")}>
                        {isBalanced ? "대차 일치" : "차액 발생: " + Math.abs(totalDebit - totalCredit).toLocaleString()}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                    취소
                </Button>
                <Button type="submit" disabled={submitting || !isBalanced}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEditing ? '수정 저장' : '전표 발행'}
                </Button>
            </div>
        </form>
    );
}

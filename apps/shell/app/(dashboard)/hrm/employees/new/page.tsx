'use client';

import { EmployeeForm } from '@/components/hrm/employee-form';
import { type EmployeeFormData } from '@erp/shared';
import { useRouter } from 'next/navigation';

export default function EmployeeCreatePage() {
    const router = useRouter();

    const handleSubmit = async (data: EmployeeFormData) => {
        try {
            const res = await fetch('/api/hrm/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push('/hrm/employees');
                router.refresh();
            } else {
                alert('사원 등록 실패');
            }
        } catch (error) {
            console.error('Failed to create employee', error);
            alert('오류가 발생했습니다.');
        }
    };

    return (
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">사원 등록</h1>
                <p className="text-muted-foreground">
                    새로운 임직원을 시스템에 등록합니다.
                </p>
            </div>

            <div className="p-6 border rounded-lg bg-card">
                <EmployeeForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

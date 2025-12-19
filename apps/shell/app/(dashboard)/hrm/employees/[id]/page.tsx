'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { EmployeeForm } from '@/components/hrm/employee-form';
import type { Employee, EmployeeFormData } from '@erp/shared';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function EmployeeEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await fetch(`/api/hrm/employees/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setEmployee(data);
                } else {
                    alert('사원 정보를 불러오지 못했습니다.');
                    router.push('/hrm/employees');
                }
            } catch (error) {
                console.error(error);
                alert('오류가 발생했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployee();
    }, [id, router]);

    const handleSubmit = async (data: EmployeeFormData) => {
        try {
            const res = await fetch(`/api/hrm/employees/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push('/hrm/employees');
                router.refresh();
            } else {
                alert('수정 실패');
            }
        } catch (error) {
            console.error(error);
            alert('오류가 발생했습니다.');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!employee) return null;

    return (
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">사원 정보 수정</h1>
                <p className="text-muted-foreground">{employee.name}님의 정보를 수정합니다.</p>
            </div>

            <div className="p-6 border rounded-lg bg-card">
                <EmployeeForm
                    onSubmit={handleSubmit}
                    defaultValues={{
                        ...employee,
                        joinDate: format(new Date(employee.joinDate), 'yyyy-MM-dd'),
                    }}
                    isEditing
                />
            </div>
        </div>
    );
}

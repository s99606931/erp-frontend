'use client';

import { useEffect, useState } from 'react';
import { EmployeeListTable } from '@/components/hrm/employee-list-table';
import { Button } from '@erp/ui/components';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import type { Employee } from '@erp/shared';

export default function EmployeeListPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await fetch('/api/hrm/employees');
            if (res.ok) {
                const data = await res.json();
                setEmployees(data);
            }
        } catch (error) {
            console.error('Failed to fetch employees', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">사원 관리</h1>
                    <p className="text-muted-foreground">
                        전체 임직원 명부 조회 및 인사 정보를 관리합니다.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/hrm/employees/new">
                        <Plus className="mr-2 h-4 w-4" />
                        사원 등록
                    </Link>
                </Button>
            </div>

            <EmployeeListTable employees={employees} isLoading={isLoading} />
        </div>
    );
}

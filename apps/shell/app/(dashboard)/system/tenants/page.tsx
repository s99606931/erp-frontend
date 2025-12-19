'use client';

import { useEffect, useState } from 'react';
import { TenantListTable } from '@/components/system/tenant-list-table';
import { TenantFormModal } from '@/components/system/tenant-form-modal';
import { Button } from '@erp/ui/components';
import { Plus } from 'lucide-react';
import type { Tenant, TenantFormData } from '@erp/shared';

export default function TenantManagementPage() {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchTenants();
    }, []);

    const fetchTenants = async () => {
        try {
            const res = await fetch('/api/tenants');
            if (res.ok) {
                const data = await res.json();
                setTenants(data);
            }
        } catch (error) {
            console.error('Failed to fetch tenants', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateTenant = async (data: TenantFormData) => {
        try {
            const res = await fetch('/api/tenants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    // Default values for nested objects required by Tenant type
                    theme: { primaryColor: '#000000' },
                    config: { maxUsers: 100 }
                }),
            });

            if (res.ok) {
                await fetchTenants();
            } else {
                alert('기관 생성 실패');
            }
        } catch (error) {
            console.error('Failed to create tenant', error);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">기관(테넌트) 관리</h1>
                    <p className="text-muted-foreground">
                        시스템에 등록된 공공기관 및 하위 조직을 관리합니다.
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    기관 추가
                </Button>
            </div>

            <TenantListTable tenants={tenants} isLoading={isLoading} />

            <TenantFormModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSubmit={handleCreateTenant}
            />
        </div>
    );
}

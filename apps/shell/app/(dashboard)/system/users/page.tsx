'use client';

import { useEffect, useState } from 'react';
import { UserListTable } from '@/components/system/user-list-table';
import { UserFormModal } from '@/components/system/user-form-modal';
import { Button } from '@erp/ui/components';
import { Plus } from 'lucide-react';
import type { User, UserFormData } from '@erp/shared';

export default function UserManagementPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateUser = async (data: UserFormData) => {
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                await fetchUsers(); // 목록 갱신
            } else {
                alert('사용자 생성 실패');
            }
        } catch (error) {
            console.error('Failed to create user', error);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">사용자 관리</h1>
                    <p className="text-muted-foreground">
                        시스템 사용자를 조회하고 관리합니다.
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    사용자 추가
                </Button>
            </div>

            <UserListTable users={users} isLoading={isLoading} />

            <UserFormModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSubmit={handleCreateUser}
            />
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { Button, Badge } from '@erp/ui/components';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@erp/ui';
import { Plus, FolderOpen, ChevronRight, Edit, Trash2 } from 'lucide-react';
import type { CommonCodeGroup, CommonCode } from '@erp/shared';

export default function CommonCodePage() {
    const [groups, setGroups] = useState<CommonCodeGroup[]>([]);
    const [codes, setCodes] = useState<CommonCode[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<CommonCodeGroup | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 그룹 목록 조회
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await fetch('/api/system/codes?type=groups');
                if (res.ok) {
                    const data = await res.json();
                    setGroups(data);
                    if (data.length > 0) {
                        setSelectedGroup(data[0]);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch code groups', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGroups();
    }, []);

    // 선택된 그룹의 코드 목록 조회
    useEffect(() => {
        if (!selectedGroup) return;

        const fetchCodes = async () => {
            try {
                const res = await fetch(`/api/system/codes?groupCode=${selectedGroup.code}`);
                if (res.ok) {
                    const data = await res.json();
                    setCodes(data);
                }
            } catch (error) {
                console.error('Failed to fetch codes', error);
            }
        };
        fetchCodes();
    }, [selectedGroup]);

    if (isLoading) {
        return <div className="p-8 text-center">로딩 중...</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">공통코드 관리</h1>
                    <p className="text-muted-foreground">
                        시스템 전반에서 사용되는 분류 코드를 관리합니다.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* 코드 그룹 목록 (왼쪽 패널) */}
                <div className="md:col-span-1 border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">코드 그룹</h3>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="space-y-1">
                        {groups.map((group) => (
                            <button
                                key={group.id}
                                onClick={() => setSelectedGroup(group)}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${selectedGroup?.id === group.id
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted'
                                    }`}
                            >
                                <FolderOpen className="h-4 w-4" />
                                <span className="flex-1 text-left">{group.name}</span>
                                {group.isSystem && (
                                    <Badge variant="secondary" className="text-xs px-1">시스템</Badge>
                                )}
                                <ChevronRight className="h-4 w-4 opacity-50" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* 코드 상세 목록 (오른쪽 패널) */}
                <div className="md:col-span-3 border rounded-lg p-4 space-y-4">
                    {selectedGroup ? (
                        <>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">{selectedGroup.name} 코드</h3>
                                    <p className="text-sm text-muted-foreground">
                                        그룹 코드: {selectedGroup.code}
                                    </p>
                                </div>
                                <Button size="sm">
                                    <Plus className="mr-2 h-4 w-4" />
                                    코드 추가
                                </Button>
                            </div>

                            {codes.length === 0 ? (
                                <div className="p-8 text-center text-muted-foreground">
                                    등록된 코드가 없습니다.
                                </div>
                            ) : (
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">코드</TableHead>
                                                <TableHead>코드명</TableHead>
                                                <TableHead className="w-[80px]">정렬</TableHead>
                                                <TableHead className="w-[80px]">상태</TableHead>
                                                <TableHead className="w-[100px] text-right">관리</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {codes.map((code) => (
                                                <TableRow key={code.id}>
                                                    <TableCell className="font-mono text-sm">{code.code}</TableCell>
                                                    <TableCell>{code.name}</TableCell>
                                                    <TableCell className="text-center">{code.sortOrder}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={code.isActive ? 'success' : 'secondary'}>
                                                            {code.isActive ? '사용' : '미사용'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground">
                            왼쪽에서 코드 그룹을 선택하세요.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

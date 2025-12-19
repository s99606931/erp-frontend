import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@erp/ui';
import { Button, Badge } from '@erp/ui/components';
import { type User, UserStatus } from '@erp/shared';
import { format } from 'date-fns';
import { Edit, Trash2 } from 'lucide-react';

interface UserListTableProps {
    users: User[];
    isLoading?: boolean;
}

export function UserListTable({ users, isLoading }: UserListTableProps) {
    if (isLoading) {
        return <div className="p-8 text-center">목록을 불러오는 중...</div>;
    }

    if (users.length === 0) {
        return <div className="p-8 text-center text-muted-foreground">사용자가 없습니다.</div>;
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>이름</TableHead>
                        <TableHead>이메일</TableHead>
                        <TableHead>권한</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>가입일</TableHead>
                        <TableHead className="text-right">관리</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{user.role}</Badge>
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={user.status} />
                            </TableCell>
                            <TableCell>
                                {format(new Date(user.createdAt), 'yyyy-MM-dd')}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" aria-label="수정">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" aria-label="삭제">
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function StatusBadge({ status }: { status: UserStatus }) {
    switch (status) {
        case UserStatus.ACTIVE:
            return <Badge className="bg-green-500 hover:bg-green-600">활성</Badge>;
        case UserStatus.INACTIVE:
            return <Badge variant="secondary">비활성</Badge>;
        case UserStatus.PENDING:
            return <Badge variant="outline" className="text-orange-500 border-orange-500">대기</Badge>;
        case UserStatus.SUSPENDED:
            return <Badge variant="error">정지</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
}

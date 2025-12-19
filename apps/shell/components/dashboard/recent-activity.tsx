'use client';

import { cn } from '@erp/ui';
import { Badge } from '@erp/ui/components';
import { Clock } from 'lucide-react';

interface Activity {
    id: string;
    type: 'create' | 'update' | 'delete' | 'complete';
    message: string;
    timestamp: string;
    user?: string;
}

interface RecentActivityProps {
    activities: Activity[];
    className?: string;
}

export function RecentActivity({ activities, className }: RecentActivityProps) {
    return (
        <div className={cn("p-6 rounded-lg border bg-card shadow-sm", className)}>
            <h3 className="font-semibold mb-4">최근 활동</h3>

            {activities.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                    최근 활동이 없습니다.
                </p>
            ) : (
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3">
                            <div className="mt-1">
                                <ActivityBadge type={activity.type} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm truncate">{activity.message}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                        {activity.timestamp}
                                    </span>
                                    {activity.user && (
                                        <>
                                            <span className="text-xs text-muted-foreground">·</span>
                                            <span className="text-xs text-muted-foreground">
                                                {activity.user}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function ActivityBadge({ type }: { type: Activity['type'] }) {
    switch (type) {
        case 'create':
            return <Badge className="bg-green-500 text-xs">생성</Badge>;
        case 'update':
            return <Badge className="bg-blue-500 text-xs">수정</Badge>;
        case 'delete':
            return <Badge variant="error" className="text-xs">삭제</Badge>;
        case 'complete':
            return <Badge variant="secondary" className="text-xs">완료</Badge>;
        default:
            return <Badge className="text-xs">{type}</Badge>;
    }
}

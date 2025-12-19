'use client';

import { cn } from '@erp/ui';
import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

export function StatCard({ title, value, description, icon: Icon, trend, className }: StatCardProps) {
    return (
        <div className={cn("p-6 rounded-lg border bg-card shadow-sm", className)}>
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-3xl font-bold">{value}</p>
                    {description && (
                        <p className="text-xs text-muted-foreground">{description}</p>
                    )}
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center gap-1">
                    <span className={cn(
                        "text-sm font-medium",
                        trend.isPositive ? "text-green-600" : "text-red-600"
                    )}>
                        {trend.isPositive ? '+' : ''}{trend.value}%
                    </span>
                    <span className="text-xs text-muted-foreground">전월 대비</span>
                </div>
            )}
        </div>
    );
}

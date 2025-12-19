'use client';

import { useEffect, useState } from 'react';
import { StatCard } from '@/components/dashboard/stat-card';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { ProjectSummary } from '@/components/dashboard/project-summary';
import { Users, Briefcase, FileText, TrendingUp } from 'lucide-react';
import type { Project } from '@erp/shared';

// Mock 최근 활동 데이터
const MOCK_ACTIVITIES = [
    { id: '1', type: 'create' as const, message: '새 프로젝트 "ERP 시스템 고도화" 생성', timestamp: '10분 전', user: '김관리자' },
    { id: '2', type: 'complete' as const, message: '태스크 "API 설계 문서 작성" 완료', timestamp: '30분 전', user: '이개발' },
    { id: '3', type: 'update' as const, message: '사원 정보 수정: 김철수', timestamp: '1시간 전', user: '박인사' },
    { id: '4', type: 'create' as const, message: '전표 등록: 사무용품 구입', timestamp: '2시간 전', user: '최재무' },
    { id: '5', type: 'update' as const, message: '프로젝트 진행률 업데이트: 35%', timestamp: '3시간 전', user: '김관리자' },
];

export default function DashboardPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [stats, setStats] = useState({
        totalEmployees: 0,
        activeProjects: 0,
        pendingLedgers: 0,
        completedTasks: 0,
    });

    useEffect(() => {
        // 프로젝트 데이터 로드
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/pms/projects');
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                    setStats(prev => ({
                        ...prev,
                        activeProjects: data.filter((p: Project) => p.status === 'ACTIVE').length,
                    }));
                }
            } catch (error) {
                console.error('Failed to fetch projects', error);
            }
        };

        // 사원 수 로드
        const fetchEmployees = async () => {
            try {
                const res = await fetch('/api/hrm/employees');
                if (res.ok) {
                    const data = await res.json();
                    setStats(prev => ({ ...prev, totalEmployees: data.length }));
                }
            } catch (error) {
                console.error('Failed to fetch employees', error);
            }
        };

        // 태스크 로드
        const fetchTasks = async () => {
            try {
                const res = await fetch('/api/pms/tasks');
                if (res.ok) {
                    const data = await res.json();
                    setStats(prev => ({
                        ...prev,
                        completedTasks: data.filter((t: any) => t.status === 'DONE').length,
                    }));
                }
            } catch (error) {
                console.error('Failed to fetch tasks', error);
            }
        };

        // 전표 로드
        const fetchLedgers = async () => {
            try {
                const res = await fetch('/api/finance/ledgers');
                if (res.ok) {
                    const data = await res.json();
                    setStats(prev => ({
                        ...prev,
                        pendingLedgers: data.filter((l: any) => l.status === 'PENDING').length,
                    }));
                }
            } catch (error) {
                console.error('Failed to fetch ledgers', error);
            }
        };

        fetchProjects();
        fetchEmployees();
        fetchTasks();
        fetchLedgers();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
                <p className="text-muted-foreground">
                    ERP 시스템 현황을 한눈에 확인합니다.
                </p>
            </div>

            {/* 통계 카드 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="전체 사원"
                    value={stats.totalEmployees}
                    description="재직 중인 사원 수"
                    icon={Users}
                    trend={{ value: 5, isPositive: true }}
                />
                <StatCard
                    title="진행 중 프로젝트"
                    value={stats.activeProjects}
                    description="현재 활성 프로젝트"
                    icon={Briefcase}
                />
                <StatCard
                    title="승인 대기 전표"
                    value={stats.pendingLedgers}
                    description="결재 대기 중"
                    icon={FileText}
                />
                <StatCard
                    title="완료된 태스크"
                    value={stats.completedTasks}
                    description="이번 달 완료"
                    icon={TrendingUp}
                    trend={{ value: 12, isPositive: true }}
                />
            </div>

            {/* 위젯 그리드 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProjectSummary projects={projects} />
                <RecentActivity activities={MOCK_ACTIVITIES} />
            </div>
        </div>
    );
}

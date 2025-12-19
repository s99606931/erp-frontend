/**
 * 프로젝트 관리(PMS) 도메인 관련 타입 정의
 */

export enum ProjectStatus {
    PLANNING = 'PLANNING',   // 계획
    ACTIVE = 'ACTIVE',       // 진행중
    COMPLETED = 'COMPLETED', // 완료
    ON_HOLD = 'ON_HOLD',     // 보류
    CANCELLED = 'CANCELLED', // 취소됨
}

export enum ProjectPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    URGENT = 'URGENT',
}

export interface Project {
    id: string;
    tenantId: string;
    name: string;
    description?: string;
    status: ProjectStatus;
    priority: ProjectPriority;
    startDate: Date;
    endDate: Date;
    managerId?: string; // PM (Employee ID)
    managerName?: string; // PM Display Name
    budget: number;
    spentAmount?: number; // 집행액 (Finance 연동 예정)
    progress: number; // 진행률 (0~100)
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}

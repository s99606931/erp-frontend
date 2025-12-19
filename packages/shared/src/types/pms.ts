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

// ============================================================================
// Task (업무/태스크) 관련 타입
// ============================================================================

export enum TaskStatus {
    TODO = 'TODO',           // 할 일
    IN_PROGRESS = 'IN_PROGRESS', // 진행 중
    IN_REVIEW = 'IN_REVIEW', // 검토 중
    DONE = 'DONE',           // 완료
    BLOCKED = 'BLOCKED',     // 블로킹됨
}

export interface Task {
    id: string;
    tenantId: string;
    projectId: string;       // 소속 프로젝트 ID
    projectName?: string;    // 프로젝트명 (조인용)
    title: string;
    description?: string;
    status: TaskStatus;
    priority: ProjectPriority;
    assigneeId?: string;     // 담당자 (Employee ID)
    assigneeName?: string;   // 담당자명
    dueDate?: Date;
    estimatedHours?: number; // 예상 소요시간
    actualHours?: number;    // 실제 소요시간
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}

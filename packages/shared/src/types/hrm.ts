/**
 * 인사관리(HRM) 도메인 관련 타입 정의
 */

import { UserStatus } from './user';

export enum EmploymentType {
    REGULAR = 'REGULAR', // 정규직
    CONTRACT = 'CONTRACT', // 계약직
    INTERN = 'INTERN', // 인턴
    DISPATCH = 'DISPATCH', // 파견직
}

export enum EmployeeGrade {
    L1 = 'L1', // 사원
    L2 = 'L2', // 대리
    L3 = 'L3', // 과장
    L4 = 'L4', // 차장
    L5 = 'L5', // 부장
    EX = 'EX', // 임원
}

export interface Employee {
    id: string;
    tenantId: string;
    userId?: string; // 시스템 사용자(User)와 연결 (선택)
    name: string;
    email: string;
    phoneNumber?: string;
    departmentId?: string;
    departmentName?: string; // 조인된 부서명 (표시용)
    position?: string; // 직위 (팀장, 본부장 등)
    grade: EmployeeGrade; // 직급
    employmentType: EmploymentType;
    joinDate: Date; // 입사일
    resignationDate?: Date; // 퇴사일
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}

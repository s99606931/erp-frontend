/**
 * 공통코드(Common Code) 관련 타입 정의
 * 
 * 공통코드는 시스템 전반에서 사용되는 분류 코드를 관리합니다.
 * 예: 직급 코드, 부서 코드, 상태 코드, 국가 코드 등
 */

export interface CommonCodeGroup {
    id: string;
    tenantId: string;
    code: string;          // 그룹 코드 (예: POSITION, DEPARTMENT)
    name: string;          // 그룹명 (예: 직급, 부서)
    description?: string;
    isActive: boolean;
    isSystem: boolean;     // 시스템 필수 코드 여부 (삭제 불가)
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CommonCode {
    id: string;
    tenantId: string;
    groupId: string;       // 상위 그룹 ID
    groupCode: string;     // 상위 그룹 코드
    code: string;          // 상세 코드 (예: L1, L2, L3...)
    name: string;          // 코드명 (예: 사원, 대리, 과장...)
    description?: string;
    value?: string;        // 추가 값 (선택적)
    isActive: boolean;
    sortOrder: number;
    parentId?: string;     // 계층형 코드 지원 (선택적)
    createdAt: Date;
    updatedAt: Date;
}

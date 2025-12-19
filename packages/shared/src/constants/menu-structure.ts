/**
 * ============================================================================
 * 파일명: menu-structure.ts
 * 패키지: @erp/shared
 * 경로: packages/shared/src/constants/menu-structure.ts
 * 작성일: 2025-12-20
 * 작성자: ERP Frontend Team
 * ============================================================================
 * 
 * [📄 파일 설명]
 * ERP 시스템의 전체 메뉴 구조를 정의하는 상수 파일입니다.
 * 사이드바 네비게이션, 권한별 메뉴 필터링 등에 사용됩니다.
 * 
 * [🎯 주요 기능]
 * 1. 전체 메뉴 계층 구조 정의 (최대 2 depth)
 * 2. 각 메뉴별 아이콘(Lucide 이름), 라벨, 경로 매핑
 * 3. 권한(RBAC) 기반 메뉴 접근 제어 설정
 * ============================================================================
 */

export interface MenuItem {
    id: string;
    label: string;
    icon?: string; // Lucide icon name string
    path?: string;
    children?: MenuItem[];
    roles?: string[]; // 접근 가능한 권한 목록 (UserRole enum string value)
}

/**
 * 전체 ERP 시스템 메뉴 구조
 * 수정 시 apps/shell 재배포가 필요할 수 있습니다.
 */
export const MENU_STRUCTURE: MenuItem[] = [
    {
        id: 'dashboard',
        label: '대시보드',
        icon: 'LayoutDashboard',
        path: '/dashboard',
    },
    {
        id: 'hrm',
        label: '인사관리',
        icon: 'Users',
        children: [
            { id: 'hrm-employee', label: '사원관리', path: '/hrm/employees' },
            { id: 'hrm-attendance', label: '근태관리', path: '/hrm/attendance' },
            { id: 'hrm-payroll', label: '급여관리', path: '/hrm/payroll' },
            { id: 'hrm-evaluation', label: '인사평가', path: '/hrm/evaluations' },
        ],
    },
    {
        id: 'finance',
        label: '재무회계',
        icon: 'Calculator',
        children: [
            { id: 'finance-ledger', label: '전표관리', path: '/finance/ledgers' },
            { id: 'finance-tax', label: '세무관리', path: '/finance/tax' },
            { id: 'finance-asset', label: '자산관리', path: '/finance/assets' },
            { id: 'finance-report', label: '재무제표', path: '/finance/reports' },
        ],
    },
    {
        id: 'project',
        label: '사업관리',
        icon: 'Briefcase',
        children: [
            { id: 'pms-projects', label: '프로젝트 관리', path: '/pms/projects' },
            { id: 'pms-tasks', label: '태스크 관리', path: '/pms/tasks' },
            { id: 'pms-kanban', label: '칸반 보드', path: '/pms/projects' }, // 같은 페이지지만 바로가기 성격
        ],
    },
    {
        id: 'system',
        label: '시스템관리',
        icon: 'Settings',
        roles: ['SUPER_ADMIN', 'TENANT_ADMIN'],
        children: [
            { id: 'system-tenants', label: '기관(테넌트) 관리', path: '/system/tenants', roles: ['SUPER_ADMIN'] },
            { id: 'system-users', label: '사용자 관리', path: '/system/users' },
            { id: 'system-roles', label: '권한 관리', path: '/system/roles' },
            { id: 'system-code', label: '공통코드 관리', path: '/system/codes' },
            { id: 'system-audit', label: '보안감사 로그', path: '/system/audit' },
        ],
    },
];

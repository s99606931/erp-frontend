/**
 * ============================================================================
 * 파일명: menu-structure.ts
 * 패키지: @erp/shared
 * 경로: packages/erp-shared/src/constants/menu-structure.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 전체 ERP 시스템의 메뉴 구조를 정의합니다.
 * 최대 3 Depth까지만 허용합니다.
 * ============================================================================
 */

/**
 * 메뉴 아이템 타입
 */
export interface MenuItem {
    /** 메뉴 고유 ID */
    id: string;
    /** 메뉴 레이블 (표시명) */
    label: string;
    /** 아이콘 이름 (Lucide React) */
    icon?: string;
    /** 라우팅 경로 */
    path?: string;
    /** 하위 메뉴 */
    children?: MenuItem[];
    /** 필요한 권한 */
    requiredRole?: 'ADMIN' | 'MANAGER' | 'USER';
    /** 서비스 포트 (마이크로서비스) */
    servicePort?: number;
}

/**
 * ERP 메뉴 구조
 *
 * @description
 * - 1 Depth: 도메인 (인사관리, 급여관리 등)
 * - 2 Depth: 기능 그룹 (사원관리, 급여계산 등)
 * - 3 Depth: 세부 기능 (사원등록, 급여명세서 등)
 */
export const MENU_STRUCTURE: MenuItem[] = [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 인사관리 (HRM)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        id: 'hrm',
        label: '인사관리',
        icon: 'Users',
        servicePort: 3010,
        children: [
            {
                id: 'hrm-employee',
                label: '사원관리',
                children: [
                    { id: 'hrm-employee-list', label: '사원목록', path: '/hrm/employees' },
                    { id: 'hrm-employee-create', label: '사원등록', path: '/hrm/employees/create' },
                ],
            },
            {
                id: 'hrm-card',
                label: '인사카드',
                path: '/hrm/cards',
            },
            {
                id: 'hrm-org',
                label: '조직도',
                path: '/hrm/organization',
            },
        ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 급여관리 (Payroll)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        id: 'payroll',
        label: '급여관리',
        icon: 'Wallet',
        servicePort: 3011,
        children: [
            {
                id: 'payroll-calc',
                label: '급여계산',
                path: '/payroll/calculate',
            },
            {
                id: 'payroll-slip',
                label: '급여명세서',
                path: '/payroll/slips',
            },
            {
                id: 'payroll-tax',
                label: '연말정산',
                path: '/payroll/tax',
            },
        ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 회계관리 (Accounting)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        id: 'accounting',
        label: '회계관리',
        icon: 'Calculator',
        servicePort: 3014,
        children: [
            {
                id: 'accounting-voucher',
                label: '전표관리',
                path: '/accounting/vouchers',
            },
            {
                id: 'accounting-ledger',
                label: '원장조회',
                path: '/accounting/ledger',
            },
        ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 전자결재 (Approval)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        id: 'approval',
        label: '전자결재',
        icon: 'FileCheck',
        servicePort: 3017,
        children: [
            {
                id: 'approval-draft',
                label: '기안작성',
                path: '/approval/draft',
            },
            {
                id: 'approval-inbox',
                label: '결재함',
                children: [
                    { id: 'approval-pending', label: '대기문서', path: '/approval/pending' },
                    { id: 'approval-completed', label: '완료문서', path: '/approval/completed' },
                ],
            },
        ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 시스템관리 (Admin)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        id: 'admin',
        label: '시스템관리',
        icon: 'Settings',
        requiredRole: 'ADMIN',
        children: [
            {
                id: 'admin-users',
                label: '사용자관리',
                path: '/admin/users',
                servicePort: 3003,
            },
            {
                id: 'admin-tenant',
                label: '테넌트설정',
                path: '/admin/tenant',
                servicePort: 3002,
            },
            {
                id: 'admin-audit',
                label: '감사로그',
                path: '/admin/audit',
            },
        ],
    },
];

export default MENU_STRUCTURE;

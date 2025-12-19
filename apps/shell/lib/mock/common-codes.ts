
import { type CommonCodeGroup, type CommonCode } from '@erp/shared';

export const MOCK_CODE_GROUPS: CommonCodeGroup[] = [
    {
        id: 'grp-1',
        tenantId: 't-1',
        code: 'POSITION',
        name: '직급',
        description: '사원 직급 분류',
        isActive: true,
        isSystem: true,
        sortOrder: 1,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: 'grp-2',
        tenantId: 't-1',
        code: 'DEPARTMENT',
        name: '부서',
        description: '조직 부서 분류',
        isActive: true,
        isSystem: true,
        sortOrder: 2,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: 'grp-3',
        tenantId: 't-1',
        code: 'PROJECT_CATEGORY',
        name: '프로젝트 분류',
        description: '프로젝트 유형 분류',
        isActive: true,
        isSystem: false,
        sortOrder: 3,
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-03-01'),
    },
];

export const MOCK_CODES: CommonCode[] = [
    // 직급 코드
    { id: 'code-1', tenantId: 't-1', groupId: 'grp-1', groupCode: 'POSITION', code: 'L1', name: '사원', isActive: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
    { id: 'code-2', tenantId: 't-1', groupId: 'grp-1', groupCode: 'POSITION', code: 'L2', name: '대리', isActive: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
    { id: 'code-3', tenantId: 't-1', groupId: 'grp-1', groupCode: 'POSITION', code: 'L3', name: '과장', isActive: true, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
    { id: 'code-4', tenantId: 't-1', groupId: 'grp-1', groupCode: 'POSITION', code: 'L4', name: '차장', isActive: true, sortOrder: 4, createdAt: new Date(), updatedAt: new Date() },
    { id: 'code-5', tenantId: 't-1', groupId: 'grp-1', groupCode: 'POSITION', code: 'L5', name: '부장', isActive: true, sortOrder: 5, createdAt: new Date(), updatedAt: new Date() },
    // 부서 코드
    { id: 'code-6', tenantId: 't-1', groupId: 'grp-2', groupCode: 'DEPARTMENT', code: 'DEV', name: '개발팀', isActive: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
    { id: 'code-7', tenantId: 't-1', groupId: 'grp-2', groupCode: 'DEPARTMENT', code: 'HR', name: '인사팀', isActive: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
    { id: 'code-8', tenantId: 't-1', groupId: 'grp-2', groupCode: 'DEPARTMENT', code: 'FIN', name: '재무팀', isActive: true, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
    { id: 'code-9', tenantId: 't-1', groupId: 'grp-2', groupCode: 'DEPARTMENT', code: 'MKT', name: '마케팅팀', isActive: true, sortOrder: 4, createdAt: new Date(), updatedAt: new Date() },
    // 프로젝트 분류
    { id: 'code-10', tenantId: 't-1', groupId: 'grp-3', groupCode: 'PROJECT_CATEGORY', code: 'INTERNAL', name: '내부 프로젝트', isActive: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
    { id: 'code-11', tenantId: 't-1', groupId: 'grp-3', groupCode: 'PROJECT_CATEGORY', code: 'EXTERNAL', name: '외부 프로젝트', isActive: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
    { id: 'code-12', tenantId: 't-1', groupId: 'grp-3', groupCode: 'PROJECT_CATEGORY', code: 'RND', name: 'R&D', isActive: true, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
];

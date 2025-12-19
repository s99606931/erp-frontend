
import { type Ledger, LedgerStatus, LedgerType, type AccountSubject } from '@erp/shared';

// 계정과목 Mock
export const MOCK_ACCOUNTS: AccountSubject[] = [
    { code: '101', name: '현금', type: 'ASSET' },
    { code: '103', name: '보통예금', type: 'ASSET' },
    { code: '251', name: '외상매입금', type: 'LIABILITY' },
    { code: '401', name: '상품매출', type: 'REVENUE' },
    { code: '501', name: '급여', type: 'EXPENSE' },
    { code: '511', name: '복리후생비', type: 'EXPENSE' },
    { code: '513', name: '여비교통비', type: 'EXPENSE' },
    { code: '811', name: '운반비', type: 'EXPENSE' },
];

export const MOCK_LEDGERS: Ledger[] = [
    {
        id: 'l-1',
        tenantId: 't-1',
        transactionDate: new Date('2024-12-01'),
        description: '12월 사무용품 구입',
        type: LedgerType.EXPENSE,
        status: LedgerStatus.APPROVED,
        totalAmount: 150000,
        lines: [
            { id: 'l1-1', accountCode: '511', accountName: '복리후생비', description: '커피 및 다과', debitAmount: 150000, creditAmount: 0 },
            { id: 'l1-2', accountCode: '101', accountName: '현금', description: '', debitAmount: 0, creditAmount: 150000 },
        ],
        createdBy: 'user-1',
        createdAt: new Date('2024-12-01'),
        updatedAt: new Date('2024-12-01'),
    },
    {
        id: 'l-2',
        tenantId: 't-1',
        transactionDate: new Date('2024-12-05'),
        description: '서울 출장 여비 지급',
        type: LedgerType.EXPENSE,
        status: LedgerStatus.PENDING,
        totalAmount: 320000,
        lines: [
            { id: 'l2-1', accountCode: '513', accountName: '여비교통비', description: 'KTX 및 숙박', debitAmount: 320000, creditAmount: 0 },
            { id: 'l2-2', accountCode: '103', accountName: '보통예금', description: '계좌이체', debitAmount: 0, creditAmount: 320000 },
        ],
        createdBy: 'user-1',
        createdAt: new Date('2024-12-05'),
        updatedAt: new Date('2024-12-05'),
    },
];

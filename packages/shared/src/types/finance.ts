/**
 * 재무회계(Finance) 도메인 관련 타입 정의
 */

export enum LedgerStatus {
    DRAFT = 'DRAFT',       // 작성중
    PENDING = 'PENDING',   // 승인대기
    APPROVED = 'APPROVED', // 승인됨
    REJECTED = 'REJECTED', // 반려됨
}

export enum LedgerType {
    REVENUE = 'REVENUE',   // 입금
    EXPENSE = 'EXPENSE',   // 출금
    TRANSFER = 'TRANSFER', // 대체
}

// 계정과목 (임시)
export interface AccountSubject {
    code: string;
    name: string;
    type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
}

// 전표 상세 항목 (Line Item)
export interface LedgerLine {
    id: string;
    accountCode: string;
    accountName: string;
    description: string;
    debitAmount: number;  // 차변 금액
    creditAmount: number; // 대변 금액
}

// 전표 (Ledger Entry)
export interface Ledger {
    id: string;
    tenantId: string;
    transactionDate: Date; // 거래일자
    description: string;   // 전표 적요
    type: LedgerType;
    status: LedgerStatus;
    totalAmount: number;   // 총 금액 (차변 합계 = 대변 합계)
    lines: LedgerLine[];   // 상세 항목
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

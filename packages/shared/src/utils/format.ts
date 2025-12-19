/**
 * ============================================================================
 * 파일명: format.ts
 * 패키지: @erp/shared
 * 경로: packages/shared/src/utils/format.ts
 * 작성일: 2025-12-20
 * 작성자: ERP Frontend Team
 * ============================================================================
 * 
 * [📄 파일 설명]
 * 날짜, 통화, 숫자 등 데이터 포맷팅을 위한 유틸리티 함수 모음입니다.
 * 
 * [🎯 주요 기능]
 * 1. 날짜 포맷팅 (YYYY-MM-DD 등)
 * 2. 원화(KRW) 통화 표기
 * 3. 사업자등록번호 등 특수 포맷팅
 * ============================================================================
 */

import { format, isValid, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜를 지정된 형식의 문자열로 변환합니다.
 * @param date - Date 객체 또는 ISO 문자열
 * @param formatStr - 포맷 문자열 (기본: 'yyyy-MM-dd')
 * @returns 포맷팅된 날짜 문자열
 * 
 * @example
 * formatDate(new Date(), 'yyyy.MM.dd') // '2025.12.20'
 */
export function formatDate(date: Date | string | null | undefined, formatStr = 'yyyy-MM-dd'): string {
    if (!date) return '';

    const d = typeof date === 'string' ? parseISO(date) : date;

    if (!isValid(d)) return '';

    return format(d, formatStr, { locale: ko });
}

/**
 * 숫자를 한국 통화(원화, KRW) 형식으로 변환합니다.
 * @param amount - 금액 (숫자)
 * @returns '1,000원' 형식의 문자열
 * 
 * @example
 * formatCurrency(15000) // '15,000원'
 */
export function formatCurrency(amount: number | null | undefined): string {
    if (amount === null || amount === undefined) return '0원';

    return `${amount.toLocaleString('ko-KR')}원`;
}

/**
 * 전화번호에 하이픈(-)을 추가합니다.
 * @param phone - 숫자만 있는 전화번호 문자열
 * @returns 010-1234-5678 형식
 */
export function formatPhoneNumber(phone: string): string {
    if (!phone) return '';

    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length === 11) {
        return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3'); // 02-123-4567 or 010-123-4567
    }
    return phone;
}

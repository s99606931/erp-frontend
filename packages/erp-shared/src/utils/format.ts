/**
 * ============================================================================
 * 파일명: format.ts
 * 패키지: @erp/shared
 * 경로: packages/erp-shared/src/utils/format.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 날짜, 통화, 숫자 등의 포맷팅 유틸리티 함수
 * ============================================================================
 */

/**
 * 날짜를 한국어 형식으로 포맷팅
 *
 * @param date - Date 객체 또는 ISO 문자열
 * @param format - 'date' | 'datetime' | 'time'
 * @returns 포맷팅된 문자열
 *
 * @example
 * formatDate(new Date(), 'date')     // "2025년 12월 19일"
 * formatDate(new Date(), 'datetime') // "2025년 12월 19일 오후 3:30"
 */
export function formatDate(
    date: Date | string,
    format: 'date' | 'datetime' | 'time' = 'date'
): string {
    const d = typeof date === 'string' ? new Date(date) : date;

    const options: Intl.DateTimeFormatOptions =
        format === 'date'
            ? { year: 'numeric', month: 'long', day: 'numeric' }
            : format === 'datetime'
                ? { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }
                : { hour: 'numeric', minute: '2-digit' };

    return new Intl.DateTimeFormat('ko-KR', options).format(d);
}

/**
 * 숫자를 한국 원화 형식으로 포맷팅
 *
 * @param amount - 금액
 * @returns 포맷팅된 문자열
 *
 * @example
 * formatCurrency(1234567) // "₩1,234,567"
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
    }).format(amount);
}

/**
 * 숫자에 천단위 콤마 추가
 *
 * @param num - 숫자
 * @returns 포맷팅된 문자열
 *
 * @example
 * formatNumber(1234567) // "1,234,567"
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat('ko-KR').format(num);
}

/**
 * 전화번호 포맷팅
 *
 * @param phone - 전화번호 (숫자만)
 * @returns 포맷팅된 전화번호
 *
 * @example
 * formatPhone('01012345678') // "010-1234-5678"
 */
export function formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length === 11) {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    }
    if (cleaned.length === 10) {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }

    return phone;
}

/**
 * ============================================================================
 * 파일명: theme-manager.ts
 * 패키지: @erp/ui
 * 경로: packages/ui/src/lib/theme-manager.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * CSS 변수를 통한 동적 테마 적용 시스템입니다.
 * 로그인 시 테넌트 정보를 조회하여 기관별 테마를 자동으로 적용합니다.
 *
 * [🎯 주요 기능]
 * 1. applyTenantTheme: CSS 변수로 테마 색상을 동적 적용
 * 2. hexToRgb: HEX 색상을 RGB 문자열로 변환 (Tailwind 호환)
 * 3. toKebabCase: camelCase를 kebab-case로 변환
 *
 * [📦 사용 예시]
 * ```typescript
 * import { applyTenantTheme, tenantThemePresets } from '@erp/ui';
 *
 * // 로그인 성공 후 테마 적용
 * const userTenant = await getTenantByEmail(user.email);
 * applyTenantTheme(tenantThemePresets[userTenant.domain]);
 * ```
 * ============================================================================
 */

import type { TenantTheme } from '../tokens/tenant-themes';

/**
 * HEX 색상을 RGB 문자열로 변환
 *
 * @description
 * Tailwind CSS의 opacity 기능을 사용하기 위해
 * HEX 색상을 "R G B" 형식의 문자열로 변환합니다.
 *
 * @param hex - HEX 색상 코드 (예: "#3B82F6" 또는 "3B82F6")
 * @returns RGB 값 문자열 (예: "59 130 246")
 *
 * @example
 * hexToRgb('#3B82F6'); // "59 130 246"
 * hexToRgb('#FFFFFF'); // "255 255 255"
 */
export function hexToRgb(hex: string): string {
    // # 제거
    const cleanHex = hex.replace('#', '');

    // 각 색상 채널 파싱
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    // 유효하지 않은 색상인 경우 기본값 반환
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
        console.warn(`Invalid hex color: ${hex}`);
        return '0 0 0';
    }

    return `${r} ${g} ${b}`;
}

/**
 * camelCase를 kebab-case로 변환
 *
 * @description
 * CSS 변수명에 사용하기 위해 camelCase를 kebab-case로 변환합니다.
 *
 * @param str - camelCase 문자열 (예: "primaryForeground")
 * @returns kebab-case 문자열 (예: "primary-foreground")
 *
 * @example
 * toKebabCase('primaryForeground'); // "primary-foreground"
 * toKebabCase('background');        // "background"
 */
export function toKebabCase(str: string): string {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * 테넌트 테마를 CSS 변수로 적용
 *
 * @description
 * 주어진 테넌트 테마의 색상들을 document.documentElement의
 * CSS 변수로 설정합니다. Tailwind CSS에서 이 변수들을 참조하여
 * 동적으로 테마가 적용됩니다.
 *
 * @param theme - 적용할 테넌트 테마 객체
 *
 * @example
 * import { applyTenantTheme, tenantThemePresets } from '@erp/ui';
 *
 * // 서울시 테마 적용
 * applyTenantTheme(tenantThemePresets.seoul);
 *
 * // 이후 Tailwind 클래스에서 자동으로 적용
 * // <button className="bg-primary text-primary-foreground">
 */
export function applyTenantTheme(theme: TenantTheme): void {
    // 브라우저 환경에서만 실행
    if (typeof document === 'undefined') {
        return;
    }

    const root = document.documentElement;

    // 각 색상을 CSS 변수로 설정
    Object.entries(theme.colors).forEach(([key, value]) => {
        // 변수명 생성: primaryForeground -> --color-primary-foreground
        const cssVarName = `--color-${toKebabCase(key)}`;

        // RGB 형식으로 변환하여 설정
        const rgbValue = hexToRgb(value);

        root.style.setProperty(cssVarName, rgbValue);
    });

    // 로컬 스토리지에 현재 테마 ID 저장 (새로고침 후에도 유지)
    try {
        localStorage.setItem('tenant-theme-id', theme.tenantId);
        localStorage.setItem('tenant-name', theme.name);
    } catch (error) {
        // localStorage 사용 불가 시 무시 (Private 브라우징 등)
        console.warn('Could not save theme to localStorage:', error);
    }
}

/**
 * 저장된 테마 ID 불러오기
 *
 * @returns 저장된 테넌트 ID 또는 null
 */
export function getSavedThemeId(): string | null {
    if (typeof localStorage === 'undefined') {
        return null;
    }

    return localStorage.getItem('tenant-theme-id');
}

/**
 * 테마 초기화 (기본 테마로 복원)
 */
export function resetTheme(): void {
    if (typeof document === 'undefined') {
        return;
    }

    const root = document.documentElement;

    // 기본 색상 변수들 초기화
    const defaultColors = [
        'primary',
        'primary-foreground',
        'secondary',
        'secondary-foreground',
        'accent',
        'accent-foreground',
        'muted',
        'muted-foreground',
        'background',
        'foreground',
    ];

    defaultColors.forEach((color) => {
        root.style.removeProperty(`--color-${color}`);
    });

    // 로컬 스토리지 정리
    try {
        localStorage.removeItem('tenant-theme-id');
        localStorage.removeItem('tenant-name');
    } catch {
        // 무시
    }
}

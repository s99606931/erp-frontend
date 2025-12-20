/**
 * ============================================================================
 * 파일명: index.ts
 * 패키지: @erp/ui
 * 경로: packages/ui/src/index.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * @erp/ui 패키지의 메인 진입점
 * 모든 토큰, 컴포넌트, 유틸리티를 내보냅니다.
 *
 * [📦 사용 예시]
 * ```typescript
 * import { cn, colors, Button } from '@erp/ui';
 * ```
 * ============================================================================
 */

// 유틸리티 함수
export { cn } from './lib/utils';

// 테마 관리자
export {
    applyTenantTheme,
    getSavedThemeId,
    resetTheme,
    hexToRgb,
    toKebabCase,
} from './lib/theme-manager';

// 토큰 (개별 import 시 사용)
export * from './tokens';

// 컴포넌트
export * from './components/ui/button';
export * from './components/ui/badge';
export * from './components/ui/card';
export * from './components/ui/input';
export * from './components/ui/label';
export * from './components/ui/table';
export * from './components/ui/dialog';
export * from './components/ui/select';
export * from './components/ui/popover';
export * from './components/ui/calendar';
export * from './components/ui/alert-dialog';
export * from './components/ui/toast';
export * from './components/ui/toaster';
export { useToast, toast } from './components/ui/use-toast';

// 전역 스타일 (앱에서 직접 import)
// import '@erp/ui/globals.css';

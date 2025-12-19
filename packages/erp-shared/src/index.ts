/**
 * ============================================================================
 * 파일명: index.ts
 * 패키지: @erp/shared
 * 경로: packages/erp-shared/src/index.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * @erp/shared 패키지의 메인 진입점
 * ============================================================================
 */

// API
export { apiClient, type ApiError } from './api';

// Types
export * from './types';

// Constants
export { MENU_STRUCTURE, type MenuItem } from './constants';

// Utils
export * from './utils';

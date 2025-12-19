/**
 * ============================================================================
 * 파일명: index.js
 * 패키지: @erp/eslint-config
 * 경로: packages/config/eslint-config/index.js
 * 작성일: 2025-12-19
 * ============================================================================
 * 
 * [파일 설명]
 * 모든 패키지와 앱에서 공유하는 ESLint 설정입니다.
 * Next.js 및 TypeScript 프로젝트에 최적화된 규칙을 정의합니다.
 * 
 * [주요 규칙]
 * - any 타입 사용 금지
 * - 미사용 변수 경고
 * - React Hooks 규칙 적용
 * - 접근성(a11y) 규칙 적용
 * ============================================================================
 */

module.exports = {
    extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    rules: {
        // TypeScript 규칙
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',

        // React 규칙
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',

        // 일반 규칙  
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'prefer-const': 'error',
    },
    ignorePatterns: ['node_modules/', '.next/', 'dist/', 'coverage/'],
};

/**
 * ============================================================================
 * 파일명: index.js
 * 패키지: @erp/prettier-config
 * 경로: packages/config/prettier-config/index.js
 * 작성일: 2025-12-19
 * ============================================================================
 * 
 * [파일 설명]
 * 모든 패키지와 앱에서 공유하는 Prettier 코드 포맷팅 설정입니다.
 * 일관된 코드 스타일을 유지합니다.
 * ============================================================================
 */

module.exports = {
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
    printWidth: 100,
    useTabs: false,
    bracketSpacing: true,
    arrowParens: 'always',
    endOfLine: 'lf',
    plugins: ['prettier-plugin-tailwindcss'],
};

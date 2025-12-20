// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import tseslint from 'typescript-eslint';

export default tseslint.config({
    ignores: ['node_modules/**', '.next/**'],
}, ...tseslint.configs.recommended, {
    rules: {
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'warn',
    },
}, {
    files: ['**/*.d.ts'],
    rules: {
        '@typescript-eslint/no-unused-vars': 'off',
    },
}, storybook.configs["flat/recommended"]);

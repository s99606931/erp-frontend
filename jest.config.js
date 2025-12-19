/** @type {import('jest').Config} */
const config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        // Shell app aliases
        '^@/(.*)$': '<rootDir>/apps/shell/$1',
        // Package aliases
        '^@erp/ui$': '<rootDir>/packages/ui/src/index.ts',
        '^@erp/ui/(.*)$': '<rootDir>/packages/ui/src/$1',
        '^@erp/shared$': '<rootDir>/packages/shared/src/index.ts',
        '^@erp/shared/(.*)$': '<rootDir>/packages/shared/src/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testMatch: [
        '<rootDir>/packages/**/__tests__/**/*.test.{ts,tsx}',
        '<rootDir>/apps/**/__tests__/**/*.test.{ts,tsx}',
    ],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: '<rootDir>/tsconfig.json',
        }],
    },
    collectCoverageFrom: [
        'packages/ui/src/components/**/*.{ts,tsx}',
        'apps/shell/components/**/*.{ts,tsx}',
        '!**/*.stories.{ts,tsx}',
        '!**/node_modules/**',
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
        },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    roots: ['<rootDir>'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/', '/dist/', '/standalone/'],
};

module.exports = config;

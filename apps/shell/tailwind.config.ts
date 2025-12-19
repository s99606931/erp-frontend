/**
 * ============================================================================
 * 파일명: tailwind.config.ts
 * 앱: shell
 * 경로: apps/shell/tailwind.config.ts
 * 작성일: 2025-12-19
 * ============================================================================
 */

import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // 테넌트 테마 색상 (CSS 변수 참조)
                primary: {
                    DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
                    foreground: 'rgb(var(--color-primary-foreground) / <alpha-value>)',
                },
                secondary: {
                    DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
                    foreground: 'rgb(var(--color-secondary-foreground) / <alpha-value>)',
                },
                accent: {
                    DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
                    foreground: 'rgb(var(--color-accent-foreground) / <alpha-value>)',
                },
                muted: {
                    DEFAULT: 'rgb(var(--color-muted) / <alpha-value>)',
                    foreground: 'rgb(var(--color-muted-foreground) / <alpha-value>)',
                },
                background: 'rgb(var(--color-background) / <alpha-value>)',
                foreground: 'rgb(var(--color-foreground) / <alpha-value>)',

                // Semantic
                success: {
                    DEFAULT: 'rgb(var(--color-success) / <alpha-value>)',
                    foreground: 'rgb(var(--color-success-foreground) / <alpha-value>)',
                },
                warning: {
                    DEFAULT: 'rgb(var(--color-warning) / <alpha-value>)',
                    foreground: 'rgb(var(--color-warning-foreground) / <alpha-value>)',
                },
                error: {
                    DEFAULT: 'rgb(var(--color-error) / <alpha-value>)',
                    foreground: 'rgb(var(--color-error-foreground) / <alpha-value>)',
                },

                border: 'rgb(var(--color-border) / <alpha-value>)',
                ring: 'rgb(var(--color-ring) / <alpha-value>)',
                card: {
                    DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
                    foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
                },
                input: 'rgb(var(--color-border) / <alpha-value>)',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './stories/**/*.{js,ts,jsx,tsx,mdx}',
        './.storybook/**/*.{js,ts,jsx,tsx,mdx}',
        '../ui/src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // 브랜드 색상 (CSS 변수 참조)
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

                // 상태별 색상
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
                destructive: {
                    DEFAULT: 'rgb(var(--color-destructive) / <alpha-value>)',
                    foreground: 'rgb(var(--color-destructive-foreground) / <alpha-value>)',
                },

                // UI 요소 색상
                border: 'rgb(var(--color-border) / <alpha-value>)',
                input: 'rgb(var(--color-input) / <alpha-value>)',
                ring: 'rgb(var(--color-ring) / <alpha-value>)',
                card: {
                    DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
                    foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
                },
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

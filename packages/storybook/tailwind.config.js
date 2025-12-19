/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './stories/**/*.{js,ts,jsx,tsx,mdx}',
        './.storybook/**/*.{js,ts,jsx,tsx,mdx}',
        '../ui/src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // CSS 변수를 사용한 동적 테마 색상
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                'primary-foreground': 'rgb(var(--color-primary-foreground) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
                'secondary-foreground': 'rgb(var(--color-secondary-foreground) / <alpha-value>)',
                accent: 'rgb(var(--color-accent) / <alpha-value>)',
                'accent-foreground': 'rgb(var(--color-accent-foreground) / <alpha-value>)',
                muted: 'rgb(var(--color-muted) / <alpha-value>)',
                'muted-foreground': 'rgb(var(--color-muted-foreground) / <alpha-value>)',
                background: 'rgb(var(--color-background) / <alpha-value>)',
                foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
                destructive: 'rgb(var(--color-destructive) / <alpha-value>)',
                'destructive-foreground': 'rgb(var(--color-destructive-foreground) / <alpha-value>)',
                border: 'rgb(var(--color-border) / <alpha-value>)',
                input: 'rgb(var(--color-input) / <alpha-value>)',
                ring: 'rgb(var(--color-ring) / <alpha-value>)',
            },
        },
    },
    plugins: [],
};

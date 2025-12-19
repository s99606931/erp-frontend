# @erp/storybook

공공기관 ERP SaaS 디자인 시스템 문서 및 컴포넌트 카탈로그

## 실행 방법

```bash
# 개발 서버 실행
pnpm dev

# 빌드
pnpm build
```

## 접속 URL

- 개발: http://localhost:6006

## 구조

```
stories/
├── Tokens/           # 디자인 토큰 문서
│   ├── Colors.stories.tsx
│   ├── Typography.stories.tsx
│   └── Spacing.stories.tsx
├── Components/       # UI 컴포넌트 스토리
│   ├── Button.stories.tsx
│   ├── Input.stories.tsx
│   ├── Card.stories.tsx
│   ├── Badge.stories.tsx
│   └── Label.stories.tsx
└── Accessibility/    # 접근성 테스트
    └── KeyboardNavigation.stories.tsx
```

## 접근성 테스트

모든 컴포넌트는 `@storybook/addon-a11y` 애드온으로 WCAG 2.1 AA 기준을 자동 검증합니다.

Accessibility 탭에서 검사 결과를 확인하세요.

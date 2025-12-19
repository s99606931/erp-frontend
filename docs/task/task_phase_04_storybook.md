# Phase 4: Storybook 설정

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)

---

## 📌 목표

UI 컴포넌트 카탈로그 및 접근성 테스트 환경을 구축합니다.

**완료 조건**: `http://localhost:6006` 접속 가능

---

## ✅ 작업 목록

### 4.1 Storybook 설치

```bash
cd packages/storybook
npx storybook@latest init --type nextjs
```

### 4.2 main.ts 설정

```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',         // 접근성 테스트
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/nextjs',
};
```

### 4.3 preview.ts 설정

```typescript
// .storybook/preview.ts
import '@erp/ui/globals.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1f2937' },
      ],
    },
  },
};
```

### 4.4 디자인 토큰 스토리

- `stories/Tokens/Colors.stories.tsx`
- `stories/Tokens/Typography.stories.tsx`
- `stories/Tokens/Spacing.stories.tsx`

### 4.5 컴포넌트 스토리

- `stories/Components/Button.stories.tsx`
- `stories/Components/Input.stories.tsx`
- `stories/Components/Card.stories.tsx`
- `stories/Components/DataGrid.stories.tsx`

### 4.6 접근성 스토리

- `stories/Accessibility/KeyboardNavigation.stories.tsx`

---

## 📊 완료 체크리스트

- [ ] Storybook 실행 (`pnpm storybook`)
- [ ] 토큰 스토리 3개 작성
- [ ] 컴포넌트 스토리 8개 작성
- [ ] **Accessibility 탭 오류 0건**
- [ ] Docker 이미지 빌드 성공

---

## ➡️ 다음 단계

[Phase 5: @erp/shared 패키지](./task_phase_05_shared.md)

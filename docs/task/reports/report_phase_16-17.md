# Phase 16-17 완료보고서: 테스트 및 최적화

> **완료일**: 2025-12-19
> **작성자**: AI Assistant
> **소요시간**: 진행 중

---

## 📋 작업 요약

### 목표
자동화 테스트 및 성능/접근성 최적화

### ✅ 완료 상태

#### Phase 16: 테스트 환경 구축
- [x] 테스트 전략 문서화
- [ ] Jest + RTL 설정
- [ ] 컴포넌트 단위 테스트 작성
- [ ] E2E 테스트 (Playwright) 설정
- [ ] 커버리지 80% 이상

#### Phase 17: 최적화 가이드
- [x] 최적화 체크리스트 정의
- [ ] 이미지 최적화 (Next.js Image)
- [ ] 코드 스플리팅 (dynamic import)
- [ ] Lighthouse 점수 90+

---

## 🧪 테스트 전략

### 테스트 피라미드

```
       ┌───────────┐
       │   E2E     │  10% - 핵심 플로우
       ├───────────┤
       │ Integration│  30% - 컴포넌트 통합
       ├───────────┤
       │   Unit    │  60% - 개별 함수/컴포넌트
       └───────────┘
```

### 테스트 대상

| 패키지 | 테스트 유형 | 대상 |
|--------|------------|------|
| @erp/ui | Unit | Button, Input, Card |
| apps/shell | Integration | LoginForm, Sidebar |
| services/auth | E2E | 로그인 플로우, 2FA |

---

## 📝 테스트 코드 예시

### Unit Test (Button)

```typescript
// packages/ui/src/components/ui/__tests__/button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>저장</Button>);
    expect(screen.getByRole('button', { name: '저장' })).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<Button isLoading>저장</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('disables when loading', async () => {
    const onClick = jest.fn();
    render(<Button isLoading onClick={onClick}>저장</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
```

### E2E Test (Login)

```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('사전 승인된 이메일로 로그인 성공', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[name="email"]', 'approved@seoul.go.kr');
    await page.fill('[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('대시보드');
  });

  test('미승인 이메일은 오류 표시', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[name="email"]', 'unknown@test.com');
    await page.fill('[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('[role="alert"]')).toBeVisible();
  });
});
```

---

## 🚀 최적화 체크리스트

### 성능 최적화

- [ ] Next.js Image 컴포넌트 사용
- [ ] Dynamic import로 코드 분할
- [ ] React.lazy + Suspense
- [ ] 폰트 최적화 (next/font)

### 접근성 최적화

- [x] 모든 이미지에 alt 속성
- [x] 색상 대비 4.5:1 이상
- [x] 포커스 표시 명확
- [x] ARIA 레이블 적용
- [ ] 스크린리더 테스트

### 번들 최적화

- [ ] Tree shaking 확인
- [ ] 미사용 의존성 제거
- [ ] Turborepo 캐싱 활용

---

## 🎯 목표 지표

| 항목 | 목표 | 현재 |
|------|:----:|:----:|
| 테스트 커버리지 | 80% | TBD |
| Lighthouse Performance | 90+ | TBD |
| Lighthouse Accessibility | **90+** | TBD |
| Lighthouse Best Practices | 90+ | TBD |
| WAVE 오류 | 0 | TBD |

---

## ➡️ 다음 단계

**Phase 18**: 최종 검증 및 완료 보고서

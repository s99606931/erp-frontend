# Phase 16-17: 테스트 및 최적화

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)

---

## 📌 목표

자동화 테스트 및 성능/접근성 최적화를 수행합니다.

---

## Phase 16: 테스트 작성

### 16.1 단위 테스트 (Jest + RTL)

```bash
# 실행
pnpm test
pnpm test:coverage  # 커버리지 80% 이상
```

**테스트 대상**:
- `@erp/ui`: Button, Input, DataGrid
- `apps/shell`: Header, Sidebar
- `services/auth/web`: LoginForm, OTPVerification

### 16.2 E2E 테스트 (Playwright)

```typescript
// e2e/login.spec.ts
test('사전 승인된 이메일로 로그인 성공', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'approved@seoul.go.kr');
  await page.fill('[name="password"]', 'SecurePass123!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

### 16.3 접근성 테스트

```bash
# axe-core 자동 테스트
pnpm test:a11y
```

---

## Phase 17: 최적화

### 17.1 성능 최적화

| 항목 | 방법 | 목표 |
|------|------|------|
| 이미지 | Next.js Image | LCP 개선 |
| 코드 분할 | dynamic import | 초기 번들 축소 |
| 폰트 | next/font | CLS 0 |

### 17.2 접근성 검증

```bash
# Lighthouse CLI
lighthouse http://localhost:3000 --output html
```

**목표**:
- Performance: 90+
- Accessibility: **90+**
- Best Practices: 90+

### 17.3 빌드 최적화

```bash
# Turborepo 캐싱 확인
pnpm build
pnpm build  # 2차 빌드 90% 단축
```

---

## 📊 완료 체크리스트

- [ ] 테스트 커버리지 80% 이상
- [ ] E2E 테스트 통과
- [ ] Lighthouse 점수 90+ (모든 앱)
- [ ] WAVE 오류 0건
- [ ] 스크린리더 테스트 통과
- [ ] Turborepo 캐싱 확인

---

## ➡️ 다음 단계

[Phase 18: 완료 보고서](./task_phase_18_report.md)

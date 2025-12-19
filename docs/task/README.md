# 📋 Task 파일 목록

> **작성일**: 2025-12-19
> **프로젝트**: 공공기관 ERP SaaS (Micro Frontend)

---

## ⚠️ 필독 문서

### [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)

**모든 개발자가 반드시 읽어야 할 코딩 지침**:
- 마이크로서비스 독립성 원칙
- 상세 주석 작성 규칙
- Docker 컨테이너화
- 접근성 요구사항

---

## 📁 Phase별 Task 파일

| Phase | 파일명 | 내용 | 예상 시간 |
|:-----:|--------|------|:---------:|
| 1 | [task_phase_01_monorepo.md](./task_phase_01_monorepo.md) | 모노레포 초기 설정 | 2시간 |
| 2 | [task_phase_02_ui_tokens.md](./task_phase_02_ui_tokens.md) | @erp/ui 디자인 토큰 | 4시간 |
| 3 | [task_phase_03_ui_components.md](./task_phase_03_ui_components.md) | UI 컴포넌트 구현 | 8시간 |
| 4 | [task_phase_04_storybook.md](./task_phase_04_storybook.md) | Storybook 설정 | 4시간 |
| 5 | [task_phase_05_shared.md](./task_phase_05_shared.md) | @erp/shared 패키지 | 4시간 |
| 6 | [task_phase_06_shell_basic.md](./task_phase_06_shell_basic.md) | Shell 앱 기본 | 6시간 |
| 7 | [task_phase_07_shell_layout.md](./task_phase_07_shell_layout.md) | Shell 레이아웃 | 8시간 |
| 8 | [task_phase_08_shell_advanced.md](./task_phase_08_shell_advanced.md) | Shell 고급 기능 | 6시간 |
| 9 | [task_phase_09_auth_web.md](./task_phase_09_auth_web.md) | auth-web 서비스 | 8시간 |
| 10-15 | [task_phase_10-15_services.md](./task_phase_10-15_services.md) | 나머지 서비스 | 40시간 |
| 16-17 | [task_phase_16-17_test.md](./task_phase_16-17_test.md) | 테스트 및 최적화 | 16시간 |
| 18 | [task_phase_18_report.md](./task_phase_18_report.md) | 완료 보고서 | 4시간 |

**총 예상 시간**: 약 110시간 (2-3주)

---

## 🚀 시작 방법

```bash
# 1. 코딩 지침 숙지 (필수!)
cat docs/task/CODING_GUIDELINES.md

# 2. Phase 1부터 순차 진행
cat docs/task/task_phase_01_monorepo.md
```

---

## ✅ 각 Task 공통 체크리스트

- [ ] [CODING_GUIDELINES.md](./CODING_GUIDELINES.md) 숙지
- [ ] 모든 파일 **파일 헤더 주석** 작성
- [ ] 모든 함수/컴포넌트 **JSDoc 주석** 작성
- [ ] TypeScript 타입 명시 (any 금지)
- [ ] 접근성 검증 (Lighthouse 90+)
- [ ] Docker 이미지 빌드 성공
- [ ] **독립 실행** 확인 (다른 서비스 의존 X)

---

## 📚 참고 문서

| 문서 | 경로 | 용도 |
|------|------|------|
| PRD | [../PRD_MAIN_UI.md](../PRD_MAIN_UI.md) | 요구사항 정의 |
| 디자인 규칙 | [../DESIGN_SYSTEM_RULES.md](../DESIGN_SYSTEM_RULES.md) | 디자인 시스템 |
| 구현 계획 | [../implementation_plan.md](../implementation_plan.md) | 전체 계획 |

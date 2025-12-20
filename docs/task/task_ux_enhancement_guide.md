# UI/UX 고도화 프로젝트 Task 가이드

> **문서 버전**: 1.0  
> **작성일**: 2025-12-20  
> **관련 PRD**: [PRD_UX_ENHANCEMENT.md](../../.agent/docs/PRD_UX_ENHANCEMENT.md)

---

## 📋 프로젝트 개요

VS Code 수준의 생산성과 현대적 UX를 제공하는 공공기관 ERP 시스템 UI/UX 고도화 프로젝트입니다.

### 목표

- ✅ 윈도우 시스템 (탭, 분할 뷰, 플로팅 윈도우)
- ✅ 패널 크기 조정 (리사이저블 패널)
- ✅ 드래그 앤 드롭
- ✅ 커맨드 팔레트
- ✅ AI 어시스턴트 패널
- ✅ 키보드 단축키
- ✅ 모던 디자인 시스템

---

## 🚀 Phase 목록

| Phase | 제목 | 예상 기간 | 완료 조건 |
|:-----:|------|:--------:|----------|
| 20 | [리사이저블 패널 기반](./task_phase_20_resizable_panels.md) | 1주 | 패널 크기 조정 동작 |
| 21 | [탭 시스템](./task_phase_21_tab_system.md) | 1주 | 다중 탭 열기/닫기/전환 |
| 22 | [분할 뷰](./task_phase_22_split_view.md) | 1주 | 수평/수직 분할 동작 |
| 23 | [커맨드 팔레트](./task_phase_23_command_palette.md) | 1주 | Ctrl+Shift+P 검색 동작 |
| 24 | [AI 패널 기본](./task_phase_24_ai_panel_basic.md) | 1주 | AI 버튼 및 패널 열기 |
| 25 | [AI 대화 기능](./task_phase_25_ai_chat.md) | 1주 | 메시지 전송/응답 표시 |
| 26 | [키보드 단축키](./task_phase_26_keyboard_shortcuts.md) | 1주 | 글로벌 단축키 동작 |
| 27 | [다크 모드](./task_phase_27_dark_mode.md) | 3일 | 테마 전환 동작 |
| 28 | [드래그 앤 드롭](./task_phase_28_drag_drop.md) | 1주 | 탭/카드 드래그 동작 |
| 29 | [마이크로 애니메이션](./task_phase_29_animations.md) | 3일 | 호버/전환 애니메이션 |

---

## ⚠️ 필수 준수사항

### 시작 전 필독 문서

1. **[CODING_GUIDELINES.md](./CODING_GUIDELINES.md)** - 코딩 규칙 (필수!)
2. **[PRD_UX_ENHANCEMENT.md](../../.agent/docs/PRD_UX_ENHANCEMENT.md)** - 기능 요구사항
3. **[DESIGN_SYSTEM_RULES.md](../../.agent/docs/DESIGN_SYSTEM_RULES.md)** - 디자인 규칙

### 코드 작성 규칙

1. **모든 파일에 헤더 주석 필수**
2. **모든 함수에 JSDoc 주석 필수**
3. **초급 개발자가 이해할 수 있는 상세 설명**
4. **pnpm만 사용 (npm/yarn 금지)**
5. **any 타입 사용 금지**

---

## 📦 설치할 패키지 (전체)

```bash
# 리사이저블 패널
pnpm add react-resizable-panels

# 드래그 앤 드롭
pnpm add @dnd-kit/core @dnd-kit/sortable

# 커맨드 팔레트
pnpm add cmdk

# 애니메이션
pnpm add framer-motion

# AI 관련
pnpm add ai @langchain/core recharts react-markdown
```

---

## 📊 완료 체크리스트 (전체)

- [ ] Phase 20: 리사이저블 패널
- [ ] Phase 21: 탭 시스템
- [ ] Phase 22: 분할 뷰
- [ ] Phase 23: 커맨드 팔레트
- [ ] Phase 24: AI 패널 기본
- [ ] Phase 25: AI 대화 기능
- [ ] Phase 26: 키보드 단축키
- [ ] Phase 27: 다크 모드
- [ ] Phase 28: 드래그 앤 드롭
- [ ] Phase 29: 마이크로 애니메이션
- [ ] 완료 보고서 작성

---

## 📚 용어 사전

| 용어 | 설명 |
|------|------|
| **리사이저블 패널** | 드래그로 크기를 조정할 수 있는 패널 |
| **커맨드 팔레트** | Ctrl+Shift+P로 열리는 명령 검색창 |
| **분할 뷰** | 화면을 여러 패널로 나누는 기능 |
| **FAB** | Floating Action Button, 플로팅 버튼 |
| **Agent 모드** | AI가 여러 작업을 자동으로 수행하는 모드 |

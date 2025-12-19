# Phase 7: Shell 레이아웃 컴포넌트

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)

---

## 📌 목표

Header, Sidebar, StatusBar, WorkspaceTabs 컴포넌트를 구현합니다.

**완료 조건**: `Ctrl+B` 사이드바 토글, `/` 검색 포커스

---

## ✅ 작업 목록

### 7.1 Header (`components/layout/header.tsx`)

**구성요소**:
- 기관 로고 (테넌트별)
- 통합 검색바 (`/` 키 포커스)
- 알림 아이콘
- 즐겨찾기 드롭다운
- 사용자 프로필 드롭다운

**접근성**:
- 모든 버튼 aria-label
- 드롭다운 키보드 네비게이션

### 7.2 Sidebar (`components/layout/sidebar.tsx`)

**기능**:
- 메뉴 트리 (3 Depth)
- 즐겨찾기 섹션
- 최근 사용 메뉴
- 검색 필터
- `Ctrl+B` 토글

**키보드 네비게이션**:
- ↑↓: 메뉴 이동
- Enter: 선택
- Escape: 닫기
- →: 하위 메뉴 펼침
- ←: 상위 메뉴로

### 7.3 StatusBar (`components/layout/status-bar.tsx`)

**구성요소**:
- 사용자 정보 (이름, 부서)
- 시스템 상태
- 세션 남은 시간 (30분 타이머)

### 7.4 WorkspaceTabs (`components/layout/workspace-tabs.tsx`)

**기능**:
- 탭 추가/닫기
- 탭 고정 (Pin)
- 드래그 재정렬
- `Ctrl+Tab` 탭 전환
- 로컬 스토리지 저장/복원

---

## 📊 완료 체크리스트

- [ ] Header 구현
- [ ] Sidebar 구현 (키보드 네비게이션)
- [ ] StatusBar 구현
- [ ] WorkspaceTabs 구현
- [ ] `Ctrl+B` 토글 작동
- [ ] `/` 검색 포커스 작동
- [ ] 모든 컴포넌트 **JSDoc 주석**

---

## ➡️ 다음 단계

[Phase 8: Shell 고급 기능](./task_phase_08_shell_advanced.md)

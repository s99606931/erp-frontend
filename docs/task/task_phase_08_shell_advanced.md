# Phase 8: Shell 고급 기능

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)

---

## 📌 목표

통합 검색, AI 어시스턴트, 단축키 시스템을 구현합니다.

**완료 조건**: 모든 단축키 작동, AI 채팅 UI 표시

---

## ✅ 작업 목록

### 8.1 통합 검색 (`components/features/global-search.tsx`)

**기능**:
- 실시간 검색 (debounce 300ms)
- 검색 결과 드롭다운:
  - 메뉴 (아이콘 + 경로)
  - 문서 (최근 수정일)
  - 데이터 (미리보기)
- 최근 검색어 저장
- 키보드 네비게이션

### 8.2 AI 어시스턴트 (`components/features/ai-assistant.tsx`)

**UI 구성**:
- 우측 하단 플로팅 버튼 (FAB)
- 우측 슬라이드 패널 (300px~600px)
- 패널 크기 드래그 조절
- 채팅 메시지 목록
- 입력창 (Enter 전송)

**초기 버전**: 모의 응답 (실제 AI 연동은 향후)

### 8.3 단축키 시스템

```typescript
// hooks/use-shortcuts.ts
const SHORTCUTS = {
  'Ctrl+B': () => toggleSidebar(),
  'Ctrl+Tab': () => nextTab(),
  'Ctrl+Shift+F': () => openSearch(),
  '/': () => focusSearch(),
  'F6': () => nextRegion(),
  'Escape': () => closeModal(),
};
```

### 8.4 세션 타임아웃 (`hooks/use-session-timeout.ts`)

**30분 무활동 시 자동 로그아웃**:
- 마우스/키보드 이벤트로 타이머 리셋
- 5분 전 경고 알림
- 로그아웃 시 로그인 페이지로 리다이렉트

### 8.5 서비스 로더 (`components/features/service-loader.tsx`)

**iframe 방식**:
```tsx
<iframe
  src={`http://localhost:${service.port}`}
  title={service.name}
  className="w-full h-full border-0"
/>
```

---

## 📊 완료 체크리스트

- [ ] 통합 검색 구현
- [ ] AI 어시스턴트 UI
- [ ] 단축키 시스템
- [ ] 세션 타임아웃 (30분)
- [ ] 서비스 로더 구현
- [ ] 모든 기능 **키보드 접근** 가능

---

## ➡️ 다음 단계

[Phase 9: auth-web 서비스](./task_phase_09_auth_web.md)

# Phase 6: Shell 앱 기본 구조

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)

---

## 📌 목표

Shell 앱의 기본 구조와 로그인 페이지를 구현합니다.

**완료 조건**: `http://localhost:3000/login` 접속 가능

---

## ✅ 작업 목록

### 6.1 Next.js 프로젝트 생성

```bash
cd apps/shell
npx create-next-app@latest . --typescript --tailwind --app
```

### 6.2 로그인 페이지 (`app/(auth)/login/page.tsx`)

**기능**:
- 이메일/비밀번호 입력
- React Hook Form + Zod 유효성 검사
- 로딩 스피너
- 오류 메시지 (aria-live)

**접근성**:
- Tab 키 탐색
- 스크린리더 지원

### 6.3 NextAuth 설정

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
```

### 6.4 테마 Provider

```typescript
// components/providers/theme-provider.tsx
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light">
      {children}
    </NextThemesProvider>
  );
}
```

### 6.5 대시보드 레이아웃

```typescript
// app/(dashboard)/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
        <StatusBar />
      </div>
    </div>
  );
}
```

---

## 📊 완료 체크리스트

- [ ] 로그인 페이지 구현
- [ ] NextAuth 설정 (네이버/카카오/구글)
- [ ] 테마 Provider 설정
- [ ] 대시보드 레이아웃 구현
- [ ] **Tab 키 탐색** 작동
- [ ] Docker 이미지 빌드 성공

---

## ➡️ 다음 단계

[Phase 7: Shell 레이아웃](./task_phase_07_shell_layout.md)

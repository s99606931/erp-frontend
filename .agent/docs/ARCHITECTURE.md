# 🏗️ 시스템 아키텍처 문서

> **문서 목적**: ERP SaaS 시스템의 전체 아키텍처 설명
> **대상 독자**: 개발자, 아키텍트, 신규 팀원
> **마지막 업데이트**: 2025-12-20

---

## 📋 개요

공공기관 ERP SaaS는 **Micro Frontend** 아키텍처를 기반으로 구축되어, 각 서비스가 독립적으로 개발, 테스트, 배포될 수 있습니다.

---

## 🏛️ 전체 시스템 구조

```
┌─────────────────────────────────────────────────────────────────────┐
│                        사용자 브라우저                               │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────────┐
│                      Shell App (Container)                          │
│                         Port: 3000                                  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ Header │ Sidebar │ Main Content (Service Loader) │ StatusBar │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼───────┐    ┌────────▼────────┐    ┌───────▼───────┐
│  auth-web     │    │   hrm-web       │    │ payroll-web   │
│  Port: 3001   │    │   Port: 3010    │    │ Port: 3011    │
│  (인증)       │    │   (인사관리)     │    │ (급여관리)    │
└───────────────┘    └─────────────────┘    └───────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────────┐
│                       공통 패키지                                    │
│   @erp/ui (디자인 시스템) │ @erp/shared (비즈니스 로직) │ @erp/config │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📦 패키지 구조

### 1. apps/shell (Shell 앱)

**역할**: 모든 마이크로 프론트엔드를 통합하는 컨테이너
**포트**: 3000

```
apps/shell/
├── app/                    # Next.js App Router
│   ├── (auth)/             # 인증 라우트 그룹
│   │   └── login/          # 로그인 페이지
│   ├── api/auth/           # NextAuth API
│   └── layout.tsx          # 루트 레이아웃
├── components/
│   ├── layout/             # Header, Sidebar, StatusBar
│   ├── auth/               # 로그인 폼
│   └── features/           # 검색, AI 어시스턴트
├── auth.ts                 # NextAuth 설정
└── middleware.ts           # 인증 미들웨어
```

### 2. services/* (마이크로 프론트엔드)

각 서비스는 독립적인 Next.js 앱으로 구성

```
services/{domain}/web/
├── app/                    # Next.js App Router
├── components/             # 서비스 전용 컴포넌트
├── Dockerfile              # Docker 빌드
└── package.json            # 의존성
```

### 3. packages/ui (디자인 시스템)

```
packages/ui/
├── src/
│   ├── components/ui/      # Button, Input, Card 등
│   ├── tokens/             # 색상, 타이포그래피, 테마
│   ├── lib/                # 유틸리티, 테마 매니저
│   └── globals.css         # 전역 스타일
└── package.json
```

### 4. packages/shared (공통 로직)

```
packages/shared/
├── src/
│   ├── api/                # API 클라이언트
│   ├── types/              # 공통 타입
│   ├── utils/              # 유틸리티 함수
│   └── constants/          # 상수
└── package.json
```

---

## 🔄 서비스 통신

### 마이크로 프론트엔드 로딩

Shell 앱은 iframe 또는 Module Federation을 통해 각 서비스를 로딩

### 서비스 간 통신

서비스 간 직접 import는 **금지**! API 통신만 허용

---

## 🎨 멀티 테넌트 테마

### 테마 적용 흐름

```
로그인 → 테넌트 식별 → 테마 프리셋 로드 → CSS 변수 적용
```

### 커스터마이징 색상 (10가지)

| CSS 변수 | 용도 |
|----------|------|
| `--color-primary` | 주요 브랜드 색상 |
| `--color-secondary` | 보조 색상 |
| `--color-accent` | 강조 색상 |
| `--color-muted` | 비활성/배경 |
| `--color-background` | 기본 배경 |

---

## 🐳 Docker 배포

```bash
# 전체 서비스 빌드 & 실행
docker-compose up -d --build
```

---

## 📚 관련 문서

- [PRD_MAIN_UI.md](PRD_MAIN_UI.md) - 요구사항 정의서
- [DESIGN_SYSTEM_RULES.md](DESIGN_SYSTEM_RULES.md) - 디자인 규칙
- [CODING_GUIDELINES.md](CODING_GUIDELINES.md) - 코딩 지침

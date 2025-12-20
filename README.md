# 🏛️ 공공기관 ERP SaaS (Micro Frontend)

> **프로젝트**: 공공기관 통합 ERP 시스템
> **아키텍처**: Micro Frontend + Monorepo
> **마지막 업데이트**: 2025-12-20

---

## 📋 개요

VS Code 수준의 생산성을 제공하는 **"업무용 운영체제"** 개념의 SaaS ERP 시스템입니다.

### 핵심 특징

| 특징 | 설명 |
|------|------|
| **Micro Frontend** | 17개 독립 배포 가능한 서비스 |
| **멀티 테넌트** | 10개 공공기관 테마 지원 |
| **접근성** | WCAG 2.1 AA 완벽 준수 |
| **보안** | 2FA, 세션 타임아웃, 감사 로그 |
| **AI 어시스턴트** | 자연어 업무 지원 |

---

## 🚀 빠른 시작

### 사전 요구사항

- **Node.js** 20.x 이상
- **pnpm** 8.x 이상 (필수!)
- **Docker** (선택, 배포용)

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/s99606931/erp-frontend.git
cd erp-frontend

# 2. 의존성 설치
pnpm install

# 3. 개발 서버 실행
pnpm dev

# 4. 브라우저에서 접속
🚀 서비스 가동 현황
현재 모노레포 내의 모든 주요 프로젝트가 개발 모드로 가동 중입니다:

메인 셸(Shell) 앱: http://localhost:3000
스토리북(Storybook): http://localhost:6006
인증 서비스(Auth): http://localhost:3001
인사 관리 서비스(HRM): http://localhost:3010
급여 관리 서비스(Payroll): http://localhost:3011
```

### 개별 서비스 실행

```bash
pnpm --filter shell dev           # Shell 앱 (localhost:3000)
pnpm --filter @erp/auth-web dev   # 인증 서비스 (localhost:3001)
pnpm --filter @erp/hrm-web dev    # 인사관리 (localhost:3010)
pnpm --filter @erp/storybook dev  # Storybook (localhost:6006)
```

---

## 🏗️ 프로젝트 구조

```
erp-frontend/
├── apps/
│   └── shell/                    # Shell 앱 (컨테이너) - Port 3000
│
├── services/                     # 마이크로 프론트엔드 서비스
│   ├── auth/web/                 # 인증 서비스 - Port 3001
│   ├── hrm/web/                  # 인사관리 - Port 3010
│   └── payroll/web/              # 급여관리 - Port 3011
│
├── packages/
│   ├── ui/                       # @erp/ui 디자인 시스템
│   ├── shared/                   # @erp/shared 공통 로직
│   ├── config/                   # @erp/config 공통 설정
│   └── storybook/                # 컴포넌트 카탈로그
│
├── docs/                         # 문서
│   ├── PRD_MAIN_UI.md            # 요구사항 정의서
│   ├── DESIGN_SYSTEM_RULES.md    # 디자인 시스템 규칙
│   └── task/                     # Task 파일 및 완료 보고서
│
├── docker-compose.yml            # Docker 통합 실행
├── pnpm-workspace.yaml           # 워크스페이스 설정
└── turbo.json                    # Turborepo 파이프라인
```

---

## 🐳 서비스 포트 맵

| 서비스 | 포트 | 패키지명 | 설명 |
|--------|:----:|----------|------|
| shell | 3000 | @erp/shell | Shell 앱 (컨테이너) |
| auth-web | 3001 | @erp/auth-web | 인증 서비스 |
| hrm-web | 3010 | @erp/hrm-web | 인사관리 |
| payroll-web | 3011 | @erp/payroll-web | 급여관리 |
| storybook | 6006 | @erp/storybook | 컴포넌트 카탈로그 |

---

## 📦 공통 스크립트

```bash
# 개발
pnpm dev                    # 전체 개발 서버 실행
pnpm build                  # 전체 빌드

# 검증
pnpm typecheck              # TypeScript 타입 검사
pnpm lint                   # ESLint 검사
pnpm test                   # 테스트 실행

# Docker
docker-compose up -d        # 전체 서비스 실행
docker-compose logs -f      # 로그 확인
docker-compose down         # 중지
```

---

## 🧪 테스트 계정

| 이메일 | 비밀번호 | 역할 |
|--------|----------|------|
| `admin@gov.go.kr` | `1234` | SUPER_ADMIN |

---

## 📚 문서

| 문서 | 설명 |
|------|------|
| [PRD_MAIN_UI.md](docs/PRD_MAIN_UI.md) | 요구사항 정의서 |
| [DESIGN_SYSTEM_RULES.md](docs/DESIGN_SYSTEM_RULES.md) | 디자인 시스템 규칙 |
| [STORYBOOK_GUIDE.md](docs/STORYBOOK_GUIDE.md) | Storybook 사용 가이드 |
| [CODING_GUIDELINES.md](docs/task/CODING_GUIDELINES.md) | 코딩 지침 |
| [완료 보고서](docs/task/reports/README.md) | Phase별 완료 보고서 |

---

## 🤝 기여 가이드

1. [CODING_GUIDELINES.md](docs/task/CODING_GUIDELINES.md)를 먼저 읽어주세요
2. `pnpm`만 사용합니다 (npm/yarn 금지)
3. PR 전 `pnpm lint && pnpm typecheck && pnpm test` 실행

---

## 📄 라이선스

Private - All Rights Reserved

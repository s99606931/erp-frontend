# Phase 1: 모노레포 초기 설정

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)

---

## 📌 목표

pnpm workspace + Turborepo로 모노레포 기반을 구축합니다.

**완료 조건**: `pnpm install` 및 `pnpm build` 성공

---

## ✅ 작업 목록

### 1.1 pnpm workspace 설정

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "services/*/web"
  - "packages/*"
```

### 1.2 루트 package.json

```json
{
  "name": "erp-saas-monorepo",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "^1.11.0",
    "typescript": "^5.3.3"
  }
}
```

### 1.3 turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": { "cache": false, "persistent": true },
    "test": { "dependsOn": ["build"] },
    "lint": {}
  }
}
```

### 1.4 폴더 구조 생성

```bash
mkdir -p apps/shell
mkdir -p services/{auth,tenant,user,hrm,payroll}/web
mkdir -p packages/{ui,erp-shared,config,storybook}
```

### 1.5 TypeScript 공통 설정

- `packages/config/typescript-config/base.json`
- `packages/config/typescript-config/nextjs.json`

### 1.6 ESLint/Prettier 설정

- `packages/config/eslint-config/index.js`
- `packages/config/prettier-config/index.js`

---

## 📊 완료 체크리스트

- [ ] `pnpm install` 성공
- [ ] `pnpm build --dry` 빌드 순서 표시
- [ ] 폴더 구조 일치
- [ ] 모든 설정 파일에 **주석 추가**

---

## ➡️ 다음 단계

[Phase 2: @erp/ui 디자인 토큰](./task_phase_02_ui_tokens.md)

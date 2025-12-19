# Phase 9: auth-web 서비스 (인증)

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)
> 
> **🐳 독립 배포**: 이 서비스는 Docker 컨테이너로 **독립 배포**됩니다.

---

## 📌 목표

사전 승인 이메일 로그인, 소셜 로그인 연동, 2FA를 구현합니다.

**포트**: 3001
**Docker 이미지**: `erp/auth-web:latest`

---

## ✅ 작업 목록

### 9.1 프로젝트 설정

```bash
cd services/auth/web
npx create-next-app@latest . --typescript --tailwind --app
```

```json
// package.json
{
  "name": "@erp/auth-web",
  "dependencies": {
    "@erp/ui": "workspace:*",
    "@erp/shared": "workspace:*",
    "next-auth": "^5.0.0"
  }
}
```

### 9.2 사전 승인 이메일 검증

```typescript
/**
 * 관리자가 등록한 이메일만 로그인 허용
 * 회원가입 기능 없음!
 */
async function validatePreApprovedEmail(email: string) {
  const response = await apiClient.post('/auth/check-email', { email });
  if (!response.data.isApproved) {
    throw new Error('승인되지 않은 이메일입니다.');
  }
}
```

### 9.3 소셜 로그인 연동

- 네이버 로그인 (Naver Login API)
- 카카오 로그인 (Kakao Login API)
- 구글 로그인 (Google OAuth 2.0)

**로그인 후** 계정 연동 (최대 3개)

### 9.4 2FA (OTP) 구현

```typescript
import speakeasy from 'speakeasy';

export function verifyOTP(userId: string, token: string) {
  const secret = getUserSecret(userId);
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 2,
  });
}
```

### 9.5 비밀번호 정책

```typescript
const passwordSchema = z.string()
  .min(10, '최소 10자')
  .regex(/[a-z]/, '소문자 필수')
  .regex(/[A-Z]/, '대문자 필수')
  .regex(/[0-9]/, '숫자 필수')
  .regex(/[!@#$%^&*]/, '특수문자 필수');
```

### 9.6 Dockerfile

```dockerfile
FROM node:20-alpine AS runner
EXPOSE 3001
ENV PORT=3001
CMD ["node", "server.js"]
```

---

## 📊 완료 체크리스트

- [ ] 사전 승인 이메일 검증
- [ ] 소셜 로그인 3종 (네이버/카카오/구글)
- [ ] 2FA (OTP) 구현
- [ ] 비밀번호 정책 적용
- [ ] Docker 이미지 빌드
- [ ] **독립 실행** 확인 (다른 서비스 없이)

---

## ➡️ 다음 단계

[Phase 10-15: 나머지 서비스](./task_phase_10-15_services.md)

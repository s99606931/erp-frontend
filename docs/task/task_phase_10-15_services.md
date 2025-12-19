# Phase 10-15: 나머지 마이크로서비스

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)
> 
> **🐳 독립 배포**: 각 서비스는 Docker 컨테이너로 **독립 배포**됩니다.

---

## 📌 목표

나머지 마이크로서비스를 독립적으로 구현합니다.

---

## ✅ 서비스 목록

### Phase 10: tenant-web (포트 3002)

**기능**: 테넌트 관리, 테마 설정

- 테넌트 목록/상세
- 10가지 색상 테마 편집기
- 로고 업로드
- 도메인 설정

### Phase 11: hrm-web (포트 3010)

**기능**: 인사관리

- 사원 목록 (DataGrid 10만 건)
- 인사카드 조회/출력
- 재직증명서 발급
- 조직도

### Phase 12: payroll-web (포트 3011)

**기능**: 급여관리

- 급여 계산 로직
- 급여명세서 생성/출력
- 연말정산 자료

### Phase 13: approval-web (포트 3017)

**기능**: 전자결재

- 기안 작성
- 결재선 설정
- 결재 승인/반려
- 결재 현황 조회

### Phase 14: 기타 서비스

- user-web (3003): 사용자 관리
- budget-web (3012): 예산관리
- attendance-web (3013): 복무관리
- accounting-web (3014): 회계관리
- asset-web (3015): 자산관리

### Phase 15: 추가 서비스

- inventory-web (3016): 물품관리
- vehicle-web (3018): 차량관리
- report-web (3019): 보고서
- revenue-web (3020): 수입관리
- expenditure-web (3021): 지출관리

---

## 🛠️ 공통 구조

```
services/{service}/web/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # 리스트
│   ├── [id]/page.tsx         # 상세
│   └── create/page.tsx       # 생성
├── components/
├── lib/api.ts
├── Dockerfile
└── package.json
```

---

## 📊 각 서비스 완료 체크리스트

- [ ] 기본 CRUD 구현
- [ ] DataGrid 대량 데이터 처리
- [ ] 접근성 검증 (Lighthouse 90+)
- [ ] Docker 빌드 성공
- [ ] **독립 실행** 확인
- [ ] 모든 파일 **JSDoc 주석**

---

## ➡️ 다음 단계

[Phase 16-17: 테스트 및 최적화](./task_phase_16-17_test.md)

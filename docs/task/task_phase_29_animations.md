# Phase 29: 마이크로 애니메이션

> **⚠️ 시작 전 필독**: [CODING_GUIDELINES.md](./CODING_GUIDELINES.md)  
> **📋 관련 PRD**: [PRD_UX_ENHANCEMENT.md](../../.agent/docs/PRD_UX_ENHANCEMENT.md) - 섹션 11.4

---

## 📌 목표

버튼 호버, 카드 전환 등에 부드러운 마이크로 애니메이션을 적용하여 사용자 경험을 향상시킵니다.

**완료 조건**: 
- 버튼 호버 애니메이션
- 카드 호버 애니메이션
- 모달/패널 전환 애니메이션
- prefers-reduced-motion 지원

---

## 🎯 학습 목표

1. CSS 트랜지션과 애니메이션
2. framer-motion 라이브러리 사용
3. 접근성을 고려한 모션 설계

---

## ✅ 작업 목록

### 29.1 패키지 설치

```bash
pnpm add framer-motion
```

---

### 29.2 애니메이션 토큰 정의

**파일 위치**: `packages/ui/src/tokens/animation.ts`

```typescript
/**
 * ============================================================================
 * 파일명: animation.ts
 * 설명: 애니메이션 관련 디자인 토큰
 * ============================================================================
 * 
 * [📄 파일 설명]
 * 전체 앱에서 일관된 애니메이션을 위한 토큰을 정의합니다.
 * 
 * [🎯 사용 목적]
 * 1. 일관된 애니메이션 타이밍
 * 2. 접근성 지원 (reduced-motion)
 * 3. 유지보수 용이성
 * ============================================================================
 */

/**
 * 애니메이션 지속 시간 (밀리초)
 */
export const duration = {
  /** 즉시 (텍스트 변경) */
  instant: 0,
  /** 빠름 (버튼 호버) */
  fast: 100,
  /** 보통 (메뉴 열림/닫힘) */
  normal: 200,
  /** 느림 (모달 페이드) */
  slow: 300,
  /** 의도적 (페이지 전환) */
  deliberate: 500,
} as const;

/**
 * 이징 함수 (CSS cubic-bezier)
 */
export const easing = {
  /** 열림, 나타남 */
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  /** 닫힘, 사라짐 */
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  /** 상태 변경 */
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** 부드러운 스프링 */
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

/**
 * framer-motion용 트랜지션 프리셋
 */
export const transition = {
  fast: { duration: 0.1, ease: [0, 0, 0.2, 1] },
  normal: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  slow: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  spring: { type: 'spring', stiffness: 300, damping: 20 },
} as const;
```

---

### 29.3 버튼 호버 애니메이션

**파일 수정**: `packages/ui/src/components/ui/button.tsx`

```tsx
/**
 * 호버 시 살짝 떠오르는 효과 추가
 */
const buttonVariants = cva(
  `inline-flex items-center justify-center ... 
   transition-all duration-150 ease-out
   hover:-translate-y-0.5 hover:shadow-md
   active:translate-y-0 active:shadow-sm`,
  // ...
);
```

---

### 29.4 framer-motion 애니메이션 래퍼

**파일 위치**: `apps/shell/components/ui/animated.tsx`

```tsx
/**
 * ============================================================================
 * 파일명: animated.tsx
 * 설명: framer-motion 애니메이션 래퍼 컴포넌트 모음
 * ============================================================================
 */

'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * 페이드 인/아웃 애니메이션 래퍼
 */
export function FadeIn({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * 슬라이드 업 애니메이션 래퍼
 */
export function SlideUp({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * 슬라이드 인 (우측에서) 애니메이션 래퍼
 */
export function SlideInFromRight({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * 스케일 팝 애니메이션 래퍼
 */
export function ScalePop({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * 목록 아이템 스태거 애니메이션
 */
export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05, // 각 아이템마다 50ms 딜레이
      duration: 0.3,
    },
  }),
};

/**
 * AnimatePresence로 감싸진 조건부 렌더링 래퍼
 */
export function AnimatedPresence({ 
  show, 
  children 
}: { 
  show: boolean; 
  children: ReactNode 
}) {
  return (
    <AnimatePresence mode="wait">
      {show && children}
    </AnimatePresence>
  );
}
```

---

### 29.5 접근성: 모션 축소 지원

**파일 추가**: `apps/shell/app/globals.css`

```css
/**
 * 시스템 설정에서 "모션 줄이기"를 활성화한 사용자를 위한 스타일
 * 애니메이션을 비활성화하여 불편함을 줄입니다.
 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

### 29.6 useReducedMotion 훅

**파일 위치**: `apps/shell/hooks/use-reduced-motion.ts`

```typescript
/**
 * ============================================================================
 * 파일명: use-reduced-motion.ts
 * 설명: 시스템의 모션 축소 설정을 감지하는 훅
 * ============================================================================
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * 사용자의 모션 축소 설정을 감지합니다
 * 
 * @returns true면 모션 축소 활성화 상태
 * 
 * @example
 * const prefersReducedMotion = useReducedMotion();
 * 
 * return (
 *   <motion.div
 *     animate={{ x: prefersReducedMotion ? 0 : 100 }}
 *   />
 * );
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // 미디어 쿼리 객체 생성
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // 초기값 설정
    setPrefersReducedMotion(mediaQuery.matches);
    
    // 변경 감지
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handler);
    
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);
  
  return prefersReducedMotion;
}
```

---

## 📊 완료 체크리스트

- [ ] `framer-motion` 패키지 설치
- [ ] 애니메이션 토큰 정의
- [ ] 애니메이션 래퍼 컴포넌트 생성
- [ ] 버튼 호버 애니메이션 적용
- [ ] 카드 호버 애니메이션 적용
- [ ] 모달/패널 전환 애니메이션
- [ ] prefers-reduced-motion CSS 추가
- [ ] useReducedMotion 훅 생성

---

## 🔧 테스트 방법

1. 버튼 호버 시 살짝 떠오르는 효과 확인
2. 카드 호버 시 그림자 확대 효과 확인
3. AI 패널 열기/닫기 슬라이드 애니메이션 확인
4. 시스템 설정에서 "모션 줄이기" 활성화 후 재확인

---

## ⚠️ 접근성 주의사항

> [!IMPORTANT]
> 일부 사용자는 애니메이션으로 인해 어지러움이나 불편함을 느낄 수 있습니다.
> 반드시 `prefers-reduced-motion` 미디어 쿼리를 지원해야 합니다.

---

## ➡️ 완료 후

모든 Phase가 완료되면 [완료 보고서](./reports/REPORT_UX_ENHANCEMENT_TEMPLATE.md)를 작성합니다.

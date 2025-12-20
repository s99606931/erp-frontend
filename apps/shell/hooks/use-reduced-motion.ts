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
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Media Query Check
    if (typeof window === 'undefined') return;

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

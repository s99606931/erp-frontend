/**
 * ============================================================================
 * 파일명: animated.tsx
 * 설명: framer-motion 애니메이션 래퍼 컴포넌트 모음
 * ============================================================================
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * 페이드 인/아웃 애니메이션 래퍼
 */
export function FadeIn({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * 슬라이드 업 애니메이션 래퍼
 */
export function SlideUp({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * 슬라이드 인 (우측에서) 애니메이션 래퍼
 */
export function SlideInFromRight({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * 스케일 팝 애니메이션 래퍼
 */
export function ScalePop({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
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

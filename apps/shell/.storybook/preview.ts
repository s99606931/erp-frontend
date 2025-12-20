/**
 * ============================================================================
 * 파일명: preview.ts
 * 경로: apps/shell/.storybook/preview.ts
 * 설명: Storybook 미리보기 설정 - 전역 스타일 및 데코레이터 적용
 * 작성일: 2025-12-20
 * ============================================================================
 */

import type { Preview } from '@storybook/nextjs-vite';

// 프로젝트 전역 스타일 적용 (Tailwind CSS + 테마 변수 + Pretendard 폰트)
import './storybook.css';

const preview: Preview = {
  parameters: {
    // 컨트롤 패널 설정
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // 접근성 테스트 설정
    a11y: {
      // 'todo' - 테스트 UI에서만 위반 사항 표시
      // 'error' - a11y 위반 시 CI 실패
      // 'off' - a11y 검사 건너뛰기
      test: 'todo'
    },

    // 배경색 옵션
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a2e' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },

    // 뷰포트 설정
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1280px', height: '800px' } },
      },
    },
  },
};

export default preview;
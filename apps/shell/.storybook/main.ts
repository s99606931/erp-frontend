import type { StorybookConfig } from '@storybook/nextjs-vite';

import { dirname } from "path"

import { fileURLToPath } from "url"

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const config: StorybookConfig = {
  // 스토리 파일 경로 설정
  // shell 앱의 stories 폴더에서만 스토리를 로드합니다.
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],

  // Storybook 애드온 설정
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding')
  ],

  // Next.js + Vite 프레임워크 사용
  framework: getAbsolutePath('@storybook/nextjs-vite'),

  // TypeScript 문서 자동 생성 설정
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
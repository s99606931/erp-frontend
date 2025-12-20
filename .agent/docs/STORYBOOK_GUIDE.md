# 📖 Storybook 가이드

> **문서 버전**: 1.0  
> **작성일**: 2025-12-20  
> **대상 독자**: 프론트엔드 개발자, UI/UX 디자이너

---

## 목차

1. [개요](#1-개요)
2. [실행 방법](#2-실행-방법)
3. [컴포넌트 목록](#3-컴포넌트-목록)
4. [스토리 작성 규칙](#4-스토리-작성-규칙)
5. [폴더 구조](#5-폴더-구조)
6. [자주 사용하는 패턴](#6-자주-사용하는-패턴)

---

## 1. 개요

Storybook은 `@erp/ui` 패키지의 UI 컴포넌트를 독립적으로 개발하고 테스트하기 위한 도구입니다.

### 주요 용도

| 용도 | 설명 |
|------|------|
| **컴포넌트 개발** | 격리된 환경에서 컴포넌트 개발 |
| **문서화** | 자동 생성되는 컴포넌트 문서 |
| **디자인 리뷰** | 디자이너와의 협업 도구 |
| **시각적 테스트** | 컴포넌트 상태별 시각적 검증 |
| **접근성 검사** | a11y 애드온을 통한 접근성 검사 |

### 기술 스택

- **Storybook 10** (최신 버전)
- **@storybook/nextjs-vite** (Next.js + Vite 지원)
- **Tailwind CSS v4** (디자인 시스템)

---

## 2. 실행 방법

### 개발 서버 실행

```bash
# 루트 디렉토리에서
pnpm storybook

# 또는 shell 앱에서 직접
pnpm --filter shell storybook
```

### 접속 URL

| 환경 | URL |
|------|-----|
| 로컬 | http://localhost:6006 |
| 네트워크 | http://{your-ip}:6006 |

### 빌드

```bash
# 정적 빌드 생성
pnpm build-storybook
```

---

## 3. 컴포넌트 목록

`@erp/ui` 패키지의 모든 컴포넌트에 대한 Storybook 스토리가 구현되어 있습니다.

### UI 컴포넌트 (12개)

| 컴포넌트 | 스토리 파일 | 설명 |
|----------|------------|------|
| **Button** | `Button.stories.tsx` | 버튼 (6가지 변형, 4가지 크기) |
| **Input** | `Input.stories.tsx` | 텍스트 입력 필드 |
| **Card** | `Card.stories.tsx` | 카드 컨테이너 |
| **Badge** | `Badge.stories.tsx` | 상태 표시 배지 (6가지 변형) |
| **Label** | `Label.stories.tsx` | 폼 필드 레이블 |
| **Table** | `Table.stories.tsx` | 데이터 테이블 |
| **Dialog** | `Dialog.stories.tsx` | 모달 다이얼로그 |
| **AlertDialog** | `AlertDialog.stories.tsx` | 확인/취소 다이얼로그 |
| **Select** | `Select.stories.tsx` | 드롭다운 선택 |
| **Popover** | `Popover.stories.tsx` | 팝오버 (플로팅 패널) |
| **Calendar** | `Calendar.stories.tsx` | 날짜 선택 캘린더 |
| **Toast** | `Toast.stories.tsx` | 토스트 알림 |

### 각 스토리 구성

모든 스토리는 다음 내용을 포함합니다:

1. **Default** - 기본 사용 예시
2. **AllVariants** - 모든 변형 비교
3. **실제 사용 예시** - ERP 시스템에서의 실제 사용 시나리오
4. **자동 문서화** - `autodocs` 태그로 자동 생성되는 문서

---

## 4. 스토리 작성 규칙

### 4.1 파일 명명 규칙

```
apps/shell/stories/ui/{ComponentName}.stories.tsx
```

### 4.2 기본 템플릿

```tsx
/**
 * ============================================================================
 * 파일명: {Component}.stories.tsx
 * 경로: apps/shell/stories/ui/{Component}.stories.tsx
 * 작성일: YYYY-MM-DD
 * ============================================================================
 *
 * [📄 파일 설명]
 * @erp/ui 패키지의 {Component} 컴포넌트에 대한 Storybook 스토리입니다.
 *
 * [🎯 스토리 목록]
 * 1. Default - 기본 사용
 * 2. AllVariants - 모든 변형
 * ...
 * ============================================================================
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentName } from '@erp/ui';

const meta: Meta<typeof ComponentName> = {
  title: 'UI/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered', // 또는 'padded', 'fullscreen'
    docs: {
      description: {
        component: `
## 컴포넌트 설명
...
        `,
      },
    },
  },
  tags: ['autodocs'], // 자동 문서화 활성화
  argTypes: {
    // 컨트롤 정의
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // 기본 props
  },
};
```

### 4.3 필수 요소

| 요소 | 필수 | 설명 |
|------|:----:|------|
| 파일 헤더 주석 | ✅ | 파일 설명, 스토리 목록 |
| `autodocs` 태그 | ✅ | 자동 문서화 |
| Default 스토리 | ✅ | 기본 사용 예시 |
| 한국어 레이블 | ✅ | ERP 시스템 맥락 표현 |
| 실제 사용 예시 | ⭕ | ERP 시나리오 (권장) |

### 4.4 layout 옵션

| 옵션 | 사용 시점 |
|------|----------|
| `centered` | 버튼, 배지 등 작은 컴포넌트 |
| `padded` | 테이블, 카드 리스트 등 |
| `fullscreen` | 전체 페이지 레이아웃 |

---

## 5. 폴더 구조

```
apps/shell/
├── .storybook/                    # Storybook 설정
│   ├── main.ts                    # 메인 설정
│   ├── preview.tsx                # 프리뷰 설정 (테마, 데코레이터)
│   └── storybook.css              # Storybook 전용 스타일
│
└── stories/                       # 스토리 파일
    └── ui/                        # UI 컴포넌트 스토리
        ├── Button.stories.tsx
        ├── Input.stories.tsx
        ├── Card.stories.tsx
        ├── Badge.stories.tsx
        ├── Label.stories.tsx
        ├── Table.stories.tsx
        ├── Dialog.stories.tsx
        ├── AlertDialog.stories.tsx
        ├── Select.stories.tsx
        ├── Popover.stories.tsx
        ├── Calendar.stories.tsx
        └── Toast.stories.tsx
```

---

## 6. 자주 사용하는 패턴

### 6.1 여러 변형 비교

```tsx
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge variant="default">기본</Badge>
      <Badge variant="success">성공</Badge>
      <Badge variant="warning">경고</Badge>
      <Badge variant="error">에러</Badge>
    </div>
  ),
};
```

### 6.2 폼 레이아웃 예시

```tsx
export const FormExample: Story = {
  render: () => (
    <div className="w-[400px] space-y-4 rounded-lg border p-6">
      <div className="grid gap-2">
        <Label htmlFor="name" required>이름</Label>
        <Input id="name" placeholder="홍길동" />
      </div>
      <Button className="w-full">저장</Button>
    </div>
  ),
};
```

### 6.3 상태를 가진 컴포넌트

```tsx
export const WithState: Story = {
  render: function StatefulComponent() {
    const [value, setValue] = React.useState('');
    return (
      <Input 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
      />
    );
  },
};
```

### 6.4 데코레이터 사용

```tsx
// 전역 데코레이터 (preview.tsx)
decorators: [
  (Story) => (
    <div className="p-4">
      <Story />
    </div>
  ),
],

// 개별 스토리 데코레이터
export const WithWrapper: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};
```

---

## 7. ERP 시스템 실제 사용 예시

### 7.1 직원 목록 테이블

```tsx
export const EmployeeList: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>사번</TableHead>
          <TableHead>이름</TableHead>
          <TableHead>부서</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>EMP001</TableCell>
          <TableCell>홍길동</TableCell>
          <TableCell>개발팀</TableCell>
          <TableCell><Badge variant="success">재직</Badge></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
```

### 7.2 결재 제출 확인

```tsx
export const SubmitApproval: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>결재 상신</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>결재 상신</AlertDialogTitle>
          <AlertDialogDescription>
            이 문서를 결재 상신하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>상신</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
```

---

## 문서 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|----------|
| 1.0 | 2025-12-20 | 최초 작성 - 12개 UI 컴포넌트 스토리 문서화 |

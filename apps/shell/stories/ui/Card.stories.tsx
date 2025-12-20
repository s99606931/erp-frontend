/**
 * ============================================================================
 * 파일명: Card.stories.tsx
 * 경로: apps/shell/stories/ui/Card.stories.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * @erp/ui 패키지의 Card 컴포넌트에 대한 Storybook 스토리입니다.
 * ============================================================================
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  Label
} from '@erp/ui';

/**
 * Card 컴포넌트 메타 정보
 */
const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 카드 컴포넌트

콘텐츠를 그룹화하고 구분하는 컨테이너 컴포넌트입니다.

### 구성 요소
- **Card**: 메인 컨테이너
- **CardHeader**: 카드 헤더 영역  
- **CardTitle**: 카드 제목
- **CardDescription**: 카드 설명
- **CardContent**: 카드 본문
- **CardFooter**: 카드 하단 (액션 버튼 등)
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 카드
 */
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>카드 제목</CardTitle>
        <CardDescription>
          카드에 대한 간단한 설명입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>카드 본문 내용이 여기에 표시됩니다.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">확인</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * 로그인 폼 카드
 */
export const LoginForm: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>로그인</CardTitle>
        <CardDescription>
          계정 정보를 입력하여 로그인하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" placeholder="email@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full">로그인</Button>
        <Button variant="outline" className="w-full">회원가입</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * 통계 카드
 */
export const Stats: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>전체 사용자</CardDescription>
          <CardTitle className="text-4xl">1,234</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-600">+12% 증가</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>월간 매출</CardDescription>
          <CardTitle className="text-4xl">₩2.5M</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-600">+8% 증가</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>활성 세션</CardDescription>
          <CardTitle className="text-4xl">89</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600">-3% 감소</p>
        </CardContent>
      </Card>
    </div>
  ),
};

/**
 * 간단한 카드
 */
export const Simple: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>공지사항</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• 시스템 점검 안내 (12/25)</li>
          <li>• 연말정산 일정 안내</li>
          <li>• 신규 기능 업데이트</li>
        </ul>
      </CardContent>
    </Card>
  ),
};

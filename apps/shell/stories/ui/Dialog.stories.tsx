/**
 * ============================================================================
 * 파일명: Dialog.stories.tsx
 * 경로: apps/shell/stories/ui/Dialog.stories.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * @erp/ui 패키지의 Dialog 컴포넌트에 대한 Storybook 스토리입니다.
 * 모달 다이얼로그의 다양한 형태를 시각적으로 확인할 수 있습니다.
 *
 * [🎯 스토리 목록]
 * 1. Default - 기본 다이얼로그
 * 2. WithForm - 폼 포함 다이얼로그
 * 3. ConfirmDialog - 확인 다이얼로그
 * ============================================================================
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  Button,
  Input,
  Label,
} from '@erp/ui';

/**
 * Dialog 컴포넌트 메타 정보
 *
 * @description
 * 모달 다이얼로그 컴포넌트입니다.
 * 사용자 인터랙션이 필요한 상황에서 사용합니다.
 */
const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 다이얼로그 컴포넌트

모달 다이얼로그 컴포넌트입니다.

### 구성 요소
- **Dialog**: 루트 컴포넌트
- **DialogTrigger**: 다이얼로그를 여는 트리거
- **DialogContent**: 다이얼로그 내용
- **DialogHeader**: 헤더 영역
- **DialogTitle**: 제목
- **DialogDescription**: 설명
- **DialogFooter**: 푸터 영역 (버튼 등)
- **DialogClose**: 닫기 버튼

### 특징
- **접근성**: ESC 키로 닫기, 포커스 트랩
- **애니메이션**: 열고 닫을 때 부드러운 전환
- **오버레이**: 배경 딤 처리
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 다이얼로그
 *
 * 가장 기본적인 다이얼로그 형태입니다.
 */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>다이얼로그 제목</DialogTitle>
          <DialogDescription>
            다이얼로그에 대한 설명 텍스트입니다. 사용자에게 필요한 정보를 제공합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            여기에 다이얼로그 내용이 들어갑니다.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * 폼 포함 다이얼로그
 *
 * 입력 폼이 포함된 다이얼로그입니다.
 */
export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>직원 등록</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>신규 직원 등록</DialogTitle>
          <DialogDescription>
            새로운 직원 정보를 입력해주세요. 필수 항목(*)은 반드시 입력해야 합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right" required>
              이름
            </Label>
            <Input id="name" placeholder="홍길동" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="empId" className="text-right" required>
              사번
            </Label>
            <Input id="empId" placeholder="EMP001" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="department" className="text-right" required>
              부서
            </Label>
            <Input id="department" placeholder="개발팀" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              이메일
            </Label>
            <Input id="email" type="email" placeholder="hong@company.com" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button type="submit">등록</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: '직원 등록 폼이 포함된 다이얼로그입니다. Label과 Input 컴포넌트를 함께 사용합니다.',
      },
    },
  },
};

/**
 * 정보 표시 다이얼로그
 *
 * 상세 정보를 표시하는 다이얼로그입니다.
 */
export const InfoDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">상세보기</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>결재 문서 상세</DialogTitle>
          <DialogDescription>
            문서번호: AP-2024-0125
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">제목</span>
              <p className="font-medium">12월 사무용품 구매 요청</p>
            </div>
            <div>
              <span className="text-muted-foreground">기안자</span>
              <p className="font-medium">홍길동</p>
            </div>
            <div>
              <span className="text-muted-foreground">기안일</span>
              <p className="font-medium">2024-12-15</p>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <span className="text-sm text-muted-foreground">내용</span>
            <p className="mt-2 text-sm">
              12월 업무에 필요한 사무용품 구매를 요청드립니다.
              <br />
              - A4 용지 10박스
              <br />
              - 볼펜 세트 5개
              <br />
              - 포스트잇 10개
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>
          <Button variant="destructive">반려</Button>
          <Button>승인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: '결재 문서의 상세 정보를 표시하고 승인/반려 액션을 제공하는 다이얼로그입니다.',
      },
    },
  },
};

/**
 * 큰 다이얼로그
 *
 * 더 넓은 영역이 필요한 경우의 다이얼로그입니다.
 */
export const LargeDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">대형 다이얼로그</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>월간 예산 현황</DialogTitle>
          <DialogDescription>
            2024년 12월 부서별 예산 집행 현황입니다.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-auto py-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left font-medium">부서</th>
                <th className="p-2 text-right font-medium">배정 예산</th>
                <th className="p-2 text-right font-medium">사용 금액</th>
                <th className="p-2 text-right font-medium">잔액</th>
                <th className="p-2 text-right font-medium">사용률</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">개발팀</td>
                <td className="p-2 text-right">₩100,000,000</td>
                <td className="p-2 text-right">₩75,000,000</td>
                <td className="p-2 text-right">₩25,000,000</td>
                <td className="p-2 text-right">75%</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">기획팀</td>
                <td className="p-2 text-right">₩50,000,000</td>
                <td className="p-2 text-right">₩35,000,000</td>
                <td className="p-2 text-right">₩15,000,000</td>
                <td className="p-2 text-right">70%</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">인사팀</td>
                <td className="p-2 text-right">₩30,000,000</td>
                <td className="p-2 text-right">₩20,000,000</td>
                <td className="p-2 text-right">₩10,000,000</td>
                <td className="p-2 text-right">67%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>
          <Button>엑셀 다운로드</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'max-w-3xl 클래스로 더 넓은 다이얼로그를 만들 수 있습니다. 내용이 많을 경우 스크롤됩니다.',
      },
    },
  },
};

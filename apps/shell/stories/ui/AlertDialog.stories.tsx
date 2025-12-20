/**
 * ============================================================================
 * 파일명: AlertDialog.stories.tsx
 * 경로: apps/shell/stories/ui/AlertDialog.stories.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * @erp/ui 패키지의 AlertDialog 컴포넌트에 대한 Storybook 스토리입니다.
 * 확인/취소 다이얼로그의 다양한 형태를 시각적으로 확인할 수 있습니다.
 *
 * [🎯 스토리 목록]
 * 1. Default - 기본 알림 다이얼로그
 * 2. Destructive - 삭제 확인 다이얼로그
 * 3. Logout - 로그아웃 확인
 * 4. SubmitApproval - 결재 제출 확인
 * ============================================================================
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@erp/ui';
import { Trash2, LogOut, Send, AlertTriangle } from 'lucide-react';

/**
 * AlertDialog 컴포넌트 메타 정보
 *
 * @description
 * 확인/취소가 필요한 작업을 위한 다이얼로그입니다.
 * 중요한 작업 전 사용자 확인을 받을 때 사용합니다.
 */
const meta: Meta<typeof AlertDialog> = {
  title: 'UI/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 알림 다이얼로그 컴포넌트

중요한 작업을 확인받기 위한 다이얼로그입니다.

### 구성 요소
- **AlertDialog**: 루트 컴포넌트
- **AlertDialogTrigger**: 다이얼로그를 여는 트리거
- **AlertDialogContent**: 다이얼로그 내용
- **AlertDialogHeader**: 헤더 영역
- **AlertDialogTitle**: 제목
- **AlertDialogDescription**: 설명
- **AlertDialogFooter**: 푸터 영역
- **AlertDialogAction**: 확인 버튼
- **AlertDialogCancel**: 취소 버튼

### Dialog와의 차이점
- AlertDialog: 확인/취소 액션 필수, 배경 클릭으로 닫히지 않음
- Dialog: 자유로운 내용, ESC나 배경 클릭으로 닫힘

### 사용 시점
- 데이터 삭제 전 확인
- 중요한 설정 변경 전 확인
- 로그아웃/세션 종료 전 확인
- 결재 제출 전 확인
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 알림 다이얼로그
 *
 * 가장 기본적인 확인 다이얼로그입니다.
 */
export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">알림 다이얼로그 열기</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 계속하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            이 작업은 돌이킬 수 없습니다. 계속 진행하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

/**
 * 삭제 확인 다이얼로그
 *
 * 데이터 삭제 전 확인을 받는 다이얼로그입니다.
 */
export const DeleteConfirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            직원 정보 삭제
          </AlertDialogTitle>
          <AlertDialogDescription>
            홍길동(EMP001)님의 정보를 정말 삭제하시겠습니까?
            <br />
            <span className="font-medium text-destructive">
              삭제된 데이터는 복구할 수 없습니다.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: '삭제와 같은 위험한 작업 전에 사용자에게 확인을 받습니다. 버튼에 destructive 스타일을 적용합니다.',
      },
    },
  },
};

/**
 * 로그아웃 확인 다이얼로그
 *
 * 로그아웃 전 확인을 받는 다이얼로그입니다.
 */
export const LogoutConfirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <LogOut className="mr-2 h-4 w-4" />
          로그아웃
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>로그아웃</AlertDialogTitle>
          <AlertDialogDescription>
            정말 로그아웃 하시겠습니까?
            <br />
            저장하지 않은 작업 내용이 있다면 먼저 저장해주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>로그아웃</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: '세션 종료 전 사용자에게 확인을 받습니다.',
      },
    },
  },
};

/**
 * 결재 제출 확인 다이얼로그
 *
 * 결재 문서 제출 전 확인을 받는 다이얼로그입니다.
 */
export const SubmitApproval: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <Send className="mr-2 h-4 w-4" />
          결재 상신
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>결재 상신</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-2">
              <p>다음 문서를 결재 상신하시겠습니까?</p>
              <div className="rounded-lg bg-muted p-3 text-sm">
                <p><span className="text-muted-foreground">문서번호:</span> AP-2024-0125</p>
                <p><span className="text-muted-foreground">제목:</span> 12월 사무용품 구매 요청</p>
                <p><span className="text-muted-foreground">결재자:</span> 홍길동 팀장</p>
              </div>
              <p className="text-muted-foreground">
                상신 후에는 내용을 수정할 수 없습니다.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>상신</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ERP 시스템에서 결재 문서 상신 전 확인을 받는 예시입니다.',
      },
    },
  },
};

/**
 * 저장되지 않은 변경사항 경고
 *
 * 페이지 이탈 시 저장되지 않은 변경사항을 확인합니다.
 */
export const UnsavedChanges: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">페이지 나가기</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            저장되지 않은 변경사항
          </AlertDialogTitle>
          <AlertDialogDescription>
            저장하지 않은 변경사항이 있습니다.
            <br />
            페이지를 나가시면 변경사항이 손실됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:space-x-2">
          <AlertDialogCancel>계속 작성</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            저장하지 않고 나가기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: '폼 작성 중 페이지 이탈 시 사용자에게 경고를 표시합니다.',
      },
    },
  },
};

/**
 * 반려 사유 입력
 *
 * 결재 반려 시 사유를 입력받는 예시입니다.
 */
export const RejectWithReason: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">반려</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>결재 반려</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4">
              <p>이 결재 문서를 반려하시겠습니까?</p>
              <div className="space-y-2">
                <label htmlFor="reason" className="text-sm font-medium text-foreground">
                  반려 사유
                </label>
                <textarea
                  id="reason"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="반려 사유를 입력해주세요"
                  rows={3}
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            반려
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: '반려 시 사유 입력을 받는 예시입니다. 실제로는 별도 폼 컴포넌트를 사용하는 것이 좋습니다.',
      },
    },
  },
};

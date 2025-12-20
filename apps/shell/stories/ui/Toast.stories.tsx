/**
 * ============================================================================
 * 파일명: Toast.stories.tsx
 * 경로: apps/shell/stories/ui/Toast.stories.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * @erp/ui 패키지의 Toast 컴포넌트에 대한 Storybook 스토리입니다.
 * 토스트 알림의 다양한 형태를 시각적으로 확인할 수 있습니다.
 *
 * [🎯 스토리 목록]
 * 1. Default - 기본 토스트
 * 2. Destructive - 에러 토스트
 * 3. Success - 성공 토스트
 * 4. WithAction - 액션 버튼 포함
 * ============================================================================
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Button,
} from '@erp/ui';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

/**
 * Toast 컴포넌트 메타 정보
 *
 * @description
 * 토스트 알림 컴포넌트입니다.
 * 사용자에게 간단한 피드백을 제공합니다.
 */
const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 토스트 컴포넌트

사용자에게 간단한 피드백을 제공하는 알림 컴포넌트입니다.

### 구성 요소
- **ToastProvider**: 토스트 컨텍스트 제공
- **Toast**: 토스트 컨테이너
- **ToastTitle**: 제목
- **ToastDescription**: 설명
- **ToastAction**: 액션 버튼
- **ToastClose**: 닫기 버튼
- **ToastViewport**: 토스트 표시 영역

### 특징
- **자동 닫힘**: 일정 시간 후 자동으로 사라짐
- **스와이프**: 스와이프로 닫기 가능
- **스택**: 여러 토스트 스택 지원
- **3가지 변형**: default, destructive, success

### 실제 사용
실제 프로젝트에서는 useToast 훅과 Toaster 컴포넌트를 사용합니다:
\`\`\`tsx
import { useToast } from '@erp/ui';

function MyComponent() {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: '저장 완료',
      description: '데이터가 성공적으로 저장되었습니다.',
    });
  };
}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="relative h-[300px] w-[400px]">
          <Story />
          <ToastViewport className="absolute bottom-0 right-0" />
        </div>
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 토스트
 *
 * 가장 기본적인 토스트 형태입니다.
 */
export const Default: Story = {
  render: () => (
    <Toast open>
      <div className="grid gap-1">
        <ToastTitle>알림</ToastTitle>
        <ToastDescription>기본 토스트 메시지입니다.</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  ),
};

/**
 * 에러 토스트
 *
 * 오류 발생 시 표시하는 토스트입니다.
 */
export const Destructive: Story = {
  render: () => (
    <Toast open variant="destructive">
      <div className="grid gap-1">
        <ToastTitle className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          오류 발생
        </ToastTitle>
        <ToastDescription>
          데이터 저장 중 오류가 발생했습니다. 다시 시도해주세요.
        </ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  ),
  parameters: {
    docs: {
      description: {
        story: 'variant="destructive"로 에러 메시지를 강조합니다.',
      },
    },
  },
};

/**
 * 성공 토스트
 *
 * 작업 성공 시 표시하는 토스트입니다.
 */
export const Success: Story = {
  render: () => (
    <Toast open variant="success">
      <div className="grid gap-1">
        <ToastTitle className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          저장 완료
        </ToastTitle>
        <ToastDescription>
          데이터가 성공적으로 저장되었습니다.
        </ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  ),
  parameters: {
    docs: {
      description: {
        story: 'variant="success"로 성공 메시지를 표시합니다.',
      },
    },
  },
};

/**
 * 액션 버튼 포함 토스트
 *
 * 사용자 액션을 유도하는 토스트입니다.
 */
export const WithAction: Story = {
  render: () => (
    <Toast open>
      <div className="grid gap-1">
        <ToastTitle>파일 업로드 실패</ToastTitle>
        <ToastDescription>
          네트워크 오류로 파일 업로드에 실패했습니다.
        </ToastDescription>
      </div>
      <ToastAction altText="다시 시도">다시 시도</ToastAction>
      <ToastClose />
    </Toast>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ToastAction으로 사용자가 취할 수 있는 액션을 제공합니다.',
      },
    },
  },
};

/**
 * 토스트 트리거 예시
 *
 * 버튼 클릭으로 토스트를 표시하는 예시입니다.
 * (실제로는 useToast 훅을 사용합니다)
 */
export const ToastExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        실제 사용 시에는 useToast 훅을 사용합니다.
        <br />
        아래는 토스트 UI 예시입니다.
      </p>

      <div className="space-y-2">
        <Toast open>
          <div className="grid gap-1">
            <ToastTitle className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              정보
            </ToastTitle>
            <ToastDescription>
              새로운 결재 문서가 도착했습니다.
            </ToastDescription>
          </div>
          <ToastAction altText="확인하기">확인하기</ToastAction>
          <ToastClose />
        </Toast>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 프로젝트에서는 useToast 훅과 toast() 함수를 사용하여 토스트를 표시합니다.',
      },
    },
  },
};

/**
 * 모든 변형 비교
 *
 * 3가지 토스트 변형을 비교합니다.
 */
export const AllVariants: Story = {
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="space-y-4">
          <Story />
        </div>
        <ToastViewport />
      </ToastProvider>
    ),
  ],
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium">Default</p>
        <Toast open className="relative">
          <div className="grid gap-1">
            <ToastTitle>기본 알림</ToastTitle>
            <ToastDescription>일반적인 정보 메시지입니다.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Success</p>
        <Toast open variant="success" className="relative">
          <div className="grid gap-1">
            <ToastTitle>성공</ToastTitle>
            <ToastDescription>작업이 완료되었습니다.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Destructive</p>
        <Toast open variant="destructive" className="relative">
          <div className="grid gap-1">
            <ToastTitle>오류</ToastTitle>
            <ToastDescription>문제가 발생했습니다.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '3가지 토스트 변형을 비교합니다: default(정보), success(성공), destructive(오류).',
      },
    },
  },
};

/**
 * 사용 방법 안내
 *
 * useToast 훅 사용 예시 코드입니다.
 */
export const HowToUse: Story = {
  render: () => (
    <div className="max-w-md space-y-4 rounded-lg border p-4">
      <h4 className="font-medium">useToast 사용 방법</h4>
      <div className="rounded bg-muted p-3 font-mono text-xs">
        <pre>{`import { useToast } from '@erp/ui';

function MyComponent() {
  const { toast } = useToast();
  
  const handleSave = async () => {
    try {
      await saveData();
      toast({
        title: '저장 완료',
        description: '데이터가 저장되었습니다.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '저장 실패',
        description: '다시 시도해주세요.',
      });
    }
  };
}`}</pre>
      </div>
      <p className="text-sm text-muted-foreground">
        앱의 루트에 {'<Toaster />'} 컴포넌트를 추가해야 합니다.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'useToast 훅을 사용하여 프로그래밍 방식으로 토스트를 표시하는 방법입니다.',
      },
    },
  },
};

/**
 * ============================================================================
 * 파일명: Card.stories.tsx
 * 패키지: @erp/storybook
 * 경로: packages/storybook/stories/Components/Card.stories.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * Card 컴포넌트 시리즈 스토리입니다.
 * Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
 *
 * [🎯 주요 기능]
 * 1. 기본 카드 구조
 * 2. 다양한 레이아웃 예시
 * 3. 대시보드 위젯 스타일
 * 4. 폼 컨테이너 스타일
 * ============================================================================
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Button,
    Input,
    Label,
    Badge
} from '@erp/ui/components';
import {
    Users,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Calendar,
    MoreVertical,
    ArrowRight
} from 'lucide-react';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Storybook 메타 설정
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
## Card 컴포넌트

콘텐츠를 그룹화하여 표시하는 기본 컨테이너 컴포넌트입니다.

### 구성 요소

- **Card**: 외부 컨테이너
- **CardHeader**: 헤더 영역 (제목, 설명 포함)
- **CardTitle**: 카드 제목
- **CardDescription**: 카드 설명
- **CardContent**: 메인 콘텐츠 영역
- **CardFooter**: 푸터 영역 (액션 버튼 등)

### 사용 예시

\`\`\`tsx
<Card>
  <CardHeader>
    <CardTitle>제목</CardTitle>
    <CardDescription>설명</CardDescription>
  </CardHeader>
  <CardContent>
    콘텐츠
  </CardContent>
  <CardFooter>
    <Button>액션</Button>
  </CardFooter>
</Card>
\`\`\`
        `,
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * 기본 카드
 */
export const Default: Story = {
    render: () => (
        <Card className="w-96">
            <CardHeader>
                <CardTitle>사원 정보</CardTitle>
                <CardDescription>
                    사원의 기본 정보를 확인합니다.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600">
                    이름: 홍길동<br />
                    부서: 인사관리팀<br />
                    직급: 대리
                </p>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">
                    상세보기
                </Button>
            </CardFooter>
        </Card>
    ),
};

/**
 * 대시보드 통계 카드
 */
export const DashboardStats: Story = {
    render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 임직원 수 */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                        임직원 수
                    </CardTitle>
                    <Users className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3" />
                        12% 증가 (전월 대비)
                    </p>
                </CardContent>
            </Card>

            {/* 월간 급여 */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                        월간 급여
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₩3.2억</div>
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <TrendingDown className="h-3 w-3" />
                        3% 감소 (전월 대비)
                    </p>
                </CardContent>
            </Card>

            {/* 근태 현황 */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                        출근율
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">98.5%</div>
                    <p className="text-xs text-gray-500 mt-1">
                        오늘 기준
                    </p>
                </CardContent>
            </Card>

            {/* 결재 대기 */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                        결재 대기
                    </CardTitle>
                    <Badge variant="destructive" className="text-xs">
                        8건
                    </Badge>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">8건</div>
                    <p className="text-xs text-orange-600 mt-1">
                        즉시 처리 필요
                    </p>
                </CardContent>
            </Card>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: '대시보드에서 사용하는 통계 카드 예시입니다.',
            },
        },
    },
};

/**
 * 폼 컨테이너
 */
export const FormContainer: Story = {
    render: () => (
        <Card className="w-96">
            <CardHeader>
                <CardTitle>새 사원 등록</CardTitle>
                <CardDescription>
                    새로운 사원 정보를 입력하세요.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="emp-name">이름 *</Label>
                    <Input id="emp-name" placeholder="홍길동" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="emp-email">이메일 *</Label>
                    <Input id="emp-email" type="email" placeholder="hong@seoul.go.kr" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="emp-dept">부서</Label>
                    <Input id="emp-dept" placeholder="인사관리팀" />
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">취소</Button>
                <Button className="flex-1">등록</Button>
            </CardFooter>
        </Card>
    ),
    parameters: {
        docs: {
            description: {
                story: '폼을 담는 컨테이너로 사용하는 카드 예시입니다.',
            },
        },
    },
};

/**
 * 리스트 아이템 카드
 */
export const ListItems: Story = {
    render: () => (
        <div className="w-96 space-y-3">
            {[
                { name: '홍길동', dept: '인사관리팀', role: '팀장' },
                { name: '김철수', dept: '재무회계팀', role: '대리' },
                { name: '이영희', dept: '정보화팀', role: '사원' },
            ].map((employee, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                                {employee.name[0]}
                            </div>
                            <div>
                                <div className="font-medium">{employee.name}</div>
                                <div className="text-sm text-gray-500">
                                    {employee.dept} · {employee.role}
                                </div>
                            </div>
                        </div>
                        <button
                            className="p-2 hover:bg-gray-100 rounded"
                            aria-label="더보기"
                        >
                            <MoreVertical className="h-4 w-4 text-gray-400" />
                        </button>
                    </CardContent>
                </Card>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '리스트 아이템으로 사용하는 카드 예시입니다.',
            },
        },
    },
};

/**
 * 알림/공지 카드
 */
export const NotificationCard: Story = {
    render: () => (
        <Card className="w-96 border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <Badge variant="secondary">공지사항</Badge>
                    <span className="text-xs text-gray-400">2시간 전</span>
                </div>
                <CardTitle className="text-base mt-2">
                    2025년 연말정산 안내
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600">
                    2025년 연말정산 서류 제출 기한은 12월 31일까지입니다.
                    자세한 내용은 인사팀으로 문의해 주세요.
                </p>
            </CardContent>
            <CardFooter>
                <Button variant="ghost" size="sm" className="text-blue-600">
                    자세히 보기
                    <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
            </CardFooter>
        </Card>
    ),
    parameters: {
        docs: {
            description: {
                story: '알림이나 공지사항을 표시하는 카드 예시입니다.',
            },
        },
    },
};

/**
 * 그리드 레이아웃
 */
export const GridLayout: Story = {
    render: () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
            {['인사관리', '급여관리', '예산관리', '근태관리', '회계관리', '결재관리'].map((title, i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                        <CardTitle className="text-lg">{title}</CardTitle>
                        <CardDescription>
                            {title} 메뉴로 이동합니다
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-600">
                            {Math.floor(Math.random() * 100)}건
                        </div>
                        <p className="text-sm text-gray-500 mt-1">처리 대기</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: '그리드 레이아웃으로 배치된 카드 예시입니다.',
            },
        },
    },
};

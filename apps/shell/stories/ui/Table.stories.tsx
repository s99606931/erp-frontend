/**
 * ============================================================================
 * 파일명: Table.stories.tsx
 * 경로: apps/shell/stories/ui/Table.stories.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 *
 * [📄 파일 설명]
 * @erp/ui 패키지의 Table 컴포넌트에 대한 Storybook 스토리입니다.
 * ERP 시스템에서 데이터 목록을 표시하는 테이블의 다양한 형태를 확인할 수 있습니다.
 *
 * [🎯 스토리 목록]
 * 1. Default - 기본 테이블
 * 2. WithCaption - 캡션 포함 테이블
 * 3. EmployeeList - 직원 목록 예시
 * 4. InvoiceTable - 청구서/지출 테이블 예시
 * ============================================================================
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
} from '@erp/ui';

/**
 * Table 컴포넌트 메타 정보
 *
 * @description
 * 데이터 목록을 표시하는 테이블 컴포넌트입니다.
 * ERP 시스템에서 직원, 결재, 지출 등의 데이터를 표시합니다.
 */
const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## 테이블 컴포넌트

ERP 시스템의 데이터 목록 표시용 테이블 컴포넌트입니다.

### 구성 요소
- **Table**: 테이블 컨테이너
- **TableHeader**: 테이블 헤더 영역
- **TableBody**: 테이블 본문 영역
- **TableFooter**: 테이블 푸터 영역
- **TableRow**: 테이블 행
- **TableHead**: 헤더 셀
- **TableCell**: 데이터 셀
- **TableCaption**: 테이블 설명

### 특징
- **반응형**: 가로 스크롤 지원
- **호버 효과**: 행 hover 시 배경색 변경
- **선택 상태**: data-state로 선택된 행 표시
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 테이블
 *
 * 가장 기본적인 테이블 형태입니다.
 */
export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">번호</TableHead>
          <TableHead>이름</TableHead>
          <TableHead>부서</TableHead>
          <TableHead className="text-right">연봉</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">001</TableCell>
          <TableCell>홍길동</TableCell>
          <TableCell>개발팀</TableCell>
          <TableCell className="text-right">₩50,000,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">002</TableCell>
          <TableCell>김철수</TableCell>
          <TableCell>기획팀</TableCell>
          <TableCell className="text-right">₩45,000,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">003</TableCell>
          <TableCell>이영희</TableCell>
          <TableCell>인사팀</TableCell>
          <TableCell className="text-right">₩48,000,000</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * 캡션과 푸터 포함 테이블
 *
 * TableCaption과 TableFooter를 사용하는 예시입니다.
 */
export const WithCaptionAndFooter: Story = {
  render: () => (
    <Table>
      <TableCaption>2024년 12월 부서별 예산 현황</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>부서</TableHead>
          <TableHead className="text-right">배정 예산</TableHead>
          <TableHead className="text-right">사용 금액</TableHead>
          <TableHead className="text-right">잔액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">개발팀</TableCell>
          <TableCell className="text-right">₩100,000,000</TableCell>
          <TableCell className="text-right">₩75,000,000</TableCell>
          <TableCell className="text-right">₩25,000,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">기획팀</TableCell>
          <TableCell className="text-right">₩50,000,000</TableCell>
          <TableCell className="text-right">₩35,000,000</TableCell>
          <TableCell className="text-right">₩15,000,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">인사팀</TableCell>
          <TableCell className="text-right">₩30,000,000</TableCell>
          <TableCell className="text-right">₩20,000,000</TableCell>
          <TableCell className="text-right">₩10,000,000</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>합계</TableCell>
          <TableCell className="text-right">₩180,000,000</TableCell>
          <TableCell className="text-right">₩130,000,000</TableCell>
          <TableCell className="text-right">₩50,000,000</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TableCaption으로 테이블 설명을 추가하고, TableFooter로 합계를 표시합니다.',
      },
    },
  },
};

/**
 * 직원 목록 테이블
 *
 * 실제 ERP 시스템의 직원 관리 화면 예시입니다.
 */
export const EmployeeList: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">사번</TableHead>
          <TableHead>이름</TableHead>
          <TableHead>부서</TableHead>
          <TableHead>직급</TableHead>
          <TableHead>입사일</TableHead>
          <TableHead className="text-center">상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">EMP001</TableCell>
          <TableCell>홍길동</TableCell>
          <TableCell>개발팀</TableCell>
          <TableCell>과장</TableCell>
          <TableCell>2020-03-15</TableCell>
          <TableCell className="text-center">
            <Badge variant="success">재직</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">EMP002</TableCell>
          <TableCell>김철수</TableCell>
          <TableCell>기획팀</TableCell>
          <TableCell>대리</TableCell>
          <TableCell>2021-07-01</TableCell>
          <TableCell className="text-center">
            <Badge variant="success">재직</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">EMP003</TableCell>
          <TableCell>이영희</TableCell>
          <TableCell>인사팀</TableCell>
          <TableCell>사원</TableCell>
          <TableCell>2023-01-10</TableCell>
          <TableCell className="text-center">
            <Badge variant="warning">휴직</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">EMP004</TableCell>
          <TableCell>박민수</TableCell>
          <TableCell>영업팀</TableCell>
          <TableCell>부장</TableCell>
          <TableCell>2018-05-20</TableCell>
          <TableCell className="text-center">
            <Badge variant="secondary">퇴직</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge 컴포넌트와 함께 사용하여 직원 상태를 시각적으로 표시하는 예시입니다.',
      },
    },
  },
};

/**
 * 결재 문서 테이블
 *
 * 결재 현황을 표시하는 테이블 예시입니다.
 */
export const ApprovalTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">문서번호</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[100px]">기안자</TableHead>
          <TableHead className="w-[100px]">기안일</TableHead>
          <TableHead className="w-[100px] text-center">상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">AP-2024-0125</TableCell>
          <TableCell>12월 사무용품 구매 요청</TableCell>
          <TableCell>홍길동</TableCell>
          <TableCell>2024-12-15</TableCell>
          <TableCell className="text-center">
            <Badge variant="success">승인</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">AP-2024-0126</TableCell>
          <TableCell>출장비 정산 신청</TableCell>
          <TableCell>김철수</TableCell>
          <TableCell>2024-12-16</TableCell>
          <TableCell className="text-center">
            <Badge variant="warning">대기</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">AP-2024-0127</TableCell>
          <TableCell>연차 휴가 신청서</TableCell>
          <TableCell>이영희</TableCell>
          <TableCell>2024-12-17</TableCell>
          <TableCell className="text-center">
            <Badge variant="error">반려</Badge>
          </TableCell>
        </TableRow>
        <TableRow data-state="selected">
          <TableCell className="font-medium">AP-2024-0128</TableCell>
          <TableCell>신규 프로젝트 예산 신청</TableCell>
          <TableCell>박민수</TableCell>
          <TableCell>2024-12-18</TableCell>
          <TableCell className="text-center">
            <Badge variant="default">진행중</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'data-state="selected" 속성으로 선택된 행을 강조 표시할 수 있습니다.',
      },
    },
  },
};

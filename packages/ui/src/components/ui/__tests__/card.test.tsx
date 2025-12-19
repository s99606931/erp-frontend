import '@testing-library/jest-dom';

/**
 * @file Card 컴포넌트 단위 테스트
 * @description Card 및 관련 서브 컴포넌트들의 렌더링 테스트
 */
import { render, screen } from '@testing-library/react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '../card';

describe('Card', () => {
    describe('Card 컴포넌트', () => {
        it('기본 Card가 올바르게 렌더링된다', () => {
            render(<Card>카드 내용</Card>);
            expect(screen.getByText('카드 내용')).toBeInTheDocument();
        });

        it('className이 올바르게 적용된다', () => {
            const { container } = render(<Card className="custom-class">카드</Card>);
            expect(container.firstChild).toHaveClass('custom-class');
        });
    });

    describe('CardHeader 컴포넌트', () => {
        it('CardHeader가 올바르게 렌더링된다', () => {
            render(
                <Card>
                    <CardHeader>헤더</CardHeader>
                </Card>
            );
            expect(screen.getByText('헤더')).toBeInTheDocument();
        });
    });

    describe('CardTitle 컴포넌트', () => {
        it('CardTitle이 올바르게 렌더링된다', () => {
            render(
                <Card>
                    <CardHeader>
                        <CardTitle>제목</CardTitle>
                    </CardHeader>
                </Card>
            );
            expect(screen.getByText('제목')).toBeInTheDocument();
        });
    });

    describe('CardDescription 컴포넌트', () => {
        it('CardDescription이 올바르게 렌더링된다', () => {
            render(
                <Card>
                    <CardHeader>
                        <CardDescription>설명 텍스트</CardDescription>
                    </CardHeader>
                </Card>
            );
            expect(screen.getByText('설명 텍스트')).toBeInTheDocument();
        });
    });

    describe('CardContent 컴포넌트', () => {
        it('CardContent가 올바르게 렌더링된다', () => {
            render(
                <Card>
                    <CardContent>본문 내용</CardContent>
                </Card>
            );
            expect(screen.getByText('본문 내용')).toBeInTheDocument();
        });
    });

    describe('CardFooter 컴포넌트', () => {
        it('CardFooter가 올바르게 렌더링된다', () => {
            render(
                <Card>
                    <CardFooter>푸터</CardFooter>
                </Card>
            );
            expect(screen.getByText('푸터')).toBeInTheDocument();
        });
    });

    describe('복합 Card 구성', () => {
        it('모든 서브 컴포넌트가 함께 렌더링된다', () => {
            render(
                <Card>
                    <CardHeader>
                        <CardTitle>프로젝트 현황</CardTitle>
                        <CardDescription>진행 중인 프로젝트 요약</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>총 5개 프로젝트 진행 중</p>
                    </CardContent>
                    <CardFooter>
                        <span>자세히 보기</span>
                    </CardFooter>
                </Card>
            );

            expect(screen.getByText('프로젝트 현황')).toBeInTheDocument();
            expect(screen.getByText('진행 중인 프로젝트 요약')).toBeInTheDocument();
            expect(screen.getByText('총 5개 프로젝트 진행 중')).toBeInTheDocument();
            expect(screen.getByText('자세히 보기')).toBeInTheDocument();
        });
    });
});

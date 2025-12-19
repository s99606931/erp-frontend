import '@testing-library/jest-dom';

/**
 * @file Button 컴포넌트 단위 테스트
 * @description Button 컴포넌트의 렌더링, 클릭 이벤트, 상태 변화 테스트
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../button';

describe('Button', () => {
    describe('렌더링', () => {
        it('기본 버튼이 올바르게 렌더링된다', () => {
            render(<Button>저장</Button>);
            expect(screen.getByRole('button', { name: '저장' })).toBeInTheDocument();
        });

        it('다양한 variant가 올바르게 적용된다', () => {
            const { rerender } = render(<Button variant="default">기본</Button>);
            expect(screen.getByRole('button')).toHaveClass('bg-primary');

            rerender(<Button variant="destructive">삭제</Button>);
            expect(screen.getByRole('button')).toHaveClass('bg-error');

            rerender(<Button variant="outline">외곽선</Button>);
            expect(screen.getByRole('button')).toHaveClass('border');

            rerender(<Button variant="ghost">고스트</Button>);
            expect(screen.getByRole('button')).toHaveClass('hover:bg-accent');
        });

        it('다양한 size가 올바르게 적용된다', () => {
            const { rerender } = render(<Button size="default">기본</Button>);
            expect(screen.getByRole('button')).toHaveClass('h-10');

            rerender(<Button size="sm">작게</Button>);
            expect(screen.getByRole('button')).toHaveClass('h-8');

            rerender(<Button size="lg">크게</Button>);
            expect(screen.getByRole('button')).toHaveClass('h-12');
        });
    });

    describe('이벤트', () => {
        it('클릭 이벤트가 호출된다', async () => {
            const user = userEvent.setup();
            const handleClick = jest.fn();

            render(<Button onClick={handleClick}>클릭</Button>);
            await user.click(screen.getByRole('button'));

            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it('disabled 상태에서 클릭 이벤트가 호출되지 않는다', async () => {
            const user = userEvent.setup();
            const handleClick = jest.fn();

            render(<Button disabled onClick={handleClick}>비활성</Button>);
            await user.click(screen.getByRole('button'));

            expect(handleClick).not.toHaveBeenCalled();
        });
    });

    describe('접근성', () => {
        it('버튼에 적절한 role이 있다', () => {
            render(<Button>테스트</Button>);
            expect(screen.getByRole('button')).toBeInTheDocument();
        });

        it('disabled 상태가 접근성 속성으로 표시된다', () => {
            render(<Button disabled>비활성</Button>);
            expect(screen.getByRole('button')).toBeDisabled();
        });
    });
});

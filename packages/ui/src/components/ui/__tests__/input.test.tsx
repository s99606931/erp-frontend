import '@testing-library/jest-dom';

/**
 * @file Input 컴포넌트 단위 테스트
 * @description Input 컴포넌트의 렌더링, 입력 이벤트, 상태 변화 테스트
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../input';

describe('Input', () => {
    describe('렌더링', () => {
        it('기본 입력 필드가 올바르게 렌더링된다', () => {
            render(<Input placeholder="이메일 입력" />);
            expect(screen.getByPlaceholderText('이메일 입력')).toBeInTheDocument();
        });

        it('type 속성이 올바르게 적용된다', () => {
            render(<Input type="password" placeholder="비밀번호" />);
            expect(screen.getByPlaceholderText('비밀번호')).toHaveAttribute('type', 'password');
        });
    });

    describe('이벤트', () => {
        it('텍스트 입력이 올바르게 동작한다', async () => {
            const user = userEvent.setup();
            const handleChange = jest.fn();

            render(<Input onChange={handleChange} placeholder="입력" />);
            await user.type(screen.getByPlaceholderText('입력'), 'hello');

            expect(handleChange).toHaveBeenCalledTimes(5);
        });

        it('포커스 이벤트가 동작한다', async () => {
            const user = userEvent.setup();
            const handleFocus = jest.fn();

            render(<Input onFocus={handleFocus} placeholder="입력" />);
            await user.click(screen.getByPlaceholderText('입력'));

            expect(handleFocus).toHaveBeenCalledTimes(1);
        });
    });

    describe('상태', () => {
        it('disabled 상태가 올바르게 적용된다', () => {
            render(<Input disabled placeholder="비활성" />);
            expect(screen.getByPlaceholderText('비활성')).toBeDisabled();
        });

        it('value가 올바르게 표시된다', () => {
            render(<Input value="테스트" readOnly placeholder="입력" />);
            expect(screen.getByPlaceholderText('입력')).toHaveValue('테스트');
        });
    });

    describe('접근성', () => {
        it('입력 필드에 적절한 role이 있다', () => {
            render(<Input aria-label="이메일" />);
            expect(screen.getByRole('textbox')).toBeInTheDocument();
        });
    });
});

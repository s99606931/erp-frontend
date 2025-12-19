/**
 * @file LoginForm 컴포넌트 통합 테스트
 * @description 로그인 폼의 입력, 유효성 검사, 제출 기능 테스트
 */
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock next-auth
jest.mock('next-auth/react', () => ({
    signIn: jest.fn(),
}));

// LoginForm을 동적으로 import하기 위한 설정
jest.mock('@erp/ui/components', () => ({
    Button: ({ children, disabled, type, ...props }: any) => (
        <button type={type} disabled={disabled} {...props}>{children}</button>
    ),
    Input: (props: any) => <input {...props} />,
    Label: ({ children, ...props }: any) => <label {...props}>{children}</label>,
    Card: ({ children }: any) => <div data-testid="card">{children}</div>,
    CardHeader: ({ children }: any) => <div data-testid="card-header">{children}</div>,
    CardTitle: ({ children }: any) => <h2>{children}</h2>,
    CardContent: ({ children }: any) => <div data-testid="card-content">{children}</div>,
    CardFooter: ({ children }: any) => <div data-testid="card-footer">{children}</div>,
}));

jest.mock('lucide-react', () => ({
    Loader2: () => <span data-testid="loader" />,
    Mail: () => <span data-testid="mail-icon" />,
    Lock: () => <span data-testid="lock-icon" />,
    AlertCircle: () => <span data-testid="alert-icon" />,
}));

// @erp/shared mock
jest.mock('@erp/shared', () => ({
    loginSchema: {
        parse: jest.fn((data) => data),
    },
}));

// Mock react-hook-form zodResolver
jest.mock('@hookform/resolvers/zod', () => ({
    zodResolver: jest.fn(() => () => ({ values: {}, errors: {} })),
}));

describe('LoginForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('렌더링', () => {
        it('로그인 폼이 올바르게 렌더링된다', async () => {
            // 동적 import로 컴포넌트 로드
            const { LoginForm } = await import('@/components/auth/login-form');
            render(<LoginForm />);

            expect(screen.getByRole('heading', { name: '로그인' })).toBeInTheDocument();
            expect(screen.getByLabelText('이메일')).toBeInTheDocument();
            expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
        });

        it('소셜 로그인 버튼이 표시된다', async () => {
            const { LoginForm } = await import('@/components/auth/login-form');
            render(<LoginForm />);

            expect(screen.getByLabelText('네이버로 로그인')).toBeInTheDocument();
            expect(screen.getByLabelText('카카오로 로그인')).toBeInTheDocument();
            expect(screen.getByLabelText('구글로 로그인')).toBeInTheDocument();
        });

        it('비밀번호 찾기 링크가 표시된다', async () => {
            const { LoginForm } = await import('@/components/auth/login-form');
            render(<LoginForm />);

            expect(screen.getByText('비밀번호를 잊으셨나요?')).toBeInTheDocument();
        });
    });

    describe('입력', () => {
        it('이메일 입력이 가능하다', async () => {
            const user = userEvent.setup();
            const { LoginForm } = await import('@/components/auth/login-form');
            render(<LoginForm />);

            const emailInput = screen.getByLabelText('이메일');
            await user.type(emailInput, 'test@example.com');

            expect(emailInput).toHaveValue('test@example.com');
        });

        it('비밀번호 입력이 가능하다', async () => {
            const user = userEvent.setup();
            const { LoginForm } = await import('@/components/auth/login-form');
            render(<LoginForm />);

            const passwordInput = screen.getByLabelText('비밀번호');
            await user.type(passwordInput, 'password123');

            expect(passwordInput).toHaveValue('password123');
        });
    });

    describe('폼 제출', () => {
        it('로그인 버튼 클릭으로 폼 제출이 가능하다', async () => {
            const user = userEvent.setup();
            const { signIn } = await import('next-auth/react');
            (signIn as jest.Mock).mockResolvedValue({ error: null });

            const { LoginForm } = await import('@/components/auth/login-form');
            render(<LoginForm />);

            const emailInput = screen.getByLabelText('이메일');
            const passwordInput = screen.getByLabelText('비밀번호');
            const submitButton = screen.getByRole('button', { name: '로그인' });

            await user.type(emailInput, 'test@example.com');
            await user.type(passwordInput, 'password123');
            await user.click(submitButton);

            await waitFor(() => {
                expect(signIn).toHaveBeenCalled();
            });
        });
    });

    describe('접근성', () => {
        it('이메일 입력 필드에 올바른 aria 속성이 있다', async () => {
            const { LoginForm } = await import('@/components/auth/login-form');
            render(<LoginForm />);

            const emailInput = screen.getByLabelText('이메일');
            expect(emailInput).toHaveAttribute('type', 'email');
            expect(emailInput).toHaveAttribute('autoComplete', 'email');
        });

        it('비밀번호 입력 필드에 올바른 aria 속성이 있다', async () => {
            const { LoginForm } = await import('@/components/auth/login-form');
            render(<LoginForm />);

            const passwordInput = screen.getByLabelText('비밀번호');
            expect(passwordInput).toHaveAttribute('type', 'password');
            expect(passwordInput).toHaveAttribute('autoComplete', 'current-password');
        });
    });
});

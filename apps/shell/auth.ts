import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

// Backend API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(1) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    // ==========================================
                    // [개발용] Mock Login - Backend 없이 테스트
                    // 실제 운영 시 아래 블록을 제거하세요
                    // ==========================================
                    if (process.env.NODE_ENV === 'development') {
                        const MOCK_USERS = [
                            { id: 'user-1', email: 'admin@test.com', password: 'password123', name: '관리자', role: 'SUPER_ADMIN' },
                            { id: 'user-2', email: 'user@test.com', password: 'password123', name: '일반사용자', role: 'USER' },
                        ];

                        const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
                        if (mockUser) {
                            console.log('[DEV] Mock login:', mockUser.email);
                            return {
                                id: mockUser.id,
                                email: mockUser.email,
                                name: mockUser.name,
                                role: mockUser.role,
                                accessToken: 'mock-token-' + Date.now(),
                            };
                        }
                    }
                    // ==========================================

                    try {
                        const res = await fetch(`${API_URL}/auth/login`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email, password }),
                        });

                        if (!res.ok) {
                            console.error('Login failed:', await res.text());
                            return null;
                        }

                        const user = await res.json();
                        // Backend expected response: { id, email, name, role, accessToken, ... }
                        return user;
                    } catch (error) {
                        console.error('Auth error:', error);
                        return null;
                    }
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: '/login',
        error: '/login',
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.accessToken = token.accessToken as string;
                if (session.user) {
                    session.user.id = token.id as string;
                    session.user.role = token.role as string;
                }
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.accessToken = user.accessToken;
            }
            return token;
        },
    },
    secret: process.env.AUTH_SECRET || 'secret-for-dev-only',
});

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

// Edge Runtime 호환성을 위해 @erp/shared 의존성 제거 (axios 포함됨)
// Mock User
const MOCK_USERS = [
    {
        id: 'u-1',
        email: 'admin@gov.go.kr',
        password: '1234',
        name: '김공무',
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
    },
];

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
                    const user = MOCK_USERS.find((u) => u.email === email);

                    if (!user) return null;

                    if (user.password !== password) return null;

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    };
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
            if (token.sub && session.user) {
                // session.user.id = token.sub; 
            }
            return session;
        },
        async jwt({ token }) {
            return token;
        },
    },
    secret: process.env.AUTH_SECRET || 'secret-for-dev-only',
});

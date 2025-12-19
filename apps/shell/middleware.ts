import { auth } from './auth';

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;

    const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
    const isPublicRoute = nextUrl.pathname === '/login' || nextUrl.pathname === '/forgot-password';
    const isDashboardRoute = !isApiAuthRoute && !isPublicRoute;

    // API 라우트는 간섭하지 않음
    if (isApiAuthRoute) {
        return null;
    }

    // 로그인 상태에서 로그인 페이지 접근 시 대시보드로 리다이렉트
    if (isPublicRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL('/', nextUrl));
        }
        return null;
    }

    // 대시보드 접근 시 로그인 필요
    if (isDashboardRoute && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl));
    }

    return null;
});

// Matcher: API, static files, images 제외
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

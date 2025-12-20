/**
 * ============================================================================
 * 파일명: page.tsx
 * 앱: shell
 * 경로: apps/shell/app/(dashboard)/page.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 대시보드 홈 페이지입니다.
 * 주요 통계와 최근 활동을 표시합니다.
 * ============================================================================
 */

import { Card, CardHeader, CardTitle, CardContent } from '@erp/ui/components';
import { Users, FileCheck, Wallet, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { ActivityItem } from '@/components/dashboard/activity-item';
import { NoticeItem } from '@/components/dashboard/notice-item';

/**
 * @constant STATS_DATA
 * @description 대시보드 상단 통계 카드에 표시될 데이터 배열입니다.
 */
const STATS_DATA = [
    { title: '총 직원', value: '1,234', change: '+12%', icon: <Users className="h-5 w-5" /> },
    { title: '결재 대기', value: '23', change: '-5%', icon: <FileCheck className="h-5 w-5" /> },
    { title: '이번 달 급여', value: '₩2.3억', change: '+3%', icon: <Wallet className="h-5 w-5" /> },
    { title: '예산 집행률', value: '67%', change: '+8%', icon: <TrendingUp className="h-5 w-5" /> },
];

/**
 * @constant ACTIVITIES
 * @description 최근 활동(결재 문서) 데이터 배열입니다.
 */
const ACTIVITIES = [
    { title: '출장 신청서', status: '대기', time: '10분 전' },
    { title: '휴가 신청서', status: '승인', time: '1시간 전' },
    { title: '지출 결의서', status: '승인', time: '3시간 전' },
];

/**
 * @constant NOTICES
 * @description 공지사항 목록 데이터 배열입니다.
 */
const NOTICES = [
    { title: '2025년 연말정산 안내', date: '12월 15일' },
    { title: '시스템 점검 안내', date: '12월 10일' },
    { title: '복무규정 개정 안내', date: '12월 5일' },
];

/**
 * @page DashboardPage
 * @description 대시보드 메인 페이지 구성 컴포넌트입니다.
 * 
 * [💡 초급자를 위한 정보]
 * - 컴포넌트 상단에 데이터 상수를 정의하면, 로직(JS)과 디자인(JSX)이 분리되어 코드가 깔끔해집니다.
 * - map() 함수: 배열 데이터를 반복적으로 같은 형태의 UI로 만들 때 사용합니다.
 * - {...stat}: 전개 연산자라고 하며, 개별 속성을 하나하나 적지 않고 객체 통째로 전달할 때 유용합니다.
 */
export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* 1. 페이지 제목 섹션 - SEO 및 접근성을 위해 header 사용 */}
            <header>
                <h1 className="text-2xl font-bold text-foreground">대시보드</h1>
                <p className="text-muted-foreground">공공기관 ERP 시스템에 오신 것을 환영합니다.</p>
            </header>

            {/* 2. 통계 카드 그리드 - 요약 정보를 한눈에 보여주는 반응형 레이아웃 */}
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" aria-label="통계 요약">
                {STATS_DATA.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </section>

            {/* 3. 메인 콘텐츠 그리드 - 하단의 상세 리스트 영역 */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* 최근 활동 카드 */}
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="text-lg">최근 결재 문서</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {ACTIVITIES.map((activity, index) => (
                                <ActivityItem key={index} {...activity} />
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* 공지사항 카드 */}
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="text-lg">공지사항</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {NOTICES.map((notice, index) => (
                                <NoticeItem key={index} {...notice} />
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

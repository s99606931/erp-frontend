/**
 * ============================================================================
 * 파일명: tenant-themes.ts
 * 패키지: @erp/ui
 * 경로: packages/ui/src/tokens/tenant-themes.ts
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * 공공기관별 멀티 테넌트 테마 시스템입니다.
 * 각 기관은 10가지 색상을 커스터마이징할 수 있습니다.
 *
 * [🎯 주요 기능]
 * 1. TenantTheme 인터페이스: 테넌트 테마 구조 정의
 * 2. tenantThemePresets: 10개 공공기관 사전 정의 테마
 * 3. 로그인 시 테넌트 정보 조회 후 테마 자동 적용
 *
 * [📦 사용 예시]
 * ```typescript
 * import { tenantThemePresets, applyTenantTheme } from '@erp/ui/tokens';
 *
 * // 서울시 테마 적용
 * applyTenantTheme(tenantThemePresets.seoul);
 * ```
 * ============================================================================
 */

/**
 * 테넌트 테마 인터페이스
 *
 * @description
 * 각 공공기관(테넌트)이 커스터마이징할 수 있는 테마 설정입니다.
 * 10가지 색상을 기관 브랜드에 맞게 변경할 수 있습니다.
 */
export interface TenantTheme {
    /** 테넌트 고유 ID (UUID) */
    tenantId: string;

    /** 공공기관 이름 (예: "서울특별시") */
    name: string;

    /** 서브도메인 (예: "seoul" → seoul.erp.go.kr) */
    domain: string;

    /**
     * 커스터마이징 가능한 10가지 색상
     *
     * @description
     * - primary: 주요 브랜드 색상 (버튼, 링크)
     * - primaryForeground: primary 배경 위의 텍스트 색상
     * - secondary: 보조 색상
     * - secondaryForeground: secondary 배경 위의 텍스트
     * - accent: 강조 색상 (배지, 태그)
     * - accentForeground: accent 배경 위의 텍스트
     * - muted: 비활성/배경 색상
     * - mutedForeground: muted 배경 위의 텍스트
     * - background: 기본 페이지 배경
     * - foreground: 기본 텍스트 색상
     */
    colors: {
        primary: string;
        primaryForeground: string;
        secondary: string;
        secondaryForeground: string;
        accent: string;
        accentForeground: string;
        muted: string;
        mutedForeground: string;
        background: string;
        foreground: string;
    };

    /** 기관 로고 정보 */
    logo: {
        /** 로고 이미지 URL */
        url: string;
        /** 로고 대체 텍스트 (스크린리더용) */
        alt: string;
    };
}

/**
 * 10개 공공기관 테마 프리셋
 *
 * @description
 * 주요 광역자치단체의 브랜드 색상을 기반으로 사전 정의된 테마입니다.
 * 각 기관은 관리자 페이지에서 색상을 추가로 커스터마이징할 수 있습니다.
 */
export const tenantThemePresets: Record<string, TenantTheme> = {
    /**
     * 서울특별시 테마
     * 브랜드 색상: 서울 블루 (#0066CC)
     */
    seoul: {
        tenantId: 'seoul-001',
        name: '서울특별시',
        domain: 'seoul',
        colors: {
            primary: '#0066CC',
            primaryForeground: '#FFFFFF',
            secondary: '#00A0E9',
            secondaryForeground: '#FFFFFF',
            accent: '#FF6B00',
            accentForeground: '#FFFFFF',
            muted: '#F5F5F5',
            mutedForeground: '#666666',
            background: '#FFFFFF',
            foreground: '#333333',
        },
        logo: {
            url: '/logos/seoul.svg',
            alt: '서울특별시 로고',
        },
    },

    /**
     * 부산광역시 테마
     * 브랜드 색상: 부산 네이비 (#003DA5)
     */
    busan: {
        tenantId: 'busan-001',
        name: '부산광역시',
        domain: 'busan',
        colors: {
            primary: '#003DA5',
            primaryForeground: '#FFFFFF',
            secondary: '#00A79D',
            secondaryForeground: '#FFFFFF',
            accent: '#FF6B35',
            accentForeground: '#FFFFFF',
            muted: '#F0F0F0',
            mutedForeground: '#555555',
            background: '#FFFFFF',
            foreground: '#222222',
        },
        logo: {
            url: '/logos/busan.svg',
            alt: '부산광역시 로고',
        },
    },

    /**
     * 인천광역시 테마
     */
    incheon: {
        tenantId: 'incheon-001',
        name: '인천광역시',
        domain: 'incheon',
        colors: {
            primary: '#004EA2',
            primaryForeground: '#FFFFFF',
            secondary: '#00B4D8',
            secondaryForeground: '#FFFFFF',
            accent: '#FFB800',
            accentForeground: '#000000',
            muted: '#F3F4F6',
            mutedForeground: '#6B7280',
            background: '#FFFFFF',
            foreground: '#1F2937',
        },
        logo: {
            url: '/logos/incheon.svg',
            alt: '인천광역시 로고',
        },
    },

    /**
     * 대구광역시 테마
     */
    daegu: {
        tenantId: 'daegu-001',
        name: '대구광역시',
        domain: 'daegu',
        colors: {
            primary: '#E31C39',
            primaryForeground: '#FFFFFF',
            secondary: '#00A1E0',
            secondaryForeground: '#FFFFFF',
            accent: '#FFC107',
            accentForeground: '#000000',
            muted: '#F5F5F5',
            mutedForeground: '#666666',
            background: '#FFFFFF',
            foreground: '#333333',
        },
        logo: {
            url: '/logos/daegu.svg',
            alt: '대구광역시 로고',
        },
    },

    /**
     * 광주광역시 테마
     */
    gwangju: {
        tenantId: 'gwangju-001',
        name: '광주광역시',
        domain: 'gwangju',
        colors: {
            primary: '#00843D',
            primaryForeground: '#FFFFFF',
            secondary: '#F2A900',
            secondaryForeground: '#000000',
            accent: '#0077B6',
            accentForeground: '#FFFFFF',
            muted: '#F0F4F0',
            mutedForeground: '#4A5568',
            background: '#FFFFFF',
            foreground: '#2D3748',
        },
        logo: {
            url: '/logos/gwangju.svg',
            alt: '광주광역시 로고',
        },
    },

    /**
     * 대전광역시 테마
     */
    daejeon: {
        tenantId: 'daejeon-001',
        name: '대전광역시',
        domain: 'daejeon',
        colors: {
            primary: '#0066B3',
            primaryForeground: '#FFFFFF',
            secondary: '#00B398',
            secondaryForeground: '#FFFFFF',
            accent: '#FF8C00',
            accentForeground: '#FFFFFF',
            muted: '#E8F4F8',
            mutedForeground: '#4A5568',
            background: '#FFFFFF',
            foreground: '#1A202C',
        },
        logo: {
            url: '/logos/daejeon.svg',
            alt: '대전광역시 로고',
        },
    },

    /**
     * 울산광역시 테마
     */
    ulsan: {
        tenantId: 'ulsan-001',
        name: '울산광역시',
        domain: 'ulsan',
        colors: {
            primary: '#003478',
            primaryForeground: '#FFFFFF',
            secondary: '#009FDA',
            secondaryForeground: '#FFFFFF',
            accent: '#E63946',
            accentForeground: '#FFFFFF',
            muted: '#F1F5F9',
            mutedForeground: '#64748B',
            background: '#FFFFFF',
            foreground: '#0F172A',
        },
        logo: {
            url: '/logos/ulsan.svg',
            alt: '울산광역시 로고',
        },
    },

    /**
     * 세종특별자치시 테마
     */
    sejong: {
        tenantId: 'sejong-001',
        name: '세종특별자치시',
        domain: 'sejong',
        colors: {
            primary: '#2E6A30',
            primaryForeground: '#FFFFFF',
            secondary: '#00A8E0',
            secondaryForeground: '#FFFFFF',
            accent: '#FFD700',
            accentForeground: '#000000',
            muted: '#F0F7F0',
            mutedForeground: '#4A5568',
            background: '#FFFFFF',
            foreground: '#1A202C',
        },
        logo: {
            url: '/logos/sejong.svg',
            alt: '세종특별자치시 로고',
        },
    },

    /**
     * 경기도 테마
     */
    gyeonggi: {
        tenantId: 'gyeonggi-001',
        name: '경기도',
        domain: 'gyeonggi',
        colors: {
            primary: '#003B73',
            primaryForeground: '#FFFFFF',
            secondary: '#00A8A8',
            secondaryForeground: '#FFFFFF',
            accent: '#FF6B6B',
            accentForeground: '#FFFFFF',
            muted: '#EDF2F7',
            mutedForeground: '#4A5568',
            background: '#FFFFFF',
            foreground: '#1A202C',
        },
        logo: {
            url: '/logos/gyeonggi.svg',
            alt: '경기도 로고',
        },
    },

    /**
     * 강원도 테마
     */
    gangwon: {
        tenantId: 'gangwon-001',
        name: '강원도',
        domain: 'gangwon',
        colors: {
            primary: '#007A3D',
            primaryForeground: '#FFFFFF',
            secondary: '#00B0F0',
            secondaryForeground: '#FFFFFF',
            accent: '#F4A261',
            accentForeground: '#000000',
            muted: '#F0FFF4',
            mutedForeground: '#4A5568',
            background: '#FFFFFF',
            foreground: '#22543D',
        },
        logo: {
            url: '/logos/gangwon.svg',
            alt: '강원도 로고',
        },
    },
};

/**
 * 기본 테마 (테넌트 정보가 없을 때 사용)
 */
export const defaultTheme: TenantTheme = {
    tenantId: 'default',
    name: '공공기관 ERP',
    domain: 'default',
    colors: {
        primary: '#3B82F6',
        primaryForeground: '#FFFFFF',
        secondary: '#10B981',
        secondaryForeground: '#FFFFFF',
        accent: '#F59E0B',
        accentForeground: '#FFFFFF',
        muted: '#F3F4F6',
        mutedForeground: '#6B7280',
        background: '#FFFFFF',
        foreground: '#111827',
    },
    logo: {
        url: '/logos/default.svg',
        alt: '공공기관 ERP 로고',
    },
};

/**
 * ============================================================================
 * 파일명: notice-item.tsx
 * 앱: shell
 * 경로: apps/shell/components/dashboard/notice-item.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 * 
 * [📄 파일 설명]
 * 대시보드의 공지사항 목록에 표시되는 개별 아이템 컴포넌트입니다.
 * 
 * [💡 초급자를 위한 정보]
 * - 단순 정보 표시용 컴포넌트로, 구조가 간결하여 재사용하기 좋습니다.
 * ============================================================================
 */

import React from 'react';

/**
 * @interface NoticeItemProps
 */
interface NoticeItemProps {
  /** 공공기관 공지사항 제목 */
  title: string;
  /** 공지 게시일 */
  date: string;
}

/**
 * @component NoticeItem
 * @description 단순 리스트 형태의 공지사항 항목을 렌더링합니다.
 */
export function NoticeItem({ title, date }: NoticeItemProps) {
  return (
    <li className="flex items-center justify-between gap-4">
      <p className="font-medium text-sm md:text-base text-foreground line-clamp-1">{title}</p>
      <span className="text-xs md:text-sm text-muted-foreground shrink-0">{date}</span>
    </li>
  );
}

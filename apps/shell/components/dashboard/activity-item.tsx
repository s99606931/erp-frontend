/**
 * ============================================================================
 * 파일명: activity-item.tsx
 * 앱: shell
 * 경로: apps/shell/components/dashboard/activity-item.tsx
 * 작성일: 2025-12-20
 * ============================================================================
 * 
 * [📄 파일 설명]
 * 대시보드의 최근 활동 목록에 표시되는 개별 아이템 컴포넌트입니다.
 * 
 * [🎯 주요 기능]
 * 1. 활동 제목, 상태, 시간을 표시합니다.
 * 2. 활동 상태에 따라 텍스트 색상을 변경합니다 (승인: 초록, 대기: 주황).
 * 
 * [💡 초급자를 위한 정보]
 * - 이 컴포넌트는 `ActivityItemProps` 인터페이스를 통해 데이터를 받습니다.
 * - `statusColor` 변수를 사용하여 조건부 스타일링을 적용하는 방법을 보여줍니다.
 * - `li` 태그를 사용하여 목록 아이템으로 렌더링됩니다.
 * ============================================================================
 */

import React from 'react';

/**
 * @interface ActivityItemProps
 */
interface ActivityItemProps {
  /** 활동 제목 (예: "출장 신청서") */
  title: string;
  /** 활동 상태 (예: "승인", "대기") */
  status: string;
  /** 상대적 시간 (예: "10분 전") */
  time: string;
}

/**
 * @component ActivityItem
 * @description 대시보드 리스트의 한 줄을 구성하며, 상태에 따라 글자 색상을 변경합니다.
 */
export function ActivityItem({ title, status, time }: ActivityItemProps) {
  // '승인' 상태일 때만 성공 색상(초록)을 적용하고, 나머지는 경고 색상(주황)을 적용합니다.
  const statusColor = status === '승인' ? 'text-success' : 'text-warning';

  return (
    <li className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="font-medium text-sm md:text-base text-foreground">{title}</p>
        <p className="text-xs md:text-sm text-muted-foreground">{time}</p>
      </div>
      <span className={`text-xs md:text-sm font-medium ${statusColor}`}>{status}</span>
    </li>
  );
}

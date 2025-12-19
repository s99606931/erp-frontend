import React from 'react';

// next/image Mocking Component
const NextImage = (props: any) => {
    // next/image props 중 img 태그에 유효하지 않은 것들은 제거하거나 처리해야 할 수 있음
    // 여기서는 단순하게 전달
    return React.createElement('img', { ...props });
};

export default NextImage;

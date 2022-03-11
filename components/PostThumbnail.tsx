import React, { useState } from 'react';
import { useQuery } from 'react-query';

export default function PostThumbnail({ src }: any) {
    const [imgSrc, setImgSrc] = useState(src);
    const fallbackSrc = 'https://via.placeholder.com/150';

    return (
        <div className="mr-[12px] flex-shrink-0 items-start ">
            <img
                className="aspect-square h-[48px] w-[48px] rounded-full"
                src={imgSrc}
                onError={() => {
                    setImgSrc(fallbackSrc);
                }}
                alt=""
            />
        </div>
    );
}

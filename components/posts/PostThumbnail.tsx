import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { Url } from "url";

export default function PostThumbnail({ src }: any) {
    // doesnt work
    const [imgSrc, setImgSrc] = useState(src);

    // works
    // const [imgSrc, setImgSrc] = useState(`${src}`);
    const fallbackSrc = "https://via.placeholder.com/150";

    return (
        <img
            className="aspect-square h-[48px] w-[48px] rounded-full"
            src={src}
            onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackSrc;
            }}
            alt=""
        />
    );
}

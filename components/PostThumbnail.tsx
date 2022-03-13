import React, { useState } from "react";
import { useQuery } from "react-query";
import { Url } from "url";

export default function PostThumbnail({ src }: any) {
    // doesnt work
    const [imgSrc, setImgSrc] = useState(src);

    // works
    // const [imgSrc, setImgSrc] = useState(`${src}`);
    const fallbackSrc = "https://via.placeholder.com/150";

    return (
        <div className="mr-[12px] flex-shrink-0 items-start ">
            <img
                className="aspect-square h-[48px] w-[48px] rounded-full"
                src={src}
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackSrc;
                }}
                alt=""
            />
        </div>
    );
}

import React, { Fragment } from "react";

type MediaThumbnailProps = {
    preview: any;
};

export default function MediaThumbnail({ preview }: MediaThumbnailProps) {
    return (
        <Fragment>
            {preview.images.map((img: unknown, i: number) => {
                return (
                    <img
                        key={i}
                        src={img.resolutions[2]?.url.replaceAll("&amp;", "&")}
                        className="mt-2 rounded-xl border border-dim-border"
                    />
                );
            })}
        </Fragment>
    );
}

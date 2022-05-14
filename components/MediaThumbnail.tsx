import React, { Fragment } from "react";
import { Preview } from "../types/ThreadsResult";

type MediaThumbnailProps = {
    preview: Preview;
};

export default function MediaThumbnail({ preview }: MediaThumbnailProps) {
    return (
        <Fragment>
            {preview.images.map((img) => {
                return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        key={img.resolutions[2]?.url}
                        src={img.resolutions[2]?.url.replaceAll("&amp;", "&")}
                        className="mt-2 rounded-xl w-full border border-dim-border"
                    />
                );
            })}
        </Fragment>
    );
}

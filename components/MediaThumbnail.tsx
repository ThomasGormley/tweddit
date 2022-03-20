import React, { Fragment } from "react";
import type { Preview } from "../types/reddit";

type MediaThumbnailProps = {
    preview: Preview;
};

export default function MediaThumbnail({ preview }: MediaThumbnailProps) {
    return (
        <Fragment>
            {preview.images.map((img) => {
                return (
                    <img
                        src={img.resolutions[2].url.replaceAll("&amp;", "&")}
                        className="mt-2 rounded-xl border border-dim-border"
                    />
                );
            })}
        </Fragment>
    );
}

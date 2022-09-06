import React, { Fragment } from "react";
import { Preview } from "../types/reddit-api/comment";

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
                        key={img.source?.url}
                        src={img.source?.url.replaceAll("&amp;", "&")}
                        className="mt-2 rounded-xl w-full border border-dim-border"
                    />
                );
            })}
        </Fragment>
    );
}

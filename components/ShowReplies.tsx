import React, { Fragment, useState } from "react";
import { Comment } from "../types/reddit-api/Comment";
import { ListingData } from "../types/reddit-api/Listing";
import { More } from "../types/reddit-api/More";
import RepliesThread from "./RepliesThread";

type ShowReplies = {
    data: ListingData<Comment | More>;
};

export function ShowReplies({ data }: ShowReplies) {
    const [showReplies, setShowReplies] = useState(false);
    return (
        <Fragment>
            {!showReplies && (
                <button
                    type="button"
                    className="flex flex-row py-[8px] pl-[16px]"
                    onClick={() => setShowReplies(true)}
                >
                    <div className="mr-[12px] flex h-[16px] basis-[48px] flex-col items-center justify-between self-center">
                        <div className="h-[2px] w-[2px] bg-dim-reply-link"></div>
                        <div className="h-[2px] w-[2px] bg-dim-reply-link"></div>
                        <div className="h-[2px] w-[2px] bg-dim-reply-link"></div>
                    </div>
                    <div className="">
                        <span className="text-15px text-[#1D9BF0]">
                            Show replies
                        </span>
                    </div>
                </button>
            )}

            {/* {data && data.children.map((post, i: number) => {
                if (post.kind === "t1" && i == 0) {
                    return (
                        <DisplayPost
                            key={post.data.id}
                            post={post}
                            type="post"
                        />
                    );
                }
            })} */}
            {data && showReplies && <RepliesThread data={data} />}
        </Fragment>
    );
}

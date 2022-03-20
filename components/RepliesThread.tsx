import React, { Fragment } from "react";
import type {
    RedditPostData,
    RedditResponse,
    RedditResponseData,
} from "../types/reddit";
import DisplayPost from "./posts/DisplayPost";

type ThreadProps = {
    data: RedditResponseData;
};

export default function RepliesThread({ data }: ThreadProps) {
    return (
        <Fragment>
            {data.children.map((post, i: number) => {
                if (post.kind === "t1") {
                    return (
                        <DisplayPost
                            key={post.data.id}
                            post={post}
                            type="post"
                        />
                    );
                }
                if (post.kind === "more") {
                    return <ShowReplies key={post.data.id} />;
                }
            })}
        </Fragment>
    );
}

function ShowReplies({}) {
    return (
        <div className="flex flex-row py-[8px] pl-[16px]">
            <div className="mr-[12px] flex h-[16px] basis-[48px] flex-col items-center justify-between self-center">
                <div className="h-[2px] w-[2px] bg-dim-reply-link"></div>
                <div className="h-[2px] w-[2px] bg-dim-reply-link"></div>
                <div className="h-[2px] w-[2px] bg-dim-reply-link"></div>
            </div>
            <div className="">
                <span className="text-15px text-[#1D9BF0]">Show replies</span>
            </div>
        </div>
    );
}

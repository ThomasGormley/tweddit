import React, { Fragment } from "react";
import type {
    RedditPostData,
    RedditResponse,
    RedditResponseData,
} from "../types/reddit";
import DisplayPost from "./posts/DisplayPost";
import { ShowReplies } from "./ShowReplies";

type ThreadProps = {
    data: RedditResponseData;
};

export default function RepliesThread({ data }: ThreadProps) {
    return (
        <Fragment>
            {data.children.map((post, i: number) => {
                if (post.kind === "t1" && i == 0) {
                    return (
                        <DisplayPost
                            key={post.data.id}
                            post={post}
                            type="post"
                        />
                    );
                }
                if (post.kind === "more") {
                    console.log(post);
                    return <ShowReplies key={post.data.id} />;
                }
            })}
        </Fragment>
    );
}

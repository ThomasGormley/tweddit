import React from "react";
import { match } from "../../lib/util/match";
import { Children } from "../../types/reddit";
import Post from "./Post";
import HeadPost from "./HeadPost";
import { DisplayPostProps } from "../../types/post";
import ReplyPost from "./ReplyPost";
import ReplyHeadPost from "./ReplyHeadPost";

export default function DisplayPost({ type = "post", post }: DisplayPostProps) {
    return match(type, {
        head: () => {
            return <HeadPost post={post} />;
        },
        replyhead: () => {
            return <ReplyHeadPost post={post} />;
        },
        reply: () => {
            return <ReplyPost thread={post} />;
        },
        post: () => {
            return <Post post={post} />;
        },
    });
}

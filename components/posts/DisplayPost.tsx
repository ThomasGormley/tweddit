import React from "react";
import { match } from "../../lib/util/match";
import { Children } from "../../types/reddit";
import Post from "./Post";
import HeadPost from "./HeadPost";
import { DisplayPostProps } from "../../types/post";

export default function DisplayPost({ type = "post", post }: DisplayPostProps) {
    return match(type, {
        head: () => {
            return <HeadPost post={post} />;
        },
        reply: () => {
            return <Post post={post} />;
        },
        post: () => {
            return <Post post={post} />;
        },
    });
}

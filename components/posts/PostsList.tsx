import React, { Fragment } from "react";
import type { Thread } from "../../types/ThreadsResult";
import Post from "./Post";

type PostsProps = {
    data: Array<Thread>;
};

export default function PostsList({ data }: PostsProps) {
    return (
        <Fragment>
            {data.map((post) => (
                <Post key={post.data.id} post={post} />
            ))}
        </Fragment>
    );
}

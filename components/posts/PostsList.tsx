import React, { Fragment } from "react";
import { Children, RedditResponse } from "../../types/reddit";
import DisplayPost from "./DisplayPost";

type PostsProps = {
    data: Children[];
};

export default function PostsList({ data: children }: PostsProps) {
    console.log("children", children);
    return (
        <Fragment>
            {children.map((post: Children) => (
                <DisplayPost key={post.data.id} post={post} type="post" />
            ))}
        </Fragment>
    );
}

import React, { Fragment } from "react";
import { Children, RedditResponse, RedditResponseData } from "../types/reddit";
import Post from "./posts/Post";
import DisplayPost from "./posts/DisplayPost";
import PostsList from "./posts/PostsList";

type ThreadProps = {
    data: Array<RedditResponse>;
};

export default function Thread({ data }: ThreadProps) {
    return (
        <Fragment>
            {data.map((post: RedditResponse, i: number) => {
                const isHead = i === 0;
                if (isHead) {
                    return (
                        <DisplayPost
                            key={post.data.children[0].data.id}
                            post={post.data.children[0]}
                            type="head"
                        />
                    );
                }
                return post.data.children.map((post) => {
                    if (post.kind === "t1") {
                        return (
                            <DisplayPost
                                key={post.data.id}
                                post={post}
                                type="reply"
                            />
                        );
                    }
                });
            })}
        </Fragment>
    );
}

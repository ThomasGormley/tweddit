import React, { Fragment } from "react";
import { CommentsData } from "../types/CommentsResult";
import Post from "./posts/Post";
import { ShowReplies } from "./ShowReplies";

type ThreadProps = {
    data: CommentsData;
};

export default function RepliesThread({ data }: ThreadProps) {
    return (
        <Fragment>
            {data.children.map((post, i: number) => {
                if (post.kind === "t1" && i == 0) {
                    return (
                        <Post key={post.data.id} post={post} />
                    );
                }
                if (post.kind === "more") {
                    return (
                        <ShowReplies
                            key={post.data.id}
                            data={data.children[0].data.replies?.data}
                        />
                    );
                }
            })}
        </Fragment>
    );
}

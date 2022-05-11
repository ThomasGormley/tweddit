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
            {data.children
                .sort((a, b) => b.data.ups - a.data.ups)
                .map((post, i: number) => {
                    const hasReplies = Boolean(post.data.replies);
                    if (post.kind === "t1" && i == 0) {
                        return (
                            <Fragment>
                                <Post key={post.data.id} post={post} />
                                {hasReplies && (
                                    <ShowReplies
                                        data={
                                            data.children[0].data.replies?.data
                                        }
                                    />
                                )}
                            </Fragment>
                        );
                    }
                })}
        </Fragment>
    );
}
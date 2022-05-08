import React, { Fragment } from "react";
import { Thread, ThreadResult } from "../types/ThreadsResult";
import Replies from "./posts/ReplyPost";
import HeadPost from "./posts/HeadPost";
import { useRouter } from "next/router";
import useRedditQuery from "../hooks/use-reddit-query";
import LoadingSpinner from "./LoadingSpinner";
import { Comment, CommentsResult } from "../types/CommentsResult";

type ThreadProps = {
    data: Array<ThreadResult>;
};

export default function ThreadDisplay() {
    const router = useRouter();

    const { data, isLoading } = useRedditQuery<CommentsResult>({
        router,
    });

    if (isLoading || !data) {
        return (
            <div className="flex w-full justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    // @ts-ignore
    const [headPostData, commentsData]: [ThreadResult, CommentsResult] = data;
    const replyComments = commentsData.data.children.filter(
        (comment) => comment.kind === "t1",
    );
    return (
        <div className="flex max-w-[600px] flex-col ">
            {/* Head node - start of thread */}
            <HeadPost post={headPostData.data.children[0]} />
            {/* All the reply nodes */}
            <Replies comments={replyComments} />
        </div>
    );
}

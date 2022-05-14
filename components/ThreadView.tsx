import React from "react";
import { ThreadResult } from "../types/ThreadsResult";
import Replies from "./posts/Replies";
import HeadPost from "./posts/HeadPost";
import { useRouter } from "next/router";
import useRedditQuery from "../hooks/use-reddit-query";
import LoadingSpinner from "./LoadingSpinner";
import { CommentsResult } from "../types/CommentsResult";


export default function ThreadView() {
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [headPostData, commentsData]: [ThreadResult, CommentsResult] = data;
    const replyComments = commentsData.data.children.filter(
        (comment) => comment.kind === "t1",
    );
    return (
        <div className="flex max-w-[600px] flex-col border-x border-dim-border">
            {/* Head node - start of thread */}
            <HeadPost post={headPostData.data.children[0]} />
            
            {/* All the reply nodes */}
            <Replies comments={replyComments} />
        </div>
    );
}

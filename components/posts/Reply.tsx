import PostThumbnail from "./PostThumbnail";
import React, { Fragment } from "react";
import QuickActions from "../QuickActions";
import { useQuery } from "react-query";
import formatTimeDistanceToNowShortSuffix from "../../lib/util/formatTimeToNowShortSuffix";
import { useSession } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";
import clsx from "clsx";
import type { PostProps, PostQuickActions } from "../../types/post";
import { Thread, ThreadResult } from "../../types/ThreadsResult";
import { Comment } from "../../types/CommentsResult";
import RepliesThread from "../RepliesThread";

export const handleOnClick = (router: NextRouter, permalink: string) => {
    router.push(permalink);
};

export default function Reply({ comment }: { comment: Comment }) {
    const { data: session } = useSession();
    const router = useRouter();

    const hasReplies = Boolean(comment.data.replies);

    const { data: subredditData, isLoading } = useQuery({
        queryKey: `about-${comment.data.subreddit}`,
        queryFn: async () =>
            fetch(
                `https://oauth.reddit.com/r/${comment.data.subreddit}/about`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `bearer ${session?.accessToken}`,
                    },
                },
            ).then((res) => res.json()),
    });

    const quickActions: PostQuickActions = [
        {
            type: "comments",
            // data: comment.data.replies.data?.children.filter(r => r.kind = "t1").length,
            data: hasReplies ? comment.data.replies.data.children.length : 0,
        },
        {
            type: "crossposts",
            data: comment.data.num_reports ?? 0,
        },
        {
            type: "upvotes",
            data: comment.data.ups,
        },
        {
            type: "share",
        },
    ];

    const postedAt = new Date(comment.data.created * 1000);
    const postedAgo = formatTimeDistanceToNowShortSuffix(postedAt);

    return (
        <Fragment>
            <article
                className="border-t border-dim-border px-[16px] text-sm "
                onClick={() => handleOnClick(router, comment.data.permalink)}
            >
                <div className="flex h-full flex-row items-start pt-[12px]">
                    <div className="mr-[12px] flex h-full flex-shrink-0 flex-col items-center space-y-1">
                        {!isLoading && (
                            <PostThumbnail
                                src={subredditData?.data?.icon_img}
                            />
                        )}
                        {hasReplies && (
                            <div className="w-[2px] flex-grow justify-center bg-dim-reply-link"></div>
                        )}
                    </div>
                    <div className="w-full">
                        <div className="flex items-center space-x-[4px]">
                            <div>
                                <a href="" className="text-15px font-bold ">
                                    {comment.data.author}
                                </a>
                            </div>
                            <div>
                                <span className="text-dim-grey">
                                    {comment.data.subreddit_name_prefixed}
                                </span>
                            </div>
                            <span className="text-15px text-dim-grey">·</span>
                            <time
                                dateTime={postedAt.toISOString()}
                                className="text-15px font-normal text-dim-grey"
                            >
                                {postedAgo}
                            </time>
                        </div>
                        <p>{comment.data.body}</p>
                        <QuickActions actions={quickActions} />
                    </div>
                </div>
            </article>

            {hasReplies && <RepliesThread data={comment.data.replies.data} />}
        </Fragment>
    );
}

import PostThumbnail from "./PostThumbnail";
import React from "react";
import QuickActions from "../QuickActions";
import formatTimeDistanceToNowShortSuffix from "../../lib/util/formatTimeToNowShortSuffix";
import { NextRouter, useRouter } from "next/router";
import clsx from "clsx";
import type { PostQuickActions } from "../../types/post";
import MediaThumbnail from "../MediaThumbnail";
import { Thread } from "../../types/ThreadsResult";
import { Comment } from "../../types/CommentsResult";
import useSubredditData from "../../hooks/use-subreddit-data";

export const handleOnClick = (router: NextRouter, permalink: string) => {
    router.push(permalink);
};

type Post = Comment | Thread;

export default function Post({ post }: { post: Post }) {
    const router = useRouter();

    const isThreadPredicate = (post: Post): post is Comment => {
        return "body" in post.data;
    };

    const isThread = isThreadPredicate(post);

    const { data: subredditData, isLoading } = useSubredditData(
        post.data.subreddit,
    );

    const hasReplies = isThread && Boolean(post.data.replies);
    const numReplies =
        isThread && hasReplies ? post.data.replies.data.children.length : 0;

    const quickActions: PostQuickActions = [
        {
            type: "comments",
            data: post.data.num_comments ?? numReplies,
        },
        {
            type: "crossposts",
            data: 0,
        },
        {
            type: "upvotes",
            data: post.data.ups,
        },
        {
            type: "share",
        },
    ];

    const postedAt = new Date(post.data.created * 1000);
    const postedAgo = formatTimeDistanceToNowShortSuffix(postedAt);

    return (
        <article
            className={clsx(
                "border-b border-dim-border px-[16px]",
                isThread && "border-none",
            )}
            onClick={() => handleOnClick(router, post.data.permalink)}
        >
            <div className="relative flex h-full flex-row items-start pt-[12px]">
                <div className="mr-[12px] flex h-full flex-shrink-0 flex-col items-center space-y-[4px]">
                    {isThread && (
                        <div className="absolute top-0 h-[10px] w-[2px] bg-dim-reply-link"></div>
                    )}
                    {!isLoading ? (
                        <PostThumbnail src={subredditData?.data?.icon_img} />
                    ) : (
                        <div className="h-[48px] w-[48px] rounded-full bg-slate-700" />
                    )}
                    {isThread && hasReplies && (
                        <div className="w-[2px] flex-grow justify-center bg-dim-reply-link"></div>
                    )}
                </div>
                <div className="w-full">
                    <div className="flex items-center space-x-[4px]">
                        <div>
                            <a href="" className="text-15px font-bold ">
                                {post.data.author}
                            </a>
                        </div>
                        <div>
                            <span className="text-dim-grey">
                                {post.data.subreddit_name_prefixed}
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

                    <p>{isThread ? post.data.body : post.data.title}</p>

                    {!isThread && post.data.preview?.enabled && (
                        <MediaThumbnail preview={post.data.preview} />
                    )}
                    <QuickActions actions={quickActions} />
                </div>
            </div>
        </article>
    );
}

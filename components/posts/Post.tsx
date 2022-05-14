import PostThumbnail from "./PostThumbnail";
import React from "react";
import QuickActions from "../QuickActions";
import { useQuery } from "react-query";
import formatTimeDistanceToNowShortSuffix from "../../lib/util/formatTimeToNowShortSuffix";
import { useSession } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";
import clsx from "clsx";
import type { PostQuickActions } from "../../types/post";
import MediaThumbnail from "../MediaThumbnail";
import { Thread } from "../../types/ThreadsResult";
import { Comment } from "../../types/CommentsResult";

export const handleOnClick = (router: NextRouter, permalink: string) => {
    router.push(permalink);
};

type Post = Comment | Thread;

export default function Post({ post }: { post: Post }) {
    const { data: session } = useSession();
    const router = useRouter();

    const isThreadPredicate = (post: Post): post is Comment => {
        return "body" in post.data;
    };

    const isThread = isThreadPredicate(post);
    console.log("isThread", isThreadPredicate(post));
    const { data: subredditData, isLoading } = useQuery({
        queryKey: `about-${post.data.subreddit}`,
        queryFn: async () =>
            fetch(`https://oauth.reddit.com/r/${post.data.subreddit}/about`, {
                method: "GET",
                headers: {
                    Authorization: `bearer ${session?.accessToken}`,
                },
            }).then((res) => res.json()),
    });

    const hasReplies = isThread && Boolean(post.data.replies);
    const numReplies = isThread && hasReplies ? post.data.replies.data.children.length : 0;

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
                "border-y border-dim-border px-[16px] text-sm",
                isThread && "border-none",
            )}
            onClick={() => handleOnClick(router, post.data.permalink)}
        >
            <div className="relative flex h-full flex-row items-start break-all pt-[12px]">
                <div className="mr-[12px] flex h-full flex-shrink-0 flex-col items-center space-y-[4px]">
                    {isThread && (
                        <div className="absolute top-0 h-[10px] w-[2px] bg-dim-reply-link"></div>
                    )}
                    {!isLoading && (
                        <PostThumbnail src={subredditData?.data?.icon_img} />
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

import PostThumbnail from "./PostThumbnail";
import React, { Fragment } from "react";
import QuickActions from "../QuickActions";
import { useQuery } from "react-query";
import formatTimeDistanceToNowShortSuffix from "../../lib/util/formatTimeToNowShortSuffix";
import { useSession } from "next-auth/react";
import { Children } from "../../types/reddit";
import { NextRouter, useRouter } from "next/router";
import clsx from "clsx";
import { match } from "../../lib/util/match";
import HeadPost from "./HeadPost";
import type { PostProps, PostQuickActions } from "../../types/post";

export const handleOnClick = (router: NextRouter, permalink: string) => {
    router.push(permalink);
};

export default function ReplyHeadPost({ post }: PostProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const { query } = router;

    const isThread = query.slug?.includes("comments");

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

    const quickActions: PostQuickActions = [
        {
            type: "comments",
            data: post.data.num_comments,
        },
        {
            type: "crossposts",
            data: post.data.num_crossposts,
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
            className="border-t border-dim-border px-[16px] text-sm"
            onClick={() => handleOnClick(router, post.data.permalink)}
        >
            <div className={clsx(`flex h-full flex-row items-start pt-[12px]`)}>
                <div className="mr-[12px] flex h-full flex-shrink-0 flex-col items-center space-y-1">
                    {!isLoading && (
                        <PostThumbnail src={subredditData?.data?.icon_img} />
                    )}
                    <div className="w-[2px] flex-grow justify-center bg-dim-reply-link"></div>
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
                    <QuickActions actions={quickActions} />
                </div>
            </div>
        </article>
    );
}

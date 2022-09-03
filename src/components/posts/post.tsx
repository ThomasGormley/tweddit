import PostThumbnail from "./post-thumbnail";
import React, { forwardRef } from "react";
import QuickActions from "../quick-actions";
import formatTimeDistanceToNowShortSuffix from "../../lib/util/format-time-distance-to-now-short-suffix";
import { NextRouter, useRouter } from "next/router";
import clsx from "clsx";
import MediaThumbnail from "../media-thumbnail";
import useSubredditData from "src/hooks/use-subreddit-data";
import { isLinkType, isThreadPredicate } from "../../lib/predicates";
import { Post as TPost } from "src/types/reddit-api";

export const handleOnClick = (router: NextRouter, permalink: string) => {
    router.push(permalink);
};

interface PostProps {
    post: TPost;
}

function ForwardedPost(
    { post }: PostProps,
    ref: React.Ref<HTMLElement> | null,
) {
    const router = useRouter();

    const isThread = isThreadPredicate(post);
    const isLinkFromAPI = isLinkType(post);
    const { data: subredditData, isLoading } = useSubredditData(
        post.data.subreddit,
    );
    const hasPreview =
        isLinkFromAPI && post?.data?.preview && post.data.preview?.enabled;
    const hasReplies = isThread && !isLinkFromAPI && Boolean(post.data.replies);
    const postedAt = new Date(post.data.created * 1000);
    const postedAgo = formatTimeDistanceToNowShortSuffix(postedAt);

    return (
        <article
            ref={ref}
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

                    <p>{!isLinkFromAPI ? post.data.body : post.data.title}</p>

                    {hasPreview && (
                        <MediaThumbnail preview={post.data.preview} />
                    )}
                    <QuickActions post={post} />
                </div>
            </div>
        </article>
    );
}

/**
 * Used in home feed, and as head node of a replies thread
 */
const Post = forwardRef(ForwardedPost);

export default Post;

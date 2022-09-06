import PostThumbnail from "./post-thumbnail";
import React, { Fragment } from "react";
import QuickActions from "../quick-actions";
import formatTimeDistanceToNowShortSuffix from "../../lib/util/format-time-distance-to-now-short-suffix";
import { NextRouter, useRouter } from "next/router";
import RepliesThread from "../replies-thread";
import useSnudownToReact from "src/hooks/use-snudown-to-react";
import useSubredditData from "src/hooks/use-subreddit-data";
import { Comment, More } from "src/types/reddit-api";
import { ListingData } from "src/types/reddit-api/listing";

export const handleOnClick = (router: NextRouter, permalink: string) => {
    router.push(permalink);
};

export default function Reply({ comment }: { comment: Comment }) {
    const router = useRouter();
    const { reactElement: commentBody } = useSnudownToReact(comment.data.body);

    const hasReplies = Boolean(comment.data.replies);

    const { data: subredditData, isLoading } = useSubredditData(
        comment.data.subreddit,
    );
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
                                className="text-15px font-normal text-dim-grey underline"
                            >
                                {postedAgo}
                            </time>
                        </div>
                        {/* <p>{comment.data.body_html}</p> */}
                        {commentBody}
                        <QuickActions post={comment} />
                    </div>
                </div>
            </article>
            {hasReplies && (
                <RepliesThread
                    data={
                        // TODO: fix type narrowing here
                        comment.data.replies.data as ListingData<Comment | More>
                    }
                />
            )}
        </Fragment>
    );
}

import PostThumbnail from "./PostThumbnail";
import React, { Fragment } from "react";
import QuickActions, { isThreadPredicate } from "../QuickActions";
import { useQuery } from "react-query";
import formatTimeDistanceToNowShortSuffix from "../../lib/util/formatTimeToNowShortSuffix";
import { useSession } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";
import type { PostQuickActions } from "../../types/post";
import { Comment } from "../../types/reddit-api/Link";
import RepliesThread from "../RepliesThread";
import useSnudownToReact from "../../hooks/use-snudown-to-react";
import useSubredditData from "../../hooks/use-subreddit-data";

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
    const isThread = isThreadPredicate(comment);
    // console.log({ fromReplyAsTypeComment: comment, isThread });

    // const quickActions: PostQuickActions = [
    //     {
    //         type: "comments",
    //         data: hasReplies ? comment.data.replies.data.children.length : 0,
    //     },
    //     {
    //         type: "crossposts",
    //         data: comment.data.num_crossposts ?? 0,
    //     },
    //     {
    //         type: "upvotes",
    //         data: comment.data.ups,
    //     },
    //     {
    //         type: "share",
    //     },
    // ];

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
            {hasReplies && <RepliesThread data={comment.data.replies.data} />}
        </Fragment>
    );
}

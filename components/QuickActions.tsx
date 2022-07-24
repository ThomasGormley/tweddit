import React from "react";
import { numberFormatter } from "../lib/util/numberFormatter";
import { Link } from "../types/reddit-api/Link";
import ActionIcon from "./ActionIcon";
import { isLinkType, isListingType, isMoreType } from "../lib/predicates";
import { Comment } from "../types/reddit-api/Comment";
import { More } from "../types/reddit-api/More";
import { Listing } from "../types/reddit-api/Listing";

export const isThreadPredicate = (post: Post): post is Comment => {
    return "body" in post.data;
};

type Post = Comment | Link;

function getNumberOfRepliesFromCommentType(post: Comment | Listing): number {
    const isListing = isListingType(post);
    if (isListing) {
        return getNumberOfRepliesFromCommentType(
            post.data.children[0] as Comment,
        );
    }
    const hasReplies = Boolean(post.data.replies);

    const moreObject = hasReplies
        ? post.data.replies.data.children.find((obj) => isMoreType(obj)) ?? {}
        : {};

    if ("data" in moreObject) {
        return (
            (moreObject as More).data.count +
            post.data.replies.data.children.length -
            1
        );
    }

    return !hasReplies
        ? post.data.depth
        : getNumberOfRepliesFromCommentType(post.data.replies);
}

export default function QuickActions({ post }: { post: Post }) {
    const isLinkFromAPI = isLinkType(post);

    console.log({
        [isLinkFromAPI ? "link" : "comment"]: post,
    });
    let actions;
    if (!isLinkFromAPI) {
        // const hasReplies = Boolean(post.data.replies);
        const numReplies = getNumberOfRepliesFromCommentType(post);

        actions = [
            {
                type: "comments",
                data: numReplies,
            },
            {
                type: "crossposts",
                // post.data.num_crossposts does not exist on this object type
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
    } else {
        actions = [
            {
                type: "comments",
                data: post.data.num_comments,
            },
            {
                type: "crossposts",
                data: post.data.num_crossposts ?? 0,
            },
            {
                type: "upvotes",
                data: post.data.ups,
            },
            {
                type: "share",
            },
        ];
    }

    return (
        <div className="my-[12px] inline-flex w-full max-w-[425px] justify-between gap-[8px] text-13px leading-[16px] text-dim-grey">
            {actions.map((action) => (
                <div key={action.type} className="flex justify-start">
                    <ActionIcon action={action.type} />

                    {(action.data || action.data === 0) && (
                        <span className="px-[12px]">
                            {numberFormatter(action.data)}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}

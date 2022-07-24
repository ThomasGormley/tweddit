import React from "react";
import { numberFormatter } from "../lib/util/numberFormatter";
import ActionIcon from "./ActionIcon";
import { isLinkType, isListingType, isMoreType } from "../lib/predicates";
import { Comment, Listing, More, Post } from "../types/reddit-api";

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

// type Post = Link | Comment
export default function QuickActions({ post }: { post: Post }) {
    const typeIsLink = isLinkType(post);
    const actions = [
        {
            type: "comments",
            data: typeIsLink
                ? post.data.num_comments
                : getNumberOfRepliesFromCommentType(post),
        },
        {
            type: "crossposts",
            // post.data.num_crossposts does not exist on this object type
            data: typeIsLink ? post.data.num_crossposts ?? 0 : 0,
        },
        {
            type: "upvotes",
            data: post.data.ups,
        },
        {
            type: "share",
        },
    ];

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

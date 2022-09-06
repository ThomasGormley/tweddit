import { Link, Comment, More, KindTypePrefixes, Listing, Post } from "../types/reddit-api";


export const isLinkType = (arg: KindTypePrefixes): arg is Link => {
    return arg.kind === "t3";
};
export const isCommentType = (arg: KindTypePrefixes): arg is Comment => {
    return arg.kind === "t1";
};
export const isMoreType = (arg: KindTypePrefixes): arg is More => {
    return arg.kind === "more";
};

export const isListingType = (
    arg: KindTypePrefixes | Listing,
): arg is Listing => {
    return arg.kind === "Listing";
};

export const isThreadPredicate = (post: Post): post is Comment => {
    return "body" in post.data;
};
